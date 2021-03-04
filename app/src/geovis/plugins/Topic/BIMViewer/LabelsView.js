
var rx = GeoVis.Matrix3.fromRotationY(-Math.PI / 2)
var ry = GeoVis.Matrix3.fromRotationX(-1.12020321)

var rotation = GeoVis.Matrix3.multiply(rx,ry,new GeoVis.Matrix3());
function createLabel(app,room,slug){
    if(!app.data.locationBySlug[slug]) return
    var pos = [...app.data.locationBySlug[slug].lonlat,5];
    
    
    // var cartesian = new GeoVis.Cartesian3(origin.x+pos.x,origin.y+pos.y,origin.z+pos.z)
    var marker = new GeoVis.Marker(pos, {
        // dom: dom
    }).addTo(earth.features);
    marker.element.innerHTML = room.$label;
    room.marker = marker;
    marker.element.style.zIndex = 1
    marker.element.className = "labels"
}
function LabelsView(app) {

    // this.init = function (camera) {

    var prisonMesh = app.buildingMesh,
        boundingSphereRadius = prisonMesh.geometry.boundingSphere.radius,
        buildingCenter = prisonMesh.position.clone(),
        rooms = app.rooms;


    // update all room labels
    for (var i = 0, max = rooms.length; i < max; i++) {
        var room = rooms[i],
            roomSlug = room.getSlug(),
            anchor = room.getCenter();
        const { x, y, z } = app.cartesian
        var position = new GeoVis.Cartesian3(anchor.x*4.4, anchor.y*4.4, anchor.z*4.4);
        createLabel(app,room,roomSlug)
    }

    var whiteBuilding = app.whiteBuilding,
        whiteBuildingSlug = whiteBuilding.getSlug(),
        anchor = whiteBuilding.getCenter();
    // screenCoord = toScreenXY(anchor, camera);
    const { x, y, z } = app.cartesian
    var position = new GeoVis.Cartesian3(anchor.x*4.4, anchor.y*4.4, anchor.z*4.4);
    createLabel(app,whiteBuilding,whiteBuildingSlug)
    // var targetScale = (whiteBuildingSlug === appOverLocation || whiteBuildingSlug === appActiveLocation) ? 1.11 : 1;
    // // ease
    // whiteBuilding.scale += (targetScale - whiteBuilding.scale) * 0.2;

    // var transform = 'translate3d(' + screenCoord.x + 'px,'
    //     + screenCoord.y + 'px,0px) scale(' + whiteBuilding.scale
    //     + ',' + whiteBuilding.scale + ')';

    // whiteBuilding.$label.css({
    //     'transform': transform,
    //     // opacity won't be affected by distance
    //     'opacity': .7,
    //     'z-index': 60,
    // });
    // }

    this.setOpacity = (val)=>{
        var mainOpacity = ( val < 0.6 ) ? 1 : 0;
        for (var i = 0, max = rooms.length; i < max; i++) {
            var room = rooms[i];
            if(room.marker){
                room.marker.element.style.opacity = mainOpacity
            }
        }
    }
}


export default LabelsView;