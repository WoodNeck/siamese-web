<template>
  <FileContainer>
    <FileAddButton v-for="idx of Array(20)" :key="idx" />
  </FileContainer>
</template>
<script>
import FileContainer from '../../../components/FileContainer';
import FileAddButton from '../../../components/FileAddButton';

export default {
  components: {
    FileContainer,
    FileAddButton
  }
}
</script>

<style scoped>

</style>

