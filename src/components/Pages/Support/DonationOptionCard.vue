<script setup lang="ts">
import { DonationOption, formatYen } from '@/scripts/support';
import SsLinkCard from '@/components/utils/base/ssLinkCard.vue';
import SupportIcon from './SupportIcon.vue';

/**
 * 寄付の選択肢1つ分のカード
 *
 * クリックすると選択肢に対応する寄付ページ（Square の決済ページ）を新しいタブで開く
 *
 * @prop option 表示する寄付の選択肢
 */
interface Prop {
  option: DonationOption;
}
defineProps<Prop>();
</script>

<template>
  <SsLinkCard :url="option.url">
    <div class="column items-center justify-center text-center q-pa-md fit">
      <SupportIcon :icon="option.icon" size="3rem" />
      <div v-if="option.amount !== void 0" class="amount q-mt-sm">
        {{ formatYen(option.amount) }}
      </div>
      <div v-else class="amount amount--text q-mt-sm">
        {{ $t(`support.donation.options.${option.id}.title`) }}
      </div>
      <div class="caption">
        {{ $t(`support.donation.options.${option.id}.desc`) }}
      </div>
    </div>
  </SsLinkCard>
</template>

<style scoped lang="scss">
.amount {
  font-family: 'Genokaku JP';
  font-size: 1.5rem;
  line-height: 2.2rem;
  font-weight: bold;

  // 金額以外の文言（「金額を指定」など）は金額と見た目の大きさを揃えるため小さめにする
  // 狭い幅で折り返した場合に行間が開きすぎないよう，行の高さも詰める
  &--text {
    font-size: 1.15rem;
    line-height: 1.5rem;
  }
}

.caption {
  font-family: 'Genokaku JP';
  font-size: 0.8rem;
  opacity: 0.72;
}
</style>
