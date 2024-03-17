<script setup lang="ts">
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
  <div class="column q-pb-md">
    <q-img
      v-if="showIcon"
      src="icons/systemLogo.svg"
      width="7rem"
      class="icon"
    />
    <div class="title" :style="{ fontSize: fontsize }">
      Server Starter <span class="inTitle">for</span> Minecraft
    </div>
  </div>

  <div v-if="showDesc" class="q-pt-md row q-gutter-x-xl q-gutter-y-md">
    <span class="text-h5"> あなたのマイクラサーバーをワンクリックで！</span>
    <span class="version">
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
  line-height: 3.5rem;
}

.inTitle {
  @extend .title;
  font-size: 60%;
}

.version {
  font-size: 1.5rem;
}
</style>
