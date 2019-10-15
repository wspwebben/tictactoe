<template>
  <div class="field">
    <div class="field__row" v-for="(row, y) in field" :key="y">
      <Cell class="field__button"
            v-for="(col, x) in row"
            :key="x"
            :value="col"
            @cell-clicked="handleCellClick([row, col])"
      >
        {{ x }} / {{ y }}
      </Cell>
    </div>
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
  components: {
    Cell,
  },
};
</script>

<style lang="scss" scoped>
  .field {
    display: block;

    &__row {
      display: flex;
      flex-wrap: wrap;
    }

    &__button {
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      padding: 0;
      background-color: transparent;
    }
  }
</style>
