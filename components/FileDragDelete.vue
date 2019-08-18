<template>
  <div v-if="dragging" class="drag-delete-container">
    <div class="drag-delete-wrapper" :class="{hover}"
      @dragover.prevent @drop="handleDrop"
      @dragenter.prevent="toggleDrag" @dragleave="toggleDrag">
      <fa-layers full-width class="fa-4x">
        <fa :icon="['fas', 'trash-alt']" transform="shrink-2" />
      </fa-layers>
    </div>
  </div>
</template>
<script>
import qs from 'qs';
import Josa from 'josa-js';
import { mapGetters } from 'vuex';
import HEADER from '~/constants/header';
import URL from '~/constants/url';

export default {
  props: ['dragging'],
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    })
  },
  methods: {
    toggleDrag() {
      this.hover = !this.hover;
    },
    async handleDrop(e) {
      this.hover = false;

      const images = JSON.parse(e.dataTransfer.getData("images"));
      if (!images.length) return;

      const question = images.length > 1
        ? `<strong>${images.length}</strong>개의 이미지를 삭제하시겠습니까?`
        : `<strong>${images[0].name}</strong>${Josa.c(images[0].name, '을/를')} 삭제하시겠습니까?`
      const {value: isSuccess} = await this.$swal.fire({
        html: question,
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
      });

      if (!isSuccess) return;
      this.deleteImages(images);
    },
    deleteImages(images) {
      const data = qs.stringify({
        guild: this.guildId,
        user: this.userId,
        images: JSON.stringify(images.map(image => image._id))
      });

      this.$axios.$delete(URL.IMAGES, {
        data,
        headers: HEADER.DELETE,
      }).then(() => {
        this.$swal.fire({
          title: `${images.length}개의 이미지를 삭제했습니다.`,
          type: 'success',
          position: 'bottom',
          timer: 5000,
          toast: true
        });
        this.$emit('change');
      }).catch(e => {
        this.$swal.fire({
          title: e.response.data,
          showCloseButton: true,
          type: 'error',
        });
      })
    }
  }
}
</script>
<style scoped>
  .drag-delete-container {
    position: absolute;
    width: 100%;
    height: 96px;
    bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .drag-delete-wrapper {
    width: 288px;
    max-width: 80%;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 64px;
    background-color: #292b2f;
    transition: background-color 0.15s ease-out, border-radius .15s ease-out;
  }
  .drag-delete-wrapper.hover {
    border-radius: 24px;
    background-color: #d33;
  }
  .drag-delete-wrapper svg {
    color: #d33;
    transition: color 0.15s ease-out;
  }
  .drag-delete-wrapper.hover svg {
    color: #fff;
  }
</style>
