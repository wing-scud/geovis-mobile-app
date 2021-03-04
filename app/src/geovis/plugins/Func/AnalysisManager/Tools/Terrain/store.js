//getColorRamp
/* eslint-disable */
var elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
var slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0];
var aspectRamp = [0.0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0];

//window.viewModel


var toolbar = document.getElementById("toolbar");
var marker;

class ViewModel {
  constructor() {
    this.state = {
      minHeight: -414.0,
      maxHeight: 8777.0, // approximate everest elevation
      contourColor: GeoVis.Color.WHITE.clone(),
      contourUniforms: {},
      shadingUniforms: {},
      viewModel: {
        enableContour: false,
        contourSpacing: 150.0,
        contourWidth: 2.0,
        selectedShading: "none",
        changeColor: function () {
          this.contourUniforms.color = GeoVis.Color.fromRandom({ alpha: 1.0 }, this.contourColor);
        }
      }
    }
  }
  getElevationContourMaterial() {
    // Creates a composite material with both elevation shading and contour lines
    return new GeoVis.Material({
      fabric: {
        type: "ElevationColorContour",
        materials: {
          contourMaterial: {
            type: "ElevationContour"
          },
          elevationRampMaterial: {
            type: "ElevationRamp"
          }
        },
        components: {
          diffuse: "contourMaterial.alpha == 0.0 ? elevationRampMaterial.diffuse : contourMaterial.diffuse",
          alpha: "max(contourMaterial.alpha, elevationRampMaterial.alpha)"
        }
      },
      translucent: false
    });
  }

  getSlopeContourMaterial() {
    // Creates a composite material with both slope shading and contour lines
    return new GeoVis.Material({
      fabric: {
        type: "SlopeColorContour",
        materials: {
          contourMaterial: {
            type: "ElevationContour"
          },
          slopeRampMaterial: {
            type: "SlopeRamp"
          }
        },
        components: {
          diffuse: "contourMaterial.alpha == 0.0 ? slopeRampMaterial.diffuse : contourMaterial.diffuse",
          alpha: "max(contourMaterial.alpha, slopeRampMaterial.alpha)"
        }
      },
      translucent: false
    });
  }

  getAspectContourMaterial() {
    // Creates a composite material with both aspect shading and contour lines
    return new GeoVis.Material({
      fabric: {
        type: "AspectColorContour",
        materials: {
          contourMaterial: {
            type: "ElevationContour",
            uniforms: {
              color: GeoVis.Color.WHITE
            }
            // color: GeoVis.Color.WHITE
          },
          aspectRampMaterial: {
            type: "AspectRamp"
          }
        },
        components: {
          diffuse: "contourMaterial.alpha == 0.0 ? aspectRampMaterial.diffuse : contourMaterial.diffuse",
          alpha: "max(contourMaterial.alpha, aspectRampMaterial.alpha)"
        }
      },
      translucent: false
    });
  }

  getColorRamp(selectedShading) {
    var ramp = document.createElement("canvas");
    ramp.width = 100;
    ramp.height = 1;
    var ctx = ramp.getContext("2d");

    var values, grd;
    if (selectedShading === "heightMap") {
      values = elevationRamp;
      grd = ctx.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(values[0], "#000000"); //black
      grd.addColorStop(values[1], "#2747E0"); //blue
      grd.addColorStop(values[2], "#D33B7D"); //pink
      grd.addColorStop(values[3], "#D33038"); //red
      grd.addColorStop(values[4], "#FF9742"); //orange
      grd.addColorStop(values[5], "#ffd700"); //yellow
      grd.addColorStop(values[6], "#ffffff"); //white
    } else if (selectedShading === "slope") {
      values = slopeRamp;
      grd = ctx.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(values[0], "#000000"); //black
      grd.addColorStop(values[1], "#2747E0"); //blue
      grd.addColorStop(values[2], "#D33B7D"); //pink
      grd.addColorStop(values[3], "#D33038"); //red
      grd.addColorStop(values[4], "#FF9742"); //orange
      grd.addColorStop(values[5], "#ffd700"); //yellow
      grd.addColorStop(values[6], "#ffffff"); //white
    } else if (selectedShading === "aspect") {
      values = aspectRamp;
      grd = ctx.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(0, "#ffb500"); //black
      grd.addColorStop(0.125, "#ff0000"); //blue
      grd.addColorStop(0.25, "#ffb500"); //pink
      grd.addColorStop(0.378, "#94ff00"); //red
      grd.addColorStop(0.5, "#00ff21"); //orange
      grd.addColorStop(0.625, "#00ffde"); //yellow
      grd.addColorStop(0.75, "#006bff");
      grd.addColorStop(0.875, "#4a00ff");
      grd.addColorStop(1.0, "#ff00ff");
    }


    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 1);

