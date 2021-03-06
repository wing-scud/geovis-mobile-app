import BuildingView from "./BuildingView"
import LabelView from "./LabelsView";
import BuildingLoader from "./preload"
import EventManager from "./EventManager";


function fadeOut(app,layer) {
    
    if (layer.alpha > 0&& (app.state.statu==="FINISH")) {
        setTimeout(() => {
            layer.alpha -= 0.01;
            fadeOut(app,layer)
        }, 50)
    }
}


function fadeIn(layer) {
    if (layer.alpha < layer.oldAlpha) {
        setTimeout(() => {
            layer.alpha += 0.03;
            fadeIn(layer)
        }, 50)
    }
}

function fadeOutBuilding(app) {
    if (app.state.opacity > 0.5&& (app.state.statu==="FINISH")) {
        setTimeout(() => {
            app.state.opacity -= 0.02;
            app.setOpacity(app.state.opacity)
            fadeOutBuilding(app)
        }, 50)
    }
}
class App extends GeoVis.AbstractMarker.__proto__ {
    constructor() {
        super();
        this.data = {
        }
        this.state = {
            statu: "NONE",
            opacity: 1.0,
            locations:[],
            room:""
        }// statu
        this.loader = new BuildingLoader(this);
        this.rooms = [];
        this.lonlat = [36.32892258664148, 33.66556212];
        this.cartesian = GeoVis.Cartesian3.fromDegrees(...this.lonlat);
    }

    setOpacity = () => {
        this.labelsView.setOpacity(this.state.opacity)
        this.buildingView.setOpacity(this.state.opacity)
    }
    async init() {
        earth.globe.baseColor = GeoVis.Color.GRAY;
        // this.loader.init();
        var center = GeoVis.Cartesian3.fromDegrees(...this.lonlat)
        var bs = new GeoVis.BoundingSphere(center,100);
        this.state.statu = "LOADING"
        earth.camera.flyToBoundingSphere(bs,{
            offset:new GeoVis.HeadingPitchRange(Math.PI/4,-Math.PI/4,0),
            complete: () => {
                if(this.state.statu !== "LOADING"){
                    return
                }
                earth.layers.layers.map(layer => {
                    layer.oldAlpha = layer.alpha;
                    fadeOut(this,layer)
                })
                this.loader.init().then(() => {
                    if(this.state.statu !== "LOADED"){
                        return
                    }
                    this.buildingView = new BuildingView(this);
                    this.labelsView = new LabelView(this);
                    this.eventManager = new EventManager(this)
                    this.state.statu = "FINISH"
                    fadeOutBuilding(this)
                })

            }
        })
        // earth.camera.flyTo({
        //     destination: GeoVis.Cartesian3.fromDegrees(...this.lonlat, 1e3),
            
        // })
    }

    getOverLocation = () => { return this.overLocation; }

    setOverLocation = ( slug ) => {

        if (slug === this.overLocation) {
            return;
        }

        this.prevOverLocation = this.overLocation;
        this.overLocation = slug;

        this.fire( 'overLocationChange', { location: this.overLocation, prev: this.prevOverLocation } );

    }

    getActiveLocation() { return this.activeLocation; }
    setActiveLocation(slug){
        
        if (slug === this.oactiveLocation) {
            return;
        }

        this.oprevLocation = this.activeLocation;
        this.oactiveLocation = slug;
        

        this.fire( 'activeLocationChange', { current: this.oactiveLocation, prev: this.oprevLocation } );
        //????????????
        this.enterPage(slug)
    }

    enterPage(slug){
        this.state.room = slug;
    }

    exitPage(){

    }

    startRotation() {
        var options = {
            lng: 117.1423291616,
            lat: 39.0645831633,
            height: 15.8,
            heading: 0.0,
            pitch: 0.0,
            roll: 0.0
        };
        var position = Cesium.Cartesian3.fromDegrees(options.lng, options.lat, options.height);
        // ????????????????????????????????????0???????????????????????????????????????????????????????????????-30???
        var pitch = Cesium.Math.toRadians(-30);
        // ???????????????????????????????????????10s, ????????????????????????
        var angle = 360 / 30;
        // ?????????????????????????????????????????????????????????5000m
        var distance = 5000;
        var startTime = Cesium.JulianDate.fromDate(new Date());

        // var stopTime = Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate());

        viewer.clock.startTime = startTime.clone();  // ????????????
        // viewer.clock.stopTime = stopTime.clone();     // ????????????
        viewer.clock.currentTime = startTime.clone(); // ????????????
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // ????????????
        viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // ?????????????????????????????????; ???????????????????????????
        // ???????????????heading
        var initialHeading = viewer.camera.heading;
        var Exection = function TimeExecution() {
            // ????????????????????????????????????s
            var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
            var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
            viewer.scene.camera.setView({
                destination: position, // ????????????
                orientation: {
                    heading: heading,
                    pitch: pitch,

                }
            });
            viewer.scene.camera.moveBackward(distance);

            if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
                viewer.clock.onTick.removeEventListener(Exection);
            }
        };

        viewer.clock.onTick.addEventListener(Exection);

    }
    uninit() {
        this.state.statu = "NONE"
        // earth.scene.postProcessStages.remove(this.blackStage);
        earth.layers.layers.map(layer => {
            fadeIn(layer)
        })
        this.buildingView&&this.buildingView.destroy();
        this.eventManager&&this.eventManager.destroy()
    }

}

export const buildingApp = new App()