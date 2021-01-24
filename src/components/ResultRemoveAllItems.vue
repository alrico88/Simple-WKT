<template lang="pug">
b-alert.border-danger(variant='danger', show)
  .row.align-items-center
    .col
      p.mb-0 Remove all drawn features at once
    .col-4.text-right
      b-button(variant='danger', size='sm', @click='deleteAllPolygons')
        b-icon-trash
        |
        | Remove
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'ResultRemoveAllItems',
  methods: {
    ...mapActions(['deleteAllPolygons']),
  },
};
</script>

<style scoped>
</style>
