<script setup lang="ts">
import { defineProps } from 'vue';

interface Prop {
  title: string;
}
defineProps<Prop>();
</script>

<template>
  <div class="row q-gutter-xs">
    <span class="col-1" style="min-width: 10rem">{{ title }}</span>
    <span class="col" style="min-width: 10rem"><slot /></span>
  </div>
</template>