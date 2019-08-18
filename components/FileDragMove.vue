<template>
  <div @dragover.prevent @drop="handleDrop" @dragenter.prevent="toggleDrag" @dragleave="toggleDrag">
    <slot></slot>
  </div>
</template>
<script>
import qs from 'qs';
import Josa from 'josa-js';
import { mapGetters } from 'vuex';
import HEADER from '~/constants/header';
import URL from '~/constants/url';

export default {
  props: ['directory', 'active'],
  data() {
    return {
      dragHover: false,
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    })
  },
  methods: {
    toggleDrag() {
      if (!this.$props.active) return;

      this.dragHover = !this.dragHover;
      this.$emit('drag-change', this.dragHover);
    },
    resetDrag() {
      if (!this.$props.active) return;

      this.dragHover = false;
      this.$emit('drag-change', this.dragHover);
    },
    async handleDrop(e) {
      if (!this.$props.active) return;

      this.resetDrag();
      const images = JSON.parse(e.dataTransfer.getData("images"));
      if (!images.length) return;
      const directory = this.$props.directory;

      const question = images.length > 1
        ? `<strong>${images.length}</strong>개의 이미지를 <strong>${directory.name}</strong> 폴더로 이동하시겠습니까?`
        : `<strong>${images[0].name}</strong>${Josa.c(images[0].name, '을/를')} <strong>${directory.name}</strong> 폴더로 이동하시겠습니까?`

      const {value: isSuccess} = await this.$swal.fire({
        html: question,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
      });

      if (!isSuccess) return;
      this.changeImageDir(images);
    },
    changeImageDir(images) {
      const directory = this.$props.directory;
      this.$axios.$patch(URL.IMAGES, {
        guild: this.guildId,
        user: this.userId,
        directory: directory._id,
        images: images.map(image => image._id)
      }).then(async res => {
        if (res.length) {
          const question = res.length > 1
            ? `대상 폴더에 이름이 같은 파일이 ${res.length}개 있습니다.`
            : `대상 폴더에 이름이 "${res[0].new.name}"인 파일이 이미 있습니다.`;

          const { value: isOverwrite } = await this.$swal.fire({
            title: question,
            text: '파일을 덮어쓰시겠습니까?',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오',
          });

          if (!isOverwrite) {
            if (images.length - res.length > 0) {
              this.$swal.fire({
                title: `${images.length - res.length}개의 이미지를 이동했습니다.`,
                type: 'success',
                position: 'bottom',
                timer: 5000,
                toast: true
              })
            }
            return;
          }

          const deleteOperations = res.map(image => {
            const data = qs.stringify({
              image: image.prev._id,
              guild: this.guildId,
              user: this.userId
            });

            return this.$axios.$delete(URL.IMAGE, {
              data,
              headers: HEADER.DELETE,
            });
          });
          await Promise.all(deleteOperations)
            .catch(e => {

              this.$swal.fire({
                title: e.response.data,
                showCloseButton: true,
                type: 'error',
              });
            }).then(() => {
              this.changeImageDir(res.map(image => image.new));
            });
        } else {
          this.showImageDirChangeSuccess(images);
        }
      }).catch(e => {
        this.$swal.fire({
          title: e.response.data,
          showCloseButton: true,
          type: 'error',
        });
      });
    },
    showImageDirChangeSuccess(images) {
      this.$emit('change');
      const successMsg = images.length > 1
        ? `${images.length}개의 이미지를 이동했습니다.`
        : `${Josa.r(images[0].name, '을/를')} 이동했습니다.`;

      this.$swal.fire({
        title: successMsg,
        type: 'success',
        position: 'bottom',
        timer: 5000,
        toast: true
      });
    },
  }
}
</script>
<style scoped>

</style>
