<template>
  <FileItem>
    <template v-slot:file-image>
      <FileDragMove
        :directory="{ name: '상위 폴더' }" :active="!isRoot"
        @drag-change="onDragChange" @change="handleChange">
        <div class="button-wrapper" :class="{hover}" @click="isRoot ? openAddDialogue() : openAddFile()">
          <fa-layers v-if="dragging" full-width class="fa-4x">
            <fa :icon="['fas', 'arrow-up']" transform="shrink-6" />
          </fa-layers>
          <svg v-else width="50%" height="50%" viewBox="0 0 48 48">
            <path fill="currentColor" d="M42 22.001H26V6.00196H22V22.002H6V26.002H22V42.002H26V26.002H42V22.002Z"></path>
          </svg>
        </div>
      </FileDragMove>
    </template>
    <FileAddModal ref="addModal" />
  </FileItem>
</template>
<script>
import Josa from 'josa-js';
import qs from 'qs';
import { mapGetters } from 'vuex';
import FileItem from './FileItem'
import FileDragMove from './FileDragMove';
import FileAddModal from './FileAddModal';
import URL from '../constants/url';
import HEADER from '~/constants/header';
import * as ACTION from '../constants/action';

export default {
  props: ['isRoot', 'dragging'],
  components: {
    FileItem,
    FileDragMove,
    FileAddModal
  },
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
    onDragChange(value) {
      this.hover = value;
    },
    handleChange() {
      this.$emit('change');
    },
    openAddDialogue() {
      this.$swal({
        title: '어떤걸 추가하실건가요?',
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: '폴더',
        cancelButtonText: '이미지',
        confirmButtonColor: '#7289da',
        cancelButtonColor: '#369368',
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
    async openAddFile() {
      const addModal = this.$refs.addModal;
      this.$swal({
        title: '이미지 추가',
        html: '<div class="filebox"><input type="file" id="swal-file-input" class="file-input" multiple accept="image/*"></div>',
        showCloseButton: true,
        onClose: async () => {
          const newFiles = document.getElementById('swal-file-input').files;
          if (!newFiles.length) return;

          for (const newFile of newFiles) {
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
              newFile.blob = URL.createObjectURL(newFile);
            }
          }

          let success = 0;
          let processed = 0;
          const failed = [];
          for (const newFile of newFiles) {
            const fileName = await addModal.open(newFile);
            if (!fileName) {
              processed += 1;
              if (processed === newFiles.length) {
                this.openUploadSuccessModal(success, processed, failed);
              }
              continue;
            }

            const formData = new FormData();
            formData.append('image', newFile);
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
                  reason: e.reaponse.data
                });
              });
            }).catch(() => {
              failed.push({
                file: newFile,
                name: fileName,
                reason: e.reaponse.data
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
        }
      });
    },
    async openAddDirectory() {
      let { value: dirName } = await this.$swal({
        title: '폴더 추가',
        input: 'text',
        showCloseButton: true,
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
      });

      if (!dirName) return;
      dirName = dirName.trim();
      this.addDirectory(dirName);
    },
    async addDirectory(dirName) {
      const data = qs.stringify({
        name: dirName,
        guild: this.guildId,
        user: this.userId,
      });

      this.$axios.post(URL.DIRECTORY, data, {
        headers: HEADER.POST,
      }).then(e => {
        this.$swal.fire({
          title: `${Josa.r(dirName, '을/를')} 추가했습니다!`,
          type: 'success',
          showCloseButton: true,
        });
        this.$emit('change');
      })
      .catch(e => {
        this.$swal.fire({
          title: e.response.data,
          type: 'error',
          showCloseButton: true,
        });
      });
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
<style>
  .button-wrapper {
    position: absolute;
    top: 16.6666%; bottom: -16.6666%; left: 0; right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #43b581;
    background-color: #292b2f;
    border-radius: 64px;
    transition: color .15s ease-out, background-color .15s ease-out, border-radius .15s ease-out;
  }
  .button-wrapper.hover,
  .button-wrapper:hover {
    color: white;
    background-color: #43b581;
    border-radius: 24px;
  }
  .filebox {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-input {
    font-size: 20px;
    border-bottom: 1px solid #d9d9d9;
  }
</style>
