import { earthStore } from "../store";
export const toRadians = GeoVis.Math.toRadians;
export const toDegrees = GeoVis.Math.toDegrees;

/**
 *
 * @param {GVAPP.Viewport} viewport
 */
export function flyToViewport(viewport) {
  earthStore.earth.camera.flyTo({
    destination: GeoVis.Cartesian3.fromDegrees(...viewport.lonlat),
    orientation: {
      heading: toRadians(viewport.rotation.heading),
      pitch: toRadians(viewport.rotation.pitch),
      roll: toRadians(viewport.rotation.roll)
    },
    ...viewport
  });
}

/**
 * @return {GVAPP.Viewport} viewport
 */
export function getViewport() {
  const camera = earthStore.earth.camera;
  const carto = camera.positionCartographic;
  const lon = toDegrees(carto.longitude);
  const lat = toDegrees(carto.latitude);
  const lonlat = [lon, lat, carto.height];
  return {
    lonlat,
    rotation: {
      heading: toDegrees(camera.heading),
      pitch: toDegrees(camera.pitch),
      roll: toDegrees(camera.roll)
    }
  };
}

window.getViewport = getViewport;
window.flyToViewport = flyToViewport;
