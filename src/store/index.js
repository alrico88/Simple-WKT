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
    updatePolygonId(state, {index, text}) {
      Vue.set(
        state.polygons[index],
        Object.assign(state.polygons[index], {
          id: text,
        })
      );
    },
  },
  actions: {
    addPolygon(context, GeoJSON) {
      const id = shortid();
      const wkt = convertPolygonToWK(GeoJSON);
      context.commit('addToPolygons', {
        id,
        wkt,
      });
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
    changeId(context, {id, text}) {
      const pos = context.getters.getPolygonIds.indexOf(id);
      context.commit('updatePolygonId', {
        index: pos,
        text,
      });
    },
  },
  plugins: [vuexLocal.plugin],
});
