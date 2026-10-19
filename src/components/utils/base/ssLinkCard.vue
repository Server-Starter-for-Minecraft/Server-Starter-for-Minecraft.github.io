<script setup lang="ts">
/**
 * カード全体が外部サイトへのリンクになるカード
 *
 * リンク先は新しいタブで開く。ホバー時・キーボードでのフォーカス時にテーマ色の枠線で強調し，
 * 選択できることが伝わるようにする
 *
 * @prop url リンク先（外部サイトの URL）
 */
interface Prop {
  url: string;
}
defineProps<Prop>();
</script>

<template>
  <q-card
    tag="a"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    flat
    bordered
    class="link-card"
  >
    <slot />
  </q-card>
</template>

<style scoped lang="scss">
// リンク化したカードの文字色が既定のリンク色にならないように指定
.link-card,
.link-card:hover,
.link-card:visited {
  display: block;
  color: inherit;
  text-decoration: none;
}

.link-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition:
    border-color 0.15s,
    transform 0.15s;

  &:hover,
  &:focus-visible {
    border-color: $primary;
    transform: translateY(-2px);
  }

  // キーボード操作時にどのカードを選択しているかが分かるよう，枠線の外側にも強調線を表示する
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
}

// ライトモードでは明るいテーマ色が白背景に埋もれるため，テーマ色に黒を混ぜた濃い緑で強調する
// （Sass の darken() は非推奨のため，CSS 標準の color-mix() を用いる）
body.body--light .link-card {
  &:hover,
  &:focus-visible {
    border-color: color-mix(in srgb, $primary 50%, black);
  }

  &:focus-visible {
    outline-color: color-mix(in srgb, $primary 50%, black);
  }
}
</style>
