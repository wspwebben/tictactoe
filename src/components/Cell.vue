<template>
  <button @click="handleClick">
    {{ value }}
  </button>
</template>

<script>
import { getCoordinates } from '../core/logic';

import { FIELD_SIZE } from '../core/consts';

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    address: {
      type: Number,
      required: true,
    },
  },
  computed: {
    coords() {
      return getCoordinates(this.address, FIELD_SIZE);
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked-cell', this.coords);
    },
  },
};
</script>
