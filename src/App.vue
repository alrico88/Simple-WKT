<template>
  <div
    id="app"
    class="container-fluid"
  >
    <div class="row">
      <Map />
      <Result />
      <notifications group="clipboard" />
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
</style>
