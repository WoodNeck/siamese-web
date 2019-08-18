<template>
  <FileItem>
    <template v-slot:file-image>
      <div class="file-image-wrapper" :class="{selected, dragged}" @click="toggleSelected"
        :draggable="canDrag || selected" @dragstart="dragstart" @dragend="dragend">
        <img class="file-image" :src="thumbnail" />
      </div>
    </template>
    <template v-slot:file-caption>
      <span class="file-image-caption" @click="showNameChangeDialogue">
        {{ image.name }}
      </span>
    </template>
  </FileItem>
</template>
<script>
import qs from 'qs';
import Josa from 'josa-js';
import { mapGetters } from 'vuex';
import FileItem from './FileItem';
import URL from '~/constants/url';
import HEADER from '~/constants/header';

export default {
  props: ['image', 'canDrag'],
  components: {
    FileItem
  },
  data() {
    return {
      selected: false,
      dragged: false,
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId',
    }),
    thumbnail() {
      if (!this.image) return '';

      const splitted = this.image.url.split('.');
      const extension = splitted.splice(splitted.length - 1, 1);
      return `${splitted.join('.')}s${extension ? '.' + extension : ''}`;
    }
  },
  methods: {
    toggleSelected(e) {
      this.selected = !this.selected;
      if (this.selected) {
        this.$emit('selected', this);
      } else {
        this.$emit('deselected', this);
      }
    },
    toggleDragged() {
      this.dragged = !this.dragged;
    },
    resetState() {
      this.selected = false;
      this.dragged = false;
    },
    dragstart(e) {
      this.$emit('drag-start', e, this.image);
    },
    dragend(e) {
      this.$emit('drag-end');
    },
    showNameChangeDialogue() {
      this.$swal.fire({
        imageUrl: this.image.url,
        imageAlt: this.image.name,
        input: 'text',
        inputValue: this.image.name,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '파일명 변경',
        cancelButtonColor: '#d33',
        cancelButtonText: '삭제하기',
        inputValidator: (value) => {
          if (!value) {
            return '파일명을 입력해주세요!';
          }

          const name = value.trim();
          if (name === this.image.name) {
            return '파일명이 동일합니다!';
          } else if (name.length > 8) {
            return '파일명은 8자를 넘을 수 없습니다!';
          } else if (/\s/.exec(name) != null) {
            return '파일명에는 공백이 들어갈 수 없습니다!';
          }
        },
      }).then(({ value: fileName, dismiss }) => {
        if (fileName) {
          fileName = fileName.trim();
          this.changeName(fileName);
        } else if (dismiss === 'cancel') {
          this.delete();
        }
      });
      this.$axios.$get(URL.USER, {
        params: { id: this.image.author }
      }).then(author => {
        this.$swal.update({
          text: `업로드한 사람: ${author.tag}`,
        });
      });
    },
    changeName(fileName) {
      this.$axios.$patch(URL.IMAGE, {
        guild: this.guildId,
        user: this.userId,
        image: this.image._id,
        name: fileName
      }).then(() => {
        this.$swal.fire({
          title: `${fileName}(으)로 이름을 변경했습니다.`,
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
        })
      })
    },
    delete() {
      const img = this.image;

      this.$swal.fire({
        title: `${Josa.r(img.name, '을/를')} 삭제하시겠습니까?`,
        imageUrl: img.url,
        imageAlt: img.name,
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
        confirmButtonColor: '#218838',
        cancelButtonColor: '#d33',
      }).then(({ value }) => {
        const shouldRemove = Boolean(value);
        if (!shouldRemove) return;

        const data = qs.stringify({
          image: this.image._id,
          guild: this.guildId,
          user: this.userId
        });

        this.$axios.$delete(URL.IMAGE, {
          data,
          headers: HEADER.DELETE,
        }).then(() => {
          this.$swal.fire({
            title: `${Josa.r(this.image.name, '을/를')} 삭제했습니다.`,
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
          })
        });
      });
    }
  }
}
</script>
<style scoped>
  .file-image-wrapper {
    box-sizing: content-box;
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-image {
    box-sizing: content-box;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .file-image-wrapper.dragged {
    opacity: 0.5;
  }
  .file-image-wrapper.selected .file-image {
    border: 0.2rem solid #43b581;
  }
  .file-image-caption {
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    transition: background 0.15s ease-out;
  }
  .file-image-caption:hover {
    background: #222;
  }
</style>


