<!--
  寄付サービスを指定して寄付ページへ移動するページ（`/support/donate?service={識別子}`）

  本体アプリの寄付ダイアログから開かれ，指定されたサービスの寄付ページへ移動する。
  対応するサービスがない場合はルート定義（`src/router/routes.ts`）で応援ページへ移動するため，このページは描画されない。
-->
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findDonationServiceByQuery } from '@/scripts/support';
import LoadingLogo from '@/components/utils/animation/LoadingLogo.vue';
import SsBtn from '@/components/utils/base/btns/ssBtn.vue';
import SsA from '@/components/utils/base/texts/ssA.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';

const route = useRoute();
const service = computed(() => findDonationServiceByQuery(route.query));

onMounted(() => {
  // 戻るボタンでこのページに戻って再び移動しないよう，履歴を置き換えて移動する
  if (service.value) window.location.replace(service.value.url);
});
</script>

<template>
  <!-- タイトル・説明文・ボタンをひとまとまりとして画面の中央に表示する -->
  <div v-if="service" class="mainField redirect">
    <div class="column items-center text-center">
      <SsTitle>
        <!-- 寄付ページへの移動中であることを，ロゴを描くアニメーションで示す -->
        <template #icon><LoadingLogo /></template>
        {{ $t('support.donation.redirect.title') }}
      </SsTitle>
      <p>{{ $t('support.donation.redirect.desc') }}</p>
      <!-- 自動で移動しなかった場合の手動の導線（自動の移動と同じく同じタブで開く） -->
      <SsBtn
        icon="open_in_new"
        :href="service.url"
        :label="$t('support.donation.redirect.btn')"
      />
      <SsA url="/support" class="q-mt-lg">
        {{ $t('support.donation.redirect.backBtn') }}
      </SsA>
    </div>
  </div>
</template>

<style scoped lang="scss">
.redirect {
  // 縦幅が足りない場合に上側が画面外へはみ出して見えなくならないよう safe を付ける
  justify-content: safe center;
}
</style>
