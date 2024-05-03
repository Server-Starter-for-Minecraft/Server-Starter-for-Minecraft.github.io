<script setup lang="ts">
import DownloadExpandBtn from './DownloadExpandBtn.vue';
</script>

<template>
  <DownloadExpandBtn
    osName="linux"
    :distributions="[
      {
        showingText: 'Debian (.deb)',
        fileName: (v) => `ServerStarter2_${v}_amd64.deb`,
      },
      {
        showingText: 'Red Hat (.rpm)',
        fileName: (v) => `ServerStarter2-${v}.x86_64.rpm`,
      },
    ]"
  />
</template>

<style scoped lang="scss"></style>
