import Vue from "vue"
function clearArray(array) {
    array.splice(0, array.length)
}
const url = "http://49.234.121.120:8091/"
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
    loadTodownload() {
        clearArray(this._todownloadList)
        this._todownloadList.push(
            {
                id: 0,
                name: "苏州纳米城影像",
                size: "100G",
                intro: "苏州纳米城影像",
            }
        )
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
    downloadCity(id) {

    }
}
const manager = new DownLoadManager();
export default manager;
