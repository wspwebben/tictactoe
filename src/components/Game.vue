<template>
  <div class="game">
    <Field :field="field"
      @clicked-cell="handleCellClick"
    />
  </div>
</template>

<script>
import Field from './Field.vue';

import {
  createField,
  makeMove,
  checkWinner,
  getNextPlayer,
} from '../core/logic';

import { NO_WINNER } from '../core/consts';

export default {
  data() {
    return {
      field: [],
      currentPlayer: 0,
    };
  },
  methods: {
    handleCellClick(cell) {
      this.field = makeMove(this.field, cell, this.currentPlayer);
      const { winner } = checkWinner(this.field, this.currentPlayer);

      if (winner !== NO_WINNER) {
        // eslint-disable-next-line
        console.log(`Winner is ${winner + 1} player!`);
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
