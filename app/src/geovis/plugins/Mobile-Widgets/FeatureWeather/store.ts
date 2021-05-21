const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const dayDetailAddress = SERVER_ROOT + "/weather/dayDetail";
const dayBriefAddress = SERVER_ROOT + "/weather/dayBrief";
const fifteenDayWeatherAddress = SERVER_ROOT + "/weather/fifteenDayWeather";
function remoteFetch(address, options) {
    return fetch(address, {
        method: "post",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    }).then((res) => res.json())
}
class Manager {
    state: {
        city: string,
        code: number
    }
    constructor() {
        this.state = {
            city: "苏州",
            code: 101190401
        }
    }
    async getCity() {
        const city = "苏州"
        return city;
    }
    getCodeByCity(city) {
        return;
    }
    getTodayDetail() {
        const code = this.state.code;
        return remoteFetch(dayDetailAddress, { code })
    }
    getBriefWeather() {
        const code = this.state.code;
        return remoteFetch(dayBriefAddress, { code })
    }
    getFifteenWeather() {
        const code = this.state.code;
        return remoteFetch(fifteenDayWeatherAddress, { code })
    }
}
const manager = new Manager();
export default manager;