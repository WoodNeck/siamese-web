<template>
  <FileItem>
    <template v-slot:file-image>
      <nuxt-link :to="to" class="directory-wrapper">
        <svg width="80%" height="80%" x="0px" y="0px"
          viewBox="0 0 481.2 481.2" style="enable-background:new 0 0 481.2 481.2;" xml:space="preserve">
          <path fill="currentColor" d="M403.9,97.85h-114c-27.7,0-50.3-22.5-50.3-50.3c0-7.5-6-13.5-13.5-13.5H77.3c-42.6,0-77.3,34.7-77.3,77.3v258.5
            c0,42.6,34.7,77.3,77.3,77.3h326.6c42.6,0,77.3-34.7,77.3-77.3v-194.8C481.2,132.45,446.5,97.85,403.9,97.85z M454.2,369.75
            c0,27.7-22.5,50.3-50.3,50.3H77.3c-27.7,0-50.3-22.5-50.3-50.3v-258.4c0-27.7,22.5-50.3,50.3-50.3h136.5
            c6.4,36.2,38.1,63.8,76.1,63.8h114c27.7,0,50.3,22.5,50.3,50.3L454.2,369.75L454.2,369.75z"/>
        </svg>
      </nuxt-link>
    </template>
    <template v-slot:file-caption>
      <nuxt-link class="directory-title-wrapper" :to="to">
        <span class="directory-title">{{ directory.name }}</span>
      </nuxt-link>
    </template>
  </FileItem>
</template>
<script>
import FileItem from './FileItem';

export default {
  props: ['directory', 'to'],
  components: {
    FileItem
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');
  .directory-wrapper {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    flex-direction: column;
    margin: 0; padding: 0; outline: 0; border: 0;
    background: transparent;
    color: #43b581;
    text-decoration: none;
    transition: color .15s ease-out, background-color .15s ease-out;
  }
  .directory-wrapper:hover {
    background: #43b581;
    color: white;
  }
  .directory-title-wrapper {
    width: 100%;
    text-decoration: none;
    color: whitesmoke;
  }
</style>
