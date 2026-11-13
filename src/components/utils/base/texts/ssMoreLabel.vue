<script setup lang="ts">
/**
 * リンクになっているカード（SsLinkCard）の右下に添える「詳細を見る」などの案内
 *
 * カード全体がリンクであることを示す
 *
 * @prop icon 文言の右に添えるアイコン（Material Icons の名前。ページ遷移は `navigate_next`）
 * @slot default 案内の文言
 */
interface Prop {
  icon: string;
}
defineProps<Prop>();
</script>

<template>
  <div class="row justify-end items-center more">
    <slot />
    <q-icon :name="icon" size="1.2rem" />
  </div>
</template>

<style scoped lang="scss">
.more {
  font-family: 'Genokaku JP';
  font-size: 0.85rem;
  color: $primary;
}

// ライトモードでは黄緑の文字が読みにくいため，下線で強調する
.body--light .more {
  color: inherit;
  text-decoration: underline $primary 3px;
}
</style>
