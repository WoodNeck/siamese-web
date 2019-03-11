<template>
<div>
  <div class="menu"
    @click="toggleMkModal">
    <span class="is-size-5 button is-primary is-inverted">+</span>
  </div>

  <div v-for="(image, idx) in directory.images" :key="idx">
    <img :src="image.url" />
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
            v-model="dropFiles" multiple drag-drop>
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
</div>
</template>

<script>
import qs from 'qs';
import { MKIMG, RMIMG } from '../../../../constants/mutation';

export default {
  middleware: 'checkDirPermission',
  data() {
    return {
      dropFiles: [],
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
    onUpload: async function(files) {
      const dirName = this.$route.params.directory;
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

      base64Files.forEach((file, idx) => {
        // Delete data:image/png;base64,
        formData.append(`${idx}`, file.substring(22));
      })

      formData.append("directory", this.$route.params.directory);
      formData.append("guildId", this.$route.params.guild);

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
        return;
      }

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

      // clear files
      this.dropFiles = [];
      this.toggleMkModal();
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
</style>

