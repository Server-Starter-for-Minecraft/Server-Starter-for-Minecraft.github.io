<script setup lang="ts">
import { computed, ref } from 'vue';
import { RoadmapMedia } from '@/roadmap/roadmap';

/**
 * ロードマップの詳細ページに掲載するスクリーンショット・GIF の表示欄
 *
 * 画像が1枚の場合はそのまま表示し，複数枚の場合はカルーセルで切り替えて表示する
 *
 * @prop itemId キャプションの i18n キーを解決するための項目の識別子
 * @prop media 表示する画像の一覧
 */
interface Prop {
  itemId: string;
  media: RoadmapMedia[];
}
const prop = defineProps<Prop>();

const slide = ref(0);
const current = computed(() => prop.media[slide.value]);

/** 画像のキャプション（未設定の場合は空文字） */
function captionOf(m: RoadmapMedia | undefined) {
  return m?.caption ? `roadmap.items.${prop.itemId}.captions.${m.caption}` : '';
}
</script>

<template>
  <figure class="q-ma-none media-field">
    <div class="frame" :class="{ 'frame-dark': $q.dark.isActive }">
      <q-carousel
        v-if="media.length > 1"
        v-model="slide"
        animated
        swipeable
        infinite
        arrows
        control-color="primary"
        class="fit bg-transparent"
      >
        <q-carousel-slide
          v-for="(m, idx) in media"
          :key="m.src"
          :name="idx"
          class="q-pa-none"
        >
          <!-- スマホでは画像が小さくなるため，タップで原寸の画像を開けるようにする -->
          <a :href="m.src" target="_blank" class="block fit">
            <img
              :src="m.src"
              :alt="captionOf(m) ? $t(captionOf(m)) : ''"
              class="fit img"
            />
          </a>
        </q-carousel-slide>
      </q-carousel>
      <a
        v-else-if="current"
        :href="current.src"
        target="_blank"
        class="block fit"
      >
        <img
          :src="current.src"
          :alt="captionOf(current) ? $t(captionOf(current)) : ''"
          class="fit img"
        />
      </a>
    </div>
    <!-- 切り替え用のドットは画像に重ならないように表示枠の下に置く -->
    <div v-if="media.length > 1" class="row justify-center q-mt-xs">
      <q-btn
        v-for="(m, idx) in media"
        :key="m.src"
        flat
        round
        dense
        size="xs"
        icon="circle"
        :color="idx === slide ? 'primary' : 'grey-5'"
        :aria-label="
          $t('roadmap.mediaIndex', { n: idx + 1, total: media.length })
        "
        @click="slide = idx"
      />
    </div>
    <figcaption v-if="captionOf(current)" class="text-desc text-center q-mt-sm">
      {{ $t(captionOf(current)) }}
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.media-field {
  width: 100%;
  max-width: 960px;
  align-self: center;
}

// スクリーンショットの縦横比（16:10）に合わせた表示枠
.frame {
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  overflow: hidden;
}

.frame-dark {
  border-color: rgba(255, 255, 255, 0.28);
}

.img {
  display: block;
  object-fit: contain;
}
</style>
