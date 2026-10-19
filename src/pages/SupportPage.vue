<script setup lang="ts">
import { donationOptions, supportWays } from '@/scripts/support';
import DonationOptionCard from '@/components/Pages/Support/DonationOptionCard.vue';
import SupportIcon from '@/components/Pages/Support/SupportIcon.vue';
import SupportWayCard from '@/components/Pages/Support/SupportWayCard.vue';
import SsRouterBtn from '@/components/utils/base/btns/ssRouterBtn.vue';
import SsSubTitle from '@/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';
</script>

<template>
  <div class="mainField">
    <div>
      <SsTitle>{{ $t('support.title') }}</SsTitle>
      <p class="pre-line">{{ $t('support.desc') }}</p>
    </div>

    <!-- 寄付（本体アプリの寄付ダイアログと同じ選択肢・決済ページ） -->
    <section>
      <SsSubTitle>{{ $t('support.donation.title') }}</SsSubTitle>
      <div class="row items-center no-wrap q-mb-lg">
        <!-- スマホ幅では本文の幅を確保するためにアイコンを小さくする -->
        <SupportIcon
          icon="volunteer_activism"
          :size="$q.screen.xs ? '3rem' : '4rem'"
          class="q-mr-md"
        />
        <p class="pre-line q-mb-none">{{ $t('support.donation.desc') }}</p>
      </div>

      <div class="select q-mb-sm">{{ $t('support.donation.select') }}</div>
      <!-- PC 幅では4列，タブレット・スマホ幅では2列に並べる -->
      <div class="row q-col-gutter-md">
        <div
          v-for="option in donationOptions"
          :key="option.id"
          class="col-6 col-md-3"
        >
          <DonationOptionCard :option="option" />
        </div>
      </div>

      <div class="row items-center no-wrap q-mt-md text-desc note">
        <q-icon name="lock" size="1rem" class="q-mr-xs" />
        <span>{{ $t('support.donation.note') }}</span>
      </div>
    </section>

    <!-- 寄付以外の応援方法 -->
    <section>
      <SsSubTitle>{{ $t('support.others.title') }}</SsSubTitle>
      <p>{{ $t('support.others.desc') }}</p>
      <div class="row q-col-gutter-md">
        <div v-for="way in supportWays" :key="way.id" class="col-12 col-md-4">
          <SupportWayCard :way="way" />
        </div>
      </div>
    </section>

    <!-- 開発の予定を知ってもらうためのロードマップへの導線 -->
    <section class="column items-center text-center q-gutter-md">
      <p class="q-mb-none">{{ $t('support.roadmap.desc') }}</p>
      <SsRouterBtn to="/roadmap">{{ $t('support.roadmap.btn') }}</SsRouterBtn>
    </section>
  </div>
</template>

<style scoped lang="scss">
.pre-line {
  white-space: pre-line;
}

.select {
  font-family: 'Genokaku JP';
  font-weight: 600;
}

.note {
  opacity: 0.7;
}
</style>
