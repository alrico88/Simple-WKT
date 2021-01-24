import {parseFromWK} from 'wkt-parser-helper';

/**
 * Validates WKT
 * @export
 * @param  {string} string WKT string
 * @return {void}
 */
export function validateWKT(string) {
  parseFromWK(string);
}

/**
 * Validates JSON string as GeoJSON
 * @export
 * @param  {string} string GeoJSON as string
 * @return {void}
 */
export function validateGeoJSON(string) {
  JSON.parse(string);
}
