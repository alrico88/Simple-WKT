<template lang="pug">
  .col.maxHeight.border-left
    .row
      .col.pt-3
        h2 Simple WKT
        p.small
          | By Alberto Rico
    .row
      .col
        ZoomCenterTransition(:group="true")
          .card.mb-2(v-for="polygon of getPolygons", :key="polygon.id", v-show="getPolygons.length > 0")
            .card-header.p-2
              h5.mb-0
                | {{ polygon.id }}
            .card-body.p-2
              p.mb-0
                | {{ polygon.wkt }}
            .card-footer
              a(href="#", @click.prevent="copyToClip(polygon.wkt)") Copy to clipboard
              a.text-danger.float-right(href="#", @click.prevent="deletePolygon(polygon.id)") Remove
        .alert.alert-primary.border-primary(v-show="getPolygons.length === 0") Draw some shapes first!
</template>

<script>
import {mapGetters} from 'vuex';
import {ZoomCenterTransition} from 'vue2-transitions';

export default {
  components: {
    ZoomCenterTransition,
  },
  computed: {
    ...mapGetters(['getPolygons']),
  },
  methods: {
    deletePolygon(id) {
      this.$store.dispatch('deletePolygon', id);
    },
    copyToClip(content) {
      if (navigator.clipboard) {
        this.copyWithClipboardAPI(content);
      } else {
        alert('Clipboard API not supported, please, copy and paste manually');
      }
    },
    copyWithClipboardAPI(content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          this.notifyClipSuccess();
        })
        .catch((err) => {
          this.notifyClipError(err);
        });
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
  },
};
</script>

<style scoped>
.maxHeight {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
