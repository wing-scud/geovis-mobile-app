let selectArea;
let selectHeight;
let planePrimitive;
let cutPolygon;
let fillPolygon;
const DrawHelper = window["DrawHelper"];
const turf = window["turf"];
let height;
let allmeasures;

function updatePlane(positions, adjustHeight) {
  earth.scene.primitives.remove(planePrimitive);
  if (!adjustHeight) {
    height = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[0]).height;
  } else {
    height = adjustHeight;
  }
  //console.log(positions);
  const planeInstance = new GeoVis.GeometryInstance({
    geometry: GeoVis.PolygonGeometry.fromPositions({
      positions: positions,
      height: height
    })
  });
  earth.scene.primitives.add(
    (planePrimitive = new GeoVis.Primitive({
      geometryInstances: planeInstance,
      appearance: new GeoVis.MaterialAppearance({
        material: new GeoVis.Material({
          fabric: {
            type: "Color",
            uniforms: {
              color: GeoVis.Color.fromCssColorString("#009688").withAlpha(0.5)
            }
          }
        })
      })
    }))
  );
}
const tags = new Map();
const { computeDistance, computeArea, getCentroid } = DrawHelper;

function removeLabels() {
  tags.forEach(elements => {
    elements.map(ele => ele.removeFrom(earth.features));
  });
}

function terrainarea(positionsA, positionsB, positionsC) {
  let area = -1;

  const side = []; // 存储三条边的长度;

  side[0] = GeoVis.Cartesian3.distance(positionsA, positionsB);
  side[1] = GeoVis.Cartesian3.distance(positionsB, positionsC);
  side[2] = GeoVis.Cartesian3.distance(positionsA, positionsC);

  // 不能构成三角形;
  if (side[0] + side[1] <= side[2] || side[0] + side[2] <= side[1] || side[1] + side[2] <= side[0]) return area;

  // 利用海伦公式。s=sqr(p*(p-a)(p-b)(p-c));
  const p = (side[0] + side[1] + side[2]) / 2; // 半周长;
  area = Math.sqrt(p * (p - side[0]) * (p - side[1]) * (p - side[2]));

  return Math.abs(area);
}
//生成四边形区域范围
function areaDivision(positions, accuracy) {
  const spacearea = Math.abs(computeArea(positions));
  let startLon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
  let startLat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
  let endLon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
  let endLat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
  for (let i = 1; i < positions.length; i++) {
    startLon < GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? (startLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude) : startLon;
    startLat < GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? (startLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude) : startLat;
    endLon > GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? (endLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude) : endLon;
    endLat > GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? (endLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude) : endLat;
    // startLon < GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? (startLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude) : (startLon = startLon);
    // startLat < GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? (startLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude) : (startLat = startLat);
    // endLon > GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? (endLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude) : (endLon = endLon);
    // endLat > GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? (endLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude) : (endLat = endLat);
  }

  const bbox = [GeoVis.Math.toDegrees(endLon), GeoVis.Math.toDegrees(endLat), GeoVis.Math.toDegrees(startLon), GeoVis.Math.toDegrees(startLat)];
  const DegreesPos = [];
  for (let i = 0; i < positions.length; i++) {
    const Lon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude;
    const Lat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude;
    const Degree = [GeoVis.Math.toDegrees(Lon), GeoVis.Math.toDegrees(Lat)];
    DegreesPos.push(Degree);
  }
  const Lon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
  const Lat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
  const Degree1 = [GeoVis.Math.toDegrees(Lon), GeoVis.Math.toDegrees(Lat)];
  DegreesPos.push(Degree1);

  let cellSide = Math.sqrt(spacearea / accuracy);
  if (cellSide < 12) {
    cellSide = 12;
  } // entity.cellSidse;
  // cellSide = 20;
  const options = {
    units: "meters",
    mask: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [DegreesPos]
      }
    }
  };
  console.log("bbox", bbox);
  console.log("cellSide", cellSide);
  console.log("options", options);
  const triangleGrid = turf.triangleGrid(bbox, cellSide, options);

  return triangleGrid;
}

