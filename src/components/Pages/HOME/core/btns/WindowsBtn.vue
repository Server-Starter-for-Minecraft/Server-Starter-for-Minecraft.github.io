<script setup lang="ts">
import DownloadBtn from './DownloadBtn.vue';
import type { OsProp } from './iBtn';
defineProps<OsProp>();
</script>

<template>
  <DownloadBtn :dark="dark" osName="windows" :file-name="(v) => `ServerStarter-${v}.msi`" />
</template>

<style scoped lang="scss"></style>
