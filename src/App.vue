<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import { Page } from './router/routes';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';
import Model from './components/utils/base/mcModel/3dModel.vue';
import { resolveModelFaces } from '../util/McModel/src/main';

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

const model = {
  elements: [
    {
      from: [0, 0, 0],
      to: [16, 16, 16],
      faces: {
        north: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_front',
        },
        south: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_front',
        },
        west: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_side',
        },
        east: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_side',
        },
        up: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_top',
        },
        down: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_top',
        },
      },
    },
  ],
};

const model2 = {
  parent: 'block/block',
  display: {
    firstperson_righthand: {
      rotation: [0, 135, 0],
      translation: [0, 0, 0],
      scale: [0.4, 0.4, 0.4],
    },
  },
  textures: {
    particle: 'block/lectern_sides',
    bottom: 'block/oak_planks',
    base: 'block/lectern_base',
    front: 'block/lectern_front',
    sides: 'block/lectern_sides',
    top: 'block/lectern_top',
  },
  elements: [
    {
      from: [0, 0, 0],
      to: [16, 2, 16],
      faces: {
        north: {
          uv: [0, 14, 16, 16],
          texture: 'block/lectern_base',
          cullface: 'north',
        },
        east: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'east',
        },
        south: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'south',
        },
        west: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'west',
        },
        up: {
          uv: [0, 0, 16, 16],
          rotation: 180,
          texture: 'block/lectern_base',
        },
        down: {
          uv: [0, 0, 16, 16],
          texture: 'block/oak_planks',
          cullface: 'down',
        },
      },
    },
    {
      from: [4, 2, 4],
      to: [12, 15, 12],
      faces: {
        north: { uv: [0, 0, 8, 13], texture: 'block/lectern_front' },
        east: {
          uv: [2, 16, 15, 8],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
        south: { uv: [8, 3, 16, 16], texture: 'block/lectern_front' },
        west: {
          uv: [2, 8, 15, 16],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
      },
    },
    {
      from: [0.0125, 12, 3],
      to: [15.9875, 16, 16],
      rotation: { angle: -22.5, axis: 'x', origin: [8, 8, 8] },
      faces: {
        north: { uv: [0, 0, 16, 4], texture: 'block/lectern_sides' },
        east: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        south: { uv: [0, 4, 16, 8], texture: 'block/lectern_sides' },
        west: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        up: { uv: [0, 1, 16, 14], rotation: 180, texture: 'block/lectern_top' },
        down: { uv: [0, 0, 16, 13], texture: 'block/oak_planks' },
      },
    },
  ],
};
const faces = resolveModelFaces(model2);
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
