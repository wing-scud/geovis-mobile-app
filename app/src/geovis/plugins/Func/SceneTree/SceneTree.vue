<template>
  <template-plugin :height="610" :pluginInfo="pluginInfo" class="scene-root">
    <z-tree class="tree-root" :setting="setting" :nodes="nodes" :updateRequest="sceneState.updateRequest" @onDblClick="onDblClick" @onClick="onClick" @onCheck="onCheck" @onCreated="handleCreated" @onRightClick="onRightClick" />
    <div class="tree-button">
      <!-- <el-button @click="addNode" type="primary">添加</el-button> -->
      <el-button @click="reset">重置</el-button>
    </div>
  </template-plugin>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";

import TemplatePlugin from "../../TemplatePlugin.vue";

import ZTree from "./ZTree.vue";
import { earthStore } from "@/geovis/store";

const SceneManager = Vue.extend({
  name: "SceneManager",
  props: {
    pluginInfo: Object as () => GVAPP.PluginInfo
  },
  components: {
    "template-plugin": TemplatePlugin,
    "z-tree": ZTree
  },
  data() {
    return {
      showIndex: 0,
      ztreeObj: null,
      setting: {
        check: {
          chkboxType: { Y: "ps", N: "ps" },
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: "pid"
          }
        },
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          removeTitle: false,
          renameTitle: false,
          editNameSelectAll: true,
          drag: {
            isCopy: true, //能够复制
            isMove: true, //能够移动
            prev: true, //不能拖拽到节点前
            next: true, //不能拖拽到节点后
            inner: true //只能拖拽到节点中
          }
        },
        view: {
          showIcon: false,
          addHoverDom: this["addHoverDom"],
          removeHoverDom: this["removeHoverDom"]
        }
      },
      sceneState: earthStore.sceneManager.state
    };
  },
  computed: {
    nodes: function(): {}[] {
      return this.sceneState.tree;
    }
  },
  methods: {
    addHoverDom(treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`);
      if (item && !item.querySelector(".tree_extra_btn")) {
        const btn = document.createElement("sapn");
        btn.id = `${treeid}_${treeNode.id}_btn`;
        btn.classList.add("tree_extra_btn");
        btn.innerText = "删除";
        btn.addEventListener("click", e => {
          e.stopPropagation();
          this.clickRemove(treeid, treeNode);
        });
        item.appendChild(btn);
      }
    },
    removeHoverDom(treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`);
      if (item) {
        const btn = item.querySelector(".tree_extra_btn");
        if (btn) {
          item.removeChild(btn);
        }
      }
    },

    clickRemove(treeid, treeNode) {
      // console.log("remove", treeNode);
      earthStore.sceneManager.removeNodeByid(treeNode.id);
      this.ztreeObj && this.ztreeObj.removeNode(treeNode);
    },
    onClick: function(evt, treeId, treeNode) {
      // 点击事件
    },
    onDblClick: function(evt, treeId, treeNode) {
      treeNode && earthStore.sceneManager.zoomTo(treeNode.id);
    },
    onCheck: function(evt, treeId, treeNode) {
      earthStore.sceneManager.setChecked(treeNode.id, treeNode.checked);
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      // ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
      earthStore.sceneManager.setUpdateRequest(false);
    },
    update: function() {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0;
    },
    reset(){
      earthStore.sceneManager.resetTree();
    },
    addNode(){

    },
    onRightClick: function(...arg) {}
  }
});

export default SceneManager;
</script>

<style lang="scss">
.scroll {
  height: 100%;
}
.scroll-item {
  font-size: 16px;
}
.gv-plugin {
  display: flex;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  justify-content: space-between;

  .switch {
    height: 34px;
  }
  .title {
    display: flex;
  }
  span {
    padding-left: 10px;
  }
}

.tree-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.scene-root {
  .gv-page-content {
    padding: 0;
  }
}
.tree-root {
  height: calc(100% - 40px);
  overflow-y: auto;
}
</style>
