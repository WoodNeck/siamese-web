<template>
  <div>
    <no-ssr>
      <file-upload
        ref="fileUpload"
        :multiple="true"
        :drop="true"
        :drop-directory="true"
        @input="showAddModal"
        @input-filter="inputFilter"
      ></file-upload>
    </no-ssr>
    <FileDragModal
      v-show="$refs.fileUpload && $refs.fileUpload.dropActive"
    />
    <FileAddModal ref="fileAddModal" />
  </div>
</template>
<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import FileUpload from 'vue-upload-component';
import FileDragModal from '../components/FileDragModal';
import FileAddModal from '../components/FileAddModal';
import URL from '../constants/url';
import HEADER from '../constants/header';
import * as ACTION from '../constants/action';

export default {
  components: {
    FileUpload,
    FileDragModal,
    FileAddModal
  },
  data() {
    return {
      filter: {
        success: true,
        title: '',
        reason: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    })
  },
  methods: {
    async showAddModal(newFiles) {
      if (!newFiles.length) return;
      if (!this.filter.success) {
        this.$swal.fire({
          type: 'error',
          title: this.filter.title,
          text: this.filter.reason,
        });
        this.$refs.fileUpload.clear();
        this.failedCount = 0;

        this.filter.success = true;
        this.filter.title = '';
        this.filter.reason = '';
        return;
      }

      let success = 0;
      let processed = 0;
      const failed = [];
      for (const newFile of newFiles) {
        const fileName = await this.$refs.fileAddModal.open(newFile);
        if (!fileName) {
          processed += 1;
          if (processed === newFiles.length) {
            this.openUploadSuccessModal(success, processed, failed);
          }
          continue;
        }

        const formData = new FormData();
        formData.append('image', newFile.file);
        formData.append('type', 'file');

        this.$axios.$post(URL.IMGUR, formData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Client-ID ${this.$store.state.im}`,
            'content-type': 'multipart/form-data',
          },
        }).then(async response => {
          const data = qs.stringify({
            guild: this.guildId,
            user: this.userId,
            name: fileName,
            url: response.data.link,
            directory: this.directoryId,
          });

          await this.$axios.$post(URL.IMAGE, data, {
            headers: HEADER.POST
          }).then(() => {
            success += 1;
          }).catch(e => {
            failed.push({
              file: newFile,
              name: fileName,
              reason: e.response.data
            });
          });
        }).catch(e => {
          failed.push({
            file: newFile,
            name: fileName,
            reason: e.response.data
          });
        }).finally(() => {
          processed += 1;
          if (processed === newFiles.length) {
            this.openUploadSuccessModal(success, processed, failed);
          }
        });
      }

      if (processed !== newFiles.length) {
        this.$swal.fire({
          title: '업로드중입니다. 잠시만 기다려주세요...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            this.$swal.showLoading()
          }
        });
      }

      this.$refs.fileUpload.clear();
    },
    inputFilter(newFile, oldFile, prevent) {
      if (!this.filter.success) return;

      let failed = false;
      if (!/\.(jpeg|jpe|jpg|gif|png|apng|tiff|)$/i.test(newFile.name)) {
        this.filter.success = false;
        this.filter.title = '올바르지 않은 파일 형식';
        this.filter.reason = '흠... 우리가 지원하지 않는 파일 형식 같네요.';
      }
      const isNested = newFile.name.match(/\//g);
      if (isNested) {
        this.filter.success = false;
        this.filter.title = '폴더는 아직 업로드할 수 없어요';
        this.filter.reason = '내용물만 업로드해주세요.';
      };
      if (newFile.size > 1024 * 1024 * 10) {
        this.filter.success = false;
        this.filter.title = '파일이 너무 크고 아름다워요';
        this.filter.reason = '최대 파일 크기는 10.00MB에요.';
      }

      // Create the 'blob' field for thumbnail preview
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (!failed && URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    async openUploadSuccessModal(success, processed, failed) {
      if (success <= 0 && failed.length <= 0) return;

      if (failed.length > 0) {
        await this.$swal({
          type: 'error',
          title: `${failed.length}개 이미지 추가에 실패했습니다.`,
          text: failed[0].reason
        });
      }

      if (success > 0) {
        this.$swal({
          type: 'success',
          position: 'bottom',
          timer: 5000,
          toast: true,
          title: `${success}개의 이미지를 추가했습니다!`,
        });
        this.doUpdate();
      }
    },
    doUpdate() {
      const guildId = this.guildId;
      const dirId = this.directoryId;

      if (guildId && !dirId) {
        this.$store.dispatch(ACTION.UPDATE_GUILD);
      } else if (guildId && dirId) {
        this.$store.dispatch(ACTION.UPDATE_DIRECTORY);
      }
    },
  }
}
</script>
<style scoped>

</style>


