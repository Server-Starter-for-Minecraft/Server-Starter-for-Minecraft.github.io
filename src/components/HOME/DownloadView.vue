<script setup lang="ts">
import DownloadBtn from 'src/components/HOME/DownloadBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import ssStrong from '../utils/base/texts/ssStrong.vue';
import { isLinux, isMac, isWindows } from 'src/scripts/checkDevice';
</script>

<template>
  <div class="column q-gutter-md">
    <download-btn v-if="isWindows()" :os-name="'windows'" />
    <download-btn v-else-if="isMac()" :os-name="'mac'" />
    <download-btn v-else-if="isLinux()" disable :os-name="'linux'" />
    <ssStrong v-else class="q-my-md text-desc" style="font-size: 1rem">
      本ソフトはPCにてご利用下さい！
    </ssStrong>
  </div>

  <SsA url="/intro" class="q-pt-md">
    配布中の全てのインストーラーを確認する
  </SsA>
</template>
