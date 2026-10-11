<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  formatReleaseDate,
  groupRoadmapItems,
  RoadmapStatus,
  roadmapItems,
} from '@/roadmap/roadmap';
import RoadmapItemCard from '@/components/Pages/Roadmap/RoadmapItemCard.vue';
import RoadmapStatusBadge from '@/components/Pages/Roadmap/RoadmapStatusBadge.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';

const { locale } = useI18n();
const groups = groupRoadmapItems(roadmapItems);

/** タイムライン上のアイコン（進捗状況ごと） */
const statusIcons: Record<RoadmapStatus, string> = {
  released: 'check',
  developing: 'construction',
  planned: 'lightbulb',
};
</script>

<template>
  <div>
    <SsTitle>{{ $t('roadmap.title') }}</SsTitle>
    <p style="white-space: pre-line">{{ $t('roadmap.desc') }}</p>
  </div>

  <!-- スマホ幅では左寄せの dense 表示，それ以外は日付を左側に置く comfortable 表示 -->
  <q-timeline
    :layout="$q.screen.lt.sm ? 'dense' : 'comfortable'"
    color="primary"
    class="q-ma-none"
  >
    <q-timeline-entry
      v-for="group in groups"
      :key="group.version ?? 'planned'"
      :icon="statusIcons[group.status]"
      :color="group.status === 'released' ? 'primary' : 'grey-6'"
    >
      <template #title>
        <div class="row items-center q-gutter-sm">
          <span class="version">
            {{ group.version ? `v${group.version}` : $t('roadmap.planned') }}
          </span>
          <RoadmapStatusBadge
            v-if="group.version"
            :status="group.status"
            :version="group.version"
            hide-version
          />
        </div>
      </template>
      <template #subtitle>
        <template v-if="group.releasedAt">
          {{
            $t('roadmap.releasedAt', {
              date: formatReleaseDate(group.releasedAt, locale),
            })
          }}
        </template>
      </template>

      <p v-if="!group.version" class="text-desc">
        {{ $t('roadmap.plannedDesc') }}
      </p>
      <div class="row q-col-gutter-md">
        <div v-for="item in group.items" :key="item.id" class="col-12 col-md-6">
          <RoadmapItemCard :item="item" />
        </div>
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<style scoped lang="scss">
.version {
  font-family: 'Genokaku JP';
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
