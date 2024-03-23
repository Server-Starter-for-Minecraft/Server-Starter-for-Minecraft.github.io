<script setup lang="ts">
import { getCssVar } from 'quasar';
import { useSystemStore } from 'src/stores/SystemStore';
import { Page } from 'src/router/routes';
import TitleView from '../HOME/TitleView.vue';
import colorThemeBtn from './core/colorThemeBtn.vue';
import languageSelecter from './core/languageSelecter.vue';

interface Prop {
  showingPages: Page[];
}
defineProps<Prop>();

const sysStore = useSystemStore();
</script>

<template>
  <q-header bordered :style="{ 'background-color': getCssVar('dark') }">
    <q-toolbar>
      <q-btn no-caps flat to="/">
        <div class="row items-center text-left">
          <q-img src="/icons/systemLogo.svg" class="col-1 logo" />
          <div class="col logo-text">
            <TitleView fontsize="1.3rem" />
          </div>
        </div>
      </q-btn>

      <q-space />

      <div class="gt-sm">
        <template v-for="(page, idx) in showingPages" :key="page">
          <span v-if="idx > 0" class="q-mx-sm">/</span>
          <RouterLink :to="`/${page}`">
            {{ $t(`layout.header.pages.${page}`) }}
          </RouterLink>
        </template>
      </div>

      <colorThemeBtn class="gt-sm" />
      <languageSelecter dark class="gt-sm" />

      <q-btn
        dense
        round
        icon="menu"
        class="lt-md"
        @click="sysStore.drawer = true"
      />
    </q-toolbar>
    <q-separator color="primary" size="3px" class="line" />
  </q-header>
</template>

<style scoped lang="scss">
// クリックした後でも色が変わらないように指定
a,
a:hover,
a:visited {
  color: inherit;
}

.logo {
  margin-right: 1rem;
  width: 1.3rem;
}

.logo-text {
  padding-top: 6px;
}

.line {
  position: relative;
  top: 1px;
}
</style>
