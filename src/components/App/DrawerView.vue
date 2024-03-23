<script setup lang="ts">
import { Page } from 'src/router/routes';
import { useSystemStore } from 'src/stores/SystemStore';
import ColorThemeBtn from './core/colorThemeBtn.vue';
import LanguageSelecter from './core/languageSelecter.vue';

interface Prop {
  showingPages: { key: Page; icon: string }[];
}
defineProps<Prop>();

const sysStore = useSystemStore();
</script>

<template>
  <q-drawer v-model="sysStore.drawer" side="right">
    <div class="vertical-scroll">
      <div class="row items-center q-ma-md">
        <q-img src="/icons/systemLogo.svg" style="width: 1.5rem" />
        <q-space />
        <q-btn icon="close" flat dense @click="sysStore.drawer = false" />
      </div>

      <q-list padding class="full-width">
        <template v-for="page in showingPages" :key="page.key">
          <q-item clickable :to="`/${page.key}`" style="font-size: 1rem">
            <q-item-section avatar>
              <q-icon :name="page.icon" size="1.5rem" />
            </q-item-section>
            <q-item-section>
              {{ $t(`layout.header.pages.${page.key}`) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>

      <q-space />
      <q-separator inset class="q-my-md" />

      <div class="row items-center q-mx-md">
        <span class="col"> カラーテーマ変更 </span>
        <ColorThemeBtn class="col-1" />
      </div>

      <LanguageSelecter :dark="$q.dark.isActive" class="q-pa-md" />
    </div>
  </q-drawer>
</template>
