<template>
  <div class="button-wrapper" @click="openAddDialogue">
    <svg width="48" height="48" viewBox="0 0 48 48">
      <path fill="currentColor" d="M42 22.001H26V6.00196H22V22.002H6V26.002H22V42.002H26V26.002H42V22.002Z"></path>
    </svg>
  </div>
</template>
<script>
export default {
  methods: {
    openAddDialogue() {
      this.$swal({
        title: '어떤걸 추가하실건가요?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '디렉토리',
        cancelButtonText: '파일',
        confirmButtonColor: '#7289da',
        cancelButtonColor: '#369368',
      }).then(result => {
        const isDirectory = Boolean(result.value);
        const isFile = Boolean(result.dismiss) && result.dismiss === 'cancel';
        console.log(isDirectory, isFile);
      });
    }
  }
}
</script>
<style scoped>
  .button-wrapper {
    width: 96px;
    height: 96px;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #43b581;
    background-color: #292b2f;
    border-radius: 64px;
    margin: 12px;
    padding: 0; outline: 0; border: 0;
    -webkit-transition: color .15s ease-out, background-color .15s ease-out, border-radius .15s ease-out;
    transition: color .15s ease-out, background-color .15s ease-out, border-radius .15s ease-out;
  }
  .button-wrapper:hover {
    color: white;
    background-color: #43b581;
    border-radius: 24px;
  }
</style>
