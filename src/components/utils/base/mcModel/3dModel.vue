<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import type { ModelFaces } from './scripts/main';

export interface Props {
  duration: number /** 一回転するまでの秒数 */;
  paused: boolean /** アニメーション一時停止状態 */;
  faces: ModelFaces /** アニメーション一時停止状態 */;
}
defineProps<Props>();

const mounted = ref(false);

const container = ref();
const size = ref(0);

const updateSize = () => {
  const width = container.value?.clientWidth;
  const height = container.value?.clientHeight;
  size.value = Math.min(width, height);
};

onMounted(() => {
  updateSize();
  mounted.value = true;
});

addEventListener('resize', updateSize);
onUnmounted(() => removeEventListener('resize', updateSize));
</script>

<template>
  <div class="container" ref="container">
    <q-intersection :margin="`${size * 0.4}px`">
      <div class="wrap">
        <div
          v-if="mounted"
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
              :style="
                `
      transform:matrix3d(${face.matrix3d.join(',')});
      --brightnessBase:${face.brightness.base}%;
      --brightnessAmp:${face.brightness.amp}%;
      animation-duration: ${duration}s;
      animation-delay: ${duration * (face.brightness.phase - 1)}s;
      clip-path:xywh(` +
                face.xywh
                  .map((x) => (x === 0 ? '0' : `${x * 16}px`))
                  .join(' ') +
                ');'
              "
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
  background-color: #fff;
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
  width: 16px;
  height: 16px;
  animation-play-state: inherit;
}
</style>
