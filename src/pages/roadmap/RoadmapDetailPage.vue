<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import {
  APP_REPO_URL,
  findRoadmapItem,
  formatReleaseDate,
  isExternalLink,
} from '@/roadmap/roadmap';
import RoadmapMediaView from '@/components/Pages/Roadmap/RoadmapMediaView.vue';
import RoadmapStatusBadge from '@/components/Pages/Roadmap/RoadmapStatusBadge.vue';
import SsRouterBtn from '@/components/utils/base/btns/ssRouterBtn.vue';
import SsA from '@/components/utils/base/texts/ssA.vue';
import SsSubTitle from '@/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';

const route = useRoute();
const { locale, tm, rt } = useI18n();

// 詳細ページを持つのは主要な項目のみ
const item = computed(() => {
  const found = findRoadmapItem(String(route.params.id));
  return found?.major ? found : undefined;
});

/** 詳細ページの本文（段落の配列） */
const paragraphs = computed(() => {
  if (!item.value) return [];
  const detail = tm(`roadmap.items.${item.value.id}.detail`) as unknown;
  return Array.isArray(detail) ? detail.map((p) => rt(p)) : [];
});
</script>

<template>
  <div>
    <q-btn
      flat
      no-caps
      icon="arrow_back"
      to="/roadmap"
      :label="$t('roadmap.backBtn')"
      class="q-px-sm"
    />
  </div>

  <template v-if="item">
    <div>
      <SsTitle>{{ $t(`roadmap.items.${item.id}.title`) }}</SsTitle>
      <div class="row items-center q-gutter-md">
        <RoadmapStatusBadge :status="item.status" :version="item.version" />
        <span v-if="item.releasedAt" class="text-desc">
          {{
            $t('roadmap.releasedAt', {
              date: formatReleaseDate(item.releasedAt, locale),
            })
          }}
        </span>
      </div>
      <p class="q-mt-md">{{ $t(`roadmap.items.${item.id}.summary`) }}</p>
    </div>

    <!-- 項目が切り替わったときに表示中の画像の位置をリセットするため key を指定する -->
    <RoadmapMediaView
      v-if="item.media?.length"
      :key="item.id"
      :item-id="item.id"
      :media="item.media"
    />

    <div v-if="paragraphs.length">
      <p v-for="p in paragraphs" :key="p">{{ p }}</p>
    </div>

    <div v-if="item.links?.length">
      <SsSubTitle>{{ $t('roadmap.relatedLinks') }}</SsSubTitle>
      <div class="row items-center q-gutter-md">
        <template v-for="link in item.links" :key="link.to">
          <!-- 外部サイトは新しいタブで開くテキストリンク，サイト内はボタンで表示する -->
          <span v-if="isExternalLink(link.to)">
            <SsA :url="link.to">{{ $t(`roadmap.links.${link.label}`) }}</SsA>
            <q-icon name="open_in_new" class="q-ml-xs" />
          </span>
          <SsRouterBtn v-else :to="link.to">
            {{ $t(`roadmap.links.${link.label}`) }}
          </SsRouterBtn>
        </template>
      </div>
    </div>

    <div v-if="item.issues?.length" class="text-desc">
      {{ $t('roadmap.sourceLinks') }}
      <template v-for="(no, idx) in item.issues" :key="no">
        <span v-if="idx > 0">, </span>
        <SsA :url="`${APP_REPO_URL}/issues/${no}`">#{{ no }}</SsA>
      </template>
    </div>
  </template>

  <p v-else>{{ $t('roadmap.notFound') }}</p>
</template>
