/* eslint-disable */
import { modelStore } from "../../../ModelManager/Store";
var ColorCtrl = function() {
  this.show = false;
  this.minHeight = 0;
  this.maxHeight = 300;
  this.color1 = "#0099ff";
  this.color2 = "#66ff66";
  this.color3 = "#ffff33";
  this.color4 = "#ff6600";
  this.color5 = "#ff3300";
  this.alpha = 1.0;
};
var colorCtrl = new ColorCtrl();
export const heightRampColorCtrl = colorCtrl;
class HighlyTool {
  constructor() {}

  init = () => {
    var gui = (this.gui = new window.dat.GUI({
      // domElement:"heihtRamp"
    }));
    var showHeightRamp = gui.add(colorCtrl, "show");
    var folder = gui.addFolder("Color Control");
    var minHeightControl = folder.add(colorCtrl, "minHeight", -50, 400);
    var maxHeightControl = folder.add(colorCtrl, "maxHeight", 20, 500);
    var color1Control = folder.addColor(colorCtrl, "color1");
    var color2Control = folder.addColor(colorCtrl, "color2");
    var color3Control = folder.addColor(colorCtrl, "color3");
    var color4Control = folder.addColor(colorCtrl, "color4");
    var color5Control = folder.addColor(colorCtrl, "color5");
    var alphaControl = folder.add(colorCtrl, "alpha", 0.0, 1.0);
    folder.open();
    gui.domElement.id = "heihtRampGui";

    showHeightRamp.onChange(function(show) {
      if (show) {
        modelStore.tileset.heightRampAlpha = colorCtrl.alpha;
        folder.open();
      } else {
        modelStore.tileset.heightRampAlpha = 0.0;
        folder.close();
      }
    });

    function maxMinHeightChanged(isMax, value) {
      modelStore.tileset.heightRampMaxMinHeight[isMax ? 0 : 1] = value;
    }
    minHeightControl.onChange(function() {
      maxMinHeightChanged(false, colorCtrl.minHeight);
    });
    maxHeightControl.onChange(function() {
      maxMinHeightChanged(true, colorCtrl.maxHeight);
    });

    var ColorStop = ["#0099ff", "#66ff66", "#ffff33", "#ff6600", "#ff3300"];
    function colorStopChanged(index, changedColor) {
      ColorStop[index] = changedColor;
      modelStore.tileset.heightRampColorStop = ColorStop;
    }

    color1Control.onChange(function() {
      colorStopChanged(0, colorCtrl.color1);
    });
    color2Control.onChange(function() {
      colorStopChanged(1, colorCtrl.color2);
    });
    color3Control.onChange(function() {
      colorStopChanged(2, colorCtrl.color3);
    });
    color4Control.onChange(function() {
      colorStopChanged(3, colorCtrl.color4);
    });
    color5Control.onChange(function() {
      colorStopChanged(4, colorCtrl.color5);
    });

    alphaControl.onChange(function() {
      modelStore.tileset.heightRampAlpha = colorCtrl.alpha;
    });
  };

  destroy = () => {
    //this.gui.destroy();
  };
}
export const highlyTool = new HighlyTool();
