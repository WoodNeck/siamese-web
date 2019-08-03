<template>
  <FileItem>
    <template v-slot:file-image>
      <nuxt-link :to="to" class="directory-wrapper">
        <svg width="80%" height="80%" x="0px" y="0px"
          viewBox="0 0 481.2 481.2" style="enable-background:new 0 0 481.2 481.2;" xml:space="preserve">
          <path fill="currentColor" d="M403.9,97.85h-114c-27.7,0-50.3-22.5-50.3-50.3c0-7.5-6-13.5-13.5-13.5H77.3c-42.6,0-77.3,34.7-77.3,77.3v258.5
            c0,42.6,34.7,77.3,77.3,77.3h326.6c42.6,0,77.3-34.7,77.3-77.3v-194.8C481.2,132.45,446.5,97.85,403.9,97.85z M454.2,369.75
            c0,27.7-22.5,50.3-50.3,50.3H77.3c-27.7,0-50.3-22.5-50.3-50.3v-258.4c0-27.7,22.5-50.3,50.3-50.3h136.5
            c6.4,36.2,38.1,63.8,76.1,63.8h114c27.7,0,50.3,22.5,50.3,50.3L454.2,369.75L454.2,369.75z"/>
        </svg>
      </nuxt-link>
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
import HEADER from '~/constants/header';
import URL from '~/constants/url';

export default {
  props: ['directory', 'to'],
  components: {
    FileItem
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    })
  },
  methods: {
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
