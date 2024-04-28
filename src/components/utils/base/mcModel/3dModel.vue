<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import BlockFace, {
  type Prop,
} from 'src/components/utils/base/mcModel/BlockFace.vue';

const mounted = ref(false);

const container = ref();
const size = ref(0);

const duration = ref(4);

const paused = ref(false);

const updateParentWidth = () => {
  const width = container.value?.clientWidth;
  const height = container.value?.clientHeight;
  size.value = Math.min(width, height);
  console.log(width, height);
};

onMounted(() => {
  updateParentWidth();
  mounted.value = true;
});

addEventListener('resize', updateParentWidth);
onUnmounted(() => removeEventListener('resize', updateParentWidth));

const faces: Omit<Prop, 'duration'>[] = [
  {
    texture: '/assets/minecraft/textures/block/crafting_table_top.png',
    matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0.5, 1],
    brightness: { base: 100, amp: 100, phase: 0.25 },
    xywh: [0, 0.25, 1, 0.5],
  },
];
</script>

<template>
  <div class="container" ref="container">
    <div v-if="mounted" class="viewport">
      <div
        class="model"
        :style="`
          animation-duration: ${duration}s;
          animation-play-state: ${paused ? 'paused' : 'running'};
        `"
      >
        <BlockFace
          v-for="(face, i) in faces"
          :key="i"
          :texture="face.texture"
          :matrix3d="face.matrix3d"
          :brightness="face.brightness"
          :xywh="face.xywh"
          :duration="duration"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@keyframes turn {
  0% {
    transform: rotate3d(0, 1, 0, 0);
  }
  100% {
    transform: rotate3d(0, 1, 0, -360deg);
  }
}

.container {
  background-color: #00f;
  width: 100%;
  height: 100%;
  position: relative;
}

.viewport {
  top: 50%;
  left: 50%;
  position: absolute;
  transform-style: preserve-3d;
  transform: scale3d(400, 400, 400) rotateX(-30deg);
}

.model {
  width: 1px;
  height: 1px;
  transform-style: preserve-3d;
  animation-name: turn;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: inherit;
}

.face {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  image-rendering: pixelated;
  backface-visibility: hidden;
  width: 1px;
  height: 1px;
  animation-play-state: inherit;
}
</style>
