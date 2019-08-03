<template>
  <nuxt-child :key="directoryId" />
</template>
<script>
export default {
  computed: {
    directoryId() {
      return this.$route.params.directory;
    }
  },
}
</script>
