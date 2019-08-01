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
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
  .file-item {
    width: 96px;
    height: 96px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 8px;
    padding: 0; outline: 0; border: 0;
  }
  @media screen and (min-width: 372px) {
    .file-item {
      margin: 12px;
    }
  }
  @media screen and (min-width: 372px) and (max-width: 408px) {
    .file-item {
      margin: 2px;
    }
  }
  @media screen and (min-width: 408px) and (max-width: 540px) {
    .file-item {
      margin: 8px;
    }
  }
</style>

