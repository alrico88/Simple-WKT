<template lang="pug">
.col-8.vh-100.px-0
  .h-100(:id='id')
</template>

<script>
import uuid from 'uuid/v4';
import {parseFromWK} from 'wkt-parser-helper';
import {mapGetters} from 'vuex';
import circle from '@turf/circle';

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export default {
  data() {
    return {
      id: uuid(),
      drawn: null,
    };
  },
  computed: {
    ...mapGetters(['getPolygons']),
  },
  watch: {
    getPolygons(polygons) {
      this.drawPolygons(polygons);
    },
  },
  mounted() {
    this.map = L.map(this.id).setView([40.4165, -3.70256], 13);
    L.tileLayer(TILE_URL).addTo(this.map);
    const drawControl = new L.Control.Draw({
      draw: {
        circlemarker: false,
      },
    });
    this.map.addControl(drawControl);
    const store = this.$store;
    this.map.on('draw:created', (e) => {
      const {layer, layerType} = e;
      let asJSON;
      if (layerType === 'circle') {
        const {lat, lng} = layer._latlng;
        asJSON = circle([lng, lat], layer.getRadius(), {
          steps: 100,
          units: 'meters',
        });
      } else {
        asJSON = layer.toGeoJSON();
      }
      store.dispatch('addPolygon', asJSON.geometry);
    });
    if (this.getPolygons.length > 0) {
      this.drawPolygons(this.getPolygons);
    }
  },
  methods: {
    removeDrawn() {
      if (this.drawn) {
        this.map.removeLayer(this.drawn);
      }
    },
    addDrawn(featureLayer) {
      this.removeDrawn();
      this.drawn = featureLayer;
      featureLayer.addTo(this.map);
    },
    drawPolygons(polygons) {
      const featureGroup = L.featureGroup();
      polygons.forEach((polygon) => {
        const parsed = parseFromWK(polygon.wkt);
        function onEachFeature(feature, layer) {
          layer.bindTooltip(polygon.id, {
            permanent: true,
            direction: 'top',
          });
        }
        L.geoJSON(parsed, {
          onEachFeature,
          fillColor: '#39528E',
          color: '#39528E',
        }).addTo(featureGroup);
      });
      this.addDrawn(featureGroup);
    },
  },
};
</script>