function drawCutFill(positions, height, maxheight, minheight) {
  const fillInstance = new GeoVis.GeometryInstance({
    geometry: GeoVis.PolygonGeometry.fromPositions({
      positions: positions,
      height: height,
      extrudedHeight: minheight - 1
    })
  });
  earth.scene.primitives.add(
    (fillPolygon = new GeoVis.Primitive({
      geometryInstances: fillInstance,
      appearance: new GeoVis.MaterialAppearance({
        material: new GeoVis.Material({
          fabric: {
            type: "Color",
            uniforms: {
              color: GeoVis.Color.fromCssColorString("#50E3C2").withAlpha(0.6)
            }
          }
        })
      })
    }))
  );

  const cutInstance = new GeoVis.GeometryInstance({
    geometry: GeoVis.PolygonGeometry.fromPositions({
      positions: positions,
      height: height,
      extrudedHeight: maxheight + 1000
    }),
    attributes: {
      color: GeoVis.ColorGeometryInstanceAttribute.fromColor(GeoVis.Color.fromCssColorString("#2575FC").withAlpha(0.5)),
      show: new GeoVis.ShowGeometryInstanceAttribute(true)
    }
  });

  earth.scene.primitives.add(
    (cutPolygon = new GeoVis.ClassificationPrimitive({
      geometryInstances: cutInstance,
      classificationType: GeoVis.ClassificationType.CESIUM_3D_TILE
    }))
  );
}

function removePrimitive() {
  earth.scene.primitives.remove(fillPolygon);
  earth.scene.primitives.remove(cutPolygon);
}

function onePointUp(point1, point2, point3, height) {
  const cartographicA = GeoVis.Cartographic.fromCartesian(point1);
  const cartographicB = GeoVis.Cartographic.fromCartesian(point2);
  const cartographicC = GeoVis.Cartographic.fromCartesian(point3);
  const A = cartographicA.height - height;
  const B = cartographicB.height - height;
  const C = cartographicC.height - height;
  if ((A < 0 && B < 0) || (B < 0 && C < 0) || (A < 0 && C < 0)) {
    return true;
  } else {
    return false;
  }
}

function onePointUpMeasure(point1, point2, point3, height, area) {
  const allMeasures = [];
  const cartographicA = GeoVis.Cartographic.fromCartesian(point1);
  const cartographicB = GeoVis.Cartographic.fromCartesian(point2);
  const cartographicC = GeoVis.Cartographic.fromCartesian(point3);
  const A = cartographicA.height - height;
  const B = cartographicB.height - height;
  const C = cartographicC.height - height;
  const AB = GeoVis.Cartesian3.distance(point1, point2);
  const AC = GeoVis.Cartesian3.distance(point1, point3);
  const BC = GeoVis.Cartesian3.distance(point2, point3);
  const cutLine1 = (AB * A) / (cartographicA.height - cartographicB.height);
  const cutLine2 = (AC * A) / (cartographicA.height - cartographicC.height);
  const cutarea = (cutLine1 * cutLine2 * Math.sin(Math.acos((AC * AC + AB * AB - BC * BC) / (2 * AC * AB)))) / 2;
  allMeasures.push(cutarea);
  const spacearea = terrainarea(point1, point2, point3);
  const fillarea = spacearea - cutarea;
  allMeasures.push(fillarea);
  const cutvolume = area * (cutarea / spacearea) * A;
  allMeasures.push(cutvolume);
  const fillvolume = area * (fillarea / spacearea) * (-(B + C) / 2);
  allMeasures.push(fillvolume);
  return allMeasures;
}

class CutFillTool {
  // state: { cutFillHeight: number; cutFillMaxHeight: number; minHeight:number;maxHeight:number;cutFillMinHeight: number; cutVolume: number; cutArea: number; fillVolume: number; fillArea: number; };
  constructor() {
    this.state = {
      cutFillHeight: 0,
      cutFillMaxHeight: 300,
      cutFillMinHeight: 0,
      minHeight: 0,
      maxHeight: 0,
      cutVolume: 0,
      cutArea: 0,
      fillVolume: 0,
      fillArea: 0
    };
  }

  setCutFillHeight(val) {
    this.state.cutFillHeight = val;
    selectHeight = parseFloat(val);
    //console.log('selectHeight',selectHeight);
    removePrimitive();
    updatePlane(selectArea, selectHeight);
  }

  setCutFillMaxHeight(val) {
    this.state.maxHeight = val;
  }

  setCutFillMinHeight(val) {
    this.state.minHeight = val;
  }

  setCutVolume(val) {
    this.state.cutVolume = val;
  }

  setFillVolume(val) {
    this.state.fillVolume = val;
  }

  setCutArea(val) {
    this.state.cutArea = val;
  }

