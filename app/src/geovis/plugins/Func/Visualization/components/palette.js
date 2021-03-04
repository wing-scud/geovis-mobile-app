const ColorCtrl = function() {
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
const colorCtrl = new ColorCtrl();
export const paletteColorCtrl = colorCtrl;
class Palette {
  constructor() {}

  init = () => {
    const gui = (this.gui = new window.dat.GUI({
      // domElement:"heihtRamp"
    }));
    const showHeightRamp = gui.add(colorCtrl, "show");
    const folder = gui.addFolder("Color Control");
    const minHeightControl = folder.add(colorCtrl, "minHeight", -50, 400);
    const maxHeightControl = folder.add(colorCtrl, "maxHeight", 20, 500);
    const color1Control = folder.addColor(colorCtrl, "color1");
    const color2Control = folder.addColor(colorCtrl, "color2");
    const color3Control = folder.addColor(colorCtrl, "color3");
    const color4Control = folder.addColor(colorCtrl, "color4");
    const color5Control = folder.addColor(colorCtrl, "color5");
    const alphaControl = folder.add(colorCtrl, "alpha", 0.0, 1.0);
    folder.open();
    gui.domElement.id = "paletteGui";

    // showHeightRamp.onChange(function(show) {
    //   if (show) {
    //     modelStore.tileset.heightRampAlpha = colorCtrl.alpha;
    //     folder.open();
    //   } else {
    //     modelStore.tileset.heightRampAlpha = 0.0;
    //     folder.close();
    //   }
    // });
  };
}
