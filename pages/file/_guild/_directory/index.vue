<template>
<div>
  <div class="menu"
    @click="toggleModal">
    <span class="is-size-5 button is-primary is-inverted">+</span>
  </div>

  <div v-for="(image, idx) in directory.images" :key="idx">
    {{ image.url }}
  </div>

  <div ref="modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">이미지 업로드</p>
        <button class="delete" @click="toggleModal" aria-label="close"></button>
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
export default {
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
    toggleModal: function() {
      this.$refs.modal.classList.toggle('is-active');
    },
    onUpload: async function(files) {
      console.log("UPLOAD", files);

      const uploadFile = await this.$axios.$post('/api/uploadImage', {
        directory: this.$route.params.directory,
        guildId: this.$route.params.guild,
        files,
      });
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

