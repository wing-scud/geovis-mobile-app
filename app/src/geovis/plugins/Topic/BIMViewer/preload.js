import * as THREE from "three"
// import LoadingManager from "three/src/loaders/LoadingManager"
import { formatData } from "./formatData";
import InteractiveItem from "./InteractiveItem";
// console.log(THREE)
// THREE.LoadingManager = LoadingManager;
var BuildingLoader = function( app ) {

    var player,

        manager,
        
        is3Dloaded = false,
        isVideoReady = false,
        isSoundLoaded = false,
        bSkipIntro = false,

        MAX_SECONDS_WAIT = 30,
        secondsCounter = 0,
        timerIntervalId,

        slowLoopIntervalId;
    var basePath = "./static/data/BIMViewer/"
    this.state = app.state;
    var that = app;


    function loadData( ) {

        var url = basePath+'data.json';
        return fetch(url).then(res=>res.json()).then(result=>{
            app.data = formatData(result)
            app.state.locations  = app.data.locations
            return app.data;
        })
    }


  


    function loadResources() {

        // blocks until loaded

        manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
            // console.log( item, loaded, total );
        };

        manager.onLoad = function() {
            is3Dloaded = true;
        }

        loadBuildingModel();
        loadWhiteBuildingModel();
        loadTerrain();
        loadRooms();

    }


    function loadBuildingModel() {

        // Main building model
        var loader = new THREE.JSONLoader( manager );
        loader.setTexturePath( basePath+'obj/building/maps/' )
        loader.load(
            basePath+'obj/building/building.js',
            function ( geometry, materials ) {
                var material = new THREE.MultiMaterial( materials );
                for (var i = 0; i < materials.length; i++) {
                    materials[ i ].transparent = true;
                }

                scaleGeometry( geometry );

                app.buildingMesh = new THREE.Mesh( geometry, material );
                app.buildingMesh.geometry.computeBoundingSphere();
            },
            onProgress,
            onError
        );

        // Main building roof
        var loader = new THREE.JSONLoader( manager );
        loader.load(
            basePath+'obj/building/building-roof.js',
            function ( geometry, materials ) {
                var material = new THREE.MultiMaterial( materials );
                for (var i = 0; i < materials.length; i++) {
                    materials[ i ] = new THREE.MeshPhongMaterial( {
                        color : 0xffffff,
                        transparent : true,
                        polygonOffset : true,
                        polygonOffsetFactor : 1, // positive value pushes polygon further away
                        polygonOffsetUnits : 1
                    } );
                }

                scaleGeometry( geometry );

                app.buildingRoofMesh = new THREE.Mesh( geometry, material );
            },
            onProgress,
            onError
        );

    }

    function loadWhiteBuildingModel() {

        // Main building model
        var loader = new THREE.JSONLoader( manager );
        loader.setTexturePath( basePath+'obj/building/maps/' )
        loader.load(
            basePath+'obj/whiteBuilding/whiteBuilding.js',
            function ( geometry, materials ) {
                var material = new THREE.MeshPhongMaterial( {
                    color : 0xffffff
                } );
                scaleGeometry( geometry );

                var whiteBuildingMesh = new THREE.Mesh( geometry, material );
                app.whiteBuilding = new InteractiveItem( whiteBuildingMesh,
                  'Human Slaughterhouse Report', 'whiteBuilding' );
                app.whiteBuilding.setEmissiveDefault( 0x333333 );
                app.whiteBuilding.unmark();
            },
            onProgress,
            onError
        );
      }

    function loadRooms() {

        var roomData = app.data.locations;

        for ( var i = 0; i < roomData.length; i++ ) {
            loadRoom( roomData[ i ] );
        }

        function loadRoom( data ) {
            var name = data.name,
                slug = data.slug,
                loader = new THREE.JSONLoader( manager );

            loader.load(
                basePath+ data.objRoom,
                function ( geometry, materials ) {
                    //var bufferGeom = new THREE.BufferGeometry();
                    //bufferGeom.fromGeometry( geometry );
                    var material = new THREE.MeshPhongMaterial( {
                        color : 0xffffff
                    } );

                    scaleGeometry( geometry );

                    var mesh = new THREE.Mesh( geometry, material );
                    var room = new InteractiveItem( mesh, name, slug );
                    room.setEmissiveDefault( 0x333333 );
                    room.unmark();

                    app.rooms.push( room );
                },
                onProgress,
                onError
            );
        }

    }


    function loadTerrain() {

        var loader = new THREE.JSONLoader( manager );
        loader.setTexturePath( basePath+'obj/terrain/maps/' )
        loader.load(
            basePath+'obj/terrain/terrain.js',
            function ( geometry, materials ) {
                for (var i = 0; i < materials.length; i++) {
                    materials[ i ].transparent = true;
                }
                var material = new THREE.MultiMaterial( materials );

                scaleGeometry( geometry );

                app.terrainMesh = new THREE.Mesh( geometry, material );;
            },
            onProgress,
            onError
        );

    }


    function scaleGeometry( geometry ) {

        // centers the imported models into the scene
        var transform = new THREE.Matrix4(),
            scale = new THREE.Matrix4(),
            translate = new THREE.Matrix4();
        scale.makeScale( 0.2, 0.2, 0.2 );
        translate.makeTranslation( 32.57, 0, 30 );
        transform.multiplyMatrices( scale, translate );

        geometry.applyMatrix( transform );

    }


    function onProgress( xhr ) {
        // if ( xhr.lengthComputable ) {
        //     var percentComplete = xhr.loaded / xhr.total * 100;
        //     console.log( Math.round(percentComplete, 2) + '% downloaded' );
        // }
    };


    function onError( xhr ) {};



 



    function waitForLoading() {
        return new Promise((resolve)=>{
            slowLoopIntervalId = setInterval( function() {
                if ( is3Dloaded   ) {
                    clearInterval( slowLoopIntervalId );
                    resolve()
                }
            }, 500 );
        })
    }





    this.init = function() {
        return new Promise(resolve=>{
            if(that.state.statu==="NONE"){
                    that.state.statu=  "LOADING"
                    loadData().then(()=>{
                        loadResources();
                    });
       
                waitForLoading().then(()=>{
                    if(that.state.statu==="NONE") return
                    that.state.statu=  "LOADED"
                    resolve()
                })
            } else if(that.state.statu==="LOADING"){
                loadData().then(()=>{
                    loadResources();
                });
                waitForLoading().then(()=>{
                    if(that.state.statu==="NONE") return
                    that.state.statu=  "LOADED"
                    resolve()
                })
            } else{ 
                resolve();

            }
        }).catch(e=>{
            console.error(e)
        })


        

    }



}


export default BuildingLoader