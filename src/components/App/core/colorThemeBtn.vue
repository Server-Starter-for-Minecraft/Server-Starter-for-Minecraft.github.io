<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

/**
 * 呼び出すたびに逆のカラーテーマに変更する
 */
function changeColorTheme() {
  $q.dark.set(!$q.dark.isActive);
}
</script>

<template>
  <q-btn
    dense
    outline
    color="transparent"
    class="q-mx-md"
    @click="changeColorTheme"
  >
    <q-avatar square size="2rem" class="q-ma-xs">
      <q-img src="/icons/colorTheme/auto.svg" class="fit" />
    </q-avatar>
  </q-btn>
</template>
