import dayjs from "dayjs";
import Orbit from "./Orbit";
import { PushManager } from "./PushManager";
import { ToastProgrammatic as Toast } from "buefy";

export class SatelliteProperties {
    constructor(tle, tags = []) {
        this.name = tle.split("\n")[0].trim();
        if (tle.startsWith("0 ")) {
            this.name = this.name.substring(2);
        }
        this.orbit = new Orbit(this.name, tle);
        this.satnum = this.orbit.satnum;
        this.tags = tags;
        this.primitivePosition = [];
        this.groundStationPosition = undefined;
        this.passes = [];
        this.passInterval = undefined;
        this.passIntervals = new GeoVis.TimeIntervalCollection();
        this.pm = new PushManager({
            icon: require("../assets/android-chrome-192x192.png"),
        });
    }

    hasTag(tag) {
        return this.tags.includes(tag);
    }

    addTags(tags) {
        this.tags = [...new Set(this.tags.concat(tags))];
    }

    position(time) {
        return this.sampledPosition.getValue(time);
    }

    positionCartographic(time) {
        return GeoVis.Cartographic.fromCartesian(this.position(time));
    }

    positionCartographicDegrees(time) {
        const cartographic = this.positionCartographic(time);
        const cartographicDegrees = {
            longitude: GeoVis.Math.toDegrees(cartographic.longitude),
            latitude: GeoVis.Math.toDegrees(cartographic.latitude),
            height: cartographic.height,
        };
        return cartographicDegrees;
    }

    get height() {
        return this.cartographic.height;
    }

    computePositionCartesian3(julianDate) {
        // Check if Position for current timestap is already computed
        if (typeof this.lastPosition !== "undefined" && GeoVis.JulianDate.compare(this.lastDate, julianDate) == 0) {
            return this.lastPosition;
        }

        this.lastDate = julianDate;
        const { longitude, latitude, height } = this.orbit.positionGeodetic(GeoVis.JulianDate.toDate(julianDate));
        this.lastPosition = new GeoVis.Cartesian3.fromRadians(longitude, latitude, height);
        //console.log(`TS ${julianDate} POS ${this.lastPosition}`);

        return this.lastPosition;
    }

    computePositionCartographicDegrees(julianDate) {
        const { longitude, latitude, height, velocity } = this.orbit.positionGeodeticWithVelocity(GeoVis.JulianDate.toDate(julianDate));
        const cartographicDegrees = {
            longitude: GeoVis.Math.toDegrees(longitude),
            latitude: GeoVis.Math.toDegrees(latitude),
            height,
            velocity,
        };
        return cartographicDegrees;
    }

    positionInertial(time, constprop = false) {
        const eci = this.orbit.positionECI(GeoVis.JulianDate.toDate(time));
        const position = new GeoVis.Cartesian3(eci.x * 1000, eci.y * 1000, eci.z * 1000);
        if (constprop) {
            return new GeoVis.ConstantPositionProperty(position, GeoVis.ReferenceFrame.INERTIAL);
        } else {
            return position;
        }
    }

    createSampledPosition(clock, callback) {
        let lastUpdated;
        lastUpdated = this.updateSampledPosition(clock,0,240,30,60);
        //lastUpdated = this.updateSampledPosition(clock.currentTime,0,240,30,60);
        // clock.onTick.addEventListener((clock) => {
        //     const dt = Math.abs(GeoVis.JulianDate.secondsDifference(clock.currentTime, lastUpdated)); //相减，计算相差的秒数
        //     if (dt >= 7199) {
        //         lastUpdated = this.updateSampledPosition(clock.currentTime,0,240,30,30);
        //         callback(this.sampledPosition);
        //     }
        // });
    }

