<script setup lang="ts">
import { ModelFaces } from 'src/mcmodel/mcmodel';
import { ref } from 'vue';

export interface Props {
  duration: number /** 一回転するまでの秒数 */;
  paused: boolean /** アニメーション一時停止状態 */;
  faces: ModelFaces /** util/Mcmodelを使用して出力したモデルの情報 */;
}
defineProps<Props>();
const container = ref<HTMLDivElement>();
const size = ref(0);
const onResize = () => {
  const width = container.value?.clientWidth ?? 0;
  const height = container.value?.clientHeight ?? 0;
  size.value = Math.min(width, height);
};
</script>

<template>
  <div class="container" ref="container">
    <q-intersection :margin="`${size * 0.4}px`">
      <q-resize-observer @resize="onResize" />
      <div class="wrap">
        <div
          class="viewport"
          :style="`transform: scale3d(${size * 0.65}, ${size * 0.65}, ${
            size * 0.65
          }) rotateX(-30deg);`"
        >
          <div
            class="model"
            :style="`
          animation-duration: ${duration}s;
          animation-play-state: ${paused ? 'paused' : 'running'};
        `"
          >
            <img
              v-for="(face, i) in faces"
              :key="i"
              class="face"
              :src="face.texture"
              alt=""
              :style="`
      transform:matrix3d(${face.matrix3d.join(',')});
      --brightnessBase:${face.brightness.base}%;
      --brightnessAmp:${face.brightness.amp}%;
      animation-duration: ${duration}s;
      animation-delay: ${duration * (face.brightness.phase - 1)}s;`"
            />
          </div>
        </div>
      </div>
    </q-intersection>
  </div>
</template>
<style scoped lang="scss">
@keyframes turn {
  0% {
    transform: rotate3d(0, 1, 0, 18deg);
  }
  5% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, -342deg);
  }
}

@keyframes light {
  0% {
    filter: brightness(calc(var(--brightnessBase) - var(--brightnessAmp)));
  }
  50% {
    filter: brightness(calc(var(--brightnessBase) + var(--brightnessAmp)));
  }
  100% {
    filter: brightness(calc(var(--brightnessBase) - var(--brightnessAmp)));
  }
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}

.wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
}

.viewport {
  position: absolute;
  perspective: none;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.model {
  transform-style: preserve-3d;
  animation-name: turn;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.face {
  position: absolute;
  animation-name: light;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  image-rendering: pixelated;
  backface-visibility: hidden;
  width: 64px;
  height: 64px;
  animation-play-state: inherit;
}
</style>
