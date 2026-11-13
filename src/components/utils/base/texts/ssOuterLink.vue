<script setup lang="ts">
import SsA from './ssA.vue';

/**
 * 外部サイトを新しいタブで開くテキストリンク（右に `open_in_new` のアイコンを添える）
 *
 * ロードマップの詳細ページの関連リンクなど，外部サイトへのリンクはこの形にそろえる
 *
 * @prop url リンク先（外部サイトの URL）
 * @slot default リンクの文言
 */
interface Prop {
  url: string;
}
defineProps<Prop>();
</script>

<template>
  <!-- 幅が狭い場所でもアイコンだけが次の行へ送られないよう，改行させない -->
  <span class="no-wrap">
    <SsA :url="url"><slot /></SsA>
    <q-icon name="open_in_new" class="q-ml-xs" />
  </span>
</template>
