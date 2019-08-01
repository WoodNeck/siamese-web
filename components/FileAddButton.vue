<template>
  <div class="file-item button-wrapper" @click="isRoot ? openAddDialogue() : openAddFile()">
    <svg width="48" height="48" viewBox="0 0 48 48">
      <path fill="currentColor" d="M42 22.001H26V6.00196H22V22.002H6V26.002H22V42.002H26V26.002H42V22.002Z"></path>
    </svg>
  </div>
</template>
<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import URL from '../constants/url';

export default {
  props: ['isRoot'],
  computed: {
    ...mapGetters({
      userId: 'userId'
    }),
    guildId() {
      return this.$route.params.guild;
    }
  },
  methods: {
    openAddDialogue() {
      this.$swal({
        title: '어떤걸 추가하실건가요?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '폴더',
        cancelButtonText: '파일',
        confirmButtonColor: '#7289da',
        cancelButtonColor: '#369368',
        customClass: {
          title: 'swal-title',
        }
      }).then(result => {
        const isDirectory = Boolean(result.value);
        const isFile = Boolean(result.dismiss) && result.dismiss === 'cancel';
        if (isFile) {
          this.openAddFile();
        } else if (isDirectory) {
          this.openAddDirectory();
        }
      });
    },
    openAddFile() {
      this.$swal({
        title: '파일 추가',
        customClass: {
          title: 'swal-title',
        }
      });
    },
    async openAddDirectory() {
      let { value: dirName } = await this.$swal({
        title: '폴더 추가',
        input: 'text',
        inputValidator: (value) => {
          if (!value) {
            return '폴더명을 입력해주세요!';
          }

          const name = value.trim();
          if (name.length > 8) {
            return '폴더명은 8자를 넘을 수 없습니다!';
          } else if (/\s/.exec(name) != null) {
            return '폴더명에는 공백이 들어갈 수 없습니다!';
          }
        },
        customClass: {
          title: 'swal-title',
        }
      });

      if (!dirName) return;

      dirName = dirName.trim();

      const data = qs.stringify({
        name: dirName,
        guild: this.guildId,
        user: this.userId,
      })

      this.$axios.post(URL.DIRECTORY, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(e => {
        this.$swal.fire({
          title: `${dirName}을(를) 추가했습니다!`,
          type: 'success',
          customClass: {
            title: 'swal-title',
          }
        });
        this.$emit('change');
      })
      .catch(e => {
        this.$swal.fire({
          title: e.response.data,
          type: 'error',
          customClass: {
            title: 'swal-title',
          }
        });
      });
    },
    async addDirectory(dirName) {

    }
  }
}
</script>
<style>
  .button-wrapper {
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #43b581;
    background-color: #292b2f;
    border-radius: 64px;
    transition: color .15s ease-out, background-color .15s ease-out, border-radius .15s ease-out;
  }
  .button-wrapper:hover {
    color: white;
    background-color: #43b581;
    border-radius: 24px;
  }
  .swal-title {
    white-space: nowrap;
    font-size: 1.875rem;
  }
  @media screen and (max-width: 400px) {
    .swal-title {
      font-size: 1.0rem;
    }
  }
  @media screen and (min-width: 400px) and (max-width: 540px) {
    .swal-title {
      font-size: 1.3rem;
    }
  }
</style>
