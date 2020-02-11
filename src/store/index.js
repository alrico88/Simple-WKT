import Vue from 'vue';
import Vuex from 'vuex';
import wkx from 'wkx';
import shortid from 'shortid';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    polygons: [],
  },
  getters: {
    getPolygons(state) {
      return state.polygons;
    },
    getAsGeometryCollection(state) {
      return `GEOMETRYCOLLECTION(${state.polygons
        .map((d) => d.wkt)
        .join(',')})`;
    },
  },
  mutations: {
    updatePolygons(state, polygons) {
      state.polygons = polygons;
    },
    addToPolygons(state, polygon) {
      state.polygons.push(polygon);
    },
    deleteFromPolygons(state, position) {
      state.polygons.splice(position, 1);
    },
  },
  actions: {
    addPolygon(context, GeoJSON) {
      const id = shortid();
      const wkt = wkx.Geometry.parseGeoJSON(GeoJSON).toWkt();
      context.commit('addToPolygons', {
        id,
        wkt,
      });
    },
    deletePolygon(context, id) {
      const pos = context.state.polygons.map((d) => d.id).indexOf(id);
      if (pos !== -1) {
        context.commit('deleteFromPolygons', pos);
      }
    },
    deleteAllPolygons(context) {
      context.commit('updatePolygons', []);
    },
  },
  plugins: [vuexLocal.plugin],
});
