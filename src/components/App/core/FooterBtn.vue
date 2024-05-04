<script setup lang="ts">
import SsTooltip from 'src/components/utils/base/ssTooltip.vue';

interface Prop {
  name: string;
  link: string;
  iconPath: string;
}
const prop = defineProps<Prop>();

function openURL() {
  window.open(prop.link, '_blank');
}
</script>

<template>
  <q-btn flat dense @click="openURL">
    <svg class="q-px-xs q-my-xs logo">
      <use :xlink:href="`${iconPath}#logo`" />
    </svg>

    <SsTooltip anchor="center middle" self="top start">
      {{ name }}
    </SsTooltip>
  </q-btn>
</template>

<style scoped lang="scss">
.logo {
  width: 2rem;
  height: 2rem;
  fill: white;
}
</style>
