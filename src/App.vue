<template>
  <div id="app">
    <Game :size="size"/>
  </div>
</template>

<script>
import Game from './components/Game.vue';

import { FIELD_SIZE } from './core/consts';

export default {
  name: 'app',
  components: {
    Game,
  },
  data() {
    return {
      size: FIELD_SIZE,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
