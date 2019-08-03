import Vue from 'vue'

Vue.mixin({
  computed: {
    guildId() {
      return this.$route.params.guild;
    }
  }
})
