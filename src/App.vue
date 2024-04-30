<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import { Page } from './router/routes';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';
import Model from './components/utils/base/McModel.vue';
import { convertModelProps } from 'app/util/McModel/src/main';

const $q = useQuasar();
const pages: { key: Page; icon: string }[] = [
  { key: 'intro', icon: 'flag' },
  { key: 'features', icon: 'category' },
  { key: 'q-a', icon: 'help' },
  { key: 'terms', icon: 'gavel' },
];

initProcess(window.navigator.userAgent);

// 色設定を自動化
$q.dark.set('auto');

const faces = [
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.00gg.webp',
    matrix3d: [
      -0.015625, 0, 0, 0, 0, 0, 0.015625, 0, 0, 0.0078125, 0, 0, -32, -31.5, 0,
      1,
    ],
    brightness: { base: 40, amp: 1.83697019872103e-15, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.00gg.webp',
    matrix3d: [
      -0.015625, 0, 0, 0, 0, 0, -0.015625, 0, 0, -0.0078125, 0, 0, -32, -32, 0,
      1,
    ],
    brightness: { base: 120, amp: 1.83697019872103e-15, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.08gg.webp',
    matrix3d: [
      0.015625, 0, 0, 0, 0, 0.0078125, 0, 0, 0, 0, 0.015625, 0, -32, -31.75,
      0.5, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.08gg.webp',
    matrix3d: [
      -0.015625, 0, 0, 0, 0, 0.0078125, 0, 0, 0, 0, -0.015625, 0, -32, -31.75,
      -0.5, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.08gg.webp',
    matrix3d: [
      0, 0, -0.015625, 0, 0, 0.0078125, 0, 0, 0.015625, 0, 0, 0, -31.5, -31.75,
      0, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.5 },
  },
  {
    texture: '/assets/minecraft/textures/block/acacia_planks.08gg.webp',
    matrix3d: [
      0, 0, 0.015625, 0, 0, 0.0078125, 0, 0, -0.015625, 0, 0, 0, -32.5, -31.75,
      0, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0 },
  },
];
</script>

<template>
  <div class="test">
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
    <Model :duration="4" :paused="false" :faces="faces" />
  </div>
</template>
<style>
.test {
  width: 300px;
  height: 300px;
  margin-top: 100px;
  margin-left: 100px;
}
</style>
