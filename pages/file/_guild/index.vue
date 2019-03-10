<template>
<div>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <span
          @click="toggleModal"
          class="is-size-5 button is-primary is-inverted">+</span>
      </div>
    </div>
  </div>
  <div v-if="directories.length > 0">
    <div v-for="directory in directories" :key="directory.name">
      <nuxt-link :to="`/file/${guild.id}/${directory.name}`" class="box">
        <div class="media has-text-black">
          <figure class="media-left is-size-3-desktop">
            <p>📁</p>
          </figure>
          <div class="media-content">
            <div class="content is-size-3-desktop">
              <p>{{ directory.name }}</p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div class="guild-404" v-else>
    <p class="is-size-1">아직 폴더가 하나도 없다냥!</p>
  </div>

  <div ref="dirModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">새 폴더</p>
        <button class="delete" @click="toggleModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <input ref="dirInput" class="input" type="text" placeholder="폴더명">
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="mkdir">저장</button>
        <button class="button" @click="toggleModal">취소</button>
      </footer>
    </div>
  </div>
</div>
</template>
<script>
export default {
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
    toggleModal: function() {
      this.$refs.dirModal.classList.toggle('is-active');
      this.$refs.dirInput.classList.remove('is-danger');
      this.$refs.dirInput.value = '';
    },
    mkdir: async function() {
      const dirInput = this.$refs.dirInput;
      const dirName = dirInput.value;
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

      await this.$axios.$get('/api/mkdir', {
        params: {
          dirName,
          guildId: this.guild.id,
        },
      }).then(() => {
        this.$toast.open({
          duration: 2000,
          message: `${dirName} 폴더를 생성했다냥!`,
          position: 'is-bottom',
          type: 'is-success',
        });
        this.$store.commit(MKDIR, this.guild, {
          guildId: this.guild.id,
          images: [],
          name: dirName,
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
      this.toggleModal();
    },
  }
}
</script>
<style>

</style>


