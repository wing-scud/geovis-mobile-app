import { CesiumEntityWrapper } from "./CesiumEntityWrapper";
import { DescriptionHelper } from "./DescriptionHelper";

import dayjs from "dayjs";
import icon from "../assets/images/icons/dish.svg";

export class GroundStationEntity extends CesiumEntityWrapper {
  constructor(viewer, sats, position) {
    super(viewer);
    this.sats = sats;

    this.name = "Ground station";
    this.position = position;

    this.createEntities();
  }

  createEntities() {
    this.createDescription();
    this.createGroundStation();

    this.viewer.selectedEntityChanged.addEventListener(() => {
      if (this.isSelected) {
        this.setSelectedOnTickCallback((clock) => {
          this.sats.enabledSatellites.forEach((sat) => {
            sat.props.updatePasses(clock.currentTime);
          });
        });
      }
    });
  }

  createGroundStation() {
    const billboard = new GeoVis.BillboardGraphics({
      image: icon,
      horizontalOrigin: GeoVis.HorizontalOrigin.CENTER,
      verticalOrigin: GeoVis.VerticalOrigin.BOTTOM,
      width: 24,
      height: 24,
    });
    this.createCesiumEntity("Groundstation", "billboard", billboard, this.name, this.description, this.position.cartesian, false);
    this.defaultEntity = this.entities["Groundstation"];
  }

  createDescription() {
    const description = new GeoVis.CallbackProperty((time) => {
      const passes = this.passes(time);
      const content = DescriptionHelper.renderDescription(time, this.name, this.position, passes, true);
      return content;
    }, false);
    this.description = description;
  }

  passes(time, deltaHours = 48) {
    let passes = [];
    // Aggregate passes from all enabled satellites
    this.sats.enabledSatellites.forEach((sat) => {
      passes.push(...sat.props.passes);
    });

    // Filter passes based on time
    passes = passes.filter((pass) => {
      return dayjs(pass.start).diff(time, "hours") < deltaHours;
    });

    // Sort passes by time
    passes = passes.sort((a, b) => {
      return a.start - b.start;
    });
    return passes;
  }
}
