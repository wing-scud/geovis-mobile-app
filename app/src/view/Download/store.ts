import Vue from "vue"
function clearArray(array) {
    array.splice(0, array.length)
}
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const listUrl = SERVER_ROOT + "/api/layer"
class DownLoadManager {
    private _todownloadList: Array<{}>
    public get todownloadList() {
        return this._todownloadList
    }
    private _downloadingList: Array<{}>
    public get downloadingList() {
        return this._downloadingList
    }
    private _downloadedList: Array<{}>
    public get downloadedList() {
        return this._downloadedList
    }
    constructor() {
        this._todownloadList = [];
        this._downloadingList = [];
        this._downloadedList = [];
        this.loadTodownload = this.loadTodownload.bind(this);
        this.loadDownloading = this.loadDownloading.bind(this);
        this.loadDownloaded = this.loadDownloaded.bind(this);
    }

    async loadTodownload() {
        clearArray(this._todownloadList);
        const result = await fetch(listUrl).then(res => res.json()).then((data) => {
            if (data.status === "ok") {
                return data.data;
            }
        });
        result.forEach((item) => {
            this._todownloadList.push(item)
        })
    }
    loadDownloading() {
        clearArray(this._downloadingList)
        this._downloadingList.push(
            {
                id: 0,
                name: "矢量地图1",
                size: "100G",
                progress: 100,
                time: "2021-02-21",
            },
        )
    }
    loadDownloaded() {
        clearArray(this._downloadedList)
        this._downloadedList.push(
            {
                id: 0,
                name: "矢量地图1",
                size: "100G",
                time: "2021-02-21",
            },
        )
    }
    downloadCity(name) {
        const filePlugin = window['plugin'].file;
        const downloadUrl = SERVER_ROOT + `/api/job/sync/${name}/down/mbtiles`;
        fetch(downloadUrl,{
            method:'POST',
            mode: 'cors',
            credentials: "include",
        }).then(res => res.blob()).then(async blob => {
            const rootEntry = await filePlugin.getRootDirEntry();
            const mapDireEntry = await filePlugin.getDirectory(rootEntry, 'mapData', true);
            const fileEntry = await filePlugin.getFileEntry(mapDireEntry, `${name}.mbtiles`)
            filePlugin.writeFile(fileEntry, blob, false)
        })
    }
}
const manager = new DownLoadManager();
export default manager;
