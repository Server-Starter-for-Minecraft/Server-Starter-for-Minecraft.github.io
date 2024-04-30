<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import { Page } from './router/routes';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';
import Model from './components/utils/base/McModel.vue';
import { convertModelProps } from 'app/util/McModel/src/main';

import acacia_slab from 'src/mcmodel/minecraft/mcmodels/block/acacia_slab.json';
import stone from 'src/mcmodel/minecraft/mcmodels/block/stone.json';
import brewing_stand_bottle0 from 'src/mcmodel/minecraft/mcmodels/block/brewing_stand_bottle0.json';
import slime_block from 'src/mcmodel/minecraft/mcmodels/block/slime_block.json';
import lantern_hanging from 'src/mcmodel/minecraft/mcmodels/block/lantern_hanging.json';
import lectern from 'src/mcmodel/minecraft/mcmodels/block/lectern.json';
import lily_of_the_valley from 'src/mcmodel/minecraft/mcmodels/block/lily_of_the_valley.json';
import campfire from 'src/mcmodel/minecraft/mcmodels/block/campfire.json';

const models = [
  acacia_slab,
  stone,
  brewing_stand_bottle0,
  slime_block,
  lantern_hanging,
  lectern,
  lily_of_the_valley,
  campfire
];

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
</script>

<template>
  <div class="test">
    <Model
      v-for="(model, i) in models"
      :duration="4"
      :paused="false"
      :faces="model"
      :key="i"
    />
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
