<script setup lang="ts">
interface Prop {
  options?: readonly any[];
  dark?: boolean;
  label?: string;
  disable?: boolean;
  dense?: boolean;
  optionLabel?: string;
  optionValue?: string;
}

const prop = defineProps<Prop>();
const model = defineModel();
</script>

<template>
  <q-select
    v-model="model"
    :dark="dark"
    filled
    :options="options"
    :label="label"
    :dense="dense"
    :popup-content-style="{ fontSize: '0.9rem' }"
    :disable="disable"
    emit-value
    map-options
    :option-label="optionLabel"
    :option-value="optionValue"
    style="font-size: 0.9rem"
  />
</template>