  setFillArea(val) {
    this.state.fillArea = val;
  }
  startAnaly = () => {
    this.computeCutFill(selectArea, selectHeight);
  };
  init = positions => {
    this.destroy();
    //console.log('positions',positions)
    selectArea = positions;
    this.computeHeight(selectArea);
    updatePlane(selectArea);
  };
  computeHeight = selectArea => {
    selectHeight = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(selectArea[0]).height;
    // console.log( GeoVis.Ellipsoid.WGS84.cartesianToCartographic(selectArea[0]))
    // console.log(selectHeight)
    // console.log(parseFloat(selectHeight.toFixed(0)))
    this.setCutFillHeight(parseFloat(selectHeight.toFixed(0)));
  };
  computeCutFill = (positions, adjustHeight) => {
    if (!adjustHeight) {
      adjustHeight = 0;
    }

    const earth = window["earth"];
    earth.scene.primitives.remove(planePrimitive);
    /** @type {GeoVis.Earth} */

    /** @type {GeoVis.Cartesian3[]} */
    earth.globe.depthTestAgainstTerrain = true;
    // 计算分割区域域
    const height = adjustHeight;
    console.log("heieght", height);
    const triangleGrid = areaDivision(positions, 80);
    // 计算区域分割后的坐标集合
    console.log("triangleGrid", triangleGrid.features);
    const cartographic = [];
    for (let j = 0; j < triangleGrid.features.length; j++) {
      for (let i = 0; i < 3; i++) {
        const Coord = GeoVis.Cartographic.fromDegrees(triangleGrid.features[j].geometry.coordinates[0][i][0], triangleGrid.features[j].geometry.coordinates[0][i][1], height);
        cartographic.push(Coord);
      }
    }
    console.log("cartographic", cartographic);
    const arrayCartesian3 = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographic);

    // 射线求点集合
    const cartographic1 = [];
    for (let j = 0; j < triangleGrid.features.length; j++) {
      for (let i = 0; i < 3; i++) {
        const Coord = GeoVis.Cartographic.fromDegrees(triangleGrid.features[j].geometry.coordinates[0][i][0], triangleGrid.features[j].geometry.coordinates[0][i][1], height + 500);
        cartographic1.push(Coord);
      }
    }
    const cartographic2 = [];
    for (let j = 0; j < triangleGrid.features.length; j++) {
      for (let i = 0; i < 3; i++) {
        const Coord = GeoVis.Cartographic.fromDegrees(triangleGrid.features[j].geometry.coordinates[0][i][0], triangleGrid.features[j].geometry.coordinates[0][i][1], height + 480);
        cartographic2.push(Coord);
      }
    }

