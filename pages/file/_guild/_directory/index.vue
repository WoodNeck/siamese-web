<template>
  <FileContainer>
    <FileAddButton :isRoot="false" />
    <FileImage v-for="image in this.images" :key="image.id"
      :image="image"
      @change="fetchDirectory" />
  </FileContainer>
</template>
<script>
import { mapGetters } from 'vuex';
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileImage from '~/components/FileImage';
import URL from '~/constants/url';
import { SET_DIRECTORY } from '~/constants/mutation';

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
    directoryId() {
      return this.$route.params.directory;
    },
    images() {
      return this.directory.images || [];
    }
  },
  mounted() {
    this.fetchDirectory();
  },
  beforeDestroy() {
    this.$store.commit(SET_DIRECTORY, {});
  },
  methods: {
    async fetchDirectory() {
      const directoryId = this.directoryId
      const directory = await this.$axios.$get(URL.DIRECTORY, {
        params: { id: directoryId }
      });

      this.$store.commit(SET_DIRECTORY, directory);
    }
  }
}
</script>
