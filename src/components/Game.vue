<template>
  <div class="game">
    <Field
      :field="field"
      :field-size="fieldSize"
      :cell-size="cellSize"
      @clicked-cell="handleCellClick"
    />
    <p v-if="winner">{{ winner }} player won!</p>
    <p v-else>Waiting for {{ currentPlayer }} player's move</p>
  </div>
</template>

<script>
import Field from './Field.vue';

import game from '../core/game';

import {
  CELL_SIZE, FIELD_SIZE, ROW_TO_WIN, MAX_PLAYERS,
} from '../core/consts';

export default {
  props: {
    fieldSize: {
      type: Number,
      default: FIELD_SIZE,
    },
    cellSize: {
      type: Number,
      default: CELL_SIZE,
    },
    rowToWin: {
      type: Number,
      default: ROW_TO_WIN,
    },
    maxPlayers: {
      type: Number,
      default: MAX_PLAYERS,
    },
  },
  data() {
    return {
      field: [],
      currentPlayer: 0,
      winner: false,
      winRow: false,
      isOver: false,
    };
  },
  methods: {
    handleCellClick(move) {
      if (this.isOver) return;

      const moveResult = this.gameInstance.next(move);
      this.isOver = moveResult.done;

      ({
        field: this.field,
        player: this.player,
        winner: this.winner,
        winRow: this.winRow,
      } = moveResult.value);
    },
  },
  components: {
    Field,
  },
  mounted() {
    const { fieldSize, rowToWin, maxPlayers } = this;

    this.gameInstance = game({
      fieldSize,
      rowToWin,
      maxPlayers,
    });

    ({
      field: this.field,
      player: this.currentPlayer,
    } = this.gameInstance.next().value);
  },
};
</script>
