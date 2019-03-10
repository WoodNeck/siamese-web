<template>
<div class="wrapper">
  <div class="guild-wrapper" v-for="guild in permittedGuilds" :key="guild.id">
    <nuxt-link :to="`/file/guild/${guild.id}`" class="box">
      <div :to="`/file/guild/${guild.id}`" class="media has-text-black">
        <figure class="media-left">
          <p class="image is-64x64">
            <img class="is-rounded" :src="guild.iconURL" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content is-size-3-desktop">
            <p>{{ guild.name }}</p>
          </div>
        </div>
        <div class="media-right is-size-3-desktop">
          <p>📁 {{ guild.directories.length }}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

import URL from '../../constants/url';
import { SET_GUILDS } from '../../constants/mutation';

export default {
  computed: {
    permittedGuilds() {
      return this.$store.state.guilds && this.$store.state.guilds.filter(guild => guild.hasPermission);
    }
  },
  async fetch({ store }) {
    const userId = store.state.discord.user.id;

    const guilds = await axios.get(URL.USER_GUILDS, {
      params: { user: userId }
    }).then(res => res.data)
      .catch(() => undefined);

    store.commit(SET_GUILDS, guilds);
  }
}
</script>

<style scroped>
.wrapper {
  width: 100%;
}
.guild-wrapper {
  text-align: center;
}
.box {
  margin-bottom: 1.5rem;
}
.media {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

