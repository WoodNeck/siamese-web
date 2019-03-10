<template>
<div class="wrapper">
  <div v-if="permittedGuilds.length > 0">
    <div class="guild-wrapper" v-for="guild in permittedGuilds" :key="guild.id">
      <nuxt-link :to="`/file/${guild.id}`" class="box">
        <div class="media has-text-black">
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
  <div class="user-404" v-else>
    <p class="is-size-1">샴고양이를 먼저 초대하라냥!</p>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    permittedGuilds() {
      return this.$store.state.guilds && this.$store.state.guilds.filter(guild => guild.hasPermission);
    }
  },
}
</script>

<style scroped>
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

