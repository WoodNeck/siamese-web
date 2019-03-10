<template>
  <section class="container">
    <div>
      <img class="app-logo" src="../static/Siamese.png" />
      <h1 class="title">
        샴고양이
      </h1>
      <div class="links">
        <a v-if="!loggedIn"
          target="_blank"
          class="button--green"
          @click="login">Login with Discord</a>
        <a v-else
          target="_blank"
          class="button--green"
          @click="logout">Logout</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.discord && this.$store.state.discord.accessToken;
    },
  },
  mounted() {
    if (this.$store.state.discord.accessToken && !this.$store.state.discord.user) {
      // Couldn't get user information
      this.$logout();
    }
  },
  methods: {
    login() {
      this.$login();
    },
    logout() {
      this.$logout();
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.app-logo {
  width: 40%;
  height: 40%;
}
</style>

