<script setup lang="ts">
import SsBtn from 'src/components/utils/base/btns/ssBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

interface Prop {
  textKey: string;
  imgPath: string;
  link: string;
}
const prop = defineProps<Prop>();

function openLink() {
  window.open(prop.link, '_blank');
}
</script>

<template>
  <SsCard class="block" style="min-width: 300px">
    <SsSubTitle>{{ $t(`terms.broadcast.logo.${textKey}.title`) }}</SsSubTitle>

    <q-card-section class="row q-pa-lg q-gutter-lg justify-center items-center">
      <div class="flex" style="width: 7rem">
        <q-img :src="imgPath" />
      </div>
      
      <q-card-section
        class="column q-gutter-md items-end col"
        style="white-space: pre-line; min-width: 250px"
      >
        {{ $t(`terms.broadcast.logo.${textKey}.desc`) }}
        <SsBtn
          outline
          icon="download"
          label="ダウンロード"
          @click="openLink"
        >
        </SsBtn>
      </q-card-section>
    </q-card-section>
  </SsCard>
</template>
