import Vue from "vue";

// import QianXi from "./QianXi";
// import forceEdgeBundling from "./forceEdgeBundling";

// // Echarts APP


// import TimeAxis from "./TimeAxis";
// import NoMan from "./NoMan";

// import SanDian from "./SanDian";
// import MapTime1 from "./MapTime1/index.vue";
// import MapTime2 from "./MapTime2";
// import PolyLine from "./PolyLine";
// import PointGrid from "./PointGrid/index.vue";
// import PointHoneycomb from "./PointHoneycomb";

// Vue.component("MapTime1", MapTime1);
// Vue.component("MapTime2", MapTime2);
// Vue.component("PolyLine", PolyLine);
// Vue.component("PointGrid", PointGrid);
// Vue.component("PointHoneycomb", PointHoneycomb);
// Vue.component("QianXi", QianXi);
// Vue.component("forceEdgeBundling", forceEdgeBundling);

// Vue.component("TimeAxis", TimeAxis);
// Vue.component("NoMan", NoMan);

// Vue.component("SanDian", SanDian);

import AirQuality from "./AirQuality/index.vue";
Vue.component("AirQuality", AirQuality);

import HeatMap from "./HeatMap";
Vue.component("HeatMap", HeatMap);

import EchartsQianXi from "./EchartsQianXi";
Vue.component("EchartsQianXi", EchartsQianXi);

import FlowLine from "./FlowLine";
Vue.component("FlowLine", FlowLine);

import MapTime1 from "./MapTime1";
Vue.component("MapTime1", MapTime1);

import PointGrid from "./PointGrid";
Vue.component("PointGrid", PointGrid);

import PointHoneycomb from "./PointHoneycomb";
Vue.component("PointHoneycomb", PointHoneycomb);


import SanDian from "./SanDian/SanDian";
Vue.component("SanDian", SanDian);

import EchartsTimeLine from "./EchartsTimeLine/EchartsTimeLine";
Vue.component("EchartsTimeLine", EchartsTimeLine);


import DeckTrips from "./DeckTrips/DeckTrips";
Vue.component("DeckTrips", DeckTrips);

import DeckHeatMap3D from "./DeckHeatMap3D/DeckHeatMap3D";
Vue.component("DeckHeatMap3D", DeckHeatMap3D);
// import EchartsTimeLine from "./EchartsTimeLine";
// Vue.component("EchartsTimeLine", EchartsTimeLine);
