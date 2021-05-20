const dayDetailAddress = "http://localhost:8091/weather/dayDetail";
const dayBriefAddress = "http://localhost:8091/weather/dayBrief";
const fifteenDayWeatherAddress = "http://localhost:8091/weather/fifteenDayWeather";
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
    // getCodeById(id) {
    //     return 101190401;
    // }
    getCodeByCity(city) {
        return 101190401;
    }
    getTodayDetail() {
        const code = this.state.code;
        return remoteFetch(dayDetailAddress, { code })
    }
    getFifteenWeather() {
        const code = this.state.code;
        return remoteFetch(fifteenDayWeatherAddress, { code })
    }
}
const manager = new Manager();
export default manager;