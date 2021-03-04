
export function parseDate(value) {
  return GeoVis.JulianDate.fromDate(new Date(value));
}

export function strToTime(str) {
  return new Date(str).getTime();
}

const matrix3Scratch = new GeoVis.Matrix3();

/**
 *
 * @param {GeoVis.Cartesian3} cartesian
 * @param {GeoVis.Quaternion} orientation
 */
export function computeModelMatrix(cartesian, orientation) {
  // return GeoVis.Transforms.eastNorthUpToFixedFrame(cartesian)
  if (!orientation) {
    return GeoVis.Transforms.eastNorthUpToFixedFrame(cartesian);
  } else {
    // debugger
    return GeoVis.Matrix4.fromRotationTranslation(GeoVis.Matrix3.fromQuaternion(orientation, matrix3Scratch), cartesian);
  }
}
