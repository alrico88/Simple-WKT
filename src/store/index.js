import Vue from 'vue';
import Vuex from 'vuex';
import {convertPolygonToWK, parseFromWK} from 'wkt-parser-helper';
import shortid from 'shortid';
import VuexPersistence from 'vuex-persist';
import area from '@turf/area';
import NumberHelper from 'number-helper-functions';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

class WktItem {

  /**
   * Creates an instance of WktItem
   * @param {string} wkt
   */
  constructor(wkt) {
    this.id = shortid();
    this.wkt = wkt;
  }
}

export default new Vuex.Store({
  state: {
    polygons: [],
  },
  getters: {
    getPolygons(state) {
      return state.polygons;
    },
    getPolygonIds(state) {
      return state.polygons.map((d) => d.id);
    },
    getAsGeometryCollection(state) {
      return `GEOMETRYCOLLECTION(${state.polygons
        .map((d) => d.wkt)
        .join(',')})`;
    },
    getPolygonArea: (state) => (id) => {
      const obj = state.polygons.find((d) => d.id === id);
      return NumberHelper.processNumber(area(parseFromWK(obj.wkt)) / 1000000);
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
      const wkt = convertPolygonToWK(GeoJSON);
      const newPolygon = new WktItem(wkt);
      context.commit('addToPolygons', newPolygon);
    },
    addWkt(context, wkt) {
      const newPolygon = new WktItem(wkt);
      context.commit('addToPolygons', newPolygon);
    },
    deletePolygon(context, id) {
      const pos = context.getters.getPolygonIds.indexOf(id);
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
