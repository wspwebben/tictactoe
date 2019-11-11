<template>
  <canvas
    class="field"
    ref="field"
    :width="totalSize"
    :height="totalSize"
  ></canvas>
</template>

<script>
import { border } from '@/canvas/consts';
import draw from '@/canvas/draw';

export default {
  props: {
    field: {
      type: Array,
      required: true,
    },
    fieldSize: {
      type: Number,
      required: true,
    },
    cellSize: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalSize() {
      const { fieldSize, cellSize } = this;
      return fieldSize * (cellSize + border.width) + border.width;
    },
  },
  methods: {
  },
  mounted() {
    this.context = this.$refs.field.getContext('2d');

    const { fieldSize, cellSize, totalSize } = this;

    draw(this.context, {
      fieldSize,
      cellSize,
      totalSize,
      border,
    });
  },
};
</script>

<style lang="scss">
  .field {
    display: block;
    margin: 1em;
  }
</style>
