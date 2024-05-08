<script setup lang="ts">
import { CSSProperties } from 'vue';

interface Prop {
  src: string;
  imgId: string;
  color?: string;
  imgStyle?: CSSProperties;
}
defineProps<Prop>();
</script>

<template>
  <div>
    <svg
      style="width: 100%; height: 100%"
      :style="{ ...imgStyle, ...{ fill: color } }"
    >
      <use :xlink:href="`${src}#${imgId}`" />
    </svg>
  </div>
</template>
