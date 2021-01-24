<template lang="pug">
#app.container-fluid
  .row
    map-component
    result
</template>

<script>
import MapComponent from './components/Map.vue';
import Result from './components/Result.vue';

export default {
  name: 'App',
  components: {
    MapComponent,
    Result,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
