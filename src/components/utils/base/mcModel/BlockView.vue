<script setup>
import { ref, onUnmounted, onMounted } from 'vue';

const container = ref();
const size = ref(0);

const updateParentWidth = () => {
  const width = container.value?.clientWidth;
  const height = container.value?.clientHeight;
  size.value = Math.min(width, height);
  console.log(width, height);
};

onMounted(updateParentWidth);

addEventListener('resize', updateParentWidth);

onUnmounted(() => removeEventListener('resize', updateParentWidth));
</script>

<template>
  <div class="container" ref="container" :style="`font-size: ${size}px;`">
    <div class="model">
      <face
        rotation="[90,0,0]"
        position="[0,0,0]"
        uv="[0,0,16,16]"
        texture="..."
      />
      <img
        class="face top"
        src="/assets/minecraft/textures/block/crafting_table_top.png"
        alt=""
      />
      <img
        class="face bottom"
        src="/assets/minecraft/textures/block/crafting_table_top.png"
        alt=""
      />
      <img
        class="face left"
        src="/assets/minecraft/textures/block/crafting_table_side.png"
        alt=""
      />
      <img
        class="face right"
        src="/assets/minecraft/textures/block/crafting_table_side.png"
        alt=""
      />
      <img
        class="face front"
        src="/assets/minecraft/textures/block/crafting_table_front.png"
        alt=""
      />
      <img
        class="face back"
        src="/assets/minecraft/textures/block/crafting_table_front.png"
        alt=""
      />
    </div>
  </div>
</template>
<style lang="scss">
@keyframes turn {
  0% {
    transform: rotate3d(0, 1, 0, 0);
  }
  100% {
    transform: rotate3d(0, 1, 0, -360deg);
  }
}

@keyframes light {
  0% {
    filter: brightness(30%);
  }
  50% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(30%);
  }
}

.container {
  background-color: #00f;
  width: 100%;
  height: 100%;
}

.inner {
  font-size: 100%;
  width: 1em;
  height: 1em;
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: turn 8s linear infinite;
}

.face {
  font-size: 100%;
  width: 1em;
  height: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 500ms;
  image-rendering: pixelated;
  backface-visibility: hidden;
}

.front {
  transform: translateZ(0.5em);
  animation: ease-in-out 8s linear -6s infinite;
}

.back {
  transform: translateZ(-0.5em) rotateY(180deg);
  animation: ease-in-out 8s linear -2s infinite;
}

.left {
  transform: translateX(-0.5em) rotateY(-90deg);
  animation: ease-in-out 8s linear 0s infinite;
}

.right {
  transform: translateX(0.5em) rotateY(90deg);
  animation: ease-in-out 8s linear -4s infinite;
}

.top {
  transform: translateY(-0.5em) rotateX(90deg);
  filter: brightness(120%);
}

.bottom {
  transform: translateY(0.5em) rotateX(-90deg);
}
</style>