    updateSampledPosition(julianDate, samplesFwd = 0, samplesBwd = 240, loop=30, interval = 30) { //这个函数是设置sampledPosition 80 120
        const sampledPosition = new GeoVis.SampledPositionProperty(); //将坐标与时间关联
        sampledPosition.backwardExtrapolationType = GeoVis.ExtrapolationType.HOLD;
        sampledPosition.forwardExtrapolationType = GeoVis.ExtrapolationType.HOLD;
        sampledPosition.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: GeoVis.LagrangePolynomialApproximation,
        });

        const sampledPositionInertial = new GeoVis.SampledPositionProperty(GeoVis.ReferenceFrame.INERTIAL);
        sampledPositionInertial.backwardExtrapolationType = GeoVis.ExtrapolationType.HOLD;
        sampledPositionInertial.forwardExtrapolationType = GeoVis.ExtrapolationType.HOLD;
        sampledPositionInertial.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: GeoVis.LagrangePolynomialApproximation,
        });

        const randomOffset = Math.random() * 60 * 15 
            // let reference = GeoVis.JulianDate.addSeconds(julianDate, randomOffset, new GeoVis.JulianDate());
        let reference = julianDate;
        // const startTime = -samplesBwd * interval;
        // const stopTime = samplesFwd * interval;
        const startTime = samplesFwd * loop;
        const stopTime = samplesBwd * loop;
        for (let time = startTime; time <= stopTime; time += interval) {
            const timestamp = GeoVis.JulianDate.addSeconds(reference, time, new GeoVis.JulianDate()); //在reference时间上添加秒数time
            const position = this.computePositionCartesian3(timestamp); //返回一个{longitude，latitude，height}\
            this.primitivePosition.push(position);


            sampledPosition.addSample(timestamp, position); //添加位置，和时间对应

            const positionInertial = this.positionInertial(timestamp);
            sampledPositionInertial.addSample(timestamp, positionInertial);

        }
         this.sampledPosition = sampledPosition;
        this.sampledPositionInertial = sampledPositionInertial;
         return reference;
    }

    groundTrack(julianDate, samplesFwd = 0, samplesBwd = 120, interval = 30) {
        const groundTrack = [];

        const startTime = -samplesBwd * interval;
        const stopTime = samplesFwd * interval;
        for (let time = startTime; time <= stopTime; time += interval) {
            const timestamp = GeoVis.JulianDate.addSeconds(julianDate, time, new GeoVis.JulianDate());
            const cartographic = this.positionCartographic(timestamp);
            const groudPosition = GeoVis.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 1000);
            groundTrack.push(groudPosition);
        }
        return groundTrack;
    }

    get groundStationAvailable() {
        return (typeof this.groundStationPosition !== "undefined");
    }

    updatePasses(time) {
        if (!this.groundStationAvailable) {
            return false;
        }
        // Check if still inside of current pass interval
        if (typeof this.passInterval !== "undefined" &&
            GeoVis.TimeInterval.contains(new GeoVis.TimeInterval({ start: this.passInterval.start, stop: this.passInterval.stop }), time)) {
            return false;
        }
        this.passInterval = {
            start: new GeoVis.JulianDate.addDays(time, -1, GeoVis.JulianDate.clone(time)),
            stop: new GeoVis.JulianDate.addDays(time, 1, GeoVis.JulianDate.clone(time)),
            stopPrediction: new GeoVis.JulianDate.addDays(time, 4, GeoVis.JulianDate.clone(time)),
        };

        let passes = this.orbit.computePassesElevation(this.groundStationPosition, GeoVis.JulianDate.toDate(this.passInterval.start), GeoVis.JulianDate.toDate(this.passInterval.stopPrediction));
        if (!passes) {
            return false;
        }

        this.passes = passes;
        this.computePassIntervals();
        return true;
    }

    clearPasses() {
        this.passInterval = undefined;
        this.passes = [];
        this.passIntervals = new GeoVis.TimeIntervalCollection();
    }

    computePassIntervals() {
        const passIntervalArray = [];
        for (const pass of this.passes) {
            const startJulian = new GeoVis.JulianDate.fromDate(new Date(pass.start));
            const endJulian = new GeoVis.JulianDate.fromDate(new Date(pass.end));
            passIntervalArray.push(new GeoVis.TimeInterval({
                start: startJulian,
                stop: endJulian
            }));
        }
        this.passIntervals = new GeoVis.TimeIntervalCollection(passIntervalArray);
    }

    notifyPasses(aheadMin = 5) {
        if (!this.groundStationAvailable) {
            Toast.open({
                message: "Ground station required to notify for passes",
                type: "is-warning",
                position: "is-bottom",
                duration: 4000,
            });
            return;
        }
        let passes = this.orbit.computePassesElevation(this.groundStationPosition);
        if (!passes) {
            Toast.open({
                message: `No passes for ${this.name}`,
                type: "is-warning",
                position: "is-bottom",
                duration: 4000,
            });
            return;
        }

        passes.forEach((pass) => {
            let start = dayjs(pass.start).startOf("second");
            this.pm.notifyAtDate(start.subtract(aheadMin, "minute"), `${pass.name} pass in ${aheadMin} minutes`);
            this.pm.notifyAtDate(start, `${pass.name} pass starting now`);
            //this.pm.notifyAtDate(dayjs().add(5, "second"), `${pass.name} test pass in ${aheadMin} minutes`);
        });
        Toast.open({
            message: `Notifying for passes of ${this.name}`,
            type: "is-success",
            position: "is-bottom",
            duration: 4000,
        });
    }
}