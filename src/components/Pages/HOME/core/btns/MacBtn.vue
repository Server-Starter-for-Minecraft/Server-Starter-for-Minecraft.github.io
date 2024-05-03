<script setup lang="ts">
import DownloadBtn from './DownloadBtn.vue';
</script>

<template>
  <DownloadBtn osName="mac" :file-name="(v) => `ServerStarter-${v}.pkg`" />
</template>

<style scoped lang="scss"></style>
