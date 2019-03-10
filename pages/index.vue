<template>
<section class="hero is-primary is-fullheight">
  <div class="hero-head"></div>
  <div class="container hero-body">
    <div class="columns has-text-centered">
      <img class="app-logo column" src="../static/Siamese.png" />
      <div class="title column columns is-vcentered">
        <div class="column is-fullwidth">
          <div class="title is-fullwidth">샴고양이</div>
          <div class="links is-fullwidth has-text-centered">
            <nuxt-link v-if="loggedIn"
              class="button is-primary is-large is-fullwidth is-inverted"
              to="/file">파일관리</nuxt-link>
            <a v-if="!loggedIn"
              target="_blank"
              class="button is-primary is-large is-fullwidth is-inverted"
              @click="login">디스코드를 통해 로그인하기</a>
            <a v-else
              target="_blank"
              class="button is-primary is-large is-fullwidth is-inverted"
              @click="logout">로그아웃</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-foot"></div>
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
    if (this.$store.state.discord && this.$store.state.discord.accessToken && !this.$store.state.discord.user) {
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

<style lang="scss" scoped>
.app-logo {
  width: 40%;
  height: 40%;
  display: inline-block;
}

.title {
  margin-bottom: 1.5rem;
}

.button {
  width: 80%;
  margin-bottom: 1.5rem;
  display: inline-block;
}
</style>

