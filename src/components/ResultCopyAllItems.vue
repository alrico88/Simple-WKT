<template lang="pug">
b-alert.border-primary(variant='primary', show)
  .row
    .col
      p.mb-2 Get WKT of all features as GeometryCollection
  .row
    .col
      b-button.mr-2(
        variant='primary',
        size='sm',
        v-clipboard:copy='getAsGeometryCollection',
        v-clipboard:success='notifyClipSuccess',
        v-clipboard:error='notifyClipError'
      )
        b-icon-clipboard
        |
        | Copy to clipboard
      b-button(
        variant='primary',
        size='sm',
        @click='downloadFile("allFeatures", getAsGeometryCollection)'
      )
        b-icon-download
        |
        | Download as file
</template>

<script>
import DownloadMixin from '@/mixins/DownloadMixin';
import ClipboardMixin from '@/mixins/ClipboardMixin';
import {mapGetters} from 'vuex';

export default {
  name: 'ResultCopyAllItems',
  mixins: [DownloadMixin, ClipboardMixin],
  computed: {
    ...mapGetters(['getAsGeometryCollection']),
  },
};
</script>
