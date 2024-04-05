<script setup lang="ts">
import { getCssVar, useQuasar } from 'quasar';
import { MemberProp } from './core/memberCard/iMemberCard';
import LinkBtn from './core/memberCard/linkBtn.vue';
import PlayerHeadView from './core/memberCard/PlayerHeadView.vue';

const prop = defineProps<MemberProp>();
const $q = useQuasar();

const defaultColor = () =>
  !$q.dark.isActive ? getCssVar('dark') ?? 'Not Found' : '#ffffff';

const borderLineStyle = () => {
  switch (prop.role) {
    case 'owner':
      return `.5rem solid ${getCssVar('primary')}`;
    case 'chief':
      return `.5rem dashed ${getCssVar('primary')}`;
    case 'member':
      return `.5rem solid ${defaultColor()}`;
  }
};
</script>

<template>
  <q-card
    flat
    bordered
    class="fit card chamfer"
    :style="{ 'border-left': borderLineStyle() }"
  >
    <q-card-section class="row">
      <!-- player head -->
      <PlayerHeadView
        :playerName="name"
        class="q-ma-sm"
        style="width: 2.5rem"
      />

      <!-- text info -->
      <div style="max-width: 8rem" class="q-pl-md column">
        <span class="name">{{ name }}</span>
        <span class="role">{{ role }}</span>
      </div>
    </q-card-section>

    <q-card-actions>
      <div class="row q-gutter-xs q-pl-md">
        <LinkBtn
          v-if="githubLink"
          name="github"
          color="white"
          :link="githubLink"
          icon-path=""
        />
        <LinkBtn
          v-if="twitterLink"
          name="twitter"
          color="black"
          :link="twitterLink"
          icon-path=""
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.card {
  min-width: 14rem;
  max-width: 14rem;
}

.chamfer {
  border-radius: 15px;
}

.name {
  font-size: 1.5rem;
}

.role {
  opacity: 0.7;
}
</style>
