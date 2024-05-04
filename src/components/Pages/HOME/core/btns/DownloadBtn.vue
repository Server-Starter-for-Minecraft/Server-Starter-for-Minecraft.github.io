<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useSystemStore } from 'src/stores/SystemStore';

interface Prop {
  osName: 'windows' | 'mac' | 'linux';
  fileName: (version: string) => string;
  disable?: boolean;
  dark?: boolean;
}
defineProps<Prop>();

const sysStore = useSystemStore();
</script>

<template>
  <q-btn
    outline
    :loading="sysStore.latestProductVersion === ''"
    :disable="disable || sysStore.latestProductVersion === ''"
    padding="md"
    :href="`https://github.com/Server-Starter-for-Minecraft/ServerStarter2/releases/latest/download/${fileName(
      sysStore.latestProductVersion
    )}`"
    class="dBtn"
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
}

.dBtn {
  width: 20rem;
}

.download {
  text-transform: none;
  font-size: 1rem;
}

.light {
  background-color: $primary !important;
}

.dark {
  fill: $primary;
  background-color: rgba($color: #000000, $alpha: 0.2) !important;
}
</style>
