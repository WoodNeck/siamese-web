<template>
  <FileContainer>
    <FileAddButton :isRoot="true" />
    <FileDirectory v-for="directory in directories"
      :key="directory.id"
      :directory="directory" />
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
    console.log('마운트');
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

