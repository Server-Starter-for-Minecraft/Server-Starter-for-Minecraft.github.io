<!--
  ページのタイトル（左にロゴを添える）

  @slot default タイトルの文言
  @slot icon ロゴの代わりに表示するアイコン（省略時は ServerStarter のロゴ）
-->
<template>
  <h1 class="row items-center q-mt-md q-mb-xl">
    <div class="icon col-1">
      <slot name="icon">
        <q-img src="/icons/systemLogo.svg" :ratio="57 / 72" />
      </slot>
    </div>
    <span class="text col">
      <slot />
    </span>
  </h1>
</template>

<style scoped lang="scss">
.icon {
  margin-right: 1rem;
  width: 3.2rem;
  // 中身をブロックとして並べ，h1 の行の高さによってアイコン枠が高くならないようにする
  display: flex;
  flex-direction: column;
}

.text {
  font-family: 'Genokaku JP';
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 2.1rem;
}
</style>
