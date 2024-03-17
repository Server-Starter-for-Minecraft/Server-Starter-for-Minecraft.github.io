<script setup lang="ts">
interface Prop {
  osName: 'windows' | 'mac' | 'linux';
  version: string;
  disable?: boolean;
}
const prop = defineProps<Prop>();

function getFileName() {
  switch (prop.osName) {
    case 'windows':
      return `ServerStarter-${prop.version}.msi`;
    case 'mac':
      return `ServerStarter-${prop.version}.pkg`;
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
    :disable="disable"
    text-color="primary"
    padding="md"
    :href="`https://github.com/Server-Starter-for-Minecraft/ServerStarter2/releases/latest/download/${getFileName()}`"
    class="dBtn"
  >
    <div class="row items-center">
      <q-avatar size="2rem" square class="q-mr-md">
        <q-img :src="`assets/OS/${osName}.svg`" />
      </q-avatar>
      <div class="download text-desc">
        {{ getOSName() }}版をダウンロード
      </div>
    </div>
  </q-btn>
</template>

<style scoped lang="scss">
.dBtn {
  width: 20rem;
  background-color: rgba($color: #000000, $alpha: 0.2) !important;
}

.download {
  text-transform: none;
  font-size: 1rem;
}
</style>
