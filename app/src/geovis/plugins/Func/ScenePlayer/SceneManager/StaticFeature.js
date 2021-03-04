function generateBezier(p0, p3, ratio = 1) {
  const deltaLon = p3[0] - p0[0];
  const deltaLat = p3[1] - p0[1];
  const points = GeoVis.Cartesian3.fromDegreesArrayHeights([...p0, ...p3]);
  const distance = GeoVis.Cartesian3.distance(points[0], points[1]);
  const height = (ratio * distance * 3) / 5;
  const p1 = [p0[0] + (deltaLon * 1) / 5, p0[1] + (deltaLat * 1) / 5, height];
  const p2 = [p0[0] + (deltaLon * 4) / 5, p0[1] + (deltaLat * 4) / 5, height];
  const cartes = GeoVis.Cartesian3.fromDegreesArrayHeights([...p0, ...p1, ...p2, ...p3]);

  const xPos = cartes.map(carte => carte.x);
  const yPos = cartes.map(carte => carte.y);
  const zPos = cartes.map(carte => carte.z);
  function bezier(n) {
    const positions = [];
    let f1, f2, f3, f4;
    const deltaT = 1.0 / n;
    let T;
    for (let i = 0; i <= n; i++) {
      T = i * deltaT;
      f1 = (1 - T) * (1 - T) * (1 - T);
      f2 = 3 * T * (1 - T) * (1 - T);
      f3 = 3 * T * T * (1 - T);
      f4 = T * T * T;
      const x = f1 * xPos[0] + f2 * xPos[1] + f3 * xPos[2] + f4 * xPos[3];
      const y = f1 * yPos[0] + f2 * yPos[1] + f3 * yPos[2] + f4 * yPos[3];
      const z = f1 * zPos[0] + f2 * zPos[1] + f3 * zPos[2] + f4 * zPos[3];
      positions.push(new GeoVis.Cartesian3(x, y, z));
    }
    return positions;
  }
  return bezier(20);
}

export function createWall(features, lonlats, minHeight, maxHeight, color) {
  // var minimumHeights = minHeight;//lonlats.map(s=>minHeight);
  // var maximumHeights = maxHeight//lonlats.map(s=>manHeight);
  // var color = color || GeoVis.Color.fromCssString("#009688").withAlpha(0.8); // 填充颜色
  // var rec = new GeoVis.WallGeom(lonlats, {
  //   minimumHeights: minimumHeights,
  //   maximumHeights: maximumHeights,
  //   async: false,
  //   fill: true,
  //   fillColor: color,
  //   material: new GeoVis.Material({
  //     fabric: {
  //       type: "Image",
  //       uniforms: {
  //         repeat: {
  //           x: 40,
  //           y: 1
  //         },
  //         color,
  //         image: "./static/data/items/wall.png"
  //       }
  //     }
  //   })
  // });
  // rec.addTo(features);

  // const color = GeoVis.Color.fromCssString("#D81B60");
  // const lonlats = [
  //   [120.39931989785127, 23.915935749703564, 0],
  //   [118.52081055156208, 24.925379837288716, 0]
  // ];
  // const positions = generateBezier(lonlats[0], lonlats[1], 0.5);
  // const polyline = new GeoVis.Polyline(positions, {
  //   colors: [color],
  //   vertexColor: true,
  //   followSurface: true,
  //   width: 2.0
  // }).addTo(earth.features);
}
