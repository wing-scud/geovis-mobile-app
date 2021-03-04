<template>
  <div class="cesium">
    <div v-if="showUI" id="toolbarLeft">
      <div class="toolbarButtons">
        <b-tooltip label="选择卫星" position="is-right">
          <button type="button" class="cesium-button cesium-toolbar-button" @click="toggleMenu('cat')">
            <div class="icon fill-parent svg-sat">
              <i class="svg-sat"></i>
             </div>
          </button>
        </b-tooltip>
        <b-tooltip label="展示元素" position="is-right">
          <button type="button" class="cesium-button cesium-toolbar-button" @click="toggleMenu('sat')">
            <span class="icon fill-parent">
              <i class="fas fa-layer-group fa-2x"></i>
            </span>
          </button>
        </b-tooltip>
        <b-tooltip label="地面站" position="is-right">
          <button type="button" class="cesium-button cesium-toolbar-button" @click="toggleMenu('gs')">
            <div class="icon fill-parent svg-groundstation">
              <i class="svg-groundstation"></i>
            </div>
          </button>
        </b-tooltip>
        <b-tooltip label="调试工具" position="is-right">
          <button type="button" class="cesium-button cesium-toolbar-button" @click="toggleMenu('dbg')">
            <span class="icon fill-parent">
              <i class="fas fa-hammer fa-fw mfa-button-width"></i>
            </span>
          </button>
        </b-tooltip>
      </div>
      <div v-show="menu.cat" class="toolbarSwitches">
        <!-- <div class="toolbarTitle">
          追踪卫星
        </div>
        <div class="toolbarContent">
          <satellite-select ref="SatelliteSelect" />
        </div> -->
        <div class="toolbarTitle">
          查看卫星
        </div>
        <div class="toolbarContent">
          <satellite-multi-select ref="SatelliteMultiSelect" />
        </div>
        <!-- <div class="toolbarTitle">
          Monitored satellites
        </div> -->
        <!-- <div class="toolbarContent">
          <satellite-notify-multi-select ref="SatelliteNotifyMultiSelect" />
        </div> -->
      </div>
      <div v-show="menu.sat" class="toolbarSwitches">
        <div class="toolbarTitle">
          展示元素
        </div>
        <div class="toolbarContent">
          <satellite-cylinder-select ref="SatelliteCylinderSelect" />
        </div>
        <label v-for="componentName in satsState.components" :key="componentName" class="toolbarSwitch">
          <input v-model="enabledComponents" type="checkbox" :value="componentName">
          <span class="slider"></span>
          {{ componentName }}
        </label>
        <!--
        <label class="toolbarSwitch">
          <input type="button" @click="cc.viewer.trackedEntity = undefined">
          Untrack Entity
        </label>
        -->
      </div>
      <div v-show="menu.gs" class="toolbarSwitches">
        <div class="toolbarTitle">
          地面站
        </div>
        <label class="toolbarSwitch">
          <input v-model="groundStationPicker.enabled" type="checkbox">
          <span class="slider"></span>
          点选
        </label>
        <label class="toolbarSwitch">
          <input type="button" @click="focusGroundStation()">
          锁定视角
        </label>
      </div>
      <div v-show="menu.ios" class="toolbarSwitches">
        <div class="toolbarTitle">
          Mobile
        </div>
        <!-- <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.useWebVR" type="checkbox">
          <span class="slider"></span>
          VR
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.clock.shouldAnimate" type="checkbox">
          <span class="slider"></span>
          Play
        </label> -->
        <!-- <label class="toolbarSwitch">
          <input type="button" @click="cc.viewer.clockViewModel.multiplier *= 2">
          Increase play speed
        </label>
        <label class="toolbarSwitch">
          <input type="button" @click="cc.viewer.clockViewModel.multiplier /= 2">
          Decrease play speed
        </label> -->
        <label class="toolbarSwitch">
          <input type="button" @click="$router.go({path: '', force: true})">
          Reload
        </label>
      </div>
      <div v-show="menu.dbg" class="toolbarSwitches">
        <div class="toolbarTitle">
          调试
        </div>
        <!-- <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.debugShowFramesPerSecond" type="checkbox">
          <span class="slider"></span>
          FPS
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.requestRenderMode" type="checkbox">
          <span class="slider"></span>
          按需渲染
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.fog.enabled" type="checkbox">
          <span class="slider"></span>
          Fog
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.globe.enableLighting" type="checkbox">
          <span class="slider"></span>
          光照
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.highDynamicRange" type="checkbox">
          <span class="slider"></span>
          HDR
        </label>
        <label class="toolbarSwitch">
          <input v-model="cc.viewer.scene.globe.showGroundAtmosphere" type="checkbox">
          <span class="slider"></span>
          大气层
        </label> -->
      </div>
    </div>
    <!-- <div id="toolbarRight">
      <b-tooltip v-if="showUI" label="Github" position="is-left">
        <a class="cesium-button cesium-toolbar-button" href="https://github.com/Flowm/satvis/" target="_blank" rel="noopener">
          <span class="icon fill-parent">
            <i class="fab fa-github fa-2x"></i>
          </span>
        </a>
      </b-tooltip>
      <b-tooltip label="Toggle UI" position="is-left">
        <button type="button" class="cesium-button cesium-toolbar-button" @click="toggleUI">
          <span class="icon fill-parent">
            <i class="fas fa-eye fa-2x"></i>
          </span>
        </button>
      </b-tooltip>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Tooltip from "buefy";
