<template>
  <div class="file-container">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .file-container {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
</style>

