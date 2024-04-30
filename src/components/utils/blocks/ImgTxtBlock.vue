<script setup lang="ts">
import { useQuasar } from 'quasar';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

interface Prop {
  title: string;
  imgPath: string;
  imgHeight?: string;
  imgClass?: string;
  imgStyle?: Record<string, string>;
  btnTitle?: string;
  btnTo?: string;
}

defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <div>
    <ssSubTitle>
      {{ title }}
    </ssSubTitle>
    <div class="row">
      <!-- 画像部分 -->
      <div
        class="col blockWidth"
        :class="isDark() ? 'dark' : ''"
        :style="{ height: imgHeight ?? '20rem' }"
      >
        <img
          :src="imgPath"
          class="fit"
          style="object-fit: scale-down"
          :class="imgClass"
          :style="imgStyle"
        />
      </div>

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

.dark {
  // SsImgにおける画像に白いフィルタをかける処理を疑似的に再現
  filter: contrast(0.8);
}
</style>
