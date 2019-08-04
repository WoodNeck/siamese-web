<template>
  <div class="file-drag-modal-background">
    <div class="file-drag-modal-wrapper">
      <div class="file-drag-modal-icons">
        <div class="sparkle one"></div>
        <div class="sparkle two"></div>
        <div class="light one"></div>
        <div class="light two"></div>
        <div class="cross one"></div>
        <div class="cross two"></div>
        <div class="pop one"></div>
      </div>
      <div class="file-drag-modal-scale"></div>
      <div class="file-drag-modal-inner">
        <div class="file-drag-modal-icon-container">
          <div class="file-drag-modal-icon-wrapper left">
            <div class="file-drag-modal-icon left"></div>
          </div>
          <div class="file-drag-modal-icon-wrapper right">
            <div class="file-drag-modal-icon right"></div>
          </div>
          <div class="file-drag-modal-icon-wrapper center">
            <div class="file-drag-modal-icon center"></div>
          </div>
        </div>
        <div class="file-drag-modal-title">끌어다 놓기</div>
        <div class="file-drag-modal-desc">올리기 전에 파일명을 설정할 수 있어요</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .file-drag-modal-background {
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
  .file-drag-modal-wrapper {
    display: flex;
    flex-direction: column;
    width: 310px;
    height: 170px;
    position: relative;
  }
  .file-drag-modal-scale {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    z-index: -1;
    border-radius: 10px;
    background-color: #7289da;
    -webkit-animation: -webkit-uploadModalBounce .8s ease 0 normal forwards;
    animation: uploadModalBounce .8s ease 0 normal forwards;
    animation-iteration-count: 1;
  }
  .file-drag-modal-inner {
    flex: 1;
    border: 2px dashed hsla(0, 0%, 100%, 0.4);
    border-radius: 6px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .file-drag-modal-icon-container {
    position: relative;
    width: 100px; height: 60px;
    pointer-events: none;
  }
  .file-drag-modal-title {
    font-size: 22px;
    font-weight: 700;
    opacity: 0;
    color: white;
    vertical-align: baseline;
    animation: uploadTextFadeIn 1s ease .175s normal forwards;
  }
  .file-drag-modal-desc {
    font-size: 12px;
    color: hsla(0, 0%, 100%, 0.4);
    opacity: 0;
    margin-top: 20px;
    text-align: center;
    animation: uploadTextFadeIn 1.25s ease .185s normal forwards;
  }
  .file-drag-modal-icon-wrapper.left {
    transform: translate3d(0, -70px, 0);
  }
  .file-drag-modal-icon-wrapper.center {
    transform: translate3d(0, -80px, 0);
  }
  .file-drag-modal-icon-wrapper.right {
    transform: translate3d(0, -70px, 0);
  }
  .file-drag-modal-icon {
    position: absolute;
    flex-shrink: 0;
    width: 100px; height: 130px;
    background-repeat: no-repeat;
    background-position: 50%;
    transform: translateZ(0);
  }
  .file-drag-modal-icon.left {
    background-image: url('/upload-file-left.svg');
    animation: uploadIconAnimateInLeft .8s ease 0s normal forwards;
  }
  .file-drag-modal-icon.center {
    background-image: url('/upload-file-center.svg');
    animation: uploadIconAnimateInMiddle .8s ease 0s normal forwards;
  }
  .file-drag-modal-icon.right {
    background-image: url('/upload-file-right.svg');
    animation: uploadIconAnimateInRight .8s ease 0s normal forwards;
  }
  .sparkle, .light, .cross, .pop {
    position: absolute;
    opacity: 0.95;
    z-index: 1;
  }
  .sparkle {
    width: 43px; height: 43px;
    background-size: 774px 43px;
    background-position: -731px;
    background-image: url('/sparkleWhite.png');
    animation: sparkle 1.5s steps(17, start) 1 forwards;
  }
  .light {
    width: 20px; height: 20px;
    background-size: 620px 20px;
    background-image: url('/lightWhite.png');
    animation: light 2.5833333s steps(30, start) 1 forwards;
    background-position: -600px;
  }
  .cross {
    width: 25px; height: 25px;
    background-size: 625px 25px;
    background-image: url('/crossWhite.png');
    background-position: -600px;
    animation: cross 2.083325s steps(23, start) 1 forwards;
  }
  .pop {
    width: 24px; height: 24px;
    background-size: 840px 24px;
    background-position: -816px;
    background-image: url('/popWhite.png');
    animation: pop 2.916667s steps(34, start) 1 forwards;
  }
  .sparkle.one {
    bottom: -40px; right: -15px;
  }
  .sparkle.two {
    top: -67px; left: 12px;
    animation-delay: 1.2s;
  }
  .light.one {
    top: 24px; right: -35px;
    animation-delay: .4s;
  }
  .light.two {
    top: -32px; left: -10px;
    animation-delay: .61s;
  }
  .cross.one {
    right: 100px; bottom: -35px;
    animation-delay: .56s;
  }
  .cross.two {
    left: -70px; bottom: 50px;
    animation-delay: .8s;
  }
  .pop.one {
    bottom: -40px;
    left: 50px;
    animation-delay: .7s;
  }
  @keyframes uploadIconAnimateInLeft {
    0% {
      -webkit-transform: translateZ(0) rotate(0deg);
      transform: translateZ(0) rotate(0deg);
      opacity: .6
    }

    4.1667% {
      -webkit-transform: translate3d(0,-1px,0) rotate(0deg);
      transform: translate3d(0,-1px,0) rotate(0deg);
      opacity: .68
    }

    30.8334% {
      -webkit-transform: translate3d(-48px,-10px,0) rotate(-36deg);
      transform: translate3d(-48px,-10px,0) rotate(-36deg);
      opacity: 1
    }

    58.3334% {
      -webkit-transform: translate3d(-41px,-3px,0) rotate(-28deg);
      transform: translate3d(-41px,-3px,0) rotate(-28deg);
      opacity: 1
    }

    75% {
      -webkit-transform: translate3d(-45px,-8px,0) rotate(-32deg);
      transform: translate3d(-45px,-8px,0) rotate(-32deg);
      opacity: 1
    }

    83.3334% {
      -webkit-transform: translate3d(-44px,-7px,0) rotate(-30.7deg);
      transform: translate3d(-44px,-7px,0) rotate(-30.7deg);
      opacity: 1
    }

    to {
      -webkit-transform: translate3d(-44px,-6px,0) rotate(-30deg);
      transform: translate3d(-44px,-6px,0) rotate(-30deg);
      opacity: 1
    }
  }
  @keyframes uploadIconAnimateInMiddle {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }

    30.8334% {
      -webkit-transform: translate3d(0,-10px,0);
      transform: translate3d(0,-10px,0)
    }

    58.3334% {
      -webkit-transform: translate3d(0,-3px,0);
      transform: translate3d(0,-3px,0)
    }

    75% {
      -webkit-transform: translate3d(0,-8px,0);
      transform: translate3d(0,-8px,0)
    }

    83.3334% {
      -webkit-transform: translate3d(0,-7px,0);
      transform: translate3d(0,-7px,0)
    }

    to {
      -webkit-transform: translate3d(0,-6px,0);
      transform: translate3d(0,-6px,0)
    }
  }
  @keyframes uploadIconAnimateInRight {
    0% {
      -webkit-transform: translateZ(0) rotate(0deg);
      transform: translateZ(0) rotate(0deg);
      opacity: .6
    }

    4.1667% {
      -webkit-transform: translate3d(0,-1px,0) rotate(0deg);
      transform: translate3d(0,-1px,0) rotate(0deg);
      opacity: .68
    }

    30.8334% {
      -webkit-transform: translate3d(48px,-10px,0) rotate(36deg);
      transform: translate3d(48px,-10px,0) rotate(36deg);
      opacity: 1
    }

    58.3334% {
      -webkit-transform: translate3d(41px,-3px,0) rotate(28deg);
      transform: translate3d(41px,-3px,0) rotate(28deg);
      opacity: 1
    }

    75% {
      -webkit-transform: translate3d(45px,-8px,0) rotate(32deg);
      transform: translate3d(45px,-8px,0) rotate(32deg);
      opacity: 1
    }

    83.3334% {
      -webkit-transform: translate3d(44px,-7px,0) rotate(30.7deg);
      transform: translate3d(44px,-7px,0) rotate(30.7deg);
      opacity: 1
    }

    to {
      -webkit-transform: translate3d(44px,-6px,0) rotate(30deg);
      transform: translate3d(44px,-6px,0) rotate(30deg);
      opacity: 1
    }
  }
  @keyframes uploadTextFadeIn {
    0%,8.334% {
      -webkit-transform: translate3d(0,-4px,0);
      transform: translate3d(0,-4px,0);
      opacity: 0
    }

    45.8%,to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: 1
    }
  }
  @-webkit-keyframes uploadModalBounce {
    0% {
      -webkit-transform: translateZ(0) scale(.99);
      transform: translateZ(0) scale(.99);
    }

    15%,to {
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px
    }

    33.3334% {
      -webkit-transform: translateZ(0) scale(1.005);
      transform: translateZ(0) scale(1.005)
    }

    54.1667% {
      -webkit-transform: translateZ(0) scale(.995);
      transform: translateZ(0) scale(.995)
    }

    70.8334%,to {
      -webkit-transform: translateZ(0) scale(1);
      transform: translateZ(0) scale(1)
    }
  }
  @keyframes uploadModalBounce {
    0% {
      -webkit-transform: translateZ(0) scale(.99);
      transform: translateZ(0) scale(.99);
    }

    33.3334% {
      -webkit-transform: translateZ(0) scale(1.005);
      transform: translateZ(0) scale(1.005)
    }

    54.1667% {
      -webkit-transform: translateZ(0) scale(.995);
      transform: translateZ(0) scale(.995)
    }

    70.8334%,to {
      -webkit-transform: translateZ(0) scale(1);
      transform: translateZ(0) scale(1)
    }
  }

  @keyframes sparkle {
    0% {
      background-position: 0
    }

    40% {
      background-position: -731px
    }

    to {
      background-position: -731px
    }
  }

  @keyframes pop {
    0% {
      background-position: 0
    }

    40% {
      background-position: -816px
    }

    to {
      background-position: -816px
    }
  }

  @keyframes light {
    0% {
      background-position: 0
    }

    40% {
      background-position: -600px
    }

    to {
      background-position: -600px
    }
  }

  @keyframes cross {
    0% {
      background-position: 0
    }

    40% {
      background-position: -600px
    }

    to {
      background-position: -600px
    }
  }
</style>
