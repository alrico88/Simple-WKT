<template lang="pug">
b-tabs(pills, no-fade)
  b-tab(title='From WKT')
    add-manually-from-wkt(@done='sendDone')
  b-tab(title='From GeoJSON')
    add-manually-from-geojson(@done='sendDone')
</template>

<script>
import AddManuallyFromWkt from '@/components/AddManuallyFromWkt';
import AddManuallyFromGeojson from '@/components/AddManuallyFromGeojson';

export default {
  name: 'AddManually',
  components: {
    AddManuallyFromGeojson,
    AddManuallyFromWkt,
  },
  methods: {
    sendDone() {
      this.$emit('done');
    },
  },
};
</script>
