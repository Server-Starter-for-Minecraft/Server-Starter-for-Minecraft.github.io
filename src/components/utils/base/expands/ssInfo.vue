<script setup lang="ts">
import { getCssVar } from 'quasar';
import coreExpandBlock from './core/coreExpandBlock.vue';

interface Prop {
  title: string;
  caption?: string;
}
defineProps<Prop>();
</script>

<template>
  <coreExpandBlock
    icon="info"
    :color="getCssVar('info') ?? ''"
    :title="title"
    :caption="caption"
  >
    <slot />
  </coreExpandBlock>
</template>
