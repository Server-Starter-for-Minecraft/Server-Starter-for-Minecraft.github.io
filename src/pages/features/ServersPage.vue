<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { QTableProps } from 'quasar';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';

type Row = {
  name: string;
  datapack: boolean;
  plugin: boolean;
  mod: boolean;
};

const $t = useI18n();
const pagination = ref({
  page: 1,
  rowsPerPage: 6,
});

const columns: QTableProps['columns'] = [
  {
    name: 'server',
    required: true,
    label: 'サーバー種類',
    align: 'left',
    field: (row: Row) => $t.t(`home.servers.serverType.${row.name}`),
  },
  {
    name: 'datapack',
    align: 'center',
    label: 'データパック',
    field: (row: Row) => (row.datapack ? '〇' : '－'),
    sortable: true,
  },
  {
    name: 'plugin',
    align: 'center',
    label: 'プラグイン',
    field: (row: Row) => (row.plugin ? '〇' : '－'),
    sortable: true,
  },
  {
    name: 'mod',
    align: 'center',
    label: 'MOD',
    field: (row: Row) => (row.mod ? '〇' : '－'),
    sortable: true,
  },
];

const rows: Row[] = [
  { name: 'vanilla', datapack: true, plugin: false, mod: false },
  { name: 'spigot', datapack: true, plugin: true, mod: false },
  { name: 'papermc', datapack: true, plugin: true, mod: false },
  { name: 'forge', datapack: true, plugin: false, mod: true },
  { name: 'mohistmc', datapack: true, plugin: true, mod: true },
  { name: 'fabric', datapack: true, plugin: false, mod: true },
];
</script>

<template>
  <div>
    <SsTitle>サーバー一覧</SsTitle>
    <p>
      ServerStarter2ではJava版Minecraftにおけるマルチプレイに向けた6種類のサーバーをサポートしています<br />
      ご自身の目的に合わせたサーバーを活用して，快適にマルチプレイを楽しみましょう！
    </p>
  </div>

  <ImgTxtBlock
    title="サーバーの種類の選択方法"
    img-path="/assets/Features/servers/selectServer.png"
  >
    <p>
      ワールドの起動に用いるサーバーの種類は「ホーム」タブにある「サーバーの種類を選択」と書かれているプルダウンメニューから設定することができます！
    </p>
    <p>
      すでにワールドを起動したことがあるワールドに対して，途中からサーバーの種類を変更することもできます
    </p>
    <p>
      サーバーの種類を変更すると，変更した種類に合った設定項目が表示されるため，バージョンやビルド番号等を適切に設定してください
    </p>
  </ImgTxtBlock>

  <div>
    <SsSubTitle>導入可能な追加コンテンツ</SsSubTitle>
    <div class="row q-gutter-md">
      <div class="col" style="min-width: 20rem; max-width: 90vw">
        <q-table
          flat
          bordered
          :rows="rows"
          :columns="columns"
          row-key="name"
          v-model:pagination="pagination"
          hide-bottom
          class="my-sticky-header-column-table"
          :class="$q.dark.isActive ? 'table-dark' : 'table-light'"
        />
      </div>
      <div class="col" style="min-width: 20rem">
        <p>
          ServerStarter2ではデータパック・プラグイン・MODといった代表的な追加コンテンツをサポートしていますが，
          それらを導入するためには，対応したサーバー種類でワールドを起動する必要があります
        </p>
        <p>
          表中で「〇」がついている項目は当該サーバー種類がその追加コンテンツに対応していることを示しています
        </p>
        <p>
          ServerStarter2ではサーバー種類に対応していない追加コンテンツは導入できないようになっているため，安心してご利用いただくことができます！
        </p>
        <p>
          なお，ForgeやFabricは「前提MOD」と呼ばれるMODを導入するためにベースとなるサーバーの種類になりますので，
          ご利用のMODが対応しているサーバー種類をお確かめの上，ご利用ください
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.my-sticky-header-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 90vw
    
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

.table-light
  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fff

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

.table-dark
  background-color: var(--q-dark-page)

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: var(--q-dark-page)

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background-color: var(--q-dark-page)
</style>