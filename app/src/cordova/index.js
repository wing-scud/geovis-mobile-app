import camera from "./plugin/camera";
import mapLocation from "./plugin/location";
import file from "./plugin/file";
import "./plugin/screenOrientation.js";
import "./lifecycle.js";
window.cordovaPlugin = {};
window.cordovaPlugin.camera = camera;
window.cordovaPlugin.mapLocation = mapLocation;
window.cordovaPlugin.file = file;