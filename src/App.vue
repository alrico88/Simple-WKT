<template>
  <div
    id="app"
    class="container-fluid"
  >
    <div class="row">
      <Map />
      <Result />
    </div>
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Result from './components/Result.vue';

export default {
  name: 'App',
  components: {
    Map,
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
