<script setup lang="ts">
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div class="q-pr-md">
    <ImgTxtBlock
      title="個人ワールドや配布マップもみんなで冒険 !!"
      imgPath="/assets/titleImg.png"
      btnTitle="ワールドのつくりかた"
      btnTo="/intro"
    >
      <p>
        「シングルプレイのワールドに友達を招待したい」<br />
        「配布マップをみんなで遊びたい」<br />
        ServerStarterを使えば新しいワールドだけでなく、<br />
        個人ワールドや配布マップだって遊べます。
      </p>
      <p>簡単操作で好きなワールドをプレイしましょう！</p>
    </ImgTxtBlock>
  </div>
</template>
