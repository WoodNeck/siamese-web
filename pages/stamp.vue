<template>
  <div id="main">
    <GuildNav :guilds="this.guilds" />
    <div class="contents-wrapper">
      <GuildHeader />
      <nuxt-child class="contents" />
    </div>
    <FileDragAdd v-if="this.currentGuild && this.currentGuild.hasPermission" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GuildNav from '../components/GuildNav';
import GuildHeader from '../components/GuildHeader';
import FileDragAdd from '../components/FileDragAdd';
import * as MUTATION from '../constants/mutation';
import * as ACTION from '../constants/action';

export default {
  authenticated: true,
  components: {
    GuildNav,
    GuildHeader,
    FileDragAdd
  },
  computed: {
    ...mapGetters({
      guilds: 'guilds',
      logged: 'logged',
      userId: 'userId'
    }),
    currentGuild() {
      return this.guilds.find(guild => guild.id === this.guildId);
    }
  },
  async mounted() {
    await this.fetchGuilds();
    this.doUpdate();
  },
  watch:{
    $route (to, from){
      this.doUpdate();
    }
  },
  methods: {
    async fetchGuilds() {
      await this.$store.dispatch(ACTION.FETCH_GUILD);
    },
    doUpdate() {
      const guildId = this.guildId;
      const dirId = this.directoryId;

      if (guildId && !dirId) {
        this.$store.dispatch(ACTION.UPDATE_GUILD);
      } else if (guildId && dirId) {
        this.$store.dispatch(ACTION.UPDATE_DIRECTORY);
      }
    },
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
  overflow-y: auto;
}
.contents::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
.contents::-webkit-scrollbar-thumb, .contents::-webkit-scrollbar-track {
  background-clip: padding-box;
  border-width: 3px;
  border-style: solid;
  border-radius: 7px;
}
.contents::-webkit-scrollbar-track {
  border-width: initial;
  background-color: #2f3136;
  border-color: transparent;
}
.contents::-webkit-scrollbar-thumb {
  border-color: #36393f;
  background-color: #202225;
}
.contents::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>

