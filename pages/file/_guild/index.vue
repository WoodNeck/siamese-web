<template>
  <FileContainer>
    <FileAddButton :isRoot="true" @change="updateGuild" />
    <FileDirectory v-for="directory in directories"
      :key="directory.id"
      :directory="directory"
      :to="`/file/${guildId}/${directory._id}`"
      @change="updateGuild" />
    <FileImage v-for="image in images"
      :key="image.id"
      :image="image"
      @change="updateGuild" />
  </FileContainer>
</template>
<script>
import { mapGetters } from 'vuex';
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileDirectory from '~/components/FileDirectory';
import FileImage from '~/components/FileImage';
import URL from '~/constants/url';
import { RESET_DIRECTORIES, RESET_IMAGES } from '~/constants/mutation';
import { UPDATE_GUILD } from '~/constants/action';

export default {
  computed: {
    ...mapGetters({
      directories: 'directories',
      images: 'images',
    })
  },
  components: {
    FileContainer,
    FileAddButton,
    FileDirectory,
    FileImage
  },
  beforeDestroy() {
    this.$store.commit(RESET_DIRECTORIES);
    this.$store.commit(RESET_IMAGES);
  },
  methods: {
    updateGuild() {
      this.$store.dispatch(UPDATE_GUILD);
    }
  }
}
</script>

<style scoped>

</style>

