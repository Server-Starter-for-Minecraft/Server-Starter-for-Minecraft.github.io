<script setup lang="ts">
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
</script>

<template>
  <SsTitle>ServerStarterのはじめかた</SsTitle>

  サブページへジャンプ

  <div class="q-butter-md column">
    <q-btn color="info" label="install" to="install" />
    <q-btn color="info" label="run-server" to="run-server" />
    <q-btn color="info" label="join-server" to="join-server" />
  </div>
</template>
