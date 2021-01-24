<template lang="pug">
  b-card.mb-2(no-body)
    b-card-header.p-2
      .d-flex.align-items-center
        .flex-grow-1
          h5.mb-0 {{ polygon.id }}
        div.text-right
          p.mb-0 {{ getPolygonArea(polygon.id) }}km2
    b-card-body.p-0
      b-form-textarea.text-monospace.border-0(readonly, rows="1", max-rows="4", :value="polygon.wkt")
    b-card-footer.p-2
      b-button.mr-2(variant="primary", size="sm", v-clipboard:copy="polygon.wkt", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError")
        b-icon-clipboard
        |  Copy to clipboard
      b-button(variant="primary", size="sm", @click="downloadFile(polygon.id, polygon.wkt)")
        b-icon-download
        |  Download as file
      b-button.float-right(variant="danger", size="sm", @click="removePolygon")
        b-icon-trash
        |  Remove
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import ClipboardMixin from '@/mixins/ClipboardMixin';
import DownloadMixin from '@/mixins/DownloadMixin';

export default {
  name: 'ResultItem',
  mixins: [ClipboardMixin, DownloadMixin],
  props: {
    polygon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getPolygonArea']),
  },
  methods: {
    ...mapActions(['deletePolygon']),
    removePolygon() {
      this.deletePolygon(this.polygon.id);
    },
  },
};
</script>

<style scoped>
.form-control[readonly] {
  background: white;
}
</style>
