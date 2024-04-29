<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import { Page } from './router/routes';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';
import Model from './components/utils/base/mcModel/3dModel.vue';
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
    texture: '/assets/minecraft/textures/block/lectern_base.0EGG.png',
    matrix3d: [
      0.015625, 0, 0, 0, 0, 0.001953125, 0, 0, 0, 0, 0.015625, 0, -32, -31.5625,
      0.5, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_base.06G8.png',
    matrix3d: [
      0, 0, 0.015625, 0, 0, 0.001953125, 0, 0, -0.015625, 0, 0, 0, -32.5,
      -31.5625, 0, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_base.06G8.png',
    matrix3d: [
      -0.015625, 0, 0, 0, 0, 0.001953125, 0, 0, 0, 0, -0.015625, 0, -32,
      -31.5625, -0.5, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_base.06G8.png',
    matrix3d: [
      0, 0, -0.015625, 0, 0, 0.001953125, 0, 0, 0.015625, 0, 0, 0, -31.5,
      -31.5625, 0, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.5 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_base.00GG.png',
    matrix3d: [
      0.015625, 0, -1.9135106236677394e-18, 0, 1.9135106236677394e-18, 0,
      0.015625, 0, 0, -0.001953125, 0, 0, -32, -31.625, -5.551115123125783e-17,
      1,
    ],
    brightness: { base: 120, amp: 1.83697019872103e-15, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/oak_planks.00GG.png',
    matrix3d: [
      -0.015625, 0, 0, 0, 0, 0, 0.015625, 0, 0, 0.001953125, 0, 0, -32, -31.5,
      0, 1,
    ],
    brightness: { base: 40, amp: 1.83697019872103e-15, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_front.008D.png',
    matrix3d: [
      0.0078125, 0, 0, 0, 0, 0.0126953125, 0, 0, 0, 0, 0.0078125, 0, -32,
      -32.03125, 0.25, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.28FG.png',
    matrix3d: [
      0, 0.0126953125, 4.783776559169348e-19, 0, 0, -7.773636908650191e-19,
      0.0078125, 0, -0.0078125, 0, 0, 0, -32.25, -32.03125,
      2.7755575615628914e-17, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_front.83GG.png',
    matrix3d: [
      -0.0078125, 0, 0, 0, 0, 0.0126953125, 0, 0, 0, 0, -0.0078125, 0, -32,
      -32.03125, -0.25, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.25 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.28FG.png',
    matrix3d: [
      0, 0.0126953125, -4.783776559169348e-19, 0, 0, 7.773636908650191e-19,
      0.0078125, 0, 0.0078125, 0, 0, 0, -31.75, -32.03125,
      -2.7755575615628914e-17, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.5 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.00G4.png',
    matrix3d: [
      0.015600585937500001, 0, 0, 0, 0, 0.003608904423872214,
      -0.001494857157676132, 0, 0, 0.0048582857624474285, 0.011728939377584695,
      0, -32, -32.22686625207764, 0.4322186410466857, 1,
    ],
    brightness: {
      base: 64.6926627053964,
      amp: 27.716385975338603,
      phase: 0.25,
    },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.04D8.png',
    matrix3d: [
      0, 0.0048582857624474285, 0.011728939377584695, 0, 0,
      0.003608904423872214, -0.001494857157676132, 0, -0.015600585937500001, 0,
      0, 0, -32.49921875, -32.38233139647596, 0.056892580963975425, 1,
    ],
    brightness: { base: 80, amp: 30, phase: 0 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.04G8.png',
    matrix3d: [
      -0.015600585937500001, 0, 0, 0, 0, 0.003608904423872214,
      -0.001494857157676132, 0, 0, -0.0048582857624474285,
      -0.011728939377584695, 0, -32, -32.53779654087428, -0.31843347911873476,
      1,
    ],
    brightness: {
      base: 95.3073372946036,
      amp: 27.716385975338603,
      phase: -0.25,
    },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_sides.04D8.png',
    matrix3d: [
      0, -0.0048582857624474285, -0.011728939377584695, 0, 0,
      0.003608904423872214, -0.001494857157676132, 0, 0.015600585937500001, 0,
      0, 0, -31.50078125, -32.38233139647596, 0.056892580963975536, 1,
    ],
    brightness: { base: 80, amp: 30, phase: -0.5 },
  },
  {
    texture: '/assets/minecraft/textures/block/lectern_top.01GE.png',
    matrix3d: [
      0.015600585937500001, -5.949684108324402e-19, -1.4363808066152445e-18, 0,
      1.9105207633182588e-18, 0.0048582857624474285, 0.011728939377584695, 0, 0,
      -0.003608904423872214, 0.001494857157676132, 0, -32, -32.49781633803987,
      0.10472801000961157, 1,
    ],
    brightness: {
      base: 116.95518130045147,
      amp: 11.480502970952696,
      phase: 0.25,
    },
  },
  {
    texture: '/assets/minecraft/textures/block/oak_planks.00GD.png',
    matrix3d: [
      -0.015600585937500001, 0, 0, 0, 0, 0.0048582857624474285,
      0.011728939377584695, 0, 0, 0.003608904423872214, -0.001494857157676132,
      0, -32, -32.26684645491205, 0.009057151918339224, 1,
    ],
    brightness: {
      base: 43.04481869954853,
      amp: 11.480502970952696,
      phase: -0.25,
    },
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
