<template lang="pug">
.col.maxHeight.border-left
  .row
    .col.pt-3
      h2 Simple WKT
        span.smalltext.ml-2 By Alberto Rico
          a.ml-2(
            href='https://github.com/alrico88/Simple-WKT',
            target='_blank'
          )
            b-icon-github
  .row
    .col
      ZoomCenterTransition(:group='true')
        result-item(
          v-for='(polygon, index) of getPolygons',
          :key='"card_" + index',
          :polygon='polygon'
        )
      empty-state(:show='getPolygons.length === 0')
      ZoomCenterTransition
        result-copy-all-items(v-show='showMultipleActions')
      ZoomCenterTransition
        result-remove-all-items(v-show='showMultipleActions')
      b-button(@click='openAddModal', variant='secondary', size='sm')
        b-icon-plus
        |
        | Add manually
  b-modal(
    ref='manualAddModal',
    title='Add manually',
    ok-only,
    ok-title='Close',
    ok-variant='secondary'
  )
    add-manually(@done='closeAddModal')
</template>

<script>
import {mapGetters} from 'vuex';
import {ZoomCenterTransition} from 'vue2-transitions';
import EmptyState from '@/components/EmptyState';
import ResultItem from '@/components/ResultItem';
import ResultRemoveAllItems from '@/components/ResultRemoveAllItems';
import ResultCopyAllItems from '@/components/ResultCopyAllItems';
import AddManually from '@/components/AddManually';

export default {
  components: {
    AddManually,
    ResultCopyAllItems,
    ResultRemoveAllItems,
    ResultItem,
    EmptyState,
    ZoomCenterTransition,
  },
  computed: {
    ...mapGetters(['getPolygons', 'getAsGeometryCollection', 'getPolygonArea']),
    showMultipleActions() {
      return this.getPolygons.length > 1;
    },
  },
  methods: {
    openAddModal() {
      this.$refs.manualAddModal.show();
    },
    closeAddModal() {
      this.$refs.manualAddModal.hide();
    },
  },
};
</script>

<style scoped>
.maxHeight {
  max-height: 100vh;
  overflow-y: auto;
}
.smalltext {
  font-size: 14pt;
}
</style>
