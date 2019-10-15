<template>
  <button @click="handleClick">
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (this.value !== '') return;

      this.$emit('cell-clicked');
    },
  },
};
</script>
