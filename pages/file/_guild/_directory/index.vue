<template>
  <FileContainer>
    <FileAddButton :isRoot="false" />
  </FileContainer>
</template>
<script>
import FileContainer from '~/components/FileContainer';
import FileAddButton from '~/components/FileAddButton';

export default {
  components: {
    FileContainer,
    FileAddButton
  }
}
</script>
