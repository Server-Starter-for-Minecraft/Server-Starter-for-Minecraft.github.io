<script setup lang="ts">
import SsTooltip from 'src/components/utils/base/ssTooltip.vue';

interface Prop {
  name: string;
  color: string;
  link: string;
  iconPath: string;
}
const prop = defineProps<Prop>();

function openLink() {
  window.open(prop.link, '_blank');
}
</script>

<template>
  <q-btn dense outline no-caps @click="openLink">
    <svg
      class="q-px-xs q-my-xs"
      style="width: 1.7rem; height: 1.7rem"
      :style="{ fill: color }"
    >
      <use :xlink:href="`${iconPath}#logo`" />
    </svg>
    <SsTooltip anchor="center middle" self="top start">
      {{ name }}
    </SsTooltip>
  </q-btn>
</template>

<style scoped lang="scss">
.name {
  font-size: 1.2rem;
}
</style>
