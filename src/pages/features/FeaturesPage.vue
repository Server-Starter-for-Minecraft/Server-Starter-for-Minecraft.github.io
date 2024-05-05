<script setup lang="ts">
import { FeatureCardProp } from 'src/components/Pages/Features/iFeatureCard';
import FeatureCard from 'src/components/Pages/Features/FeatureCard.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';

import { crafting_table } from 'src/mcmodel/minecraft/mcmodels/block/crafting_table';
import { campfire } from 'src/mcmodel/minecraft/mcmodels/block/campfire';
import { grindstone } from 'src/mcmodel/minecraft/mcmodels/block/grindstone';
import { chest_minecart } from 'src/mcmodel/serverstarter/mcmodels/block/chest_minecart';
import { anvil } from 'src/mcmodel/minecraft/mcmodels/block/anvil';
import { command_block } from 'src/mcmodel/minecraft/mcmodels/block/command_block';
import { creeper } from 'src/mcmodel/serverstarter/mcmodels/block/creeper';
import { bookshelf } from 'src/mcmodel/minecraft/mcmodels/block/bookshelf';

const cards: FeatureCardProp[] = [
  {
    i18nKey: 'create_world',
    faces: crafting_table,
    to: '/features/create-world',
  },
  {
    i18nKey: 'open_server',
    faces: campfire,
    to: '/intro/run-server',
  },
  {
    i18nKey: 'setting_world',
    faces: grindstone,
    to: '/features/world-settings',
  },
  {
    i18nKey: 'open_port',
    faces: chest_minecart,
    to: '/features/auto-port-mapping',
  },
  {
    i18nKey: 'support_servers',
    faces: anvil,
    to: '/features/servers',
  },
  {
    i18nKey: 'add_contents',
    faces: command_block,
  },
  {
    i18nKey: 'manage_players',
    faces: creeper,
  },
  {
    i18nKey: 'make_backup',
    faces: bookshelf,
  },
];
</script>

<template>
  <div>
    <SsTitle>機能一覧</SsTitle>
    <p>
      ServerStarterではマルチプレイのためのたくさんの機能を取り揃えています！<br />
      たくさんの機能を使いこなして，快適なマルチプレイライフを送りましょう！！
    </p>
  </div>

  <div class="q-gutter-md row justify-center">
    <div
      v-for="card in cards"
      :key="card.i18nKey"
      class="col"
      style="min-width: max(20rem, 20vw);max-width: max(20rem, 20vw)"
    >
      <FeatureCard :i18n-key="card.i18nKey" :faces="card.faces" :to="card.to" />
    </div>
  </div>
</template>
