<script setup lang="ts">
import { useSystemStore } from 'src/stores/SystemStore';
import { BtnProp } from './iBtn';

type Distribution = {
  showingText: string;
  fileName: (version: string) => string;
};

defineProps<
  BtnProp & {
    distributions: Distribution[];
  }
>();

const sysStore = useSystemStore();
</script>

<template>
  <q-btn-dropdown
    outline
    :loading="sysStore.latestProductVersion === ''"
    :disable="disable || sysStore.latestProductVersion === ''"
    text-color="primary"
    padding="md"
    :class="$q.dark.isActive || dark ? 'dBtn-dark' : 'dBtn-light'"
  >
    <template #label>
      <div class="row items-center q-gutter-md">
        <svg class="osLogo">
          <use :xlink:href="`/assets/OS/${osName}.svg#osLogo`" />
        </svg>
        <div class="download text-desc">
          {{ $t(`home.download_btn.${osName}`) }}
        </div>
      </div>
    </template>

    <div class="column text-left">
      <template v-for="dist in distributions" :key="dist.showingText">
        <q-btn
          flat
          no-caps
          :href="`https://github.com/Server-Starter-for-Minecraft/ServerStarter2/releases/latest/download/${dist.fileName(
            sysStore.latestProductVersion
          )}`"
          class="q-py-md"
        >
          {{ dist.showingText }}
        </q-btn>
      </template>
    </div>
  </q-btn-dropdown>
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
