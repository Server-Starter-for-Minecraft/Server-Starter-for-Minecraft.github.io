<script setup lang="ts">
import { ref } from 'vue';
import { getCssVar, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useSystemStore } from 'src/stores/SystemStore';
import TitleView from '../HOME/TitleView.vue';
import SsSelect from '../utils/base/expands/ssSelect.vue';

const $q = useQuasar();
const t = useI18n();
const lang = ref(t.locale.value);
const sysStore = useSystemStore();

const pages: string[] = ['intro', 'features', 'q_a', 'terms'];
type Locale = 'ja' | 'en-US';
const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en-US', label: 'English' },
];

/**
 * 呼び出すたびに逆のカラーテーマに変更する
 */
function changeColorTheme() {
  $q.dark.set(!$q.dark.isActive);
}

function changeLocale(loc: Locale) {
  t.locale.value = loc;
}
</script>

<template>
  <q-header bordered :style="{ 'background-color': getCssVar('dark') }">
    <q-toolbar>
      <q-btn no-caps flat to="/">
        <div class="row items-center text-left">
          <q-img src="icons/systemLogo.svg" class="col-1 logo" />
          <div class="col logo-text">
            <TitleView fontsize="1.3rem" />
          </div>
        </div>
      </q-btn>

      <q-space />

      <div class="gt-sm">
        <template v-for="(page, idx) in pages" :key="page">
          <span v-if="idx > 0" class="q-mx-sm">/</span>
          <RouterLink :to="`/${page}`">
            {{ $t(`layout.header.pages.${page}`) }}
          </RouterLink>
        </template>
      </div>

      <q-btn
        dense
        outline
        color="transparent"
        class="q-mx-md gt-sm"
        @click="changeColorTheme"
      >
        <q-avatar square size="2rem" class="q-ma-xs">
          <q-img src="icons/colorTheme/auto.svg" />
        </q-avatar>
      </q-btn>

      <SsSelect
        dense
        dark
        v-model="lang"
        @update:model-value="(newVal) => changeLocale(newVal)"
        :options="localeOptions"
        option-label="label"
        option-value="value"
        class="gt-sm"
      />

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
