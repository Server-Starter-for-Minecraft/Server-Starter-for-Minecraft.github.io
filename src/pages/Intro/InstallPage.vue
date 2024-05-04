<script setup lang="ts">
import { isLinux, isMac, isWindows } from 'src/scripts/checkDevice';
import SsImg from 'src/components/utils/base/SsImg.vue';
import SsError from 'src/components/utils/base/expands/ssError.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
</script>

<template>
  <div>
    <SsTitle>ServerStarterのインストール</SsTitle>
    <p>
      前のページでインストーラーのダウンロードはお済ですか？<br />
      ここでは，ダウンロードしたインストーラーを使ってServerStarter2を起動してみましょう
    </p>

    <SsError title="ダウンロード時に警告が出た場合">
      <div class="row items-center justify-center">
        <SsImg
          path="/assets/introduction/install/Edge_Save1.png"
          class="flex q-ma-md"
          style="width: max(7rem, 18vw)"
        />
        <SsImg
          path="/assets/introduction/install/Edge_Save2.png"
          class="flex q-ma-md"
          style="width: max(6rem, 15vw)"
        />

        <div class="col q-pa-md" style="min-width: 10rem">
          <p>
            ServerStarterは個人開発のため，ダウンロード数が十分な数になるまで相当の時間がかかります<br />
            一部のブラウザでは十分なダウンロード数のないソフトに対して警告を出すため，ソフトをダウンロードできないことがあります
          </p>
          <p>
            Edgeでは画像のように右側の「・・・」から保存を押し，次の画面で「保持する」をクリックすることで，インストーラーのダウンロードが始まります
          </p>
        </div>
      </div>
    </SsError>
  </div>

  <ImgTxtBlock
    title="インストーラーを起動してみよう"
    img-path="/assets/introduction/install/installer.png"
    img-height=""
  >
    <p>
      ダウンロードしたインストーラーをダブルクリックで起動してみましょう<br />
      ServerStarter2のインストールが始まります
    </p>
    <p>画像のような画面が出たら，画面が消えるまでお待ちください</p>

    <SsError title="インストール時に警告が出た場合">
      <p>
        ServerStarter2では現在，アプリに対する署名を付けることができていません<br />
        このため，以下のような警告がインストール時に表示されることがありますので，下記の手順に従って操作をお願いします
      </p>
      <div v-if="isWindows()">
        <ol class="flex q-gutter-y-md q-pl-lg">
          <li>
            表示された画面中部にある「詳細設定」をクリック
            <SsImg
              path="/assets/introduction/install/defender1.png"
              style="width: 60%; min-width: 13rem"
            />
          </li>
          <li>
            「実行」をクリックするとインストールが開始されます
            <SsImg
              path="/assets/introduction/install/defender2.png"
              style="width: 60%; min-width: 13rem"
            />
          </li>
        </ol>
      </div>
      <div v-else-if="isMac()">
        <ol class="flex q-gutter-y-md q-pl-lg">
          <li>
            この画面はOKを押して閉じる
            <SsImg
              path="/assets/introduction/install/unopen.png"
              style="width: 60%; min-width: 13rem"
            />
          </li>
          <li>
            「システム環境設定」＞「セキュリティとプライバシー」＞「一般」の順に開き，「このまま開く」を押すとインストールが開始されます
            <SsImg
              path="/assets/introduction/install/privacy.png"
              style="width: 60%; min-width: 13rem"
            />
          </li>
        </ol>
      </div>
      <div v-else-if="isLinux()">
        <!-- TODO: 実装 -->
      </div>
    </SsError>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ServerStarter2を起動"
    img-path="/assets/introduction/install/WelcomeWindow.png"
  >
    <p>インストールが完了するとServerStarter2が自動的に起動します</p>
    <p>利用規約を確認したら，いざ，マルチプレイの世界へ！</p>

    <SsError title="自動的に起動しない場合">
      <div class="row items-center q-gutter-md">
        <SsImg path="/assets/introduction/install/icon.png" class="col-3" />
        <p class="col">
          デスクトップにServerStarter2のアイコンがありますので，ダブルクリックで起動しましょう！
        </p>
      </div>
    </SsError>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="オーナープレイヤーの設定　※任意"
    img-path="/assets/introduction/install/OwnerPlayerSetting.png"
  >
    <p>
      Minecraftのプレイヤーアカウントを持っている場合は，画像のようにゲーム内でのプレイヤー名を登録しましょう！
    </p>
    <p>
      登録しておくことでサーバーの<SsStrong>OP権限</SsStrong>が自動で与えられます
    </p>
    <p>
      ※この手順をスキップした場合，<SsStrong>システム設定画面</SsStrong>で再登録することができます
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ポート開放不要化の設定　※任意"
    img-path="/assets/introduction/install/autoPortMapping.png"
  >
    <div class="column full-height">
      <div class="q-pb-md">
        <p>
          ServerStarter2では<SsStrong>ポート開放をせず</SsStrong>に，マルチプレイを楽しむことができます！
        </p>
        <p>
          画面に表示されるセットアップ手順に従い，必要な設定を進めることができます
        </p>
        <p>
          ※この手順をスキップした場合，<SsStrong>ホーム画面</SsStrong>で再登録することができます
        </p>
      </div>

      <q-space />

      <div class="flex justify-end">
        <SsRouterBtn to="/features/auto-port-mapping">
          ポート開放不要化について詳しく
        </SsRouterBtn>
      </div>
    </div>
  </ImgTxtBlock>

  <div>
    <SsTitle>さあ！マルチプレイを始めましょう！</SsTitle>
    <p>
      インストール作業がすべて完了しました！<br />
      ワールドを作成してマルチプレイを始めましょう！
    </p>
    <div class="flex justify-end">
      <SsRouterBtn to="/intro/run-server"> ワールドの起動方法 </SsRouterBtn>
    </div>
  </div>
</template>
