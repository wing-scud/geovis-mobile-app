import { earthStore } from "@/geovis/store";
const turf = window["turf"];
const icons = [];
//@ts-ignore
const Types = DrawHelper.Types;
const iconlist = ["博物馆.png", "大使馆.png", "百货商店.png", "学校.png", "银行.png", "营地.png", "路口.png", "美术馆.png"].map((str) => "static/social/" + str);
const earth = earthStore.earth;
const drawHelper = earthStore.drawHelper;
function addCircle() { }
function addPoint() {
    earth.once("click", function (e) {
        const position = e.lonlat;
        const point = new GeoVis.Point(position, {
            pixelSize: 15,
        }).addTo(earth.features);
    });
}
function getPrimitive(type) {
    return new Promise(resolve => {
        if (type !== "点") {
            //@ts-ignore
            drawHelper.once("created", function (e) {
                const primitive = e.entity;
                resolve(primitive)
            });
        } else {
            earth.once("click", function (e) {
                const position = e.lonlat;
                const point = new GeoVis.Point(position, {
                    pixelSize: 15,
                }).addTo(earth.features);

                resolve(point)
            });
        }
    })
}
function addLine() {
    //@ts-ignore
    return drawHelper.startDrawingPolyline({
        type: Types.PROJ_POLYLINE,
    });
}
function addPolygon() {
    //@ts-ignore
    return drawHelper.startDrawingPolygon({
        type: Types.PROJ_POLYGON,
    });
}
function addPointBuffer(primitive, radius) {
    //@ts-ignore
    const coor = GeoVis.Util.cartesianToLonlat(primitive.position);
    const turfPoint = turf.point(coor);
    const options = {
        units: "meters",
    };
    const buffer = turf.buffer(turfPoint, radius, options);
    const bufferCoors = buffer.geometry.coordinates;
    const circle = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5), // 填充颜色
    }).addTo(earth.features);
    return buffer;
}
function addPolylineBuffer(primitive, radius) {
    let coors = primitive.positions;
    coors = coors.map(function (element) {
        //@ts-ignore
        return GeoVis.Util.cartesianToLonlat(element);
    });
    const turfPolyline = turf.lineString(coors);
    const options = {
        units: "meters",
    };
    const buffer = turf.buffer(turfPolyline, radius, options);
    const bufferCoors = buffer.geometry.coordinates;
    const polygon = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        height: 0,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5), // 填充颜色
    }).addTo(earth.features);
    return buffer;
}
function addPolygonBuffer(primitive, radius) {
    let coors = primitive.positions;
    coors.push(coors[0]);
    coors = coors.map(function (element) {
        //@ts-ignore
        return GeoVis.Util.cartesianToLonlat(element);
    });
    const turfPolygon = turf.polygon([coors]);
    const options = {
        units: "meters",
    };
    const buffer = turf.buffer(turfPolygon, radius, options);
    const bufferCoors = buffer.geometry.coordinates;
    const polygon = new GeoVis.Polygon(bufferCoors[0], {
        fill: true,
        height: 0,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(1), // 填充颜色
    }).addTo(earth.features);
    return buffer;
}
function createRandomIcons(buffer) {
    const earth = earthStore.earth;
    //@ts-ignore
    drawHelper.removeAll();
    const bbox = turf.bbox(buffer);
    const points = turf.randomPoint(100, { bbox: bbox });
    const lonlats = [];
    points.features.map((feature) => {
        if (turf.booleanContains(buffer, feature)) {
            lonlats.push(feature.geometry.coordinates);
        }
    });
    lonlats.map((lonlat) => {
        const index = Math.random() * iconlist.length;
        const iconUrl = iconlist[Math.floor(index)];
        console.log(iconUrl);
        icons.push(
            new GeoVis.Billboard(lonlat, {
                image: iconUrl,
                width: 30,
                height: 30,
                //@ts-ignore
                disableDepthTestDistance: 1e5,
            }).addTo(earth.features)
        );
    });
}
function clearBuffer() {
    //@ts-ignore
    drawHelper.removeAll()
    earth.features.removeAll();
}
function draw(type) {
    let drawing;
    switch (type) {
        case "点":
            drawing = addPoint();
            break;
        case "线":
            drawing = addLine();
            break;
        case "多边形":
            drawing = addPolygon();
            break;
        case "圆":
            drawing = addCircle();
            break;
        default:
            break;
    }
    return drawing;
}
function generateBuffer(type,primitive, radius) {
    let buffer;
    switch (type) {
        case "点":
            buffer = addPointBuffer(primitive, radius);
            break;
        case "线":
            buffer = addPolylineBuffer(primitive, radius);
            break;
        case "多边形":
            buffer = addPolygonBuffer(primitive, radius);
            break;
        case "圆":
            // buffer = addCircleBuffer(primitive, radius);
            break;
        default:
            break;
    }
    return buffer;
}
export {draw,generateBuffer,getPrimitive,createRandomIcons,clearBuffer}