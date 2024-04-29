<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import BlockFace, {
  type Prop,
} from 'src/components/utils/base/mcModel/BlockFace.vue';
import { resolveModelFaces } from './scripts/main';

const mounted = ref(false);

const container = ref();
const size = ref(0);

const duration = ref(4);

const paused = ref(false);

const updateParentWidth = () => {
  const width = container.value?.clientWidth;
  const height = container.value?.clientHeight;
  size.value = Math.min(width, height);
};

onMounted(() => {
  updateParentWidth();
  mounted.value = true;
});

addEventListener('resize', updateParentWidth);
onUnmounted(() => removeEventListener('resize', updateParentWidth));

const model = {
  elements: [
    {
      from: [0, 0, 0],
      to: [16, 16, 16],
      faces: {
        north: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_front',
        },
        south: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_front',
        },
        west: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_side',
        },
        east: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_side',
        },
        up: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_top',
        },
        down: {
          uv: [0, 0, 16, 16],
          texture: 'block/crafting_table_top',
        },
      },
    },
  ],
};

const model2 = {
  parent: 'block/block',
  display: {
    firstperson_righthand: {
      rotation: [0, 135, 0],
      translation: [0, 0, 0],
      scale: [0.4, 0.4, 0.4],
    },
  },
  textures: {
    particle: 'block/lectern_sides',
    bottom: 'block/oak_planks',
    base: 'block/lectern_base',
    front: 'block/lectern_front',
    sides: 'block/lectern_sides',
    top: 'block/lectern_top',
  },
  elements: [
    {
      from: [0, 0, 0],
      to: [16, 2, 16],
      faces: {
        north: {
          uv: [0, 14, 16, 16],
          texture: 'block/lectern_base',
          cullface: 'north',
        },
        east: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'east',
        },
        south: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'south',
        },
        west: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'west',
        },
        up: {
          uv: [0, 0, 16, 16],
          rotation: 180,
          texture: 'block/lectern_base',
        },
        down: {
          uv: [0, 0, 16, 16],
          texture: 'block/oak_planks',
          cullface: 'down',
        },
      },
    },
    {
      from: [4, 2, 4],
      to: [12, 15, 12],
      faces: {
        north: { uv: [0, 0, 8, 13], texture: 'block/lectern_front' },
        east: {
          uv: [2, 16, 15, 8],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
        south: { uv: [8, 3, 16, 16], texture: 'block/lectern_front' },
        west: {
          uv: [2, 8, 15, 16],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
      },
    },
    {
      from: [0.0125, 12, 3],
      to: [15.9875, 16, 16],
      rotation: { angle: -22.5, axis: 'x', origin: [8, 8, 8] },
      faces: {
        north: { uv: [0, 0, 16, 4], texture: 'block/lectern_sides' },
        east: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        south: { uv: [0, 4, 16, 8], texture: 'block/lectern_sides' },
        west: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        up: { uv: [0, 1, 16, 14], rotation: 180, texture: 'block/lectern_top' },
        down: { uv: [0, 0, 16, 13], texture: 'block/oak_planks' },
      },
    },
  ],
};
const faces = resolveModelFaces(model2);
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
  width: 100%;
  height: 100%;
  position: relative;
}

.viewport {
  perspective: 1000px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform-style: preserve-3d;
  transform: scale3d(400, 400, 400) rotateX(-30deg);
}

.model {
  width: 0px;
  height: 0px;
  transform-style: preserve-3d;
  animation-name: turn;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: inherit;
}
</style>
