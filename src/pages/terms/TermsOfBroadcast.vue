<script setup lang="ts">
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import LogoCard from 'src/components/Pages/Terms/LogoCard.vue';
</script>

<template>
  <div>
    <SsTitle>配信規約</SsTitle>
    <p>
      この規約（以下「本規約」）は、Server Starter for
      Minecraftプロジェクト（以下「本プロジェクト」）
      が公開するWebページやServerStarter2等の製品（以下「プロジェクト成果品」）の紹介を主目的とする作品の投稿または配信（以下「配信等」）を行う際に、遵守すべき事柄に関する規約となります。
    </p>
    <p>
      配信等において本規約が定める本プロジェクトのロゴ（以下「本プロジェクトロゴ」）を利用することができます。
    </p>
    <p>
      本プロジェクトロゴは、利用規約が適用される本プロジェクトのプロジェクト成果品です。
    </p>
  </div>

  <div class="row q-gutter-lg">
    <LogoCard
      text-key="base"
      img-path="/icons/systemLogo.svg"
      link="https://drive.google.com/drive/folders/1yCqolfrWV5czxLI872viBhGc1rWYHL1-?usp=sharing"
      class="col"
    />
    <LogoCard
      text-key="withText"
      img-path="/icons/systemLogo_text.svg"
      link="https://drive.google.com/drive/folders/1gGlbQKx5TsdtmUz0qeA-DP8lu16bUTSf?usp=sharing"
      class="col"
    />
  </div>

  <div>
    <SsSubTitle>第１条（配信目的）</SsSubTitle>
    <p>
      次に掲げる目的を有する場合に限り、本プロジェクトに関する内容を配信等に掲載することができます。
    </p>
    <ol>
      <li>
        本プロジェクトのプロジェクト成果品を用いて遊んだ体験の共有を目的として配信等を実施する場合
      </li>
      <li>
        本プロジェクトのプロジェクト成果品の紹介を目的として配信等を実施する場合
      </li>
      <li>
        本プロジェクトと提携関係にある利用者が、当該提携又はこれに関連する企画等において、本プロジェクトの許諾を得た上で配信等を実施する場合
      </li>
    </ol>
  </div>

  <div>
    <SsSubTitle>第２条（配信手法）</SsSubTitle>
    <ol>
      <li>
        プロジェクト成果品の映像や画像等を配信等する際に利用する共有サイトは、本団体が適切であると考えるものに限ります（例：YouTube、X (旧 Twitter) 等）。
      </li>
      <li>
        前項に規定する共有サイトへの配信であっても、本団体がその内容が不適切であると判断した配信等については、削除することがあります。
      </li>
      <li>
        プロジェクト成果品の配布元である本サイトのURL（https://server-starter-for-minecraft.github.io）を配信に明示してください。
      </li>
      <li>
        映像の配信等を実施する際には、映像内において本プロジェクトロゴを掲げ、プロジェクト成果品の制作元である本プロジェクトの紹介を行ってください。
      </li>
      <li>
        前項の規定は、映像による配信等を実施する際に，毎回行うこととします。
      </li>
    </ol>
  </div>

  <div>
    <SsSubTitle>第３条（禁止事項）</SsSubTitle>
    <p>
      配信等を実施する際に、本プロジェクトは、配信等を実施する人物に対し、次に掲げる行為を禁止します。
    </p>
    <ol>
      <li>
        本プロジェクトの許諾を得ることなく、前条に定める配信目的以外に配信する行為
      </li>
      <li>
        プロジェクト成果品を利用して創作した映像や音楽、静止画等を、本団体の許可なく販売する行為
      </li>
      <li>
        配信等を実施する人物の創造性が含まれない配信やプロジェクト成果品のコピーを配信する行為
      </li>
      <li>
        事実に反する、本プロジェクトから協賛や提携を受けているようなことを示唆したり、誤信させたりする行為
      </li>
      <li>
        本プロジェクトのメンバーと同じアイコン、画像（過去に使用していたものを含む。）を使用する行為
      </li>
      <li>
        次に掲げる内容を含む配信
        <ul>
          <li>公序良俗に反する配信</li>
          <li>
            本プロジェクトまたは第三者の名誉・信用を毀損または不当に差別もしくは誹謗中傷する配信
          </li>
          <li>その他、本プロジェクトが不適切と判断する内容を含む配信</li>
        </ul>
      </li>
      <li>
        本プロジェクトロゴに対して、次に掲げる編集・加工等を行ったロゴを利用する行為
        <ul>
          <li>縦横比の変更による変形</li>
          <li>文字のサイズや書体、文字間のスペースの編集</li>
          <li>識別を損なう加工</li>
          <li>回転を伴う加工</li>
          <li>影や3D、グラデーション等の効果を付ける加工</li>
          <li>色の編集</li>
          <li>一部が欠損した表示</li>
          <li>本サイト上で配布していないロゴ</li>
        </ul>
      </li>
      <li>上記の他、本プロジェクトが不適切と判断する行為</li>
    </ol>
  </div>

  <div class="full-width text-right text-desc">２０２４年５月５日　施行</div>
</template>
