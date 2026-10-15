<script setup lang="ts">
import { RoadmapStatus } from '@/roadmap/roadmap';

/**
 * ロードマップの項目の進捗状況とリリースバージョンを示すバッジ
 *
 * @prop status 進捗状況
 * @prop version リリースバージョン（省略時は「バージョン未定」と表示）
 * @prop hideVersion バージョンのバッジを表示しない（見出しにバージョンを表示済みの場合など）
 */
interface Prop {
  status: RoadmapStatus;
  version?: string | undefined;
  hideVersion?: boolean;
}
defineProps<Prop>();

/** 進捗状況ごとのバッジの配色 */
const statusColors: Record<RoadmapStatus, { color: string; text: string }> = {
  released: { color: 'positive', text: 'white' },
  developing: { color: 'warning', text: 'black' },
  planned: { color: 'grey-7', text: 'white' },
};
</script>

<template>
  <div class="row items-center q-gutter-xs">
    <q-badge
      :color="statusColors[status].color"
      :text-color="statusColors[status].text"
      class="badge"
    >
      {{ $t(`roadmap.status.${status}`) }}
    </q-badge>
    <q-badge v-if="!hideVersion" outline color="grey-6" class="badge">
      {{ version ? `v${version}` : $t('roadmap.versionTBD') }}
    </q-badge>
  </div>
</template>

<style scoped lang="scss">
.badge {
  font-family: 'Genokaku JP';
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}
</style>
