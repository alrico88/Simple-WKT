<template lang="pug">
  .col.maxHeight.border-left
    .row
      .col.pt-3
        h2 Simple WKT
          span.smalltext.ml-2 By Alberto Rico
            a.ml-2(href="https://github.com/alrico88/Simple-WKT", target="_blank")
              i.fa.fa-github-square
    .row
      .col
        ZoomCenterTransition(:group="true")
          .card.mb-2(v-for="(polygon, index) of getPolygons", :key="'card_' + index", v-show="getPolygons.length > 0")
            .card-header.p-2
              .row.align-items-center
                .col
                  h5.mb-0
                    | {{ polygon.id }}
                .col-4.text-right
                  p.mb-0 {{ getPolygonArea(polygon.id) }}km2
            .card-body.p-2
              p.mb-0
                | {{ polygon.wkt }}
            .card-footer.p-2
              button.btn.btn-sm.btn-primary.mr-2(href="#", v-clipboard:copy="polygon.wkt", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError")
                i.fa.fa-copy
                |  Copy to clipboard
              button.btn.btn-sm.btn-primary(href="#", @click.prevent="downloadFile(polygon.id, polygon.wkt)")
                i.fa.fa-save
                |  Download as file
              button.btn.btn-sm.btn-danger.float-right(href="#", @click.prevent="deletePolygon(polygon.id)")
                i.fa.fa-trash
                |  Remove
        .alert.alert-primary.border-primary(v-show="getPolygons.length === 0") Draw some shapes first!
        ZoomCenterTransition
          .alert.alert-primary.border-primary(v-show="getPolygons.length > 1")
            .row
              .col
                p.mb-2 Get WKT of all features as GeometryCollection
            .row
              .col
                button.btn.btn-sm.btn-primary.mr-2(href="#", v-clipboard:copy="getAsGeometryCollection", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError")
                  i.fa.fa-copy
                  |  Copy to clipboard
                button.btn.btn-sm.btn-primary(href="#", @click.prevent="downloadFile('allFeatures', getAsGeometryCollection)")
                  i.fa.fa-save
                  |  Download as file
        ZoomCenterTransition
          .alert.alert-danger.border-danger(v-show="getPolygons.length > 1")
            .row.align-items-center
              .col
                p.mb-0 Remove all drawn features at once
              .col-4.text-right
                button.btn.btn-sm.btn-danger(href="#", @click.prevent="removeAll")
                  i.fa.fa-trash
                  |  Remove
</template>

<script>
import {mapGetters} from 'vuex';
import {ZoomCenterTransition} from 'vue2-transitions';

export default {
  components: {
    ZoomCenterTransition,
  },
  computed: {
    ...mapGetters(['getPolygons', 'getAsGeometryCollection', 'getPolygonArea']),
  },
  methods: {
    deletePolygon(id) {
      this.$store.dispatch('deletePolygon', id);
    },
    notifyClipSuccess() {
      this.$notify({
        group: 'clipboard',
        title: 'Success',
        text: 'Copied to clipboard',
        type: 'success',
      });
    },
    notifyClipError(err) {
      this.$notify({
        group: 'clipboard',
        title: 'Error',
        text: `Error copying to clipboard ${err}`,
        type: 'danger',
      });
    },
    downloadFile(id, wkt) {
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(wkt)
      );
      element.setAttribute('download', `${id}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    removeAll() {
      this.$store.dispatch('deleteAllPolygons');
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
