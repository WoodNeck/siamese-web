<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">페이지를 찾을 수 없습니다.</h1>
    <h1 v-else>에러가 발생했습니다.</h1>
    <div class="error-desc">
      {{ error }}
    </div>
    <nuxt-link class="go-back-home" to="/">홈으로 돌아가기</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
  }
  .go-back-home {
    color: white;
  }
</style>

