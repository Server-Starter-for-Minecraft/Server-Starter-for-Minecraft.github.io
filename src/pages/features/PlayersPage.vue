<script setup lang="ts">
import SsStrong from '@/components/utils/base/texts/ssStrong.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from '@/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div>
    <SsTitle>プレイヤーの管理</SsTitle>
    <p>
      ServerStarter2では，ワールドに参加できるプレイヤーやOP権限を「プレイヤー」タブから簡単に管理できます！<br />
      難しいコマンドを覚えたり，設定ファイルを直接編集したりする必要はありません
    </p>
  </div>

  <ImgTxtBlock
    title="プレイヤーを追加する"
    img-path="/assets/Features/players/card.png"
  >
    <p>
      画面上部の入力欄にゲーム中のプレイヤー名を入力すると，プレイヤーの候補が表示されます．
      <SsStrong>このプレイヤーを追加</SsStrong
      >を押すと，ワールドにプレイヤーが追加されます
    </p>
    <p>
      追加したプレイヤーのOP権限は，プレイヤーを選択して右側のメニューからレベルを選ぶだけで変更できます
    </p>
    <p>
      <SsStrong>登録済みのプレイヤーのみ参加可能</SsStrong
      >を有効にすると，一覧に追加したプレイヤーだけがワールドに参加できるようになります（ホワイトリスト）．
      少人数でマルチプレイを行う場合は本機能を有効にし，参加するプレイヤーを事前に追加しておくと安心です
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="リスト表示で一覧する"
    img-path="/assets/Features/players/list.png"
  >
    <p>
      入力欄の右にあるボタンで，プレイヤーの一覧を「カード表示」と「リスト表示」で切り替えられます．
      リスト表示では画面の幅に関係なく多くのプレイヤーを一覧でき，OP権限の変更もメニューから素早く行えます
    </p>
    <p>
      サーバーに参加しているプレイヤーには目印が表示され，未登録のプレイヤーが参加した場合は自動で一覧に追加されます
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="グループでまとめて管理する"
    img-path="/assets/Features/players/group.png"
  >
    <p>
      複数のプレイヤーを選択して<SsStrong>プレイヤーをグループ化</SsStrong>を押すと，選択したプレイヤーをメンバーとするグループを作成できます
    </p>
    <p>
      グループのメニューからは，メンバー・グループ名・グループカラー（Minecraftの16色）の変更やグループの削除ができます
    </p>
    <p>
      複数のプレイヤーを選択した状態でOP権限を変更すると，選択中の全員の権限をまとめて変更できます
    </p>
  </ImgTxtBlock>
</template>
