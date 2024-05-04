<script setup lang="ts">
import { MemberProp } from './core/memberCard/iMemberCard';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import MemberCard from './MemberCard.vue';

const authors: MemberProp[] = [
  {
    role: 'owner',
    name: 'CivilTT',
    githubLink: 'https://github.com/CivilTT',
    twitterLink: 'https://twitter.com/CivilT_T',
  },
  {
    role: 'chief',
    name: 'txkodo',
    githubLink: 'https://github.com/txkodo',
    twitterLink: 'https://twitter.com/txkodo',
  },
  {
    role: 'member',
    name: 'nozz',
  },
];
</script>

<template>
  <div>
    <SsTitle>制作者</SsTitle>

    <div class="row q-gutter-lg">
      <div v-for="author in authors" :key="author.name">
        <MemberCard
          :role="author.role"
          :name="author.name"
          :github-link="author.githubLink"
          :twitter-link="author.twitterLink"
        />
      </div>
    </div>
  </div>
</template>
