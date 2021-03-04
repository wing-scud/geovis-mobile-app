export class CesiumEntityWrapper {
    constructor(viewer) {
        this.viewer = viewer;
        this.entities = {};
        //  this.primitive = [];
        this.primitive = {};
        this.primitiveManager = new GeoVis.PrimitiveCollection();
        this.defaultStatus = undefined;
    }

    get created() {
        return this.components.length > 0;
    }

    get enabled() {
        return this.enabledComponents.length > 0;
    }

    show(components = this.components) {
         ////components = [point ,label]
        for (var entity of components) {
            this.enableComponent(entity); //此处调用的是SatelliteEntityWrapper中的enableComponent函数
        }
    }

    hide(components = this.components) {
        for (var entity of components) {
            this.disableComponent(entity); //entity ='point',....
        }
    }

    get components() {
        return Object.keys(this.entities);
    }

    get enabledComponents() {
        return Object.values(this.entities).filter(entity => this.viewer.entities.contains(entity));
    }

    enableComponent(name) {
        //name = 'point'...
        this._id="add"
        debugger
        if (typeof name === "undefined") {
            return;
        }
        if (name in this.entities && !this.viewer.entities.getById(this.entities[name].id)) {
            this.viewer.entities.add(this.entities[name]);
            //  this.entities={'轨道':new GeoVis.Entity('path':new GeoVis.PathGraphics,position:p)}
        }

        if (name == "轨道" && !this.primitiveManager.contains(this.primitive["轨道"])) {
            this.primitiveManager.destroyPrimitives = false;
            this.primitiveManager.add(this.primitive["轨道"]);
            console.log('gogoogo',this.primitiveManager)
            if (!this.viewer.scene.primitives.contains(this.primitiveManager)) {
                this.viewer.scene.primitives.add(this.primitiveManager);
            }
        }
        if (name == "cylinder" && this.primitive["cylinder"]) {
            this.primitive["cylinder"].addTo(earth.features);
        }
    }

    destroy(){
        // console.log(this.primitiveManager);
        if(this.primitiveManager.length>0){
            // this.primitiveManager.removeAll();
            this.primitiveManager.remove(this.primitive["轨道"]);
        }
        // this.disableComponent("轨道")
    }

    disableComponent(name) { //当取消树形结构列表时候调用
        console.log("remove")
        if (typeof name === "undefined") {
            return;
        }
        if (name in this.entities && this.viewer.entities.contains(this.entities[name])) {
            this.viewer.entities.remove(this.entities[name]);
        }

        if (name == "轨道" && this.primitiveManager.contains(this.primitive["轨道"])) {
            this.primitiveManager.remove(this.primitive["轨道"]);
        }
        if (name == "cylinder" && this.primitive["cylinder"]) {
            this.primitive["cylinder"].removeFrom(earth.features);
        }

    }

    get isSelected() {
        return Object.values(this.entities).some(entity => this.viewer.selectedEntity === entity);
    }

    get isTracked() {
        return Object.values(this.entities).some(entity => this.viewer.trackedEntity === entity);
    }

    track(animate = false) {
        if (typeof this.defaultEntity === "undefined") {
            return;
        }
        if (!animate) {
            this.viewer.trackedEntity = this.defaultEntity;
            return;
        }

        this.viewer.trackedEntity = undefined;
        const clockRunning = this.viewer.clock.shouldAnimate;
        this.viewer.clock.shouldAnimate = false;

        this.viewer.flyTo(this.defaultEntity, {
            offset: new GeoVis.HeadingPitchRange(0, -GeoVis.Math.PI_OVER_FOUR, 1580000)
        }).then((result) => {
            if (result) {
                this.viewer.trackedEntity = this.defaultEntity;
                this.viewer.clock.shouldAnimate = clockRunning;
            }
        });
    }

    setSelectedOnTickCallback(onTickCallback = () => {}, onUnselectCallback = () => {}) {
        const onTickEventRemovalCallback = this.viewer.clock.onTick.addEventListener((clock) => {
            onTickCallback(clock);
        });
        const onSelectedEntityChangedRemovalCallback = this.viewer.selectedEntityChanged.addEventListener(() => {
            onTickEventRemovalCallback();
            onSelectedEntityChangedRemovalCallback();
            onUnselectCallback();
        });
    }

    setTrackedOnTickCallback(onTickCallback = () => {}, onUntrackCallback = () => {}) {
        const onTickEventRemovalCallback = this.viewer.clock.onTick.addEventListener((clock) => {
            onTickCallback(clock);
        });
        const onTrackedEntityChangedRemovalCallback = this.viewer.trackedEntityChanged.addEventListener(() => {
            onTickEventRemovalCallback();
            onTrackedEntityChangedRemovalCallback();
            onUntrackCallback();
        });
    }

    artificiallyTrack(onTickCallback = () => {}, onUntrackCallback = () => {}) {
            const cameraTracker = new GeoVis.EntityView(this.defaultEntity, this.viewer.scene, this.viewer.scene.globe.ellipsoid);
            this.setTrackedOnTickCallback((clock) => {
                cameraTracker.update(clock.currentTime);
                onTickCallback();
            }, () => {
                onUntrackCallback();
                // Restore default view angle if no new entity is tracked
                if (typeof this.viewer.trackedEntity === "undefined") {
                    this.viewer.flyTo(this.defaultEntity, {
                        offset: new GeoVis.HeadingPitchRange(0, GeoVis.Math.toRadians(-90.0), 2000000)
                    });
                }
            });
        }
        //this.createCesiumEntity("轨道", "path", path（实体）, this.props.name(卫星名称), this.description, this.props.sampledPositionInertial, true);
        // this.createCesiumSatelliteEntity("Point", "point", point);
    createCesiumEntity(entityName, entityKey, entityValue, name, description, position, moving) {
        const entity = new GeoVis.Entity({
            id: GeoVis.createGuid(),
            name: name,
            description: description,
            position: position,
            //position: new GeoVis.Cartesian3.fromDegrees(1000000000.0, 2.0, 3.0),
            viewFrom: new GeoVis.Cartesian3(0, -3600000, 4200000),
        });

        if (moving) {
            entity.orientation = new GeoVis.VelocityOrientationProperty(position);
        }
        entity[entityKey] = entityValue;
        this.entities[entityName] = entity;
        // this.entities={'轨道':new GeoVis.Entity('path':new GeoVis.PathGraphics,position:p)}
    }
    createPathPrimitive(pathInstance, name) {
        var pathPrimitive = new GeoVis.Primitive({
            geometryInstances: pathInstance,
            appearance: new GeoVis.PolylineColorAppearance({
                translucent: true
            })
        });
        //  this.primitive.push(pathPrimitive);
        this.primitive[name] = pathPrimitive;
    }

    createCylinderPrimitive(cylinder) {
        this.primitive["cylinder"] = cylinder
    }
}