<template>
  <FileContainer>
    <FileAddButton v-if="this.guild && this.guild.hasPermission" :isRoot="true" @change="updateGuild" />
    <FileDirectory v-for="directory in directories"
      :key="directory.id"
      :directory="directory"
      :to="`/stamp/${guildId}/${directory._id}`"
      @change="updateGuild" />
    <FileImage v-for="(image, idx) in images"
      :key="image.id"
      :image="image"
      :ref="`image-${idx}`"
      :canDrag="selectedImages.length <= 0"
      @change="updateGuild"
      @selected="(image) => {
        selectedImages.push(image);
      }"
      @deselected="(image) => {
        const index = selectedImages.findIndex(im => im === image);
        selectedImages.splice(index, 1);
      }"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd" />
    <FileDragDelete :dragging="dragging" @change="updateGuild" />
  </FileContainer>
</template>
<script>
import { mapGetters } from 'vuex';
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileDirectory from '~/components/FileDirectory';
import FileDragDelete from '~/components/FileDragDelete';
import FileImage from '~/components/FileImage';
import { RESET_DIRECTORIES, RESET_IMAGES } from '~/constants/mutation';
import { UPDATE_GUILD } from '~/constants/action';

export default {
    components: {
    FileContainer,
    FileAddButton,
    FileDirectory,
    FileImage,
    FileDragDelete
  },
  data() {
    return {
      dragging: false,
      selectedImages: []
    }
  },
  computed: {
    ...mapGetters({
      directories: 'directories',
      user: 'user',
      images: 'images',
      guilds: 'guilds'
    }),
    guild() {
      return this.guilds.find(guild => guild.id === this.guildId);
    }
  },
  beforeDestroy() {
    this.$store.commit(RESET_DIRECTORIES);
    this.$store.commit(RESET_IMAGES);
  },
  methods: {
    handleDragStart(e, clickedImage) {
      this.dragging = true;
      this.selectedImages
        .forEach(image => image.toggleDragged());

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
    updateGuild() {
      this.selectedImages.forEach(image => {
        image.resetState();
      });
      this.selectedImages = [];
      this.$store.dispatch(UPDATE_GUILD);
    }
  }
}
</script>

<style scoped>

</style>

