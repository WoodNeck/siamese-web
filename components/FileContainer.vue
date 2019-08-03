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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
</style>

