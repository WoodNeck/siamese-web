<template>
  <div class="header" v-if="this.directory && this.directory.name">
    <nuxt-link :to="`/file/${guildId}`">
      <div class="header-icon-wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" class="header-icon">
          <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
        </svg>
      </div>
    </nuxt-link>
    <h3 class="header-title">
      <nuxt-link :to="`/file/${guildId}`" class="header-link">
        <span class="header-title-guild">
          {{ this.header }}
        </span>
      </nuxt-link>
      <svg class="header-divider" version="1.1" width="14px" height="14px" viewBox="0 0 451.846 451.847">
        <path fill="currentColor" d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
          L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
          c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/>
      </svg>
      <span class="header-title-directory">
        {{ this.directory.name }}
      </span>
    </h3>
  </div>
  <div class="header" v-else>
    <div class="header-icon-wrapper">
      <svg width="24" height="24" viewBox="0 0 24 24" class="header-icon">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
      </svg>
    </div>
    <h3 class="header-title">
      <span class="header-title-single">{{ this.header }}</span>
    </h3>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      guilds: 'guilds',
      directory: 'directory'
    }),
    guildId() {
      return this.$route.params.guild;
    },
    guild() {
      return this.guilds.find(guild => guild.id === this.guildId);
    },
    header() {
      return this.guild
        ? this.guild.name
        : "HOME"
    }
  }
}
</script>
<style scoped>
.header {
  background: #36393f;
  -webkit-box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 1.5px 0 rgba(0,0,0,.05), 0 2px 0 rgba(0,0,0,.05);
  box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 1.5px 0 rgba(0,0,0,.05), 0 2px 0 rgba(0,0,0,.05);
  color: #b9bbbe;
  position: relative;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  z-index: 100;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 0;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  font-size: 16px;
  line-height: 20px;
  cursor: default;
  padding: 0; border: 0;
  margin: 0;
  margin-bottom: 4px;
}
.header-icon-wrapper {
  color: #72767d;
  position: relative;
  height: 24px;
  width: auto;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0 4px 0 8px;
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.header-link {
  text-decoration: none;
}
.header-divider {
  margin: 0 6px 0 0;
}
.header-title-guild {
  color: #b9bbbe;
  padding: 6px;
  border-radius: 12px;
  transition: background 0.15s ease-out;
}
.header-title-guild:hover {
  background: #222;
}
.header-title-single {
  padding: 6px;
}
</style>

