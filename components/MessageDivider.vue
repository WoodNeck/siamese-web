<template>
  <div class="message-divider">
    <span class="message-divider-content">
      <slot></slot>
    </span>
  </div>
</template>
<style scoped>
  .message-divider {
    margin: 0 20px;
  }
  .message-divider-content {
    color: rgba(153, 170, 181, .5);
    display: flex;
    align-items: center;
    line-height: 19px;
    font-weight: 500;
    font-size: 14px;
  }
  .message-divider-content::before,
  .message-divider-content::after {
    border-color: #474a4f;
    content: '';
    border-bottom: 1px solid;
    height: 1px;
    flex: 1 1 auto;
  }
  .message-divider-content::before {
    right: 100%;
    margin-right: 8px;
  }
  .message-divider-content::after {
    left: 100%;
    margin-left: 8px;
  }
</style>
