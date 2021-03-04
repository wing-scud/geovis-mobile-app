class TrackBeam extends GeoVis.Cylinder {
  get visible() {
    return this._visible;
  }

  set visible(val) {
    this._visible = val;
    this.update();
  }
  get targetPosition() {
    return this._targetPosition;
  }
  set targetPosition(val) {
    if (!this._visible) return;
    this._targetPosition = val;
    const start = this._center;
    /** @type {GeoVis.Cartesian3} */
    const targetPosition = this._targetPosition;

    const velocity = GeoVis.Cartesian3.subtract(start, targetPosition, new GeoVis.Cartesian3());
    GeoVis.Cartesian3.normalize(velocity, velocity);
    const rotationMatrix3 = GeoVis.Transforms.rotationMatrixFromPositionVelocity(start, velocity);
    GeoVis.Matrix3.multiply(rotationMatrix3, GeoVis.Matrix3.fromHeadingPitchRoll(new GeoVis.HeadingPitchRoll(0, -Math.PI / 2, 0)), rotationMatrix3);
    const rotationMatrix4 = GeoVis.Matrix4.fromRotationTranslation(rotationMatrix3);
    const matrix4 = GeoVis.Matrix4.fromTranslation(start);
    GeoVis.Matrix4.multiply(matrix4, rotationMatrix4, matrix4);
    GeoVis.Matrix4.multiplyByTranslation(matrix4, new GeoVis.Cartesian3(0, 0, -this._length / 2), matrix4);
    this.update();
    this._primitive ? (this._primitive.modelMatrix = matrix4) : null;
  }
}

export default TrackBeam;
window.TrackBeam = TrackBeam;

const rippleMaterial = GeoVis.Material.fromType("Ripple");
rippleMaterial.uniforms.baseColor = GeoVis.Color.fromCssColorString("white").withAlpha(0.1);
rippleMaterial.uniforms.rippleColor = GeoVis.Color.fromCssColorString("red").withAlpha(0.1);
rippleMaterial.uniforms.rippleWidth = 0.01;
rippleMaterial.uniforms.rippleCount = 1;
rippleMaterial.uniforms.speed = 0.5;
const beam = new TrackBeam([121, 30, 0], {
  topRadius: 1, // 半径
  visible: true,
  bottomRadius: 3e4, // 高度
  rotation: {
    heading: -0.158,
    pitch: 1.816,
    roll: -0.634
  },
  material: rippleMaterial,
  async: false,
  length: 10
}).addTo(earth.features);
