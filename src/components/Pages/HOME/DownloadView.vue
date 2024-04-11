<script setup lang="ts">
import DownloadBtn from 'src/components/Pages/HOME/core/DownloadBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import { isLinux, isMac, isWindows } from 'src/scripts/checkDevice';
</script>

<template>
  <div class="column q-gutter-md">
    <download-btn v-if="isWindows()" dark :os-name="'windows'" />
    <download-btn v-else-if="isMac()" dark :os-name="'mac'" />
    <download-btn v-else-if="isLinux()" dark disable :os-name="'linux'" />
    <SsStrong v-else class="q-my-md text-desc" style="font-size: 1rem">
      本ソフトはPCにてご利用下さい！
    </SsStrong>
  </div>

  <SsA dark url="/intro" class="q-mt-md">
    配布中の全てのインストーラーを確認する
  </SsA>
</template>
