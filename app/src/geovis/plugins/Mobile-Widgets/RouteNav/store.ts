class State {
    point: {
        start: {
            input: string,
            point: string
        },
        end: {
            input: string,
            point: string
        },
        passings: Array<{
            input: string,
            point: string
        }>,
    };
    routesChange:{
        state:boolean
    };//watch 无法监听Map变化
    transportation: string;
    routes: Map<string, {
        geojson:any //geojson数据格式
        plan:[],//原始路线数组
        texts:[]//转义化的路线文字
    }>;
    choosedId: {
        id:string
    };
    constructor() {
        this.point = {
            start: {
                input: "",
                point: ""
            },
            end: {
                input: "",
                point: ""
            },
            passings: []
        };
        this.routes = new Map();
        this.choosedId = {
            id:"路线1"
        };
        this.transportation = "driving";
        this.routesChange ={
            state:false
        };
    }
}

const state = new State();
export default state;