import SatelliteSelect from "./SatelliteSelect.vue";
import SatelliteMultiSelect from "./SatelliteMultiSelect.vue";
import SatelliteCylinderSelect from "./SatelliteCylinderSelect.vue";
import SatelliteNotifyMultiSelect from "./SatelliteNotifyMultiSelect.vue";
import VueCesiumController from "./VueCesiumController.js";
Vue.use(Tooltip);
// Vue.use(VueCesiumController); /* global cc */
// const cc = VueCesiumController.install(Vue);
export default {
  components: {
    // "satellite-select": SatelliteSelect,
    "satellite-multi-select": SatelliteMultiSelect,
    "satellite-cylinder-select": SatelliteCylinderSelect,
    // "satellite-notify-multi-select": SatelliteNotifyMultiSelect,
  },

  data() {
    return {
      menu: {
        cat: false,
        sat: false,
        gs: false,
        map: false,
        ios: false,
        dbg: false,
      },
      
      satsState: {
        components:[]
      },
      focusGroundStation: cc.sats.focusGroundStation,
      // cc:{
        // focusGroundStation:
        // sats:cc.sats,
        
        // viewer:{
        //   clock: cc.viewer.clock,
        //   clockModel:cc.viewer.clockModel,
        //   scene:{
        //     fog:cc.viewer.scene.fog,
        //     globe:{
        //       // show
        //     }
        //   }
        // }
      // },
      showUI: true,
      imageryProvider: "OfflineHighres",
      terrainProvider: "None",
      sceneMode: "3D",
      cameraMode: "Fixed",
      enabledComponents: window.cc.sats.enabledComponents,
      groundStationPicker:  window.cc.groundStationPicker,
    };
  },
  mounted(){
    
  },
  watch: {
    imageryProvider: function(newProvider) {
      cc.imageryProvider = newProvider;
       if (this.$route.query.layers != newProvider) {
        this.$router.push({query: {...this.$route.query, layers: newProvider}});
      }
    },
    terrainProvider: function(newProvider) {
      cc.terrainProvider = newProvider;
      if (this.$route.query.terrain != newProvider) {
        this.$router.push({query: {...this.$route.query, terrain: newProvider}});
      }
    },
    sceneMode: function(newMode) {
      cc.sceneMode = newMode;
    },
    cameraMode: function(newMode) {
      cc.cameraMode = newMode;
    },
    enabledComponents: function(newComponents, oldComponents) {
        // 向其中添加删除功能label
        // debugger
      let add = newComponents.filter(x => !oldComponents.includes(x));
      for (let component of add) {
        cc.sats.enableComponent(component); //
      }
      let del = oldComponents.filter(x => !newComponents.includes(x));
      for (let component of del) {
        cc.sats.disableComponent(component);
      }
    },
  },
   
  mounted() {
    this.satsState.components = cc.sats.state.components
  //  const cc = VueCesiumController.install(Vue);
    if (this.$route.query.bg) {
      cc.enableTransparency(); 
    }
    if (this.$route.query.gs) {
      cc.setGroundStationFromLatLon(this.$route.query.gs);
    }
    if (this.$route.query.layers) {
      const layers = this.$route.query.layers.split(",");
      if (layers.length === 1) {
        this.imageryProvider = layers[0];
      } else {
        cc.clearImageryLayers();
        layers.forEach(layer => {
          const provider = layer.split("_");
          if (provider.length == 1) {
            cc.addImageryLayer(provider[0]);
          } else {
            cc.addImageryLayer(provider[0], provider[1]);
          }
        });
      }
    }
    if (this.$route.query.terrain) {
      this.terrainProvider = this.$route.query.terrain;
    }
    if (this.$route.query.tags) {
      const tags = this.$route.query.tags.split(",");
      cc.sats.enableTag(tags);
    }
    if (this.$route.query.elements) {
      const elements = this.$route.query.elements.replace(/-/g, " ").split(",");
      this.enabledComponents = elements;
    }
    if (this.$route.query.time) {
      cc.setTime(this.$route.query.time);
    }
    this.showUI = !cc.minimalUIAtStartup;
    this.$root.$on("updateCat", this.updateCat);
  },
  beforeDestroy() {
    this.$root.$off("updateCat", this.updateCat);
  },
  methods: {
update(){
   
      },
    toggleMenu: function(name) {
        
      const oldState = this.menu[name];
      Object.keys(this.menu).forEach(k => this.menu[k] = false);
      this.menu[name] = !oldState;

      if (this.menu.cat) {
        // Update multiselect data when it is displayed
        this.updateCat();
      }
    },
    toggleUI: function() {
      this.showUI = !this.showUI;
      if (!cc.minimalUI) {
        cc.showUI = this.showUI;
      }
    },
    updateCat: function() {
      // this.$refs.SatelliteSelect.update();
      this.$refs.SatelliteMultiSelect.update();
      // this.$refs.SatelliteNotifyMultiSelect.update();
    },
  },
};
</script>
