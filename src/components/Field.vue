<template>
  <canvas
    class="field"
    ref="field"
    :width="totalSize"
    :height="totalSize"
    @mousedown="handleClick"
  ></canvas>
</template>

<script>
import { border } from '@/canvas/consts';
import drawField from '@/canvas/drawField';
import draw from '@/canvas/draw';

const colors = ['red', 'blue'];
const getColor = player => colors[player % colors.length];

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
    lastMove: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellWithBorder() {
      return this.cellSize + border.width;
    },
    totalSize() {
      return this.fieldSize * this.cellWithBorder + border.width;
    },
  },
  methods: {
    handleClick(e) {
      const bounds = this.$refs.field.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const x = Math.floor(mouseX / this.cellWithBorder);
      const y = Math.floor(mouseY / this.cellWithBorder);

      this.$emit('clicked-cell', { x, y });
    },
  },
  watch: {
    lastMove(params) {
      const color = getColor(params.player);
      this.context.strokeStyle = color;

      draw(this.context, {
        ...params,
        cellSize: this.cellSize,
        borderWidth: border.width,
      });
    },
  },
  mounted() {
    this.context = this.$refs.field.getContext('2d');

    const { fieldSize, cellSize, totalSize } = this;

    drawField(this.context, {
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
