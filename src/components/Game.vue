<template>
  <div class="game">
    <Field :field="field"
      @clicked-cell="handleCellClick"
    />
    <p>Waiting for {{ currentPlayer }} player's move</p>
    <p v-if="winner">{{ winner }} player won!</p>
  </div>
</template>

<script>
import Field from './Field.vue';

import game from '../core/game';

import {
  FIELD_SIZE, ROW_TO_WIN, EMPTY_CELL, MAX_PLAYERS,
} from '../core/consts';

export default {
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
    this.gameInstance = game({
      fieldSize: FIELD_SIZE,
      rowToWin: ROW_TO_WIN,
      emptyCell: EMPTY_CELL,
      maxPlayers: MAX_PLAYERS,
    });

    const { field, player } = this.gameInstance.next().value;
    this.field = field;
    this.currentPlayer = player;
  },
};
</script>
