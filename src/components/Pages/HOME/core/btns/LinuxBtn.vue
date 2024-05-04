<script setup lang="ts">
import DownloadExpandBtn from './DownloadExpandBtn.vue';
import type { OsProp } from './iBtn';
defineProps<OsProp>();
</script>

<template>
  <DownloadExpandBtn
    osName="linux"
    :dark="dark"
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