    const arrayCartesian31 = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographic1);

    const arrayCartesian32 = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographic2);
    const clampHeightpostions = [];
    for (let i = 0; i < arrayCartesian3.length; i++) {
      const direction = GeoVis.Cartesian3.normalize(GeoVis.Cartesian3.subtract(arrayCartesian32[i], arrayCartesian31[i], new GeoVis.Cartesian3()), new GeoVis.Cartesian3());
      const ray = new GeoVis.Ray(arrayCartesian31[i], direction);
      const result = earth.scene["drillPickFromRay"](ray, 10);
      if (GeoVis.defined(result[0]) && GeoVis.defined(result[0].position)) {
        clampHeightpostions.push(result[0].position);
      } else {
        clampHeightpostions.push(arrayCartesian3[i]);
      }
    }

    const arraCartographic = GeoVis.Ellipsoid.WGS84.cartesianArrayToCartographicArray(clampHeightpostions);
    // 计算区域模型的最高最低点
    let maxheight = arraCartographic[0].height;
    let minheight = arraCartographic[0].height;

    for (let i = 10; i < arraCartographic.length; i++) {
      if (!arraCartographic[i].height) {
        return;
      }
      maxheight > arraCartographic[i].height ? 1 : (maxheight = arraCartographic[i].height);
      minheight < arraCartographic[i].height ? 1 : (minheight = arraCartographic[i].height);
    }

    if (minheight < 0) {
      minheight = 0;
    }

    this.setCutFillMaxHeight(parseFloat(maxheight.toFixed(2)));
    this.setCutFillMinHeight(parseFloat(minheight.toFixed(2)));
    // 计算填挖方体积
    let cutVolume = 0;
    let fillVolume = 0;
    // 计算填挖方面积
    let cutArea = 0;
    let fillArea = 0;
    for (let i = 0; i < cartographic.length; i = i + 3) {
      // 计算平均高度
      const cutfillHeight = (arraCartographic[i].height + arraCartographic[i + 1].height + arraCartographic[i + 2].height) / 3 - height;
      // 计算底面积
      const polyarea = terrainarea(arrayCartesian3[i], arrayCartesian3[i + 1], arrayCartesian3[i + 2]);

      const height1 = arraCartographic[i].height - height;
      const height2 = arraCartographic[i + 1].height - height;
      const height3 = arraCartographic[i + 2].height - height;

      // 全在上面
      if (height1 >= 0 && height2 >= 0 && height3 >= 0) {
        cutVolume = cutVolume + polyarea * cutfillHeight;
        cutArea = cutArea + terrainarea(arrayCartesian3[i], arrayCartesian3[i + 1], arrayCartesian3[i + 2]);
      } else if (height1 < 0 && height2 < 0 && height3 < 0) {
        // 全在下面
        fillVolume = fillVolume + polyarea * -cutfillHeight;
        fillArea = fillArea + terrainarea(arrayCartesian3[i], arrayCartesian3[i + 1], arrayCartesian3[i + 2]);
      } else if (
        // 如果一个点是上面的
        onePointUp(clampHeightpostions[i], clampHeightpostions[i + 1], clampHeightpostions[i + 2], height)
      ) {
        if (height1 >= 0) {
          allmeasures = onePointUpMeasure(clampHeightpostions[i], clampHeightpostions[i + 1], clampHeightpostions[i + 2], height, polyarea);
          cutVolume = cutVolume + allmeasures[2];
          cutArea = cutArea + allmeasures[0];
          fillVolume = fillVolume + allmeasures[3];
          fillArea = fillArea + allmeasures[1];
        } else if (height2 >= 0) {
          allmeasures = onePointUpMeasure(clampHeightpostions[i + 1], clampHeightpostions[i], clampHeightpostions[i + 2], height, polyarea);
          cutVolume = cutVolume + allmeasures[2];
          cutArea = cutArea + allmeasures[0];
          fillVolume = fillVolume + allmeasures[3];
          fillArea = fillArea + allmeasures[1];
        } else {
          allmeasures = onePointUpMeasure(clampHeightpostions[i + 2], clampHeightpostions[i], clampHeightpostions[i + 1], height, polyarea);
          cutVolume = cutVolume + allmeasures[2];
          cutArea = cutArea + allmeasures[0];
          fillVolume = fillVolume + allmeasures[3];
          fillArea = fillArea + allmeasures[1];
        }
      } else {
        if (height1 < 0) {
          const allmeasures = onePointUpMeasure(clampHeightpostions[i], clampHeightpostions[i + 1], clampHeightpostions[i + 2], height, polyarea);
          cutVolume = cutVolume - allmeasures[3];
          cutArea = cutArea + allmeasures[1];
          fillVolume = fillVolume - allmeasures[2];
          fillArea = fillArea + allmeasures[0];
        } else if (height2 < 0) {
          allmeasures = onePointUpMeasure(clampHeightpostions[i + 1], clampHeightpostions[i], clampHeightpostions[i + 2], height, polyarea);
          cutVolume = cutVolume - allmeasures[3];
          cutArea = cutArea + allmeasures[1];
          fillVolume = fillVolume - allmeasures[2];
          fillArea = fillArea + allmeasures[0];
        } else {
          allmeasures = onePointUpMeasure(clampHeightpostions[i + 2], clampHeightpostions[i], clampHeightpostions[i + 1], height, polyarea);
          cutVolume = cutVolume - allmeasures[3];
          cutArea = cutArea + allmeasures[1];
          fillVolume = fillVolume - allmeasures[2];
          fillArea = fillArea + allmeasures[0];
        }
      }
    }

    // fillVolume = 22012 + 22012 * (Math.random() - 0.5) * 0.5;
    this.setCutVolume(cutVolume); // 22012
    // fillVolume = cutVolume + cutVolume * (Math.random() - 0.5) * 0.5;
    // cutfillVolume = 18552 + 18552 * (Math.random() - 0.5) * 0.5;
    this.setFillVolume(fillVolume); // 18552
    const cutfillVolume = cutVolume + fillVolume;
    const cutfillArea = cutArea + fillArea;

    // fillArea = cutArea + cutArea * (Math.random() - 0.5) * 0.5;
    // cutArea = 1643 + 1643 * (Math.random() - 0.5) * 0.5;
    this.setCutArea(cutArea); // 1643
    // fillArea = 1369 + 1369 * (Math.random() - 0.5) * 0.5;
    this.setFillArea(fillArea); // 1369

    drawCutFill(positions, height, maxheight, minheight);
  };
  destroy = () => {
    removeLabels();
    earth.scene.primitives.remove(fillPolygon);
    earth.scene.primitives.remove(cutPolygon);
    if (planePrimitive) {
      earth.scene.primitives.remove(planePrimitive);
    }
  };
}

export const cutFillTool = new CutFillTool();
