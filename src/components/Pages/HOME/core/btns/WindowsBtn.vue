<script setup lang="ts">
import DownloadBtn from './DownloadBtn.vue';
</script>

<template>
  <DownloadBtn osName="windows" :file-name="(v) => `ServerStarter-${v}.msi`" />
</template>

<style scoped lang="scss"></style>
