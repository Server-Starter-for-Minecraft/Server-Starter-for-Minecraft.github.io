<script setup lang="ts">
import { computed } from 'vue';
type Matrix3d = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export interface Prop {
  texture: string; // 使用するテクスチャ
  duration: number; // 1回転する秒数 [sec]
  matrix3d: Matrix3d; // 4x4正方行列
  brightness: {
    // brightness = x => base + amp * sin(x + phase * 2 * pi)
    base: number; // 明るさの基礎値 [%]
    amp: number; // 明るさの振幅 (右に来た時と左に来た時で明るさがどのくらい変わるか) [%]
    phase: number; // 明るさの位相 (アニメーション開始時の位相) [0..1]
  };
  xywh: [number, number, number, number];
}
const props = defineProps<Prop>();

const delay = computed(() => props.duration * (props.brightness.phase - 1));
</script>
<template>
  <img
    class="face"
    :src="texture"
    alt=""
    :style="`
      transform:matrix3d(${matrix3d.join(',')});
      --brightnessBase:${brightness.base}%;
      --brightnessAmp:${brightness.amp}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      clip-path: xywh(${xywh.map((x) => `${x}px`).join(' ')});
      `"
  />
</template>

<style scoped lang="scss">
@keyframes light {
  0% {
    filter: brightness(calc(var(--brightnessBase) - var(--brightnessAmp)));
  }
  50% {
    filter: brightness(calc(var(--brightnessBase) + var(--brightnessAmp)));
  }
  100% {
    filter: brightness(calc(var(--brightnessBase) - var(--brightnessAmp)));
  }
}
img {
  position: absolute;
  animation-name: light;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
