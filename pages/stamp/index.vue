<!--스탬프관리의 디폴트 페이지-->
<template>
  <div class="file-help-wrapper">
    <div>
      <h2>사용법</h2>
    </div>
    <Message avatar="/siamese.png" name="샴고양이">
      <span>안냥! 샴고양이다냥. 스탬프 기능에 대해서 설명해주겠다냥!</span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이" embed="/help-1.png">
      <span><b>스탬프</b>는 사용자가 등록한 이미지를 명령어로 등록해서, 채팅창에서 간편하게 이미지를 보여줄 수 있는 기능이다냥!<br/>가령, <b>"야"</b> 폴더에 <b>"너두?"</b>라는 이름의 이미지를 등록해두면 다음과 같이 사용할 수 있다냥!</span>
    </Message>
    <MessageDivider>Step 1</MessageDivider>
    <Message avatar="/siamese.png" name="샴고양이">
      <span>먼저 샴고양이를 초대하지 않았다면 초대부터 하자냥! <a href="https://discordapp.com/oauth2/authorize?client_id=357073005819723777&permissions=3271744&scope=bot">초대 링크</a></span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이" embed="/help-2.png">
      <span>그 다음은 <b>"스탬프관리"</b> 역할을 만들어야 한다냥!  </span>
      <span><fa icon="cog" /> <b>서버 설정</b>의 <b>역할</b>탭에서 이름이 <b>"스탬프관리"</b>인 역할을 하나 만들면 된다냥! (권한은 신경쓸 필요 없다냥!)</span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이" embed="/help-3.png">
      <span>이제 유저에게 이 스탬프관리 역할을 지정하게 되면, 그 사람은 스탬프를 <b>추가</b>하고, <b>제거</b>할 수 있는 권한을 갖게 된다냥!</span>
    </Message>
    <MessageDivider>Step 2</MessageDivider>
    <Message avatar="/siamese.png" name="샴고양이" embed="/help-4.png">
      <span>스탬프 관리 페이지의 모습이다냥!</span><br/>
      <span><fa icon="portrait" /> 각 <b>서버</b> 버튼을 누르면 서버의 스탬프 관리 페이지로 갈 수 있다냥!</span><br/>
      <span><fa icon="plus-square" /> <b>추가 버튼</b>을 누르면 폴더, 또는 파일을 추가할 수 있다냥! 폴더 내에 폴더를 만들 수는 없다냥.</span><br/>
      <span><fa icon="folder" /> <b>폴더</b> 아이콘을 눌러 폴더로 들어가거나, 폴더 이름을 눌러 폴더의 이름을 변경할 수 있다냥!</span><br/>
      <span><fa icon="stamp" /> <b>스탬프</b>들은 이미지를 눌러 여러 개를 선택 후 드래그하여 폴더로 이동시키거나, 삭제할 수 있다냥! 혹은, 이름을 눌러 이름을 변경할 수도 있다냥.</span><br/>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이" embed="/help-5.gif">
      <span>이미지는 드래그 앤 드롭해서 업로드할 수도 있다냥!</span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이">
      <span>이미지 업로드 후에는 곧장 스탬프를 사용할 수 있다냥!</span><br/>
      <span><fa icon="folder" /> 폴더 안에 배치하지 않은 스탬프는 그냥 <b>스탬프명</b>을 채팅창에 입력하면 내가 그 스탬프를 띄워줄거다냥!</span><br/>
      <span><fa icon="folder" /> 폴더 안에 넣어놓은 스탬프는 <b>폴더명</b> <b>스탬프명</b>을 채팅창에 입력하면 된다냥!</span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이">
      <span>디스코드에서 파일 목록을 확인하기 위해서는 <b>샴 목록 [폴더명]</b> 명령어를 사용해보라냥!</span><br/>
      <span>스탬프 관리 페이지로 오고 싶다면 <b>샴 스탬프관리</b> 명령어를 사용해보라냥!</span>
    </Message>
    <Message avatar="/siamese.png" name="샴고양이">
      <span>사용중에 문제가 있다면 <fa icon="bug" /> <b>버그</b>를 제보해달라냥! <a href="https://discord.gg/d8r6tDz">샴고양이 개발 서버</a>에 와서 제보해주면 더 좋다냥!</span>
    </Message>
  </div>
</template>
<script>
import Message from '~/components/Message';
import MessageDivider from '~/components/MessageDivider';

export default {
  components: {
    MessageDivider,
    Message
  }
}
</script>
<style scoped>
  .file-help-wrapper {
    color: white;
    padding-left: 20px;
    display: block;
  }
</style>

