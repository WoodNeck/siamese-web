<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <nuxt-link to="/" class="navbar-item">
              <img src="../static/Siamese.png" alt="Logo">
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="hero-body container">
      <nuxt-child />
    </div>

    <div class="hero-foot"></div>
  </section>
</template>

<script>
import axios from 'axios';

import URL from '../constants/url';
import { SET_GUILDS } from '../constants/mutation';

export default {
  authenticated: true,
  computed: {
    loggedIn() {
      return this.$store.state.discord && this.$store.state.discord.accessToken;
    },
  },
  mounted() {
    if (this.$store.state.discord.accessToken && !this.$store.state.discord.user) {
      // Couldn't get user information
      this.$logout('/');
    }
  },
  async fetch({ store, error }) {
    const userId = store.state.discord.user.id;

    const guilds = await axios.get(URL.USER_GUILDS, {
      params: { user: userId }
    }).then(res => res.data)
      .catch(() => undefined);

    store.commit(SET_GUILDS, guilds);
  }
}
</script>

<style>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>

