import * as THREE from "three"
var BuildingView = function (app) {

    var $dom,

        sceneWidth,
        sceneHeight,

        camera,
        renderer,

        scene,
        roomsGroup,

        directionalLight,

        buildingMesh,
        roofMesh,
        rooms,
        terrainMesh,
        roofEdgeHelper,
        whiteBuildingMesh,

        controls,

        raycaster;
    var three = {
        camera: null,
        scene: null,
        container: null,
        renderer: null
    };
    window.three = three;
    var that =  this;


    

    function init() {
        window.app = app
        // shortcuts
        buildingMesh = app.buildingMesh;
        roofMesh = app.buildingRoofMesh;
        terrainMesh = app.terrainMesh;
        rooms = app.rooms;
        whiteBuildingMesh = app.whiteBuilding.object3D;



        initScene();
        addObjects();
        // addControls();

        // listen to model changes
        app.on('activeLocationChange', onModelActiveLocationChange);
        app.on('overLocationChange', onModelOverLocationChange);
        earth._forcedPause = true
        that.update();
    }

    function latLngToVector3(lat, lon, alt) {
        const carte = GeoVis.Cartesian3.fromDegrees(lon, lat, alt);
        const vec = new THREE.Vector3(carte.x, carte.y, carte.z);
        return vec;
    }

    window.latLngToVector3 = latLngToVector3
    function initScene() {

        raycaster = new THREE.Raycaster();
        var fov = 45;
        var width = sceneWidth = window.innerWidth;
        var height = sceneHeight = window.innerHeight;
        var aspect = width / height;
        var near = 1;
        var far = 10 * 1000 * 10;
        renderer = new THREE.WebGLRenderer({
            logarithmicDepthBuffer: true, antialias: true, alpha: true
        });
        const container = document.getElementById("threeContainer");
        renderer.setSize(window.innerWidth, window.innerHeight);
        three.container = container;
        container.appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        scene = new THREE.Scene();
        three.scene = scene;
        three.camera = camera;
        three.renderer = renderer;

    }

    function addObjects() {
        const vec3 = latLngToVector3(app.lonlat[1],app.lonlat[0], 0);

        var root = new THREE.Object3D();

        root.position.x = vec3.x;
        root.position.y = vec3.y;
        root.position.z = vec3.z;
        var T = new THREE.Vector3();
        root.lookAt(T)
        root.updateMatrix();
        root.updateMatrixWorld();
        root.matrixAutoUpdate = !1;

        window.root = root;
        var object = new THREE.Object3D();
        var scale = 4.4
        object.scale.set(scale, scale, scale)

        object.rotation.x = -Math.PI / 2
        object.rotation.y = -1.12020321


        // lights
        scene.add(root)
        root.add(object)
        window.object = object;

        var size = 5
        var texture = new THREE.TextureLoader().load('/data/crate.gif');

        var geometry = new THREE.BoxBufferGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({ map: texture });

        var meshxxx = new THREE.Mesh(geometry, material);

        meshxxx.position.x = vec3.x;
        meshxxx.position.y = vec3.y;
        meshxxx.position.z = vec3.z;

        meshxxx.lookAt(T);
        meshxxx.updateMatrix();
        meshxxx.updateMatrixWorld();
        meshxxx.matrixAutoUpdate = !1;
        scene.add(meshxxx);


        var ambient = new THREE.AmbientLight(0x333333);
        scene.add(ambient);
        window.ambient = ambient
        directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 0, 0.1);
        window.directionalLight = directionalLight
        // directionalLight.target.position.set()
        directionalLight.target.position.x = vec3.x;
        directionalLight.target.position.y = vec3.y;
        directionalLight.target.position.z = vec3.z;
        directionalLight.updateMatrix();
        directionalLight.updateMatrixWorld();
        directionalLight.matrixAutoUpdate = !1;
        scene.add(directionalLight);

        // building
        object.add(buildingMesh);

        // white building
        object.add(whiteBuildingMesh);

        // line helper (building)
        var edgeHelper = new THREE.EdgesHelper(buildingMesh, 0x000000, 80);
        edgeHelper.material.transparent = true;
        edgeHelper.material.opacity = 0.3;
        edgeHelper.material.linewidth = 1;
        object.add(edgeHelper);

        // line helper (white building)
        var whiteBuildingEdgeHelper = new THREE.EdgesHelper(whiteBuildingMesh, 0x000000, 80);
        whiteBuildingEdgeHelper.material.transparent = true;
        whiteBuildingEdgeHelper.material.opacity = 0.3;
        whiteBuildingEdgeHelper.material.linewidth = 1;
        object.add(whiteBuildingEdgeHelper);

        // roof
        var materials = roofMesh.material;
        for (var i = 0; i < materials.length; i++) {
            materials[i].transparent = true;
        }
        roofMesh.renderOrder = 1;
        object.add(roofMesh);

        // line helper (roof)
        roofEdgeHelper = new THREE.EdgesHelper(roofMesh, 0x000000, 20);
        roofEdgeHelper.material.transparent = true;
        roofEdgeHelper.material.opacity = 0.2;
        roofEdgeHelper.material.linewidth = 1;
        roofEdgeHelper.renderOrder = 1;
        object.add(roofEdgeHelper);

        // rooms
        roomsGroup = new THREE.Object3D();

        for (var i = 0; i < rooms.length; i++) {
            roomsGroup.add(rooms[i].object3D);
        }

        object.add(roomsGroup);

        // terrain
        object.add(terrainMesh);

    }

    function renderGlobe() {
        earth.scene.initializeFrame();
        var currentTime = earth.clock.tick();
        earth.scene.render();
    }

    function renderThree() {
        three.camera.fov = GeoVis.Math.toDegrees(earth.camera.frustum.fovy); // ThreeJS FOV is vertical
        three.camera.updateProjectionMatrix();
        three.camera.matrixAutoUpdate = false;
        const cvm = earth.camera.viewMatrix;
        const civm = earth.camera.inverseViewMatrix;
        three.camera.matrixWorld.set(
            civm[0],
            civm[4],
            civm[8],
            civm[12],
            civm[1],
            civm[5],
            civm[9],
            civm[13],
            civm[2],
            civm[6],
            civm[10],
            civm[14],
            civm[3],
            civm[7],
            civm[11],
            civm[15]
        );
        three.camera.matrixWorldInverse.set(
            cvm[0],
            cvm[4],
            cvm[8],
            cvm[12],
            cvm[1],
            cvm[5],
            cvm[9],
            cvm[13],
            cvm[2],
            cvm[6],
            cvm[10],
            cvm[14],
            cvm[3],
            cvm[7],
            cvm[11],
            cvm[15]
        );
        three.camera.lookAt(new THREE.Vector3(0, 0, 0));
        const width = three.container.clientWidth;
        const height = three.container.clientHeight;
        const aspect = width / height;
        three.camera.aspect = aspect;
        three.camera.updateProjectionMatrix();
        three.renderer.setSize(width, height);

        three.renderer.render(three.scene, three.camera);
    }




    function onModelActiveLocationChange(e) {

        var location = e.current;

        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i],
                roomSlug = room.getSlug();

            if (room.getSlug() === location) {
                room.marker.element.className = 'labels selected';
                room.mark();

            } else {
                room.marker.element.className = 'labels';
                if (roomSlug !== app.getOverLocation()) {
                    room.unmark();
                }

            }
        }

    }


    function onModelOverLocationChange(e) {

        var location = e.location;

        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i],
                roomSlug = room.getSlug();

            if (roomSlug === location) {
                room.marker.element.className = 'labels over';
                room.mark();

                // if ( roomSlug !== app.getActiveLocation() ) {
                //     roomUnderMouse = room.object3D;
                // }
            } else {
                room.marker.element.className = 'labels'
                if (roomSlug !== app.getActiveLocation()) {
                    room.unmark();
                }
                // roomUnderMouse = null;
            }
        }
    }




    this.update = function () {
        directionalLight.position.copy(earth.camera.positionWC);
        directionalLight.updateMatrix();
        directionalLight.updateMatrixWorld();
        directionalLight.matrixAutoUpdate = !1;
        ambient.position.copy(earth.camera.positionWC);
        renderer.render(scene, camera);
        renderGlobe();
        renderThree();
        if(renderer){
            requestAnimationFrame(that.update)
        }
    }


    this.getIntersectingRoom = function (mouse) {

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(roomsGroup.children);

        if (intersects.length > 0) {
            return intersects[0].object;
        } else {
            return null;
        }
    }

    this.getIntersectingWhiteBuilding = function (mouse) {

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects([whiteBuildingMesh]);

        if (intersects.length > 0) {
            return intersects[0].object;
        } else {
            return null;
        }

    }


    this.setSize = function (width, height) {
        return
        sceneWidth = width;
        sceneHeight = height;

        camera.aspect = sceneWidth / sceneHeight;
        camera.setViewOffset((sceneWidth + sceneWidth / 6), (sceneHeight - sceneHeight / 4), 0, 0, sceneWidth, sceneHeight);
        camera.updateProjectionMatrix();

        renderer.setSize(sceneWidth, sceneHeight);

    }


    this.setOpacity = function (val) {
        // return
        // building
        var materials = buildingMesh.material;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = 0.1 + val * (1 - 0.15); // remap from [0.0-1.0] to [0.1-1.0]
            materials[i].needsUpdate = true;
        }

        // roof
        materials = roofMesh.material;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = val * val * 1.1; // exponential curve
            materials[i].needsUpdate = true;
        }
        roofEdgeHelper.material.opacity = val * val * 0.2;  // exponential curve
        roofEdgeHelper.material.needsUpdate = true;

        // terrain
        materials = terrainMesh.material;
        for (var i = 0; i < materials.length; i++) {
            materials[i].opacity = val * val + 0.05;   // exponential curve
            materials[i].needsUpdate = true;
        }

    }


    this.destroy = function () {
        
        // dispose controls
        // controls.dispose();
        try{
            controls = null;

            // remove scene
            // $dom.empty();
            three.renderer.dispose()
            three.renderer.clear()
            renderer = null;
            earth._forcedPause = false
            // remove app.listeners
            app.off('activeLocationChange', onModelActiveLocationChange);
            app.off('overLocationChange', onModelOverLocationChange);
            rooms.map(room=>{
                room.marker.removeFrom(earth.features)
            })
        }catch(e){
            console.error(e)
        }
 

    }


    this.getDom = function () {

        return $dom;

    }


    this.getCamera = function () {

        return camera;

    }

    init();

}
export default BuildingView