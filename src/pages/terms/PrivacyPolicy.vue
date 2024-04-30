<script setup lang="ts">
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import IndentLine from 'src/components/utils/blocks/IndentLine.vue';
</script>

<template>
  <div>
    <SsTitle>プライバシーポリシー</SsTitle>
    <p>
      Server Starter for
      Minecraftプロジェクト（以下，「本プロジェクト」）では，お客様の個人情報を必要以上に収集せず，自由なプロジェクト成果の利用と利用者並びに制作者の匿名性の保持を最優先事項の１つとしています．<br />
      この規約は、本ウェブサイト並びにServerStarter2が収集するデータとその利用方法について定めるものとなります．
    </p>
  </div>

  <div>
    <SsSubTitle>第１条（収集するデータの種類）</SsSubTitle>
    <p>
      本プロジェクトではWebページや
      ServerStarter2本体等のエンドユーザー向け製品（以下，「プロジェクト成果品」）において，
      収集するデータはすべて，CivilTT（以下，「作者」）が個人を特定することができない，または作者がデータを閲覧することができない形で収集されます．
    </p>
    <p>
      集約するデータについて，ユーザーはデータの提供を強制されることなく，自由な意思に基づいてプロジェクト成果品にデータを提供することができます．<br />
      特別な定めがない限りにおいて，本プロジェクトが要求するすべてのデータは必須であり，これらのデータが提供されない場合，プロジェクト成果品は動作検証がされていない挙動をする可能性があります．<br />
      データの提供が任意であることを明記している項目については，ユーザーのデータ提供有無によって動作検証の範囲を逸脱することはありません．
    </p>
    <p>
      各プロジェクト成果品が収集するデータとその収集方法は下記のとおりです．
    </p>
    <p>
      <SsStrong>ServerStarter2本体</SsStrong>
    </p>
    <ul class="column q-gutter-sm">
      <li>
        <IndentLine title="収集データ">
          配色テーマや表示言語等の画面表示に関するデータ，ゲームプレイヤーデータ，Ngrokのトークン等，連携アプリケーションに関連するデータ
        </IndentLine>
      </li>
      <li>
        <IndentLine title="収集方法">
          ユーザーの画面操作によるデータ入力
        </IndentLine>
      </li>
    </ul>
    <p>
      <SsStrong>Webページ</SsStrong>
    </p>
    <ul class="flex q-gutter-sm">
      <li>
        <IndentLine title="収集データ">
          Webページへの来訪人数，経路等のセッション統計，トラッカー，訪問者の使用データ，発生イベント
        </IndentLine>
      </li>
      <li>
        <IndentLine title="収集方法">
          <span class="custom-break">
            <SsA
              url="https://support.google.com/analytics/answer/12017362?hl=en&ref_topic=2919631&sjid=11352357860114196865-AP"
            >
              <span style="white-space: nowrap">Google Analytics 4</span>
            </SsA>
            ，<wbr />
            <SsA url="https://support.google.com/tagmanager/answer/11994839">
              <span style="white-space: nowrap">Google Tag Manager</span>
            </SsA>
          </span>
        </IndentLine>
      </li>
    </ul>
  </div>
  <div>
    <SsSubTitle>第２条（データの収集目的）</SsSubTitle>
    <p>
      収集したデータはユーザーがプロジェクト成果品を利用する上で，
      ユーザーの嗜好にカスタマイズされた挙動を行うための情報として利用されたり，
      ユーザーの行動を統計的に分析することにより，成果品の使いやすさの改善や最適化をしたりするために使用されます．
    </p>
    <p>
      データを収集する際に収集方法に記載されたサービスを利用してデータが収集される場合，それぞれのサービス内でデータを利用する場合があります．<br />
      データ利用の詳細については各サービスのプライバシーポリシー等を参照してください．
    </p>
  </div>
  <div>
    <SsSubTitle>第３条（データの閲覧制限）</SsSubTitle>
    <p>
      プロジェクト成果品が収集したデータのうち，作者を含む制作者が閲覧できるデータはWebページによって収集されたデータのみであり，
      ServerStarter2本体によって収集されたデータはインストールされたPC内にのみ保存され，作者を含む制作者が閲覧することはできません．<br />
      Webページより収集されたデータは制作者のうち，作者並びに作者が認めた制作者のみに閲覧が制限されています．
    </p>
  </div>
  <div>
    <SsSubTitle>第４条（データの保存）</SsSubTitle>
    <p>
      プロジェクト成果品が収集したデータは，容易にアクセスすることができないように保存され，それぞれのデータの収集目的が失われた際に削除されます．
    </p>
    <p>
      ServerStarter2本体において，収集したデータのうち，ユーザーの嗜好やセキュリティに関連するデータは暗号化されたファイルや
      <SsA url="https://www.electronjs.org/docs/latest/api/safe-storage">
        SafeStorage
      </SsA>
      に保存され，データの改ざんやServerStarter2本体以外での閲覧ができないようになっています．
    </p>
  </div>
  <div>
    <SsSubTitle>第５条（データの提供）</SsSubTitle>
    <p>
      本プロジェクトで収集されたデータは，裁判所等の法執行機関より要求される場合を除き，いかなる場合においても第三者にデータを提供することはありません．
    </p>
    <p>
      ServerStarter2本体は
      <SsA url="https://github.com/Server-Starter-for-Minecraft/ServerStarter2">
        GitHub
      </SsA>
      上にて配布しており，依存データをGoogle
      Drive等のクラウドストレージ上より配布することがあります．<br />
      これらのサービスはプライバシーポリシーの制定等により情報管理が適切に行われていると作者が判断し，利用しています．<br />
      それぞれのサービスが利用するデータやデータの管理方法についてはそれぞれのサービスのプライバシーポリシー等をご確認ください．
    </p>
  </div>
  <div>
    <SsSubTitle>第６条（Cookie）</SsSubTitle>
    <p>
      WebページではCookieと呼ばれるデータをユーザーのPC内に保持することで，同一のPCでWebページにアクセスした際に同一のユーザーが訪問したことを作者が認識できるようにする機能があります．<br />
      作者が同一のユーザーが訪問したことを認識することにより，ユーザーの以前の訪問時のWebページ内での活動をもとにカスタマイズされたWebページを提供することができるようになります．<br />
      ユーザーがCookieの収集に同意しない場合，ユーザーはCookieの収集を禁止することがブラウザ等の設定を変更することで実現できます．
    </p>
  </div>
  <div>
    <SsSubTitle>第７条（規約の改訂）</SsSubTitle>
    <p>
      このプライバシーポリシーはユーザーへの同意を取ることなく作者の判断により変更することができます．<br />
      プライバシーポリシーに変更が入った場合，最終更新日をこのページの最下部に掲出することで，変更の有無を確認することができます．
    </p>
    <p>
      変更内容に重大な内容やユーザーの行動を著しく制限する内容が含まれる場合，作者はServerStarter2本体のダウンロードボタンが配置されたページ等の分かりやすい箇所で変更の通知を行います．
    </p>
  </div>
  <div>
    <SsSubTitle>第８条（管理者）</SsSubTitle>
    <p>
      このプライバシーポリシー並びに収集データに関するお問い合わせは
      <SsA url="https://twitter.com/CivilT_T">
        制作者CivilTTのTwitterアカウント
      </SsA>
      にお願いいたします．
    </p>
  </div>

  <div class="full-width text-right text-desc">２０２４年４月３０日　施行</div>
</template>
