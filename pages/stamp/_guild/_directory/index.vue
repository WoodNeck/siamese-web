<template>
  <FileContainer>
    <FileAddButton :isRoot="false"
      :dragging="dragging"
      @change="updateDirectory" />
    <FileImage v-for="(image, idx) in images"
      :key="image.id"
      :image="image"
      :ref="`image-${idx}`"
      :canDrag="selectedImages.length <= 0"
      @change="updateDirectory"
      @selected="(image) => {
        selectedImages.push(image);
      }"
      @deselected="(image) => {
        const index = selectedImages.findIndex(im => im === image);
        selectedImages.splice(index, 1);
      }"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd" />
    <FileDragDelete :dragging="dragging" @change="updateDirectory" />
  </FileContainer>
</template>
<script>
import { mapGetters } from 'vuex';
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileImage from '~/components/FileImage';
import FileDragDelete from '~/components/FileDragDelete';
import { RESET_DIRECTORY } from '~/constants/mutation';
import { UPDATE_DIRECTORY } from '~/constants/action';

export default {
  components: {
    FileContainer,
    FileAddButton,
    FileImage,
    FileDragDelete
  },
  data() {
    return {
      selectedImages: [],
      dragging: false,
    }
  },
  computed: {
    ...mapGetters({
      directory: 'directory',
    }),
    images() {
      return (this.directory && this.directory.images) || [];
    }
  },
  beforeDestroy() {
    this.$store.commit(RESET_DIRECTORY);
  },
  methods: {
    handleDragStart(e, clickedImage) {
      this.selectedImages
        .forEach(image => image.toggleDragged());
      this.dragging = true;

      const selectedImages = this.selectedImages.map(component => component.image);
      const images = selectedImages.length
        ? selectedImages
        : [clickedImage];
      e.dataTransfer.setData("images", JSON.stringify(images));
    },
    handleDragEnd() {
      this.dragging = false;
      this.selectedImages
        .forEach(image => image.toggleDragged());
    },
    addSelected(image) {
      this.selectedImages.push(image);
    },
    removeSelected(image) {
      const index = this.selectedImages.findIndex(item => item === image);
      this.selectedImages.splice(index, 1);
    },
    updateDirectory() {
      this.selectedImages.forEach(image => {
        image.resetState();
      });
      this.selectedImages = [];
      this.$store.dispatch(UPDATE_DIRECTORY);
    }
  }
}
</script>
