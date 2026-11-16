<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { DonationService, resolveLocalizedText } from '@/scripts/donation';
import SsBtn from '@/components/utils/base/btns/ssBtn.vue';
import SsCard from '@/components/utils/base/ssCard.vue';

/**
 * 寄付サービス1つ分のカード
 *
 * 応援ページの中で最も目立たせたい項目のため，左にテーマ色の線を引いて強調し，
 * 右側にサービスの寄付ページ（OFUSE など）を開くボタンを置く
 *
 * @prop service 表示する寄付サービス（寄付ページは新しいタブで開く）
 */
interface Prop {
  service: DonationService;
}
defineProps<Prop>();
const { locale } = useI18n();
</script>

<template>
  <SsCard line-color="primary">
    <div class="row items-center q-gutter-md">
      <!--
        配布元のロゴがあればそのまま表示し，なければ Material Icons で代用する
        （SsImg はダークモードで膜を重ねてロゴの色が変わるため，素の img を用いる）
      -->
      <img v-if="service.logo" :src="service.logo" alt="" class="logo" />
      <q-icon v-else name="volunteer_activism" size="3rem" class="icon" />

      <div class="col info">
        <div class="card-title">
          {{ $t('support.donation.serviceTitle', { name: service.name }) }}
        </div>
        <p class="card-desc q-mt-xs q-mb-none">
          {{ resolveLocalizedText(service.description, locale) }}
        </p>
      </div>

      <!-- スマホ幅で次の行へ送られた場合も右端に置く -->
      <SsBtn
        icon="open_in_new"
        :href="service.url"
        :target="'_blank'"
        :label="$t('support.donation.serviceBtn', { name: service.name })"
        class="q-ml-auto"
      />
    </div>
  </SsCard>
</template>

<style scoped lang="scss">
.logo {
  width: 3rem;
  height: 3rem;
  // 配布元のロゴを加工しないよう，縦横比を保って枠に収める
  object-fit: contain;
}

// ロゴには透過している部分（白で見せる想定の部分）があるため，ダークモードでは白の面を敷く
.body--dark .logo {
  background-color: white;
  border-radius: 5px;
  padding: 0.2rem;
}

// スマホ幅ではボタンを次の行へ送り，説明文の幅を確保する
.info {
  min-width: 14rem;
}

.body--dark .icon {
  color: $primary;
}
</style>
