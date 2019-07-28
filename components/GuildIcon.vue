<template>
  <li class="guild-item-wrapper"
    :class="selected ? 'selected' : ''"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave">
    <div class="guild-select-wrapper">
      <span class="guild-select-indicator"></span>
    </div>
    <div class="guild-container">
      <nuxt-link :to="to">
        <slot></slot>
      </nuxt-link>
    </div>
  </li>
</template>
<script>
export default {
  props: ['to', 'guild'],
  data: () => {
    return {
      hover: false,
    }
  },
  computed: {
    selected() {
      return (this.guild && this.guild.id === this.$route.params.guild) || this.hover;
    }
  },
  methods: {
    mouseenter() {
      this.hover = true;
    },
    mouseleave() {
      this.hover = false;
    }
  }
}
</script>
<style scoped>
  .guild-select-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 8px;
    height: 48px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .guild-select-indicator {
    opacity: 1;
    height: 48px;
    transform: translate3d(0px, 0px, 0px);
    position: absolute;
    width: 4px;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
    margin-left: -4px;
    outline: 0;
    margin: 0; padding: 0; border: 0;
  }
  .guild-container {
    width: 48px; height: 48px;
    margin: 0 12px 0 12px;
  }
</style>

