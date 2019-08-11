<template>
  <div class="file-item">
    <div class="file-image-container">
      <div class="file-container">
        <slot name="file-image"></slot>
      </div>
    </div>
    <div class="file-caption-container">
      <div class="file-caption">
        <slot name="file-caption"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped>
  .file-item {
    width: 96px;
    height: auto;
    padding: 0;
    padding-top: 96px;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    outline: 0; border: 0;
    font-size: 1.35rem;
  }
  @media screen and (min-width: 320px) and (max-width: 380px) {
    .file-item {
      width: 31%;
      margin: 1%;
      height: auto;
      padding-top: 31%;
      font-size: 1.05rem;
    }
  }
  @media screen and (min-width: 380px) and (max-width: 540px) {
    .file-item {
      width: 23%;
      margin: 1%;
      height: auto;
      padding-top: 23%;
      font-size: 1.1rem;
    }
  }
  .file-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }
  .file-image-container {
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    margin: 0; padding: 0; outline: 0; border: 0;
  }
  .file-caption-container {
    position: relative;
    width: 100%;
    padding-top: 5px;
  }
  .file-caption {
    width: 100%;
    height: 25%;
    display: flex;
    margin: 0; padding: 0; outline: 0; border: 0;
    text-align: center;
    justify-content: center;
    line-height: 1.2;
    color: whitesmoke;
    text-decoration: none;
  }
</style>


