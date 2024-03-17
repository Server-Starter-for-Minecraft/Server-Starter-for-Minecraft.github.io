<script setup lang="ts">
import DownloadBtn from 'src/components/HOME/DownloadBtn.vue';
</script>

<template>
  <div class="column q-gutter-md">
    <download-btn :os-name="'windows'" />
    <download-btn :os-name="'mac'" />
    <download-btn disable :os-name="'linux'" />
  </div>
  <p class="row text-bold text-yellow">
    Linux版は年度末ごろの長期リリース版に合わせて公開します！
  </p>
</template>