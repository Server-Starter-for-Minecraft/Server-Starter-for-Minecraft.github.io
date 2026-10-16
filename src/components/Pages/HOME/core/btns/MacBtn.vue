<script setup lang="ts">
import { macInstallerFileName } from '@/scripts/installer';
import DownloadExpandBtn from './DownloadExpandBtn.vue';
import type { OsProp } from './iBtn';
defineProps<OsProp>();
</script>

<template>
  <!-- Mac版はApple Silicon版とIntel版を選んでダウンロードする -->
  <DownloadExpandBtn
    osName="mac"
    :dark="dark"
    :distributions="[
      {
        showingText: $t('home.mac_arch.silicon'),
        fileName: (v) => macInstallerFileName(v, 'silicon'),
      },
      {
        showingText: $t('home.mac_arch.intel'),
        fileName: (v) => macInstallerFileName(v, 'intel'),
      },
    ]"
  />
</template>
