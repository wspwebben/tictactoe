<template>
  <div class="game">
    <Field :field="fieldState"
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

import {
  FIELD_SIZE, NO_WINNER, EMPTY_CELL, MAX_PLAYERS,
} from '../core/consts';

export default {
  data() {
    return {
      fieldState: {},
      winner: 0,
      currentPlayer: 0,
    };
  },
  methods: {
    handleCellClick(coords) {
      const cell = getCell(this.fieldState, coords);
      if (cell !== EMPTY_CELL) return;

      this.fieldState = makeMove(this.fieldState, coords, this.currentPlayer);

      const { winner } = checkWinner(this.fieldState, this.currentPlayer);
      if (winner !== NO_WINNER) {
        this.winner = `${winner + 1} player won!`;
      }

      this.currentPlayer = getNextPlayer(this.currentPlayer, MAX_PLAYERS);
    },
  },
  components: {
    Field,
  },
  mounted() {
    this.fieldState = createField(FIELD_SIZE, EMPTY_CELL);
  },
};
</script>
