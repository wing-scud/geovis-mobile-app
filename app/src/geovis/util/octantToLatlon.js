/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable */

const octant_dict = {
  "0": [0, 0, 0],
  "1": [1, 0, 0],
  "2": [0, 1, 0],
  "3": [1, 1, 0],
  "4": [0, 0, 1],
  "5": [1, 0, 1],
  "6": [0, 1, 1],
  "7": [1, 1, 1]
};

function LatLon(lat, lon) {
  this.lon = lon;
  this.lat = lat;
}
function LatLonBox(north, south, west, east) {
  this.north = north;
  this.south = south;
  this.west = west;
  this.east = east;
  this.mid_point = new LatLon((north + south) / 2, (west + east) / 2);
}

LatLonBox.prototype.getCenter = function() {
  return [(this.west + this.east) / 2, (this.south + this.north) / 2];
};
LatLonBox.prototype.get_child = function(octant) {
  try {
    var [oct_x, oct_y, oct_z] = octant_dict[octant];
  } catch (e) {
    console.log("invalid octant value");
  }
  let { north: n, south: s, west: w, east: e } = this;
  // print(oct_x, oct_y, oct_z, "||", w, s, e, n)
  if (oct_y == 0) {
    n = this.mid_point.lat;
  } else if (oct_y == 1) {
    s = this.mid_point.lat;
  } else {
    console.log("error");
  }
  if (n == 90 || s == -90) return new LatLonBox(n, s, w, e);

  if (oct_x == 0) {
    e = this.mid_point.lon;
  } else if (oct_x == 1) {
    w = this.mid_point.lon;
  } else {
    console.log("err");
  }
  return new LatLonBox(n, s, w, e);
};

LatLonBox.is_overlapping = function(box1, box2) {
  const { north: n1, south: s1, west: w1, east: e1 } = box1;
  const { north: n2, south: s2, west: w2, east: e2 } = box2;

  const n = Math.min(n1, n2);
  const s = Math.max(s1, s2);
  const w = Math.max(w1, w2);
  const e = Math.min(e1, e2);

  return n >= s && w <= e;
};
const first_latlonbox_dict = {
  "": new LatLonBox(90, -90, -180, 180),
  "0": new LatLonBox(0, -90, -180, 0),
  "1": new LatLonBox(0, -90, 0, 180),
  "2": new LatLonBox(90, 0, -180, 0),
  "3": new LatLonBox(90, 0, 0, 180),
  "02": new LatLonBox(0, -90, -180, -90),
  "03": new LatLonBox(0, -90, -90, 0),
  "12": new LatLonBox(0, -90, 0, 90),
  "13": new LatLonBox(0, -90, 90, 180),
  "20": new LatLonBox(90, 0, -180, -90),
  "21": new LatLonBox(90, 0, -90, 0),
  "30": new LatLonBox(90, 0, 0, 90),
  "31": new LatLonBox(90, 0, 90, 180)
};

export function octant_to_latlong(octant_string) {
  let latlonbox = first_latlonbox_dict[octant_string.slice(0, 2)];
  const leftOct = octant_string.slice(2, octant_string.length);
  for (const octant in leftOct) latlonbox = latlonbox.get_child(leftOct[octant]);
  return latlonbox.getCenter();
}

export function octantToBounds(octant_string) {
  let latlonbox = first_latlonbox_dict[octant_string.slice(0, 2)];
  const leftOct = octant_string.slice(2, octant_string.length);
  for (const octant in leftOct) latlonbox = latlonbox.get_child(leftOct[octant]);
  const { west, south, east, north } = latlonbox;
  return [west, south, east, north];
}

export function isRectOverlap(bound0, bound1) {
  return !(bound0[2] < bound1[0] || bound0[1] > bound1[3] || bound1[2] < bound0[0] || bound1[1] > bound0[3]);
}
