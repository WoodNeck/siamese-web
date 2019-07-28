<template>
  <section class="container">
    <Slide>
      <h1 class="title">
        siamese-web
      </h1>
      <h2 class="subtitle">
        Website for Discord bot Siamese
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </Slide>
  </section>
</template>

<script>

export default {
  mounted() {
    if (!this.$store.getters.logged) {
      this.$login();
    }
  }
}
</script>

<style>

</style>

