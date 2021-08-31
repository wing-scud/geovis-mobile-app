const stateShareURL = window['sceneData'].SERVER_WS_ROOT + "/stateShare/position"
import { formateDate } from "@/util/utils";
import mobileStore from "@/store/index.js"
import { io } from "socket.io-client"
import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl"
function addMemberMarker(lngLat, text, image) {
    // create the popup
    const popup = new mapboxgl.Popup({ offset: [0, -50] }).setHTML(
        text
    );
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = 36;
    const height = 36;
    el.className = 'marker';
    el.style.backgroundImage = `url(./static/images/member.png)`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    // create the marker
    return new mapboxgl.Marker()
        .setLngLat(lngLat)
        .setPopup(popup) // sets a popup on this marker
        .addTo(earthStore.map);
}

class StateShare {
    private _members;
    private _socket;
    private _group;
    constructor() {
    }
    public get group() {
        return this._group;
    }
    public set group(value) {
        this._group = value;
        if (this._socket) {
            this._postUpdateGroup()
        }
    }
    init() {
        earthStore.state.mode = "map";
        //@ts-ignore
        const token = mobileStore.state.user.user.token
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
        this.updatePosition()
    }
    initPositions() {
        return new Promise((resolve) => {
            this._socket.emit('init:groupPosition', {
                group: this._group,
            })
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
    updatePosition() {
        return new Promise((resolve) => {
            this._socket.on('update:memberPosition', (data) => {
                if (data) {
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
        //@ts-ignore
        const account = mobileStore.state.user.user.account;
        this._updateMembers(account, lngLat)
        this._socket.emit("update:selfPosition", {
            position: lngLat,
            createTime: formateDate(new Date())
        });
    }
    _postUpdateGroup() {
        this._socket.emit("update:group", {
            group: this._group,
        });
    }
    _updateMembers(account, lngLat) {
        if (this._members.has(account)) {
            // 更新
            const marker = this._members.get(account)
            marker.setLngLat(lngLat)
            marker.getPopup().setHTML(`${account}</br>${lngLat.map((value) => value.toFixed(3))}`)
        } else if (!this._members.has(account)) {
            const image = 0;
            const marker = addMemberMarker(lngLat, `${account}</br>${lngLat.map((value) => value.toFixed(3))}`, image)
            this._members.set(account,
                marker)
        }
    }
    destroy() {
        earthStore.state.mode = "globe3";
        window['plugin']['mapLocation'].clearWatchLocation()
        this._members.forEach((marker) => marker.remove())
        this._members.clear()
        this._socket.close();
        this._socket.onclose = function (evt) {
            console.log("Connection closed.");
        };
        this._socket = undefined
    }
}

const store = new StateShare;
export default store;
