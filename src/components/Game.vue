<template>
  <div class="game">
    <Field :field="field"

    />
  </div>
</template>

<script>
import Field from './Field.vue';

export default {
  props: {
    size: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      field: [],
    };
  },
  methods: {
    handleCellClick([row, col]) {
      this.field[row][col] = 'x';
    },
  },
  components: {
    Field,
  },
  mounted() {
    this.field = new Array(this.size)
      .fill()
      .map(() => new Array(this.size).fill(''));
  },
};
</script>
