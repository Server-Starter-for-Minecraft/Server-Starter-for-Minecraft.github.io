<script setup lang="ts">
import { isMobile } from 'src/scripts/checkDevice';
import SsLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';

interface Prop {
  name: string;
  link: string;
}
defineProps<Prop>();
</script>

<template>
  <SsCard v-if="isMobile()" style="width: fit-content">
    <q-img :src="`/assets/servers/${name}.png`" class="icon" />
  </SsCard>

  <SsCard v-else class="flex items-center card">
    <div class="row q-gutter-x-md items-center">
      <q-img :src="`/assets/servers/${name}.png`" class="icon" />
      <div class="col">
        <span class="server-name">
          {{ $t(`home.servers.serverType.${name}`) }}
          <SsLinkBtn :url="link" />
        </span>
        <p class="q-mt-md desc">
          {{ $t(`home.servers.serverDescription.${name}`) }}
        </p>
      </div>
    </div>
  </SsCard>
</template>

<style scoped lang="scss">
.card {
  width: min(30rem, 90vw);
}

.icon {
  width: 4rem;
}

.server-name {
  font-size: 1.5em;
  font-family: 'Genokaku JP';
}

.desc {
  // 改行(\n)を許可
  white-space: pre-line;
}
</style>
