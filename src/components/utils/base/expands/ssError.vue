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
    icon="priority_high"
    :color="getCssVar('negative') ?? ''"
    :title="title"
    :caption="caption"
  >
    <slot />
  </coreExpandBlock>
</template>
