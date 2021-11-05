<template>
  <span v-if="showValueInSkillOnly || !showValueInUsd">
    {{ formattedSkill }}
  </span>
  <span v-else-if="showValueInUsd">
    {{ formattedUsd }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { toBN } from '@/utils/common';
import { mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import { countDecimalPlaces, truncateDecimals } from './../utils/currency-converter';

export default Vue.extend({
  props: {
    skill: {
      type: String,
      default: '0',
    },
    skillMinDecimals: {
      type: Number,
      default: 2,
    },
    skillMaxDecimals: {
      type: Number,
      default: 4,
    },
    usdDecimals: {
      type: Number,
      default: 2,
    },
    showValueInSkillOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showValueInUsd: false,
    };
  },
  computed: {
    ...mapState(['skillPriceInUsd']),
    formattedUsd(): string {
      return `$${this.calculateSkillPriceInUsd().toFixed(this.usdDecimals).replace(/(\.0+|0+)$/, '')}`;
    },
    formattedSkill(): string {
      return `${this.calculateSkillWithDecimals().replace(/(\.0+|0+)$/, '')} SKILL`;
    },
  },
  methods: {
    calculateSkillPriceInUsd(): number {
      return ((this.skill as unknown as number) *
        this.skillPriceInUsd) as unknown as number;
    },
    calculateSkillWithDecimals(): string {
      return `~${truncateDecimals(this.skill, this.skillMinDecimals, this.skillMaxDecimals)}`;
    },

    countDecimalPlaces(value: BigNumber) {
      return countDecimalPlaces(value);
    },
  },
});
</script>

<style>
</style>
