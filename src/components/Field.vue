<template>
  <div class="field">
    <Cell class="field__cell"
        v-for="(cell, index) in field"
        :key="index"
        :address="index"
        :value="cell"
        @clicked-cell="handleCellClick"
    >
      {{ index }}
    </Cell>
  </div>
</template>

<script>
import Cell from './Cell.vue';

export default {
  props: {
    field: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleCellClick(cell) {
      this.$emit('clicked-cell', cell);
    },
  },
  components: {
    Cell,
  },
};
</script>

<style lang="scss">
  .field {
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(3, 50px);

    &__cell {
      border: 1px solid #000;
      padding: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }
</style>
