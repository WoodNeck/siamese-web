<template>
  <div class="message-container">
    <div class="message-wrapper">
      <div class="message-header">
        <div class="message-avatar-container">
          <div class="message-avatar-wrapper">
            <svg width="49" height="40" viewBox="0 0 49 40" class="message-avatar-svg">
              <foreignObject x="0" y="0" width="40" height="40">
                <img :src="avatar" class="message-avatar" />
              </foreignObject>
            </svg>
          </div>
        </div>
        <h2 class="message-name-wrapper">
          <span class="message-name">{{ name }}</span>
        </h2>
      </div>
      <div class="message-content">
        <div class="message-text">
          <slot></slot>
        </div>
        <div class="message-embed" v-if="embed">
          <img class="message-embed-image" :src="embed" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['avatar', 'name', 'message', 'embed']
}
</script>
<style>
  .message-container {
    padding: 20px 0;
    overflow: hidden;
    box-sizing: border-box;
    word-wrap: break-word;
    user-select: text;
  }
  .message-wrapper {
    margin-bottom: .2em;
  }
  .message-header {
    display: flex;
    align-items: flex-start;
    align-content: normal;
    height: 1.3em;
  }
  .message-avatar-container {
    margin: -2px 20px 20px;
    opacity: 1;
  }
  .message-avatar-wrapper {
    width: 40px; height: 40px;
    position: relative;
    border-radius: 50%;
  }
  .message-avatar-svg {
    contain: layout paint style;
    pointer-events: none;
    position: relative;
    display: block;
    height: 100%;
    width: auto;
  }
  .message-avatar {
    text-indent: -9999px;
    display: block;
    width: 100%; height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .message-name-wrapper {
    color: hsla(0, 0%, 100%, .2);
    white-space: nowrap;
    margin: 0; padding: 0; border: 0;
    vertical-align: baseline;
    display: inherit;
  }
  .message-name {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
  }
  .message-content {
    margin-left: 80px;
    padding-right: 10px;
  }
  .message-text {
    color: #dcddde;
    font-size: 0.9375rem;
    line-height: 1.3;
    white-space: pre-wrap;
    word-wrap: break-word;
    user-select: text;
  }
  .message-text h3 {
    display: inline;
  }
  .message-text a {
    color: #0096cf;
    text-decoration: none;
  }
  .message-text a:hover {
    text-decoration: underline;
  }
  .message-embed {
    margin-top: 8px;
    margin-bottom: 8px;
    padding-right: 4px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .message-embed-image {
    max-width: 100%;
  }
</style>
