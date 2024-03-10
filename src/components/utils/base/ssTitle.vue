<template>
  <h1 class="row items-center q-my-md q-px-sm">
    <q-img src="icons/systemLogo.svg" class="icon" />
    <span class="text">
      <slot />
    </span>
  </h1>
</template>

<style scoped lang="scss">
.icon {
  margin-right: 1rem;
  width: 3.2rem;
}

.text {
  font-family: 'Genokaku JP';
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: normal;
}
</style>