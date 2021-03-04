

const { Deck, AmbientLight, PointLight, LightingEffect } = deck;

const INITIAL_VIEW_STATE = {
    latitude: 51.46,
    longitude: -0.4,
    zoom: 8,
    pitch: 0
};
const projection = new GeoVis.WebMercatorProjection()
function getViewportFromEarth(earth) {
    const {camera,canvas} = earth;
    // const canvas = earth
    const ray = camera.getPickRay(new GeoVis.Cartesian2(
        Math.round(canvas.clientWidth / 2),
        Math.round(canvas.clientHeight / 2)//canvas.clientHeight//0//
    ));

    const position = earth.scene.globe.pick(ray, earth.scene);
    if (GeoVis.defined(position)) {
        const cartographic = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(position);
        const mapPosition = projection.project(cartographic)
        const height = cartographic.height;
        const cameraPos = GeoVis.Cartographic.toCartesian(projection.unproject(camera.position))
        const range = GeoVis.Cartesian3.distance(mapPosition, camera.position);
        
        const latitude = GeoVis.Math.toDegrees(cartographic.latitude)
        const longitude = GeoVis.Math.toDegrees(cartographic.longitude)
        const pitch = GeoVis.Math.toDegrees(camera.pitch+Math.PI / 2)
        let bearing = GeoVis.Math.toDegrees(camera.heading)
        bearing %= 360;
        const zoom = camera.heightTozoom(range)
        return {
            longitude,
            latitude,
            pitch,
            bearing,
            zoom
        }
    } else {
        return null;
    }

}




export function createDeckProvider(earth) {

    const canvasEl = document.createElement('canvas');
    const mapEl = earth.canvas;
    canvasEl.style.position = "absolute"
    canvasEl.style.left = "0"
    canvasEl.style.top = "0"
    canvasEl.style.pointerEvents = "none"
    let { clientWidth, clientHeight } = mapEl;
    canvasEl.width = clientWidth;
    canvasEl.height = clientHeight;
    const initialViewState = getViewportFromEarth(earth) || INITIAL_VIEW_STATE
    earth.container.appendChild(canvasEl)
    const deck = new Deck({
        canvas: canvasEl,
        width: canvasEl.width,
        height: canvasEl.height,
        initialViewState,
        // Google maps has no rotating capabilities, so we disable rotation here.
        controller: {
            scrollZoom: false,
            dragPan: false,
            dragRotate: false,
            doubleClickZoom: false,
            touchZoom: false,
            touchRotate: false,
            keyboard: false,
        },
        layers: []
    });
    deck["GEOVIS_HANDLER"] = () => {
        const viewport = getViewportFromEarth(earth);
        deck.setProps({ viewState: viewport });
    }
    earth.scene.postRender.addEventListener(deck["GEOVIS_HANDLER"])
    window.deckInstance = deck
    return deck;
}


export function removeDeckProvider(earth, deckInstance) {
    earth.scene.postRender.removeEventListener(deckInstance["GEOVIS_HANDLER"])
    deckInstance.finalize();
    earth.container.removeChild(deckInstance.canvas) 
}