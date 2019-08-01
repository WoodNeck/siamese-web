<template>
  <FileContainer>
    <FileAddButton :isRoot="true" @change="fetchDirectories" />
    <FileDirectory v-for="directory in directories"
      :key="directory.id"
      :directory="directory"
      :to="`/file/${guildId}/${directory._id}`" />
  </FileContainer>
</template>
<script>
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';
import FileDirectory from '~/components/FileDirectory';
import URL from '~/constants/url';

export default {
  data() {
    return {
      directories: [],
    }
  },
  components: {
    FileContainer,
    FileAddButton,
    FileDirectory
  },
  mounted() {
    this.fetchDirectories();
  },
  computed: {
    guildId() {
      return this.$route.params.guild;
    }
  },
  methods: {
    async fetchDirectories() {
      this.directories = await this.$axios.$get(URL.DIRECTORY, {
        params: { id: this.guildId }
      });
    }
  }
}
</script>

<style scoped>

</style>

