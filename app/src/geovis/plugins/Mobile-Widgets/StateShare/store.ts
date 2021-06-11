const stateShareURL = window['sceneData'].SERVER_WS_ROOT + "/stateShare/position"
import { formateDate } from "@/util/utils";
import store from "@/store/index.js"
import { io } from "socket.io-client"
class StateShare {
    private _positions;
    private _socket;
    constructor() {
        const token = store.state.user.user.token
        const bearerToken = `Bearer ${token}`
        const ws = io(stateShareURL, {
            auth: {
                token: bearerToken
            }
        });
        this._positions = [];
        this._socket = ws;
        this.getPositions();
        this.setPosition = this.setPosition.bind(this)
        setInterval(this.setPosition, 1000)
    }
    getPositions() {
        return new Promise((resolve) => {
            this._socket.on('receive:groupPosition', (data) => {
                if (data) {
                    this._positions = JSON.parse(data)
                    resolve(true)
                } else {
                    resolve(false)
                }

            })
        })
    }
    async setPosition() {
        const mapLocation = window['plugin'].mapLocation
        const position = await mapLocation.getCurrentPosition()
        const lngLat = [position.coords.longitude, position.coords.latitude];
        this._socket.emit("update:selfPosition", JSON.stringify({
            position: lngLat,
            createTime: formateDate(new Date())
        }));
    }
    _addToMap() {

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
