/*global importScripts Supercluster */

importScripts('./ClusterLib.js');

class ClusterManager {
    constructor() {
        this.clusterMap = {};
        this.onmessage = this.onmessage.bind(this)
    }

    /**
     * 
     * @param {String} type 类型, base,tmp
     * @param {[]} points 数据
     */
    appendData(keepAlive=false, points) {
        const features = points.map(point => {
            return {
                "type": "Feature",
                "properties": {
                    "scalerank": point.id,
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": point.lonlat
                }

            }
        })
        this.cluster = new Supercluster({
            log: true,
            radius: 60,
            extent: 256,
            maxZoom: 17
        }).load(features);
        if(keepAlive){
            this.baseCluster = this.cluster;
        }
        postMessage({ready: true})
        
    }

    onmessage(e) {
        const data = e.data;
        if(data.points){
            this.appendData(data.keepAlive,data.points)
            postMessage({ ready: true, count: data.points.length });
        } else if(data.getExpandZoom&&data.center){
            const zoom = this.cluster.getClusterExpansionZoom(data.getExpandZoom);
            postMessage({
                expandZoom: zoom,
                center: data.center
            })
        } else if(data.bbox&&data.zoom){
            postMessage(this.cluster.getClusters(e.data.bbox, e.data.zoom));
        } else if( data.reset ){
            this.cluster = this.baseCluster || this.cluster;
        }
    }
}

var manager = new ClusterManager();

self.onmessage = manager.onmessage