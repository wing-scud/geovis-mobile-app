class Fire {
  constructor(effect) {
    this.entity = effect.entity;
    this._visible = false;
  }

  get visible() {
    return this._visible;
  }

  set visible(val) {
    if (this._visible !== !!val) {
      this._visible = !!val;
      if (val) {
        this.start();
        setTimeout(() => {
          this.stop();
        }, 5000);
      } else {
        this.stop();
      }
    }
  }

  start() {
    this.particleSystem = earth.scene.primitives.add(
      new GeoVis.ParticleSystem({
        image: "./static/data/ScenePlayer/fire.png",
        startColor: GeoVis.Color.YELLOW.withAlpha(0.5),
        endColor: GeoVis.Color.ORANGERED.withAlpha(0.0),
        startScale: this.startScale,
        endScale: this.endScale,
        minimumParticleLife: 1,
        maximumParticleLife: 3,
        minimumSpeed: 0.2,
        maximumSpeed: 4,
        imageSize: new GeoVis.Cartesian2(this.particleSize, this.particleSize),
        emissionRate: this.emissionRate,
        // eslint-disable-next-line max-len
        bursts: [new GeoVis.ParticleBurst({ time: 5.0, minimum: 10, maximum: 30 }), new GeoVis.ParticleBurst({ time: 10.0, minimum: 20, maximum: 50 }), new GeoVis.ParticleBurst({ time: 15.0, minimum: 30, maximum: 60 })],
        lifetime: 16.0,
        emitter: new GeoVis.CircleEmitter(2.0),
        modelMatrix: GeoVis.Transforms.eastNorthUpToFixedFrame(this.entity._position, undefined, new GeoVis.Matrix4())
        // updateCallback: this.scaleByDis
      })
    );
    this.particleSystem.minimumImageSize.x = this.particleSize * 2;
    this.particleSystem.minimumImageSize.y = this.particleSize;
    this.particleSystem.maximumImageSize.x = this.particleSize;
    this.particleSystem.maximumImageSize.y = this.particleSize * 2;
    if (this.cone) {
      this.particleSystem.emitter = new GeoVis.ConeEmitter(GeoVis.Math.toRadians(45.0));
    }
  }

  stop() {
    this.viewer.scene.primitives.remove(this.particleSystem);
  }

  addTo(features, emissionRate = 30, startScale = 1, endScale = 3, particleSize = 25, cone = false) {
    // debugger;
    this.viewer = earth; //需将viewer/earth传入
    // this.position = position; //火焰的位置，为Cartesian3坐标
    this.startScale = startScale; //起始大小
    this.endScale = endScale; //结束大小
    this.particleSize = particleSize; //火花大小
    this.emissionRate = emissionRate; //喷发速度
    this.cone = cone; //布尔值，若为真采用锥形火焰，否则为圆形，默认采用圆形
  }

  removeFrom() {
    this.stop();
  }

  scaleByDis = (p, dt) => {
    const position = p.position;
    const position_ = this.viewer.camera.positionWC;
    const dis = GeoVis.Cartesian3.distance(position, position_);
    let particleSize = p.imageSize.x;
    if (dis > 1000) {
      particleSize = (1000 * particleSize) / dis;
      p.imageSize = new GeoVis.Cartesian2(particleSize, particleSize);
    }
  };
}

export default Fire;
