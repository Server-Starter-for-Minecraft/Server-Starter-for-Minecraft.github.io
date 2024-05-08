<script setup lang="ts">
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
import IndentLine from 'src/components/utils/blocks/IndentLine.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドを作成する</SsTitle>
    <p>
      ワールドを作成する際には，画面左下の「ワールドを追加」をクリックしましょう！<br />
      右側にメニューが表示されるため，やりたい内容に沿って追加モードを選択してください
    </p>
  </div>

  <ImgTxtBlock
    title="画面紹介"
    img-path="/assets/Features/createWorld/createBtn.png"
    img-height=""
  >
    <ul>
      <li>
        <IndentLine title="新規ワールドを追加" max-width="10rem">
          <p>バニラサーバーの完全に新しいワールドを新規作成</p>
        </IndentLine>
      </li>
      <li>
        <IndentLine title="既存のワールドを導入" max-width="10rem">
          <p>
            シングルプレイワールドや配布ワールド等のワールドを導入することが可能
          </p>
        </IndentLine>
      </li>
      <li>
        <IndentLine title="表示中のワールドを複製" max-width="10rem">
          <p>
            ワールド内の地形や持ち物，プロパティ等の細かい設定を含めたすべてを別のワールドとして複製できます．
          </p>
        </IndentLine>
      </li>
      <li>
        <IndentLine title="バックアップワールドを導入" max-width="10rem">
          <p>
            「その他の設定」タブにてバックアップを作成した場合に，バックアップ時点のワールドを別ワールドとして復元できます
          </p>
        </IndentLine>
      </li>
    </ul>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="既存ワールドの導入"
    img-path="/assets/Features/createWorld/existWorld.png"
  >
    <p>
      インターネット等からワールドデータを入手した（配布ワールド等の）場合は，画面上部の「配布ワールドを導入」を利用してください！<br />
      ファイルは展開済みであっても，展開前のZipの状態であっても導入することができます
    </p>
    <p>
      また，PC内にMinecraftのシングルプレイワールドが存在する場合は，画面下部から導入したいワールドを選択して，マルチプレイをすることができます！<br />
      個人で発展させたワールドをご友人らと楽しむ際にぜひご活用ください
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ワールドのバックアップを作成"
    img-path="/assets/Features/createWorld/backupWorld.png"
    img-height=""
  >
    <p>
      ワールドの追加方法の一つである「バックアップワールドを導入」に出てくるバックアップワールドは，画像のように「その他の設定」タブから作成することができます！
    </p>
    <p>
      「バックアップを作成」ボタンを押すことで，押した時点でのバックアップデータを作成します<br />
      作成が完了すると「○○のバックアップを作成しました」というメッセージが表示されます
    </p>
  </ImgTxtBlock>
</template>
