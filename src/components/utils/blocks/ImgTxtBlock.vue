<script setup lang="ts">
import SsImg from 'src/components/utils/base/SsImg.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

interface Prop {
  title: string;
  imgPath: string;
  btnTitle?: string;
  btnTo?: string;
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
      <SsImg :path="imgPath" class="col q-ma-md blockWidth" />

      <!-- テキストとボタン -->
      <div class="col column q-ma-md blockWidth">
        <slot />
        <q-space />
        <div class="flex justify-end">
          <SsRouterBtn v-if="btnTo && btnTitle" :to="btnTo">
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
