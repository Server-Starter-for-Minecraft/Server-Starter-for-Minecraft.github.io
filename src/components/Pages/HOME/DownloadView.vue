<script setup lang="ts">
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import { isLinux, isMac, isWindows } from 'src/scripts/checkDevice';
import WindowsBtn from './core/btns/WindowsBtn.vue';
import MacBtn from './core/btns/MacBtn.vue';
import LinuxBtn from './core/btns/LinuxBtn.vue';
</script>

<template>
  <div class="column q-gutter-md">
    <WindowsBtn v-if="isWindows()" dark/>
    <MacBtn v-else-if="isMac()" dark/>
    <LinuxBtn v-else-if="isLinux()" dark/>
    <SsStrong v-else class="q-my-md text-desc" style="font-size: 1rem">
      本ソフトはPCにてご利用下さい！
    </SsStrong>
  </div>

  <SsA dark url="/intro" class="q-mt-md">
    配布中の全てのインストーラーを確認する
  </SsA>
</template>
