import { toRadians } from "@/geovis/util";
import { earthStore } from "../EarthStore";
import AbstractModel from "./AbstractModel";

const L = window["L"];
const chroma = window["chroma"];
const VectorFieldAnim = window["VectorFieldAnim"];
// 图像填入数据
function prepareImageIn(data, layer, thisColor, width, height) {
  const f = "interpolatedValueAt"; // 'interpolatedValueAt' : 'valueAt';
  let pos = 0;
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const lon = 98.4375 + i * 0.0879;
      const lat = 51.5634 - j * 0.075;
      let func = layer._field[f];
      func = func.bind(layer._field);
      const v = func(lon, lat); // 'valueAt' | 'interpolatedValueAt' || TODO check some 'artifacts'
      if (v !== null) {
        // let color = getColorFor(v);
        const color = chroma(thisColor(v));
        const [R, G, B, A] = color.rgba();
        data[pos] = R;
        data[pos + 1] = G;
        data[pos + 2] = B;
        data[pos + 3] = Math.floor(A * 255); // not percent in alpha but hex 0-255
      }
      pos = pos + 4;
    }
  }
}

function createCurrentGeom(u, v, width, height, bounds) {
  //////////////////////////////球上添加洋流图层///////////////////////////////////
  const [lonMin, latMin, lonMax, latMax] = bounds;
  const vf = L.VectorField.fromASCIIGrids(u, v);
  const range = vf.range;
  const scale = chroma.scale("OrRd").domain(range);
  const vectorField = new VectorFieldAnim({
    earth,
    field: vf,
    width,
    height,
    color: "white",
    pathNum: 10000,
    maxAge: 200,
    velocityScale: 1 / 2,
    lonMin,
    latMin,
    lonMax,
    latMax
  });

  const material = new GeoVis.Material({
    fabric: {
      type: "Image",
      uniforms: {
        image: vectorField.canvas
        // repeat: true
      }
    }
  });

  const rec = new GeoVis.RectangleGeom([lonMin, latMin, lonMax, latMax], {
    height: -3000 * 15,
    async: true,
    material
  }).addTo(earth.features);
  rec["vectorField"] = vectorField;
  return rec
}

function createCTDLayer(asc, width, height, bounds) {
  const s = L.ScalarField.fromASCIIGrid(asc);
  const layer1 = L.canvasLayer.scalarField(s, {
    color: chroma.scale("GnBu").domain(s.range),
    mouseMoveCursor: null
  });
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const thisColor = chroma.scale("GnBu").domain(s.range);

  const scalarfieldCtx = canvas.getContext("2d");
  const img = scalarfieldCtx.createImageData(width, height);
  const data = img.data;
  prepareImageIn(data, layer1, thisColor, width, height);
  scalarfieldCtx.putImageData(img, 0, 0);
  const layer = new GeoVis.SingleLayer(canvas, { rectangle: GeoVis.Rectangle.fromDegrees(...bounds) }).addTo(earth.layers);
  return layer
}

export default class VectorField extends AbstractModel {
  state: GVAPP.TreeNode;
  _field: any; //GeoVis.GeoJSOn;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createFiled();
    }
  }

  setChecked(checked: boolean) {
    if (checked && this._field) {
      this._field.visible = true;
    } else if (checked && !this._field) {
      this.createFiled();
    } else if (this._field) {
      this.removeFiled();
    }

    this.state.checked = checked;
  }

  async createFiled() {
    //@ts-ignore
    if (this.state.data.vis === "flow") {
      const { u, v, width, height } = this.state.data;
      const bounds = this.state.data.bounding.rectangle;
      const uText = await fetch(u).then(res => res.text());
      const vText = await fetch(v).then(res => res.text());
      this._field = createCurrentGeom(uText, vText, width, height, bounds);
    } else {
      const { asc, width, height } = this.state.data;
      const bounds = this.state.data.bounding.rectangle;
      const ascText = await fetch(asc).then(res => res.text());
      this._field = createCTDLayer(ascText, width, height, bounds);
    }
  }

  removeFiled() {
    try {
      if (this._field instanceof GeoVis.RectangleGeom) {
        this._field.removeFrom(earthStore.earth.features);
        this._field["vectorField"].destroy();
      } else {
        this._field.removeFrom(earthStore.earth.layers);
      }
      this._field = undefined;
    } catch (e) {
      console.error(e);
    }
  }

  zoomTo() {
    if (!this._field) return;
    if (this.state.data.bounding && this.state.data.bounding.rectangle) {
      earthStore.earth.camera.flyTo({
        destination: GeoVis.Rectangle.fromDegrees(...this.state.data.bounding.rectangle)
      });
    }
    // if(node.viewport){
    //   fly
    // }
  }
}
