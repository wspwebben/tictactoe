<template>
  <div class="game">
    <Field :field="field"
      @clicked-cell="handleCellClick"
    />
    <span v-if="winner">{{ winner }}</span>
  </div>
</template>

<script>
import Field from './Field.vue';

import {
  createField,
  getCell,
  makeMove,
  checkWinner,
  getNextPlayer,
} from '../core/logic';

import { NO_WINNER, EMPTY_CELL } from '../core/consts';

export default {
  data() {
    return {
      field: [],
      winner: 0,
      currentPlayer: 0,
    };
  },
  methods: {
    handleCellClick(coords) {
      const cell = getCell(this.field, coords);
      if (cell !== EMPTY_CELL) return;

      this.field = makeMove(this.field, coords, this.currentPlayer);

      const { winner } = checkWinner(this.field, this.currentPlayer);
      if (winner !== NO_WINNER) {
        this.winner = `${winner + 1} player won!`;
      }

      this.currentPlayer = getNextPlayer(this.currentPlayer);
    },
  },
  components: {
    Field,
  },
  mounted() {
    this.field = createField();
  },
};
</script>
