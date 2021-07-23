const stateShareURL = window['sceneData'].SERVER_WS_ROOT + "/stateShare/position"
import { formateDate } from "@/util/utils";
import store from "@/store/index.js"
import { io } from "socket.io-client"
import { earthStore } from "@/geovis/store";
class StateShare {
    private _members;
    private _socket;
    constructor() {
        const token = store.state.user.user.token
        const bearerToken = `Bearer ${token}`
        const ws = io(stateShareURL, {
            auth: {
                token: bearerToken
            }
        });
        this._members = new Map();
        this._socket = ws;
        // 初始化所有成员位置
        this.initPositions()
        this.setPosition = this.setPosition.bind(this)
        // 监听自身位置改变，发送自身位置更新
        window['plugin']['mapLocation'].testWatchPosition(this.setPosition)
        // 接受最新更新的成员位置变化
        this.updatePositions()
        // setInterval(this.setPosition, 1000)
    }
    initPositions() {
        return new Promise((resolve) => {
            this._socket.on('init:groupPosition', (data) => {
                if (data) {
                    // 拿到一个{account,position}数组
                    data.forEach(item => {
                        this._updateMembers(item.account, item.position)
                    });
                    resolve(true)
                } else {
                    resolve(false)
                }

            })
        })
    }
    updatePositions() {
        return new Promise((resolve) => {
            this._socket.on('update:groupPosition', (data) => {
                if (data) {
                    // 拿到一个{account,position}数组
                    this._updateMembers(data.account, data.position)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
    async setPosition(position) {
        const lngLat = [position.coords.longitude, position.coords.latitude];
        const account = store.state.user.user.account;
        this._updateMembers(account, lngLat)
        this._socket.emit("update:selfPosition", {
            position: lngLat,
            createTime: formateDate(new Date())
        });
    }

    _updateMembers(account, lngLat) {
        if (this._members.get(account)) {
            // 更新
            const entity = this._members.get(account)
            entity.position = GeoVis.Cartesian3.fromDegrees(lngLat[0], lngLat[1], lngLat[2] ?? 0)
            const isOpen = entity.popup.isOpen
            entity.bindPopup(`${account}:${lngLat.map((value) => value.toFixed(3))}`)
            entity.showPopup(isOpen)
        } else if (account) {
            // 添加
            const entity = new GeoVis.Marker(lngLat, {
            }).addTo(earthStore.earth.features)
            //@ts-ignore
            entity.bindPopup(`${account}:${lngLat.map((value) => value.toFixed(3))}`)
            this._members.set(account,
                entity)
        } else {
            console.log("缺失")
        }

    }
    destroy() {
        this._socket.close();
        this._socket.onclose = function (evt) {
            console.log("Connection closed.");
        };
    }
}
// const store = new StateShare;
export default StateShare;
