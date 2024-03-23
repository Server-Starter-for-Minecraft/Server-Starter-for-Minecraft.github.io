<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Locale } from 'src/i18n';
import SsSelect from 'src/components/utils/base/expands/ssSelect.vue';

interface Prop {
  dark?: boolean;
}
defineProps<Prop>();

const t = useI18n();
const lang = computed({
  get: () => {
    return t.locale.value;
  },
  set: (loc) => {
    t.locale.value = loc;
  },
});

const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en-US', label: 'English' },
];
</script>

<template>
  <SsSelect
    dense
    :dark="dark"
    v-model="lang"
    :options="localeOptions"
    option-label="label"
    option-value="value"
  />
</template>
