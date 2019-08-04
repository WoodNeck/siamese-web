<template>
  <div v-show="isOpen" class="file-add-modal-background" @keyup.enter="validate">
    <div class="file-add-modal-wrapper">
      <div class="file-add-modal-inner">
        <div class="file-add-modal-file">
          <div class="file-add-modal-image" :style="{ backgroundImage: `url(${this.file.blob})` }"></div>
          <div class="file-add-modal-image-desc">
            <div class="file-add-modal-filename">{{ this.file.name }}</div>
          </div>
        </div>
        <div class="file-add-modal-input">
          <div class="file-add-modal-input-label">
            <span>파일 이름</span>
          </div>
          <div class="file-add-modal-text-wrapper">
            <div class="file-add-modal-text-margin">
              <div class="file-add-modal-text-inner">
                <input v-model="fileName" type="text" class="file-add-modal-textarea" maxlength="8" autofocus />
              </div>
            </div>
          </div>
          <div class="file-add-modal-error-wrapper" v-if="error">
            <span class="file-add-modal-error">⚠️ {{ error }}</span>
          </div>
        </div>
      </div>
      <div class="file-add-modal-footer">
        <div class="file-add-modal-buttons">
          <button @click="close" type="button" class="file-add-modal-cancel file-add-modal-button">
            <div class="file-add-modal-button-contents">
              <span>취소</span>
            </div>
          </button>
          <div @click="validate">
            <button type="submit" class="file-add-modal-submit file-add-modal-button">
              <div class="file-add-modal-button-contents">
                <span>올리기</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reject } from 'q';
export default {
  data() {
    return {
      isOpen: false,
      error: '',
      fileName: '',
      file: {},
    };
  },
  methods: {
    reset() {
      this.isOpen = false;
      this.error = '';
      this.fileName = '';
      this.file = {};
    },
    open(file) {
      this.isOpen = true;
      this.file = file;
      this.fileName = this.getFileName(file);

      return new Promise(resolve => {
        this.$once('done', result => {
          const newFileName = this.fileName;
          this.reset();
          resolve(result ? newFileName : '');
        })
      })
    },
    close() {
      this.$emit('done', false);
    },
    validate() {
      const fileName = this.fileName && this.fileName.trim();
      if (!fileName) {
        this.error = '파일명을 입력해주세요!';
        return;
      } else if (fileName.length > 8) {
        this.error = '파일명은 8자를 넘을 수 없습니다!';
        return;
      } else if (fileName.indexOf(' ') > -1) {
        this.error = '파일명에는 공백이 포함될 수 없습니다!';
        return;
      }
      this.$emit('done', true);
    },
    getFileName(file) {
      var lastDotPosition = file.name.lastIndexOf(".");
      if (lastDotPosition === -1) return file.name;
      else return file.name.substr(0, lastDotPosition);
    }
  }
}
</script>
<style scoped>
  .file-add-modal-background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.85);
    transform: translateZ(0);
  }
  .file-add-modal-wrapper {
    width: 520px;
    max-width: 100%;
    min-height: 258px;
    background-color: #7289da;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    animation: popup 0.3s ease 0 normal forwards;
    animation-iteration-count: 1;
  }
  .file-add-modal-inner {
    flex: 1;
    border: 2px dashed #aab8e8;
    border-radius: 10px 10px 0 0;
    margin: 10px;
    color: #fff;
    outline: 0; padding: 0;
  }
  .file-add-modal-file {
    position: relative;
    height: 103px;
    display: flex;
    flex-direction: row;
    margin: 0; padding: 0; outline: 0; border: 0;
  }
  .file-add-modal-image {
    margin: -33px 12px 0 16px;
    width: 104px;
    height: 104px;
    background-color: #fff;
    box-sizing: border-box;
    border: 2px solid #7289da;
    border-radius: 8px;
    background-size: cover;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .file-add-modal-image-desc {
    box-sizing: border-box;
    padding-top: 22px;
    padding-right: 22px;
    height: 78px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .file-add-modal-filename {
    font-size: 18px;
    font-weight: 500;
    height: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .file-add-modal-input {
    margin: 0 18px;
    outline: 0; padding: 0; border: 0;
  }
  .file-add-modal-input-label {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
  }
  .file-add-modal-text-wrapper {
    flex: 1 1 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    display: flex;
  }
  .file-add-modal-text-margin {
    margin-bottom: 18px;
    position: relative;
    width: 100%;
    transition: opacity .2s ease;
    margin-top: 8px;
  }
  .file-add-modal-text-inner {
    background-color: #8ea1e1;
    border-radius: 5px;
    position: relative;
    display: flex;
  }
  .file-add-modal-textarea {
    height: 44px;
    color: hsla(0, 0%, 100%, .7);
    background-color: transparent;
    resize: none;
    border: none;
    appearance: none;
    font-weight: 400;
    font-size: 0.9375rem;
    line-height: 1.25rem;
    letter-spacing: -0.025rem;
    max-height: 144px;
    width: 100%;
    min-height: 20px;
    margin: 2px 2px 2px 0;
    padding: 10px;
    box-sizing: border-box;
  }
  .file-add-modal-error-wrapper {
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: 500;
  }
  .file-add-modal-error {
    background-color: #ED5565;
    padding: 4px;
    border-radius: 4px;
    color: #fff;
  }
  .file-add-modal-footer {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: flex-end;
    align-items: center;
    background-color: #5b6dae;
    flex-direction: row;
    padding: 10px;
    border-radius: 0 0 10px 10px;
  }
  .file-add-modal-buttons {
    display: flex;
    justify-content: flex-end;
  }
  .file-add-modal-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    user-select: none;
    cursor: pointer;
    border: 0;
  }
  .file-add-modal-button-contents {
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .file-add-modal-cancel {
    color: #fff;
    width: auto;
    height: 38px;
    min-width: 96px;
    min-height: 38px;
  }
  .file-add-modal-submit {
    color: #7289da;
    background-color: #fff;
    width: auto;
    height: 38px;
    min-width: 96px;
    min-height: 38px;
    transition: background-color .17s ease, color .17s ease;
  }
  @keyframes popup {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

