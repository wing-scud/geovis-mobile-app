import { SatelliteEntityWrapper } from "./SatelliteEntityWrapper";
import { GroundStationEntity } from "./GroundStationEntity";
/* global app */

export class SatelliteManager {
    /**
     * 
     * @param {GeoVis.Earth} viewer 
     */
    constructor(viewer) {
        this.viewer = viewer;
        this.state = {
            // components: ["Point","Billboard", "三维模型","文字标牌", "轨道", "预测轨道", "星下点"]
            components: ["Point","Billboard", "三维模型","文字标牌", "轨道", "星下点"]

        }
        this.satellites = [];
        this.enabledComponents = ["Point","Billboard","三维模型","Label"];
        this.enabledTags = [];

        this.update = this.update.bind(this);
        this.viewer.trackedEntityChanged.addEventListener(() => {
            let trackedSatelliteName = this.trackedSatellite;
            if (trackedSatelliteName) {
                this.getSatellite(trackedSatelliteName).show(this.enabledComponents);
            }
            if ("app" in window) {
                app.$emit("updateTracked");
            }
        });
        this.viewer.clock.onTick.addEventListener(this.update);
    }

    addFromTleUrl(url, tags) {
        // fetch(`http://192.168.50.90:9000/` + url, {
            fetch( url, {
                // mode: "no-cors",
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(response => response.text())
            .then(data => {
                const lines = data.split(/\r?\n/);
                for (let i = 3; i < lines.length; i + 3) {
                    let tle = lines.splice(i - 3, i).join("\n");
                    this.addFromTle(tle, tags);
                }
            }).catch(function(error) {
                console.log(error);
            });
    }

    addFromTle(tle, tags) {

        //tle表示
        // SKYSAT-1                
        // 1 39418U 13066C   20247.77992367  .00000499  00000-0  45931-4 0  9994
        // 2 39418  97.6221 325.5686 0019250 299.9372  59.9939 14.99002903371010

        //tags表示['Planet']
        const sat = new SatelliteEntityWrapper(this.viewer, tle, tags);
        this.add(sat); //添加卫星信息，轨迹，标牌，星下点
    }

    add(newSat) {
        const existingSat = this.satellites.find((sat) => sat.props.satnum == newSat.props.satnum && sat.props.name == newSat.props.name);
        if (existingSat) {
            existingSat.props.addTags(newSat.props.tags);
            if (newSat.props.tags.some(tag => this.enabledTags.includes(tag))) {
                existingSat.show(this.enabledComponents);
            }
            return;
        }
        if (this.groundStationAvailable) {
            newSat.groundStation = this.groundStation.position;
        }
        this.satellites.push(newSat);

        if (newSat.props.tags.some(tag => this.enabledTags.includes(tag))) {
            newSat.show(this.enabledComponents);
            if (this.pendingTrackedSatellite === newSat.props.name) {
                this.trackedSatellite = newSat.props.name;
            }
        }
        this.updateComponents(); //no use
    }

    get taglist() {
        let taglist = {};
        this.satellites.forEach((sat) => {
            sat.props.tags.forEach((tag) => {
                (taglist[tag] = taglist[tag] || []).push(sat.props.name);
            });
        });
        Object.values(taglist).forEach((tag) => {
            tag.sort();
        });
        return taglist;
    }

    get satlist() {
        let satlist = Object.keys(this.taglist).sort().map((tag) => {
            return {
                name: tag,
                list: this.taglist[tag],
            };
        });
        if (satlist.length === 0) {
            satlist = [{ name: "", list: [] }];
        }
        return satlist;
    }

    get selectedSatellite() {
        for (let sat of this.satellites) {
            if (sat.isSelected) {
                return sat.props.name;
            }
        }
        return "";
    }

    get trackedSatellite() {
        for (let sat of this.satellites) {
            if (sat.isTracked) {
                return sat.props.name;
            }
        }
        return "";
    }

    set trackedSatellite(name) {
        if (!name) {
            if (this.trackedSatellite) {
                this.viewer.trackedEntity = undefined;
            }
            return;
        } else if (name === this.trackedSatellite) {
            return;
        }

        let sat = this.getSatellite(name);
        if (sat) {
            sat.track();
            this.pendingTrackedSatellite = undefined;
        } else {
            // Satellite does not exist (yet?)
            this.pendingTrackedSatellite = name;
        }
    }

    get enabledSatellites() {
        return this.satellites.filter((sat) => sat.enabled);
    }

    get enabledSatellitesByName() {
        return this.enabledSatellites.map((sat) => sat.props.name);
    }

    set enabledSatellitesByName(sats) { //sats=['GAOFEN1'...]
        this.satellites.forEach((sat) => {
            if (sats.includes(sat.props.name)) {
                sat.show(this.enabledComponents); //调用CesiumEntityWrapper中的show，this.enabledComponents =["Point", "Label"]
            } else {
                sat.hide(this.enabledComponents);
            }
        });
    }
    get enabledSatellitesCylinder() {
        return 1;
    }
    set enabledSatellitesCylinder(sats) {
        this.satellites.forEach((sat) => {
            if (sats.includes(sat.props.name)) {
                sat.enableComponent("cylinder");
            } else {
                sat.disableComponent("cylinder");
            }
        });
    }

    set disableCylinder(sats) {
        this.satellites.forEach((sat) => {
            if (sats.includes(sat.props.name)) {
                sat.disableComponent("cylinder");
            }
        });
    }

    get monitoredSatellites() {
        return this.satellites.filter((sat) => sat.props.pm.active).map((sat) => sat.props.name);
    }

    set monitoredSatellites(sats) {
        this.satellites.forEach((sat) => {
            if (sats.includes(sat.props.name)) {
                sat.props.notifyPasses();
            } else {
                sat.props.pm.clearTimers();
            }
        });
    }

    get satelliteNames() {
        return this.satellites.map((sat) => sat.props.name);
    }

    getSatellite(name) {
        for (let sat of this.satellites) {
            if (sat.props.name === name) {
                return sat;
            }
        }
    }

    get tags() {
        const tags = this.satellites.map(sat => sat.props.tags);
        return [...new Set([].concat(...tags))];
    }

    getSatellitesWithTag(tag) {
        return this.satellites.filter((sat) => {
            return sat.props.hasTag(tag);
        });
    }

    showSatsWithEnabledTags() {
        this.satellites.forEach((sat) => {
            if (this.enabledTags.some(tag => sat.props.hasTag(tag))) {
                sat.show(this.enabledComponents);
            } else {
                sat.hide();
            }
        });
    }

    enableTag(tag) {
        this.enabledTags = [...new Set(this.enabledTags.concat(tag))];
        this.showSatsWithEnabledTags();
    }

    disableTag(tag) {
        this.enabledTags = this.enabledTags.filter(enabledTag => enabledTag !== tag);
        this.showSatsWithEnabledTags();
    }

    get components() {
        return this.state.components;
    }

    updateComponents() {
        // const components = this.satellites.map(sat => sat.components);
        // this.state.components = [...new Set([].concat(...components))];
    }

    enableComponent(componentName) {
        var index = this.enabledComponents.indexOf(componentName); //判断是否包含新增的动作
        if (index === -1) this.enabledComponents.push(componentName); //如果没有，则添加

        //  console.log(this.satellites); // satellites被life-cyle调用add函数添加所有卫星数据,是一个satelliteEntityWrapper数组集合

        this.enabledSatellites.forEach((sat) => { //触发卫星数组中创建entity的函数
            sat.enableComponent(componentName);
        });
    }

    disableComponent(componentName) { //当取消标签时调用
        var index = this.enabledComponents.indexOf(componentName);
        if (index !== -1) this.enabledComponents.splice(index, 1);

        this.enabledSatellites.forEach((sat) => {
            sat.disableComponent(componentName);
        });
    }

    get groundStationAvailable() {
        return (typeof this.groundStation !== "undefined");
    }

    focusGroundStation() {
        if (this.groundStationAvailable) {
            this.groundStation.track();
        }
    }

    setGroundStation(position) {
        if (this.groundStationAvailable) {
            this.groundStation.hide();
        }
        if (position.height < 1) {
            position.height = 0;
        }

        // Create groundstation entity
        this.groundStation = new GroundStationEntity(this.viewer, this, position);
        this.groundStation.show();

        // Set groundstation for all satellites
        this.satellites.forEach((sat) => {
            sat.groundStation = this.groundStation.position;
        });

        if ("app" in window) {
            const latlon = `${position.latitude.toFixed(4)},${position.longitude.toFixed(4)}`;
            if (app.$route.query.gs != latlon) {
                app.$router.push({ query: {...app.$route.query, gs: latlon } });
            }
        }
    }

    /**
     * 
     * @param {GeoVis.Clock} clock 
     */
    update(clock) {
        this.satellites.map(satellite => {
            satellite.update(clock.currentTime);
        })
    }

    destroy() {
        this.satellites.map((sat)=>{
      sat.destroy();
        });
         this.viewer.clock.onTick.removeEventListener(this.update);
    }
}