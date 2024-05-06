<script setup lang="ts">
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドの設定</SsTitle>
    <p>
      ServerStarter2ではワールドに関する様々な設定や機能を提供しています！<br>
      このページではその中でも代表的な項目について解説します
    </p>
  </div>

  <ImgTxtBlock
    title="ワールドの顔を設定しよう"
    img-path="/assets/Features/WorldSettings/serverIcon.svg"
  >
    <p>
      サーバーのアイコンは参加者がサーバーを判別するための大きな要素です
    </p>
    <p>
      ServerStarter2ではワールドに華を添えるためのサポートも万全です！
    </p>
    <p>
      「ホーム」タブの画像を選択することで添付画像のようなアイコンの候補を取り揃えています<br>
      スクリーンショットをはじめとした好きな画像をアイコンとして設定することもできるため，ワールドの見た目を好きにカスタマイズしましょう！
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="プロパティの編集"
    img-path="/assets/Features/WorldSettings/property.png"
  >
    <p>
      煩雑なテキストファイルをインターネット上の記事を見ながら編集するような作業は必要ありません
    </p>
    <p>
      「プロパティ」タブではワールドに関するいろいろな設定をすることができます！<br>
      設定する値もServerStarter2が候補を提示するため，候補から選んでいくだけで簡単に設定を完了することができます！
    </p>
    <p>
      検索機能や各プロパティに対する説明文も掲載することで，柔軟に細かい設定までこだわることができるようになっています
    </p>
    <p>
      画面左下の「システム設定」より「規定プロパティ」を編集しておくことで，
      ワールドを新規作成した際に指定されるプロパティの初期値を事前に設定しておくこともできます
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="自動シャットダウン"
    img-path="/assets/Features/WorldSettings/autoShutdown.png"
    img-height=""
  >
    <p>
      マルチプレイをしていた際に，ほかの参加者よりも自分が先に退室することはないでしょうか？
    </p>
    <p>
      常に電源の入ったPCであれば問題ないですが，
      こまめにシャットダウンをしているPCでワールドを起動した際には，最後まで残っていないとシャットダウンすることができません
    </p>
    <p>
      そんな時は「ホーム」タブにある「自動シャットダウン」をONにしておくことで，ワールドが停止した際にPCを自動的にシャットダウンしておくことができます！
    </p>
    <p>
      チェックボックスを入れておき，最後まで残ったフレンドに`/stop`というコマンドをチャット欄に入力してもらうだけで，この機能を利用することができます！
    </p>
    <p>
      ※ `/stop`コマンドを実行するためには，実行者がOP権限レベル4を有している必要があります
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ワールドの保存場所も自由自在"
    img-path="/assets/Features/WorldSettings/worldFolder.png"
    img-height=""
  >
    <p>
      ワールドデータが増えてきたときにこんな悩みはないでしょうか？
    </p>
    <ul>
      <li>ワールドを保存場所ごとにグループ分けして管理したい</li>
      <li>Cドライブの容量がいっぱいのため，ワールドの保存場所を別ドライブに移動したい</li>
    </ul>
    <p>
      このようなときは「その他の設定」タブにある「ワールドフォルダ」機能をご利用ください！<br>
      保存先に指定したいフォルダを登録し，追加された保存先を指定するだけで保存先を変更することができます！
    </p>
    <p>
      非表示ボタンを活用することで，普段は使わないワールドの保存先を非表示にして，ワールド一覧を整理することもできます
    </p>
  </ImgTxtBlock>
</template>
