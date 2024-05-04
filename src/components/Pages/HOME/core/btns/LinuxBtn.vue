<script setup lang="ts">
import DownloadExpandBtn from './DownloadExpandBtn.vue';
</script>

<template>
  <DownloadExpandBtn
    osName="linux"
    :distributions="[
      {
        showingText: 'Debian (.deb)',
        fileName: (v) => `ServerStarter-${v}.deb`,
      },
      {
        showingText: 'Red Hat (.rpm)',
        fileName: (v) => `ServerStarter-${v}.rpm`,
      },
    ]"
  />
</template>

<style scoped lang="scss"></style>
