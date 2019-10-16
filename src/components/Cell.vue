<template>
  <button @click="handleClick">
    {{ value }}
  </button>
</template>

<script>
import { getCoordinates } from '../core/logic';

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
      return getCoordinates(this.address);
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked-cell', this.coords);
    },
  },
};
</script>
