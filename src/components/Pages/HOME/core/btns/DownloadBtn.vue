<script setup lang="ts">
import { useSystemStore } from 'src/stores/SystemStore';
import { BtnProp } from './iBtn';

defineProps<BtnProp & {
  fileName: (version: string) => string;
}>();

const sysStore = useSystemStore();
</script>

<template>
  <q-btn
    outline
    :loading="sysStore.latestProductVersion === ''"
    :disable="disable || sysStore.latestProductVersion === ''"
    text-color="primary"
    padding="md"
    :href="`https://github.com/Server-Starter-for-Minecraft/ServerStarter2/releases/latest/download/${fileName(
      sysStore.latestProductVersion
    )}`"
    :class="$q.dark.isActive || dark ? 'dBtn-dark' : 'dBtn-light'"
  >
    <div class="row items-center q-gutter-md">
      <svg class="osLogo">
        <use :xlink:href="`/assets/OS/${osName}.svg#osLogo`" />
      </svg>
      <div class="download text-desc">
        {{ $t(`home.download_btn.${osName}`) }}
      </div>
    </div>
  </q-btn>
</template>

<style scoped lang="scss">
.osLogo {
  width: 2rem;
  height: 2rem;
  fill: $primary;
}

.dBtn-dark {
  width: 20rem;
  background-color: rgba($color: #000000, $alpha: 0.2) !important;
}

.dBtn-light {
  width: 20rem;
  background-color: rgba($color: #000000, $alpha: 0.8) !important;
}

.download {
  text-transform: none;
  font-size: 1rem;
}
</style>
