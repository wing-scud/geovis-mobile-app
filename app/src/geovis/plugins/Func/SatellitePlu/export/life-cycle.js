import Vue from "vue";
import Vuex from 'vuex'; //后加
import App from "../App.vue";
import router from "../components/Router";
import { Workbox } from "workbox-window";
import VueCesiumController from "../components/VueCesiumController";
import ElementUI from 'element-ui'; //后加
import 'element-ui/lib/theme-chalk/index.css'; //后加
import store from "../store/index"

Vue.use(ElementUI);
Vue.use(Vuex);



// import * as Sentry from "@sentry/browser";


// /**
//  * @name 导入自定义路由匹配方法
//  */
// import routeMatch from "@/router/routes-match";
// /**
//  * @name 导入官方通信方法
//  */
// import appStore from "@/utils/app-store";

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
// let router = null;
let instance = null;

/**
 * @name 导出生命周期函数
 */
const lifeCycle = () => {
    return {
        /**
         * @name 微应用初始化
         * @param {Object} props 主应用下发的props
         * @description  bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发
         * @description 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
         */
        async bootstrap(props) {
            console.log('props:', props)
                /* props.emits.forEach(i => {
                  Vue.prototype[`$${i.name}`] = i;
                }); */
        },
        /**
         * @name 实例化微应用
         * @param {Object} props 主应用下发的props
         * @description 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
         */
        async mount(props) {
            // 注册应用间通信
            // appStore(props);
            // 注册微应用实例化函数
            render(props);
        },
        /**
         * @name 微应用卸载/切出
         */
        async unmount() {
            console.log("destroy")
            try {

                instance.$destroy ? instance.$destroy() : null;
            } catch (e) {
                console.error(e)
            }
            instance = null;

            cc.destroy()
                // router = null;
        },
        /**
         * @name 手动加载微应用触发的生命周期
         * @param {Object} props 主应用下发的props
         * @description 可选生命周期钩子，仅使用 loadMicroApp 方式手动加载微应用时生效
         */
        async update(props) {
            console.log("update props", props);
        }
    };
};

/**
 * @name 子应用实例化函数
 * @param {Object} props param0 qiankun将用户添加信息和自带信息整合，通过props传给子应用
 * @description {Array} routes 主应用请求获取注册表后，从服务端拿到路由数据
 * @description {String} 子应用路由前缀 主应用请求获取注册表后，从服务端拿到路由数据
 */
const render = ({ routes, routerBase, container } = {}) => {
    Vue.config.productionTip = false;
    // Sentry.init({ dsn: "https://0c7d1a82eedb48ee8b83d87bf09ad144@sentry.io/1541793" });
    VueCesiumController.install()



    earth.timelineWdiget._clock.startTime = GeoVis.Date.fromDate(new Date("2020-10-10 08:30"))
    earth.timelineWdiget._clock.stopTime = GeoVis.Date.fromDate(new Date("2020-10-10 10:30")) //10.10
    earth.clock.clockRange = GeoVis.ClockRange.LOOP_STOP
    earth.clock.currentTime = earth.clock.startTime;
    // earth.clock.onTick.addEventListener(function() {
    //     console.log()
    // })
    earth.timelineWdiget.zoomTo(earth.timelineWdiget._clock.startTime, earth.timelineWdiget._clock.stopTime)
        // Export Vue for debugger
        // window.app = app;

    /* global cc */
    //cc.sats.addFromTleUrl("data/tle/norad/active.txt", ["Active"]);
    console.log("111111111111");
    cc.sats.addFromTleUrl("data/tle/norad/planet.txt", ["Planet"]);
    cc.sats.addFromTleUrl("data/tle/norad/starlink.txt", ["Starlink"]);
    cc.sats.addFromTleUrl("data/tle/norad/globalstar.txt", ["Globalstar"]); //删除了[-]
    cc.sats.addFromTleUrl("data/tle/norad/resource.txt", ["Resource"]);
    cc.sats.addFromTleUrl("data/tle/norad/science.txt", ["Science"]); //修改数据方向
    cc.sats.addFromTleUrl("data/tle/norad/stations.txt", ["Stations"]);
    cc.sats.addFromTleUrl("data/tle/norad/weather.txt", ["Weather"]);
    cc.sats.addFromTleUrl("data/tle/norad/tle-new.txt", ["New"]);
    cc.sats.addFromTleUrl("data/tle/norad/beidou.txt", ["北斗"]); //删除了括号
    cc.sats.addFromTleUrl("data/tle/norad/iridium-NEXT.txt", ["iridium"]); //此处开始是新增
    cc.sats.addFromTleUrl("data/tle/norad/gorizont.txt", ["gorizont"]); //删除了[-]
    cc.sats.addFromTleUrl("data/tle/norad/intelsat.txt", ["intelsat"]); //删除了()
    cc.sats.addFromTleUrl("data/tle/norad/molniya.txt", ["molniya"]);
    cc.sats.addFromTleUrl("data/tle/norad/orbcomm.txt", ["orbcomm"]); //删除了[-]
    cc.sats.addFromTleUrl("data/tle/norad/raduga.txt", ["raduga"]); //删除了[-]
    // cc.sats.addFromTleUrl("data/tle/ext/move.txt", ["MOVE"]);
    if (cc.sats.enabledTags.length === 0) {
        cc.sats.enableTag("MOVE");
    }
    instance = new Vue({
        el: "#satvis-app",
        router,
        store,
        render: h => h(App)
            // components: { App },
            // template: "<App/>"
    });
    // Register service worker
    if ("serviceWorker" in navigator) {
        const wb = new Workbox("sw.js");
        wb.addEventListener("controlling", (evt) => {
            if (evt.isUpdate) {
                console.log("Reloading page for latest content");
                window.location.reload();
            }
        });
        wb.register();
    }
};

export { lifeCycle, render };