    return ramp;
  }
  updateMaterial() {
    var hasContour = this.state.viewModel.enableContour;
    var selectedShading = this.state.viewModel.selectedShading;
    var globe = earth.scene.globe;
    var material;
    if (hasContour) {
      if (selectedShading === "heightMap") {
        material = this.getElevationContourMaterial();
        this.state.shadingUniforms = material.materials.elevationRampMaterial.uniforms;
        this.state.shadingUniforms.minimumHeight = this.state.minHeight;
        this.state.shadingUniforms.maximumHeight = this.state.maxHeight;
        this.state.contourUniforms = material.materials.contourMaterial.uniforms;
      } else if (selectedShading === "slope") {
        material = this.getSlopeContourMaterial();
        this.state.shadingUniforms = material.materials.slopeRampMaterial.uniforms;
        this.state.contourUniforms = material.materials.contourMaterial.uniforms;
      } else if (selectedShading === "aspect") {
        material = this.getAspectContourMaterial();
        this.state.shadingUniforms = material.materials.aspectRampMaterial.uniforms;
        this.state.contourUniforms = material.materials.contourMaterial.uniforms;
      } else {
        material = GeoVis.Material.fromType("ElevationContour");
        this.state.contourUniforms = material.uniforms;
      }
      this.state.contourUniforms.width = this.state.viewModel.contourWidth;
      this.state.contourUniforms.spacing = this.state.viewModel.contourSpacing;
      this.state.contourUniforms.color = this.state.contourColor;
    } else if (selectedShading === "heightMap") {
      material = GeoVis.Material.fromType("ElevationRamp");
      this.state.shadingUniforms = material.uniforms;
      this.state.shadingUniforms.minimumHeight = this.state.minHeight;
      this.state.shadingUniforms.maximumHeight = this.state.maxHeight;
    } else if (selectedShading === "slope") {
      material = GeoVis.Material.fromType("SlopeRamp");
      this.state.shadingUniforms = material.uniforms;
    } else if (selectedShading === "aspect") {
      material = GeoVis.Material.fromType("AspectRamp");
      this.state.shadingUniforms = material.uniforms;
    }
    if (selectedShading !== "none") {
      this.state.shadingUniforms.image = this.getColorRamp(selectedShading);
      //debugger
    }
    globe.material = material;
  }
  init() {
    earth.on("click", e => {
      if (marker) {
        marker.removeFrom(earth.features);
        marker = undefined;
      }
      if (this.state.viewModel.selectedShading === "none") return;
      const circleDiv = document.createElement("div");
      circleDiv.className = "test-circle";
      marker = new GeoVis.DomMarker(e.lonlat, {
        dom: circleDiv
      }).addTo(earth.features);

      // 2.2 绑定空popup并替换其dom节点
      marker.bindPopup("");
      var popupDiv = document.createElement("div");
      popupDiv.className = "geovis-custom";
      popupDiv.innerHTML = `
              <div class="geovis-custom-popup">
                  <div class="geovis-custom-popup-wrap">
                      <div class="geovis-custom-popup-content">
                              <ul class="test-list">
                                  <li>坐标：${e.lonlat[0].toFixed(2)},${e.lonlat[1].toFixed(2)}</li>
                                  <li>高度：${e.lonlat[2].toFixed(2)}</li>
                                  <li>坡度: ${(Math.random() * 90).toFixed(2)}</li>
                                  <li>坡向: ${(Math.random() * 360).toFixed(2)}</li>
                              </ul>
                          <div class="label-content">
                          </div>
                      </div>
                  </div>
                  <div class="gv-marker-line"></div>
              </div>
              `;
      marker.popup.element = popupDiv;
      marker.showPopup();
    });

  }
}

export const viewModel = new ViewModel();