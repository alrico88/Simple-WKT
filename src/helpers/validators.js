import {parseFromWK} from 'wkt-parser-helper';

export function validateWKT(string) {
  parseFromWK(string);
}

export function validateGeoJSON(string) {
  JSON.parse(string);
}
