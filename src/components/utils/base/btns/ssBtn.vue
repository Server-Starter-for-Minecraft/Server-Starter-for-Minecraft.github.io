<script setup lang="ts">
import { useQuasar } from 'quasar';
interface Prop {
  icon?: string;
  label?: string | undefined;
  dense?: boolean;
  color?: string;
  width?: string;
  disable?: boolean;
  loading?: boolean;
  isCapital?: boolean;
  to?: string;
  /** 外部ページなどへのリンク（`target` を指定しない場合は同じタブで開く） */
  href?: string;
  /**
   * `href` のリンクを開く先（新しいタブで開く場合は `_blank`）
   *
   * `_blank` の場合は，開いた先のページから元のページを操作されないよう `rel="noopener noreferrer"` を自動で付ける
   */
  target?: string | undefined;
  onClick?: () => void;
}
const prop = defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-btn
    outline
    :dense="dense"
    :icon="icon"
    :label="label"
    :disable="loading || disable"
    :loading="loading"
    :no-caps="!isCapital"
    :to="to"
    :href="href"
    :target="target"
    :rel="prop.target === '_blank' ? 'noopener noreferrer' : undefined"
    @click="onClick"
    :color="isDark() ? 'primary' : ''"
    :class="isDark() ? '' : 'light'"
    class="btn text"
  >
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.light {
  background-color: $primary !important;
}

.text {
  font-family: 'Genokaku JP';
  font-weight: bold;
  font-size: 0.9rem;
}

.btn {
  border-radius: 5px;
}
</style>
