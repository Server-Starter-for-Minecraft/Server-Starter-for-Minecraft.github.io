<script setup lang="ts">
/**
 * 「プロジェクトを応援！」ページで用いる，円形の背景を敷いたアイコン
 *
 * テーマ色（primary）は明るい緑のため，ライトモードでは背景に敷いてアイコンを濃色に，
 * ダークモードでは背景を薄く敷いてアイコンをテーマ色にして，どちらでも読みやすくする
 *
 * @prop icon Material Icons の名前
 * @prop size アイコン全体（円）の大きさ（CSS の長さ）
 */
interface Prop {
  icon: string;
  size?: string;
}
withDefaults(defineProps<Prop>(), { size: '3rem' });
</script>

<template>
  <q-avatar
    :size="size"
    :icon="icon"
    :class="$q.dark.isActive ? 'icon-dark' : 'icon-light'"
    class="support-icon"
  />
</template>

<style scoped lang="scss">
// 横並び・縦並びのどちらに置いても円が潰れないように，縮小させない
.support-icon {
  flex-shrink: 0;
}

.icon-light {
  background-color: $primary;
  color: $dark;
}

.icon-dark {
  background-color: rgba($primary, 0.15);
  color: $primary;
}
</style>
