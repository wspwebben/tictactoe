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

import {
  FIELD_SIZE, NO_WINNER, EMPTY_CELL, MAX_PLAYERS, ROW_TO_WIN,
} from '../core/consts';

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
      const { cell } = getCell({
        field: this.field,
        size: FIELD_SIZE,
        coords,
      });

      if (cell !== EMPTY_CELL) return;

      this.field = makeMove({
        field: this.field,
        size: FIELD_SIZE,
        coords,
        player: this.currentPlayer,
      }).field;

      const { winner } = checkWinner({
        field: this.field,
        player: this.currentPlayer,
        lastMove: coords,
        size: FIELD_SIZE,
        noWinner: NO_WINNER,
        rowToWin: ROW_TO_WIN,
      });

      if (winner !== NO_WINNER) {
        this.winner = `${winner + 1} player won!`;
      }

      this.currentPlayer = getNextPlayer({
        currentPlayer: this.currentPlayer,
        maxPlayers: MAX_PLAYERS,
      }).player;
    },
  },
  components: {
    Field,
  },
  mounted() {
    this.field = createField({
      size: FIELD_SIZE,
      filler: EMPTY_CELL,
    }).field;
  },
};
</script>
