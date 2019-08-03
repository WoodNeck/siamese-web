<template>
  <div @click="fullScreen">
  <FileItem>
    <template v-slot:file-image>
      <div class="file-image-wrapper">
        <img class="file-image" :src="image.url" />
      </div>
    </template>
    <template v-slot:file-caption>
      <span class="file-image-caption">{{ image.name }}</span>
    </template>
  </FileItem>
  </div>
</template>
<script>
import FileItem from './FileItem';
import URL from '~/constants/url';

export default {
  props: ['image'],
  components: {
    FileItem
  },
  methods: {
    fullScreen() {
      this.$swal.fire({
        imageUrl: this.image.url,
        imageAlt: this.image.name,
        title: this.image.name
      });
      this.$axios.$get(URL.USER, {
        params: { id: this.image.author }
      }).then(author => {
        this.$swal.update({
          text: `업로드한 사람: ${author.tag}`,
        });
      });
    }
  }
}
</script>
<style scoped>
  .file-image-wrapper {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    border: 0.2rem solid white;
    border-radius: 0.1rem;
  }
  .file-image {
    width: 100%; height: 100%;
    box-sizing: border-box;
    pointer-events: none;
  }
</style>


