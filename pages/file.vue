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
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  outline: 0;
  margin: 0; padding: 0; border: 0;
}
.contents-wrapper {
  background-color: #36393f;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  outline: 0;
  margin: 0; padding: 0; border: 0;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  vertical-align: baseline;
  flex-direction: column;
}
.contents {
  background-color: #36393f;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  min-height: 0;
  outline: 0; margin: 0; padding: 0;
}
</style>

