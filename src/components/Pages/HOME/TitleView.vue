<script setup lang="ts">
import { isMobile } from 'src/scripts/checkDevice';
import { useSystemStore } from 'src/stores/SystemStore';

interface Prop {
  fontsize: string;
  showIcon?: boolean;
  showDesc?: boolean;
}
defineProps<Prop>();

const sysStore = useSystemStore();
</script>

<template>
  <div class="column">
    <q-img
      v-if="showIcon"
      src="/icons/systemLogo.svg"
      width="7rem"
      class="icon"
      style="aspect-ratio: 57/72"
    />
    <div class="title" :style="{ fontSize: fontsize, lineHeight: fontsize }">
      Server Starter <span class="inTitle">for</span> Minecraft
    </div>
  </div>

  <div
    v-if="showDesc"
    class="row q-gutter-x-xl q-gutter-y-sm justify-center"
    style="margin-top: 2vw"
  >
    <span class="text-h5 custom-break">
      あなたのマイクラサーバーを<wbr />ワンクリックで！</span
    >
    <span v-if="!isMobile()" class="version">
      {{ sysStore.latestProductVersion }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.icon {
  margin: auto;
  margin-bottom: 1rem;
}

.title {
  font-family: 'Simpel';
}

.inTitle {
  @extend .title;
  font-size: 60%;
}

.version {
  font-size: 1.5rem;
}
</style>
