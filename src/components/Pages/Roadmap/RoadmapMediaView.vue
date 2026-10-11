<script setup lang="ts">
import { computed, ref } from 'vue';
import { QCarousel, useQuasar } from 'quasar';
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

const $q = useQuasar();
const slide = ref(0);
// ライトモードでは黄緑の矢印が背景に溶け込むため，濃い灰色で表示する
const arrowColor = computed(() => ($q.dark.isActive ? 'primary' : 'grey-8'));
const current = computed(() => prop.media[slide.value]);
// 矢印ボタンから q-carousel の next / previous を呼び出す（infinite 指定時は端で正しい向きに折り返す）
const carousel = ref<QCarousel>();
// スマホ幅では画像を広く見せるため矢印を表示しない（スワイプとドットで切り替える）
const showArrows = computed(() => prop.media.length > 1 && !$q.screen.lt.sm);

/** 画像を自動で切り替える間隔（ミリ秒） */
const AUTOPLAY_INTERVAL = 6000;
// 動きを減らす設定が有効な環境では自動で切り替えない（表示時に一度だけ判定する）
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** マウスで画像・矢印をホバーしている間は自動切り替えを止める */
const hovering = ref(false);
/** キーボード操作で画像・ボタンにフォーカスしている間も自動切り替えを止める */
const focusing = ref(false);
const autoplay = computed(() =>
  reduceMotion || hovering.value || focusing.value ? false : AUTOPLAY_INTERVAL
);

/**
 * ホバー状態を更新する
 *
 * タッチ操作でもタップ時に pointerenter が発生し，自動切り替えが止まったままになるため，
 * マウス操作（PC）の場合のみ反映する
 *
 * @param e ポインターイベント
 * @param value ホバー中かどうか
 */
function setHovering(e: PointerEvent, value: boolean) {
  if (e.pointerType === 'mouse') hovering.value = value;
}

/** 画像のキャプション（未設定の場合は空文字） */
function captionOf(m: RoadmapMedia | undefined) {
  return m?.caption ? `roadmap.items.${prop.itemId}.captions.${m.caption}` : '';
}
</script>

<template>
  <!-- 自動切り替えを止める範囲は画像と矢印・ドットを含む表示欄全体とする -->
  <figure
    class="q-ma-none media-field"
    @pointerenter="setHovering($event, true)"
    @pointerleave="setHovering($event, false)"
    @focusin="focusing = true"
    @focusout="focusing = false"
  >
    <!-- 切り替え用の矢印ボタンは画像に重ならないように表示枠の左右に置く -->
    <div class="row no-wrap items-center">
      <q-btn
        v-if="showArrows"
        flat
        round
        dense
        :color="arrowColor"
        icon="chevron_left"
        class="arrow-btn"
        :aria-label="$t('roadmap.prevImage')"
        @click="carousel?.previous()"
      />
      <div class="frame" :class="{ 'frame-dark': $q.dark.isActive }">
        <q-carousel
          v-if="media.length > 1"
          ref="carousel"
          v-model="slide"
          :autoplay="autoplay"
          animated
          swipeable
          infinite
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
      <q-btn
        v-if="showArrows"
        flat
        round
        dense
        :color="arrowColor"
        icon="chevron_right"
        class="arrow-btn"
        :aria-label="$t('roadmap.nextImage')"
        @click="carousel?.next()"
      />
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
// （PC では矢印ボタンを左右に置くため，残りの幅いっぱいに広げる）
.frame {
  flex: 1 1 0;
  min-width: 0;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  overflow: hidden;
}

.frame-dark {
  border-color: rgba(255, 255, 255, 0.28);
}

.arrow-btn {
  flex: none;
}

.img {
  display: block;
  object-fit: contain;
}
</style>
