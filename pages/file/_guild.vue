<template>
  <div>
    <nuxt-child :key="this.guildId" />
  </div>
</template>
<script>
export default {
  computed: {
    guildId() {
      return this.$route.params.guild;
    }
  },
}
</script>

<style scoped>

</style>

