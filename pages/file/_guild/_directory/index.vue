<template>
<div>
  <div class="menu"
    @click="toggleMkModal">
    <span class="is-size-5 button is-primary is-inverted">+</span>
  </div>

  <div class="image-wrapper" v-for="image in directory.images" :key="image.id">
    <figure class="image is-128x128">
      <img :src="image.url" />
    </figure>
    <div>
      <a @click="togglePatchModal(image.name, image.id)">{{ image.name }}</a>
    </div>
    <span class="tag is-white">
      {{
        image.size >= 1024 * 1024
          ? `${(image.size / (1024 * 1024)).toFixed(1)}MB`
          : `${(image.size / 1024).toFixed(1)}kB`
      }}
    </span>
    <a class="delete is-right" @click="toggleRmModal(image.name, image.id)"></a>
  </div>

  <div ref="mkModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">이미지 업로드</p>
        <button class="delete" @click="toggleMkModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <b-field class="has-text-centered">
          <b-upload class="upload-field" @input="onUpload"
            v-model="dropFiles" multiple drag-drop :disabled="uploading" :loading="uploading">
            <section class="section has-text-black">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </section>
    </div>
  </div>

  <div ref="rmModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">정말 <span ref="rmName"></span>을(를) 삭제할거냥?</p>
        <button class="delete" @click="toggleRmModal" aria-label="close"></button>
        <input type="hidden" ref="rmId" />
      </header>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="rmImg">삭제</button>
        <button class="button" @click="toggleRmModal">취소</button>
      </footer>
    </div>
  </div>

  <div ref="patchModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">이미지 이름 변경</p>
        <button class="delete" @click="togglePatchModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <input ref="patchName" class="input" type="text" placeholder="새로운 이미지 이름" value="">
        <input type="hidden" ref="patchId" />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="patch">저장</button>
        <button class="button" @click="togglePatchModal">취소</button>
      </footer>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'qs';
import { MKIMG, RMIMG, RENAME_IMG } from '../../../../constants/mutation';

