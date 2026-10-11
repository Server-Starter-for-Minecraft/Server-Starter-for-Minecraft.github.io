<script setup lang="ts">
import SsRouterBtn from '@/components/utils/base/btns/ssRouterBtn.vue';
import SsStrong from '@/components/utils/base/texts/ssStrong.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from '@/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div>
    <SsTitle>追加コンテンツの導入</SsTitle>
    <p>
      ServerStarter2では，データパック・プラグイン・MODといった追加コンテンツを「追加コンテンツ」タブから簡単に導入できます！
    </p>
    <p>
      導入できる追加コンテンツの種類はサーバーの種類によって異なります．
      ワールドのサーバーの種類に対応した追加コンテンツだけがタブに表示されます
    </p>
    <div class="flex justify-end">
      <SsRouterBtn to="/features/servers"
        >サーバーの種類と追加コンテンツ</SsRouterBtn
      >
    </div>
  </div>

  <ImgTxtBlock
    title="追加コンテンツを導入する"
    img-path="/assets/Features/contents/list.png"
  >
    <p>
      「追加コンテンツ」タブの右にある▼から，管理したい追加コンテンツの種類を選択してください
    </p>
    <p>
      <SsStrong>Zipから追加</SsStrong
      >または<SsStrong>フォルダーから追加</SsStrong>を押してファイルを選ぶだけで導入できます．
      一度導入した追加コンテンツは左側の一覧に表示され，ほかのワールドにも簡単に導入できます
    </p>
    <p>※ 追加コンテンツの変更を反映するには，サーバーの再起動が必要です</p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="導入済みのコンテンツを確認する"
    img-path="/assets/Features/contents/search.png"
  >
    <p>
      リスト表示では，追加コンテンツの名前と説明を省略せずに確認できます．
      Zip形式とフォルダ形式も区別して表示されます
    </p>
    <p>
      上部の検索欄に名前や説明を入力すると，一覧を絞り込めます．
      スペースで区切って複数の単語を入力すると，すべての単語を含むコンテンツだけが表示されます
    </p>
    <p>
      ワールドの保存先のフォルダに直接追加・削除したコンテンツは，タブを開いた時や再読み込みボタンを押した時に一覧へ反映されます
    </p>
    <p>
      ※
      起動したことのあるワールドから追加コンテンツを削除すると，ワールドデータが破損する恐れがあるため警告が表示されます
    </p>
  </ImgTxtBlock>
</template>
