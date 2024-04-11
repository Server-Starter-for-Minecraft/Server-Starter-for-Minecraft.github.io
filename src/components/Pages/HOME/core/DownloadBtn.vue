<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useSystemStore } from 'src/stores/SystemStore';

interface Prop {
  osName: 'windows' | 'mac' | 'linux';
  disable?: boolean;
  dark?: boolean
}
const prop = defineProps<Prop>();
const sysStore = useSystemStore();
const $q = useQuasar();
const isDark = () => $q.dark.isActive;

function getFileName() {
  switch (prop.osName) {
    case 'windows':
      return `ServerStarter-${sysStore.latestProductVersion}.msi`;
    case 'mac':
      return `ServerStarter-${sysStore.latestProductVersion}.pkg`;
    case 'linux':
      return '';
    default:
      break;
  }
}

function getOSName() {
  switch (prop.osName) {
    case 'windows':
      return 'Windows';
    case 'mac':
      return 'Mac OS';
    case 'linux':
      return 'Linux';
    default:
      break;
  }
}
</script>

<template>
  <q-btn
    outline
    :loading="sysStore.latestProductVersion === ''"
    :disable="disable || sysStore.latestProductVersion === ''"
    padding="md"
    :href="`https://github.com/Server-Starter-for-Minecraft/ServerStarter2/releases/latest/download/${getFileName()}`"
    :color="dark || isDark() ? 'primary' : ''"
    :class="dark || isDark() ? 'dark' : 'light'"
    class="dBtn"
  >
    <div class="row items-center q-gutter-md">
      <svg class="osLogo">
        <use :xlink:href="`/assets/OS/${osName}.svg#osLogo`" />
      </svg>
      <div class="download text-desc">{{ getOSName() }}版をダウンロード</div>
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
