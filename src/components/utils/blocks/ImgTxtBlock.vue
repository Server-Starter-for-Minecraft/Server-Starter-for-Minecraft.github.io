<script setup lang="ts">
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

interface Prop {
  title: string;
  imgPath: string;
  imgClass?: string;
  imgStyle?: Record<string, string>;
  btnTitle: string;
  btnTo: string;
}

defineProps<Prop>();
</script>

<template>
  <div>
    <ssSubTitle>
      {{ title }}
    </ssSubTitle>
    <div class="row">
      <!-- 画像部分 -->
      <div class="col blockWidth" style="height: 20rem">
        <img
          :src="imgPath"
          class="fit"
          style="object-fit: scale-down"
          :class="imgClass"
          :style="imgStyle"
        />
      </div>

      <!-- テキストとボタン -->
      <div class="col column q-my-md blockWidth">
        <slot />
        <q-space />
        <div class="flex justify-end">
          <SsRouterBtn :to="btnTo">
            {{ btnTitle }}
          </SsRouterBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blockWidth {
  min-width: 20rem;
}
</style>
