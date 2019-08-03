<template>
  <div id="main">
    <GuildNav :guilds="this.guilds" />
    <div class="contents-wrapper">
      <GuildHeader />
      <nuxt-child class="contents" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GuildNav from '../components/GuildNav';
import GuildHeader from '../components/GuildHeader';
import URL from '../constants/url';
import { SET_GUILDS } from '../constants/mutation';

export default {
  components: {
    GuildNav,
    GuildHeader
  },
  computed: {
    ...mapGetters({
      guilds: 'guilds',
      logged: 'logged',
      userId: 'userId'
    })
  },
  mounted() {
    if (!this.$store.getters.logged) {
      this.$login();
    } else {
      this.fetchGuilds();
    }
  },
  methods: {
    async fetchGuilds() {
      const userId = this.userId;
      const guilds = await this.$axios.$get(URL.GUILDS, {
        params: { id: userId }
      });

      this.$store.commit(SET_GUILDS, guilds);
    }
  }
}
</script>
<style>
#main {
  flex: 1 1 auto;
  background-color: #202225;
  min-height: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  display: flex;
  outline: 0;
  margin: 0; padding: 0; border: 0;
}
.contents-wrapper {
  background-color: #36393f;
  display: flex;
  position: relative;
  flex: 1;
  outline: 0;
  margin: 0; padding: 0; border: 0;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  vertical-align: baseline;
  flex-direction: column;
}
.contents {
  background-color: #36393f;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  min-height: 0;
  outline: 0; margin: 0;
  padding: 5px;
}
</style>

