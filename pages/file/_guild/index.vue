<template>
<div>
  <div class="menu">
    <span
      @click="toggleMkModal"
      class="is-size-5 button is-primary is-inverted">+</span>
  </div>
  <div v-if="directories.length > 0">
    <div class="folder-wrapper" v-for="directory in directories" :key="directory.name">
      <nuxt-link :to="`/file/${guild.id}/${directory.name}`" class="box">
        <div class="media has-text-black">
          <figure class="media-left is-size-3-desktop">
            <p>📁</p>
          </figure>
          <div class="media-content">
            <div class="content is-size-3-desktop">
              <p class="text-wrapper">
                <span>{{ directory.name }}</span>
                <span class="is-right">{{ directory.images.length }}</span>
              </p>
            </div>
          </div>
          <div class="media-right">
            <button @click.stop.prevent="toggleRmModal(directory.name)" class="delete is-medium"></button>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div class="guild-404" v-else>
    <p class="is-size-1">아직 폴더가 하나도 없다냥!</p>
  </div>

  <div ref="mkDirModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">새 폴더</p>
        <button class="delete" @click="toggleMkModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <input ref="dirInput" class="input" type="text" placeholder="폴더명">
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="mkdir">저장</button>
        <button class="button" @click="toggleMkModal">취소</button>
      </footer>
    </div>
  </div>

  <div ref="rmDirModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">정말 <span ref="rmDirName"></span> 폴더를 삭제할거냥?</p>
        <button class="delete" @click="toggleRmModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body has-text-black">
        폴더를 삭제하면 복구할 수 없다냥!
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="rmdir">삭제</button>
        <button class="button" @click="toggleRmModal">취소</button>
      </footer>
    </div>
  </div>
</div>
</template>
<script>
import qs from 'qs';
import { MKDIR, RMDIR } from '../../../constants/mutation';

export default {
middleware: 'checkDirPermission',
computed: {
    guild() {
      const guildId = this.$route.params.guild;
      return this.$store.getters.guilds.find(guild => guild.id === guildId);
    },
    directories() {
      return (this.guild && this.guild.directories)
        ? this.guild.directories
        : [];
    }
  },
  methods: {
    toggleMkModal: function() {
      this.$refs.mkDirModal.classList.toggle('is-active');
      this.$refs.dirInput.classList.remove('is-danger');
      this.$refs.dirInput.value = '';
    },
    toggleRmModal: function(dirName) {
      this.$refs.rmDirModal.classList.toggle('is-active');
      this.$refs.rmDirName.innerHTML = dirName;
    },
    mkdir: async function() {
      const dirInput = this.$refs.dirInput;
      const dirName = dirInput.value.trim();
      const directories = this.guild.directories;

      if (!dirName) {
        dirInput.classList.add('is-danger');
        this.$toast.open({
          duration: 2000,
          message: '폴더 이름을 입력해달라냥!',
          position: 'is-bottom',
          type: 'is-danger'
        });
        return;
      }

      if (dirName.indexOf(' ') >= 0) {
        dirInput.classList.add('is-danger');
        this.$toast.open({
          duration: 2000,
          message: '폴더 이름엔 공백이 포함될 수 없다냥!',
          position: 'is-bottom',
          type: 'is-danger'
        });
        return;
      }

      if (!directories.every(dir => dir.name !== dirName)) {
        dirInput.classList.add('is-danger');
        this.$toast.open({
          duration: 2000,
          message: '이미 있는 폴더다냥!',
          position: 'is-bottom',
          type: 'is-danger'
        });
        return;
      }

      const data = qs.stringify({
        dirName,
        guildId: this.guild.id,
      });
      await this.$axios.$post('/api/dir', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(() => {
        this.$toast.open({
          duration: 2000,
          message: `${dirName} 폴더를 생성했다냥!`,
          position: 'is-bottom',
          type: 'is-success',
        });
        this.$store.commit(MKDIR, {
          updatingGuild: this.guild,
          directory: {
            guildId: this.guild.id,
            images: [],
            name: dirName,
          }
        });
      }).catch(e => {
        console.error(e);
        this.$toast.open({
          duration: 2000,
          message: '폴더 생성에 실패했다냥!',
          position: 'is-bottom',
          type: 'is-danger',
        });
      });
      this.toggleMkModal();
    },
    rmdir: async function() {
      const dirName = this.$refs.rmDirName.innerHTML;
      const data = qs.stringify({
        dirName,
        guildId: this.guild.id,
      });

      await this.$axios.$delete('/api/dir', {
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(() => {
        this.$toast.open({
          duration: 2000,
          message: `${dirName} 폴더를 삭제했다냥!`,
          position: 'is-bottom',
          type: 'is-success',
        });
        this.$store.commit(RMDIR, {
          updatingGuild: this.guild,
          dirName,
        });
      }).catch(e => {
        console.error(e);
        this.$toast.open({
          duration: 2000,
          message: '폴더 삭제에 실패했다냥!',
          position: 'is-bottom',
          type: 'is-danger',
        });
      });
      this.toggleRmModal();
    }
  }
}
</script>
<style scoped>
.menu {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
}
.folder-wrapper {
  margin: 0.3rem;
}
.text-wrapper {
  position: relative;
}
.is-right {
  position: absolute;
  right: 0;
}
</style>


