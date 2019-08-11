<template>
  <FileItem>
    <template v-slot:file-image>
      <FileDragMove
        :directory="directory" :active="true"
        @drag-change="onDragChange" @change="handleChange">
        <nuxt-link
          draggable="false"
          :to="to" class="directory-wrapper" :class="{hover: dragHover}">
          <fa-layers full-width class="fa-4x">
            <fa :icon="dragHover ? ['fas', 'folder-open'] : ['fas', 'folder']" transform="shrink-3" />
          </fa-layers>
        </nuxt-link>
      </FileDragMove>
    </template>
    <template v-slot:file-caption>
      <span class="directory-title"
        @click="showNameChangeDialogue">
        {{ directory.name }}
      </span>
    </template>
  </FileItem>
</template>
<script>
import qs from 'qs';
import Josa from 'josa-js';
import { mapGetters } from 'vuex';
import FileItem from './FileItem';
import FileDragMove from './FileDragMove';
import HEADER from '~/constants/header';
import URL from '~/constants/url';

export default {
  props: ['directory', 'to'],
  components: {
    FileItem,
    FileDragMove
  },
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
    onDragChange(value) {
      this.dragHover = value;
    },
    handleChange() {
      this.$emit('change');
    },
    showNameChangeDialogue() {
      this.$swal.fire({
        title: `📁 ${this.directory.name}`,
        input: 'text',
        showCloseButton: true,
        inputValue: this.directory.name,
        confirmButtonText: '폴더명 변경',
        cancelButtonText: '삭제하기',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
          if (!value) {
            return '폴더명을 입력해주세요!';
          }

          const name = value.trim();
          if (name === this.directory.name) {
            return '폴더명이 동일합니다!';
          } else if (name.length > 8) {
            return '폴더명은 8자를 넘을 수 없습니다!';
          } else if (/\s/.exec(name) != null) {
            return '폴더명에는 공백이 들어갈 수 없습니다!';
          }
        },
      }).then(({ value: newName, dismiss }) => {
        if (newName) {
          newName = newName.trim();
          this.changeName(newName);
        } else if (dismiss === 'cancel') {
          this.delete();
        }
      });
      this.$axios.$get(URL.USER, {
        params: { id: this.directory.author }
      }).then(author => {
        this.$swal.update({
          text: `만든 사람: ${author.tag}`,
        });
      });
    },
    changeName(newName) {
      this.$axios.$patch(URL.DIRECTORY, {
        guild: this.guildId,
        user: this.userId,
        directory: this.directory._id,
        name: newName
      }).then(() => {
        this.$swal.fire({
          title: `${newName}(으)로 이름을 변경했습니다.`,
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
      const dir = this.directory;
      const swalTitle = dir.images
        ? `${dir.name} 폴더와 ${dir.images.length}개 이미지를 전부 삭제하시겠습니까?`
        : `${Josa.r(dir.name, '을/를')} 삭제하시겠습니까?`;
      this.$swal.fire({
        title: swalTitle,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
        confirmButtonColor: '#218838',
        cancelButtonColor: '#d33',
      }).then(({ value }) => {
        const shouldRemove = Boolean(value);
        if (!shouldRemove) return;

        const data = qs.stringify({
          directory: this.directory._id,
          guild: this.guildId,
          user: this.userId
        });
        this.$axios.$delete(URL.DIRECTORY, {
          data,
          headers: HEADER.DELETE,
        }).then(() => {
        this.$swal.fire({
            title: `${Josa.r(this.directory.name, '을/를')} 삭제했습니다.`,
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
      })
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');
  .directory-wrapper {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    flex-direction: column;
    margin: 0; padding: 0; outline: 0; border: 0;
    background: transparent;
    color: #43b581;
    text-decoration: none;
    transition: color .15s ease-out, background-color .15s ease-out;
  }
  .directory-wrapper.hover,
  .directory-wrapper:hover {
    background: #43b581;
    color: white;
  }
  .directory-title {
    width: 100%;
    cursor: pointer;
    text-decoration: none;
    color: whitesmoke;
    border-radius: 10px;
    transition: background 0.15s ease-out;
  }
  .directory-title:hover {
    background: #222;
  }
</style>
