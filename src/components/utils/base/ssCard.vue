<script setup lang="ts">
import { getCssVar } from 'quasar';

/**
 * 標準のカード
 *
 * @prop lineColor カードの左に引く線の色（Quasar のブランド色の名前または CSS の色）
 * @prop fill カードを親の高さいっぱいに広げ，`actions` をカードの下端に置くか
 *            （並べたカードの高さをそろえたときに，操作の位置もそろえるために使う）
 * @slot default カードの中身
 * @slot actions カードの右下に置く操作（ボタン・リンクなど）
 */
interface Prop {
  lineColor?: string;
  fill?: boolean;
}
defineProps<Prop>();
</script>

<template>
  <q-card
    :flat="$q.dark.isActive"
    class="card"
    :class="{ 'full-height': fill }"
    :style="
      lineColor
        ? {
            'border-left': `.5rem solid ${getCssVar(lineColor) ?? lineColor}`,
          }
        : {}
    "
  >
    <q-card-section :class="{ 'column full-height no-wrap': fill }">
      <slot />

      <div
        v-if="$slots.actions"
        class="column items-end"
        :class="{ 'q-mt-auto': fill }"
      >
        <div class="col row q-gutter-md">
          <slot name="actions" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.card {
  border-radius: 5px;
}
</style>