export default {
  middleware: 'checkDirPermission',
  data() {
    return {
      dropFiles: [],
      uploading: false,
    }
  },
  computed: {
    directory() {
      const guildId = this.$route.params.guild;
      const directory = this.$route.params.directory;
      const guild = this.$store.getters.guilds.find(guild => guild.id === guildId);
      return guild.directories.find(dir => dir.name === directory);
    },
  },
  methods: {
    toggleMkModal: function() {
      this.$refs.mkModal.classList.toggle('is-active');
    },
    toggleRmModal: function(name, id) {
      this.$refs.rmModal.classList.toggle('is-active');
      this.$refs.rmName.innerHTML = name;
      this.$refs.rmId.value = id;
    },
    togglePatchModal: function(name, id) {
      this.$refs.patchModal.classList.toggle('is-active');
      this.$refs.patchName.value = name;
      this.$refs.patchId.value = id;
      this.$refs.patchName.classList.remove('is-danger');
    },
    onUpload: async function(files) {
      const dirName = this.$route.params.directory;
      const author = this.$store.state.discord.user.id;
      this.dropFiles = [];

      if (!files.length) {
        this.$toast.open({
          duration: 2000,
          message: '파일이 하나도 없다냥!',
          position: 'is-bottom',
          type: 'is-danger'
        });
        return;
      }

      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          this.$toast.open({
            duration: 2000,
            message: `${file.name}의 크기가 너무 크다냥! 10MB 미만으로 해달라냥!`,
            position: 'is-bottom',
            type: 'is-danger'
          });
        }
      }

      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      const readFiles = [];
      files.forEach(file => {
        readFiles.push(getBase64(file));
      });

      const base64Files = await Promise.all(readFiles);
      const formData = new FormData();
      const base64TypeRegex = /^data:(.*);base64/g;
      const fileNames = files.map(file => file.name.split('.')[0].trim());

      // No-duplicate name
      if (fileNames.length !== new Set(fileNames).size) {
        this.$toast.open({
          duration: 2000,
          message: '중복된 이름을 가진 이미지들이 있다냥!',
          position: 'is-bottom',
          type: 'is-danger'
        });
        this.toggleMkModal();
        return;
      };

      const directory = this.directory;
      for (const name of fileNames) {
        // No-empty name
        if (!name) {
          this.$toast.open({
            duration: 2000,
            message: `빈 파일 이름은 사용할 수 없다냥!`,
            position: 'is-bottom',
            type: 'is-danger'
          });
          this.toggleMkModal();
          return;
        }
        if (!directory.images.every(image => image.name !== name)) {
          this.$toast.open({
            duration: 2000,
            message: `${name}은(는) 이미 폴더에 존재하는 이미지 이름이다냥!`,
            position: 'is-bottom',
            type: 'is-danger'
          });
          this.toggleMkModal();
          return;
        }
      };

      base64Files.forEach((file, idx) => {
        // Delete data:image/png;base64,
        const matchResult = base64TypeRegex.exec(file);
        const fileType = matchResult[0];

        formData.append(`${idx}`, file.substring(fileType.length));
        formData.append(`${idx}-name`, fileNames[idx]);
      })

      formData.append("author", author);
      formData.append("directory", this.$route.params.directory);
      formData.append("guildId", this.$route.params.guild);

      this.uploading = true;

      const results = await this.$axios.$post('/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(result => result)
        .catch(() => null);

      if (!results) {
        this.$toast.open({
          duration: 2000,
          message: `이미지 업로드에 실패했다냥!`,
          position: 'is-bottom',
          type: 'is-danger'
        });
      } else {
        this.$store.commit(MKIMG, {
          guildId: this.$route.params.guild,
          dirName,
          images: results.filter(result => result),
        });

        const fails = results.filter(result => !result);
        if (fails.length) {
          this.$toast.open({
            duration: 2000,
            message: `${fails.length}개의 이미지 업로드에 실패했다냥!`,
            position: 'is-bottom',
            type: 'is-danger'
          });
        }
      }

      this.uploading = false;
      this.toggleMkModal();
    },
    rmImg: async function() {
      const imageName = this.$refs.rmName.innerHTML;
      const imgId = this.$refs.rmId.value;
      const dirName = this.$route.params.directory;

      const data = qs.stringify({
        imgId,
        guildId: this.$route.params.guild,
        dirName,
      });

      await this.$axios.$delete('/api/image', {
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(() => {
        this.$toast.open({
          duration: 2000,
          message: `${imageName}을/를 삭제했다냥!`,
          position: 'is-bottom',
          type: 'is-success',
        });
        this.$store.commit(RMIMG, {
          guildId: this.$route.params.guild,
          dirName,
          imgId,
        });
      }).catch(e => {
        console.error(e);
        this.$toast.open({
          duration: 2000,
          message: '이미지 삭제에 실패했다냥!',
          position: 'is-bottom',
          type: 'is-danger',
        });
      });
      this.toggleRmModal();
    },
    patch: async function() {
      const newName = this.$refs.patchName.value.trim();
      const imgId = this.$refs.patchId.value;
      const dirName = this.$route.params.directory;
      const guildId = this.$route.params.guild;

      if (!newName) {
        this.$refs.patchName.classList.add('is-danger');
        this.$toast.open({
          duration: 2000,
          message: '이미지 이름을 입력해달라냥!',
          position: 'is-bottom',
          type: 'is-danger',
        });
        return;
      }

      await this.$axios.$patch('/api/image', {
        imgId,
        newName,
        guildId: this.$route.params.guild,
        dirName,
      }).then(() => {
        this.$toast.open({
          duration: 2000,
          message: `${newName}(으)로 이름을 변경했다냥!`,
          position: 'is-bottom',
          type: 'is-success',
        });
        this.$store.commit(RENAME_IMG, {
          guildId,
          dirName,
          imgId,
          newName,
        });
      }).catch(e => {
        console.error(e);
        this.$toast.open({
          duration: 2000,
          message: '이미지 이름 변경에 실패했다냥!',
          position: 'is-bottom',
          type: 'is-danger',
        });
      });
      this.togglePatchModal();
    }
  }
}
</script>

<style scroped>
.menu {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
}
.upload-field {
  width: 100%;
}
.image-wrapper {
  display: inline-block;
  margin: 0.3rem;
  position: relative;
}
.is-right {
  position: absolute;
  right: 0;
}
</style>

