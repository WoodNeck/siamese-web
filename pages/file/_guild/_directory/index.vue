<template>
  <FileContainer>
    <FileAddButton :isRoot="false" />
    <FileImage v-for="image in this.images" :key="image.id"
      :image="image"
      @change="updateDirectory" />
  </FileContainer>
</template>
<script>
import { mapGetters } from 'vuex';
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileImage from '~/components/FileImage';
import { RESET_DIRECTORY } from '~/constants/mutation';
import { UPDATE_DIRECTORY } from '~/constants/action';

export default {
  components: {
    FileContainer,
    FileAddButton,
    FileImage
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
    updateDirectory() {
      this.$store.dispatch(UPDATE_DIRECTORY);
    }
  }
}
</script>
