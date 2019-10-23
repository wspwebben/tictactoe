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
  FIELD_SIZE, ROW_TO_WIN, NO_WINNER, EMPTY_CELL, MAX_PLAYERS,
} from '../core/consts';

export default {
  data() {
    return {
      field: [],
      winner: NO_WINNER,
      currentPlayer: 0,
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
      noWinner: NO_WINNER,
      emptyCell: EMPTY_CELL,
      maxPlayers: MAX_PLAYERS,
    });

    const { field, player } = this.gameInstance.next().value;
    this.field = field;
    this.currentPlayer = player;
  },
};
</script>
