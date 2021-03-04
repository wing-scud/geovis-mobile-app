<template>
  <div>
    <div class="ztree" :id="ztreeId"></div>
    <ul ref="menu" class="small-menu">
      <li><a id="edit" href="#" @click="openNewWindow">编辑</a></li>
      <li><a id="remove" href="#"> 删除</a></li>
      <li><a id="cut" href="#">剪切</a></li>
      <li><a id="copy" href="#">复制</a></li>
      <li><a id="paste" href="#">黏贴</a></li>
      <li class="small-menu-separator"></li>
      <li><a id="addParent" href="#">添加父节点</a></li>
      <li><a id="addLeaf" href="#">添加子节点</a></li>
      <li><a id="clearChildren" href="#">清空子节点</a></li>
    </ul>
  </div>
</template>

<script>
import "@geovis/common/lib/jquery";
if (!window.jQuery) {
  window.jQuery = $;
}
// const $ = require("@geovis/common/lib/jquery");
require("@geovis/common/lib/jquery.ztree.all");
require("@geovis/common/lib/jquery.popupSmallMenu.js");
let newCount = 0;
export default {
  props: {
    setting: {
      type: Object,
      require: false,
      default: function() {
        return {};
      }
    },
    nodes: {
      type: Array,
      require: true,
      default: function() {
        return [];
      }
    },
    updateRequest: {
      type: Boolean
    }
  },
  data() {
    return {
      ztreeId: "ztree_" + parseInt(Math.random() * 1e10),
      ztreeObj: null,
      list: [],
      ztreeSetting: {
        view: {
          showIcon: false // default to hide icon
        },
        callback: {
          onAsyncError: (...arg) => {
            this.$emit("onAsyncError", ...arg);
          },
          onAsyncSuccess: (...arg) => {
            this.$emit("onAsyncSuccess", ...arg);
          },
          onCheck: (...arg) => {
            this.$emit("onCheck", ...arg);
          },
          onClick: (...arg) => {
            this.$emit("onClick", ...arg);
          },
          onCollapse: (...arg) => {
            this.$emit("onCollapse", ...arg);
          },
          onDblClick: (...arg) => {
            this.$emit("onDblClick", ...arg);
          },
          onDrag: (...arg) => {
            this.$emit("onDrag", ...arg);
          },
          onDragMove: (...arg) => {
            this.$emit("onDragMove", ...arg);
          },
          onDrop: (...arg) => {
            this.$emit("onDrop", ...arg);
          },
          onExpand: (...arg) => {
            this.$emit("onExpand", ...arg);
          },
          onMouseDown: (...arg) => {
            this.$emit("onMouseDown", ...arg);
          },
          onMouseUp: (...arg) => {
            this.$emit("onMouseUp", ...arg);
          },
          onRemove: (...arg) => {
            this.$emit("onRemove", ...arg);
          },
          onRename: (...arg) => {
            this.$emit("onRename", ...arg);
          },
          onRightClick: (...arg) => {
            const data = { ...arg };
            const event = data[0];
            const treeId = data[1];
            const treeNode = data[2];
            const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
            zTree.selectNode(treeNode);
            if (treeNode) {
              //弹出菜单
              $(this.$refs["menu"]).popupSmallMenu({
                event: event
                // onClickItem : function(item) {
                // pointer.handle(treeNode,item);
                // }
              });
            }

            console.log(this.setting);
            this.$emit("onRightClick", ...arg);
          }
        }
      }
    };
  },
  methods: {
    openNewWindow(url) {
  window.open("http://localhost:8000", "_blank", "name='123';height=100%;width=100%;");
},

    beforeClick: function(treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      if (!treeNode.isParent) {
        zTree.checkNode(treeNode, !treeNode.checked, true, true); //单击勾选，再次单击取消勾选
      }
    },
    onClick: function(event, treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      if ($(event.target).hasClass("ico_close") || $(event.target).hasClass("ico_open")) {
        zTree.expandNode(treeNode); //如果是父节点，则展开该节点
      } else {
        return;
      }
    },
    beforeDrag: function(treeId, treeNodes) {
      for (let i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
          return false;
        }
      }
      return true;
    },
    beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
      return targetNode ? targetNode.drop !== false : true;
    },
    onRemove: function(e, treeId, treeNode) {},
    beforeRename: function(treeId, treeNode, newName) {
      if (newName.length == 0) {
        alert("节点名称不能为空.");
        const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
        setTimeout(function() {
          zTree.editName(treeNode);
        }, 10);
        return false;
      }
      return true;
    },
    onRightClick: function(event, treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      zTree.selectNode(treeNode);
      if (treeNode) {
        //弹出菜单
        $(this.$refs["menu"]).popupSmallMenu({
          event: event
          // onClickItem : function(item) {
          // pointer.handle(treeNode,item);
          // }
        });
      }
    },
    handle: function(treeNode, item) {},
    fontCss: function(treeNode) {
      const aObj = $("#" + treeNode.tId + "_a");
      aObj.removeClass("copy").removeClass("cut");
      if (treeNode === this.curSrcNode) {
        if (this.curType == "copy") {
          aObj.addClass(this.curType);
        } else {
          aObj.addClass(this.curType);
        }
      }
    },
    setCurSrcNode: function(treeNode) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      if (this.curSrcNode) {
        delete this.curSrcNode.isCur;
        const tmpNode = this.curSrcNode;
        this.curSrcNode = null;
        this.fontCss(tmpNode);
      }
      this.curSrcNode = treeNode;
      if (!treeNode) return;

      this.curSrcNode.isCur = true;
      zTree.cancelSelectedNode();
      this.fontCss(this.curSrcNode);
    },
    edit: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      zTree.editName(treeNode);
    },
    cut: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId),
        nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      this.curType = "cut";
      this.setCurSrcNode(nodes[0]);
    },
    copy: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId),
        nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      this.curType = "copy";
      this.setCurSrcNode(nodes[0]);
    },
    paste: function(e) {
      if (!this.curSrcNode) {
        alert("请先选择一个节点进行 复制 / 剪切");
        return;
      }
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      const nodes = zTree.getSelectedNodes();
      let targetNode = nodes.length > 0 ? nodes[0] : null;
      if (this.curSrcNode === targetNode) {
        alert("不能移动，源节点 与 目标节点相同");
        return;
      } else if (this.curType === "cut" && ((!!targetNode && this.curSrcNode.parentTId === targetNode.tId) || (!targetNode && !this.curSrcNode.parentTId))) {
        alert("不能移动，源节点 已经存在于 目标节点中");
        return;
      } else if (this.curType === "copy") {
        targetNode = zTree.copyNode(targetNode, this.curSrcNode, "inner");
      } else if (this.curType === "cut") {
        targetNode = zTree.moveNode(targetNode, this.curSrcNode, "inner");
        if (!targetNode) {
          alert("剪切失败，源节点是目标节点的父节点");
        }
        targetNode = this.curSrcNode;
      }
      this.setCurSrcNode();
      delete targetNode.isCur;
      zTree.selectNode(targetNode);
    },
    add: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId);
      const isParent = e.data.isParent;
      const nodes = zTree.getSelectedNodes();
      let treeNode = nodes[0];
      //  console.log(treeNode);

      const file = require("./assets/images/file/tuceng.svg");
      const img = file;

      if (treeNode) {
        treeNode = zTree.addNodes(treeNode, {
          id: 100 + newCount,
          pId: treeNode.id,
          isParent: isParent,
          name: "new node" + newCount++,
          icon: img
        });
      } else {
        treeNode = zTree.addNodes(null, {
          id: 100 + newCount,
          pId: 0,
          isParent: isParent,
          name: "new node" + newCount++
        });
      }
      if (treeNode) {
        zTree.editName(treeNode[0]);
      } else {
        alert("叶子节点被锁定，无法增加子节点");
      }
    },
    removenode: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      const callbackFlag = $("#callbackTrigger").attr("checked");
      zTree.removeNode(treeNode, callbackFlag);
    },
    clearChildren: function(e) {
      const zTree = $.fn.zTree.getZTreeObj(this.ztreeId),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
      if (nodes.length == 0 || !nodes[0].isParent) {
        alert("请先选择一个父节点");
        return;
      }
      zTree.removeChildNodes(treeNode);
    },
    generateTree() {
      this.list = this.nodes;

      // update tree
      if (this.ztreeObj) {
        this.ztreeObj.destroy();
      }
      this.$nextTick(() => {
        console.log($.fn)
        this.ztreeObj = $.fn.zTree.init($("#" + this.ztreeId), Object.assign({}, this.ztreeSetting, this.setting), this.list);
        this.$emit("onCreated", this.ztreeObj);
      });
    }
  },
  mounted() {
    this.generateTree();
  },
  watch: {
    updateRequest(val) {
      if (val) {
        this.generateTree();
      }
    },
    nodes: {
      handler: function(nodes) {},
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss">
/* beauty ztree! */
.ztree {
  text-align: left;
  font-size: 14px;
}
li {
  list-style-type: none;
  white-space: nowrap;
  outline: none;
  font-size: 17px;
  padding-top: 6px;
}
li ul {
  position: relative;
  padding: 0 0 0 20px;
  margin: 0;
}
.line:before {
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  content: "";
  border-right: 1px dotted #dbdbdb;
}
.roots_docu:before,
.roots_docu:after,
.center_docu:before,
.bottom_docu:before,
.center_docu:after,
.bottom_docu:after {
  position: absolute;
  content: "";
  border: 0 dotted #dbdbdb;
}
.roots_docu:before {
  left: 10px;
  height: 50%;
  top: 50%;
  border-left-width: 1px;
}
.roots_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
.center_docu:before {
  left: 10px;
  height: 100%;
  border-left-width: 1px;
}
.center_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
.bottom_docu:before {
  left: 10px;
  height: 50%;
  border-left-width: 1px;
}
.bottom_docu:after {
  top: 50%;
  left: 11px;
  width: 50%;
  border-top-width: 1px;
}
li a {
  display: inline-block;
  line-height: 22px;
  height: 22px;
  margin: 0;
  cursor: pointer;
  transition: none;
  vertical-align: middle;
  color: $gv-text-color;
}
.node_name {
  display: inline-block;
  padding: 0 3px;
  border-radius: 4px;
}
.curSelectedNode .node_name {
  color: #000;
  background-color: #c9e9f7;
}
.curSelectedNode_Edit {
  height: 20px;
  opacity: 0.8;
  color: #000;
  border: 1px #6cc2e8 solid;
  background-color: #9dd6f0;
}
.tmpTargetNode_inner {
  opacity: 0.8;
  color: #fff;
  background-color: #4fcbf0;
  filter: alpha(opacity=80);
}
.rename {
  font-size: 12px;
  line-height: 22px;
  width: 80px;
  height: 22px;
  margin: 0;
  padding: 0;
  vertical-align: top;
  border: 0;
  background: none;
}
.button {
  position: relative;
  display: inline-block;
  line-height: 22px;
  height: 22px;
  width: 22px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}

.button.edit {
  color: #25ae88;
}
.button.remove {
  color: #cb4042;
}
.button.chk {
  position: relative;
  width: 14px;
  height: 14px;
  margin: 0 4px 0 0;
  border: 1px solid #d7dde4;
  border-radius: 2px;
  background: #fff;
}
.chk.radio_true_full,
.chk.radio_false_full,
.chk.radio_true_full_focus,
.chk.radio_false_full_focus,
.chk.radio_false_disable,
.chk.radio_true_disable,
.chk.radio_true_part,
.chk.radio_false_part,
.chk.radio_true_part_focus,
.chk.radio_false_part_focus {
  border-radius: 8px;
}
.button.chk:after {
  position: absolute;
  top: 1px;
  left: 4px;
  width: 4px;
  height: 8px;
  content: "";
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
  -webkit-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}
.button.checkbox_false_full_focus {
  border-color: #ccc;
}
.button.checkbox_true_full,
.button.checkbox_true_full_focus,
.button.checkbox_true_part,
.button.checkbox_true_part_focus,
.button.checkbox_true_disable {
  border-color: #39f;
  background-color: #39f;
}
.button.checkbox_true_full:after,
.button.checkbox_true_full_focus:after,
.button.checkbox_true_disable:after {
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.button.checkbox_true_part:after,
.button.checkbox_true_part_focus:after {
  top: 5px;
  left: 2px;
  width: 10px;
  height: 1px;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  border-right: 0;
}
.button.radio_true_full,
.chk.radio_true_full_focus,
.chk.radio_true_part,
.chk.radio_true_part_focus {
  border-color: #39f;
}
.button.radio_true_full:after,
.chk.radio_true_full_focus:after,
.chk.radio_true_part:after,
.chk.radio_true_part_focus:after {
  top: 3px;
  left: 3px;
  width: 8px;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  border: 0;
  border-radius: 4px;
  background: #39f;
}
.button.checkbox_true_disable,
.button.checkbox_false_disable,
.chk.radio_false_disable,
.chk.radio_true_disable {
  cursor: not-allowed;
}
.button.checkbox_false_disable {
  background-color: #f3f3f3;
}
.button.noline_close:before,
.button.noline_open:before,
.button.root_open:before,
.button.root_close:before,
.button.roots_open:before,
.button.roots_close:before,
.button.bottom_open:before,
.button.bottom_close:before,
.button.center_open:before,
.button.center_close:before {
  position: absolute;
  top: 5px;
  left: 5px;
  content: "";
  transition: -webkit-transform ease 0.3s;
  transition: transform ease 0.3s;
  transition: transform ease 0.3s, -webkit-transform ease 0.3s;
  -webkit-transform: rotateZ(0deg);
  transform: rotateZ(0deg);
  -webkit-transform-origin: 25% 50%;
  transform-origin: 25% 50%;
  border: 6px solid;
  border-color: transparent transparent transparent $gv-text-color;
}
.button.noline_open:before,
.button.root_open:before,
.button.roots_open:before,
.button.bottom_open:before,
.button.center_open:before {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.button.ico_loading {
  margin-right: 2px;
  background: url("data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7")
    0 center no-repeat;
}
  .tmpTargetzTree {
    opacity: 0.8;
    background-color: #2ea9df;
    filter: alpha(opacity=80);
  }
  .tmpzTreeMove_arrow {
    position: absolute;
    width: 18px;
    height: 18px;
    color: #4fcbf0;
  }


ul.ztree.zTreeDragUL {
  margin: 0;
  padding: 0;
  position: absolute;
  overflow: hidden;
  background-color: #dedede;
  border: 1px #4fcbf0 dotted;
  border-radius: 4px;
  opacity: 0.7;
}

.zTreeMask {
  position: absolute;
  z-index: 10000;
  opacity: 0;
  background-color: #cfcfcf;
}

/*新增 */
.small-menu {
  position: fixed;
  width: 120px;
  z-index: 99999;
  border: solid 1px #ccc;
  background-color: #333;
  padding: 0px;
  margin: 0px;
  display: none;
}

.small-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.small-menu li a {
  color: white;
  font-size: 12px;
  text-decoration: none;
  display: block;
  line-height: 20px;
  height: 20px;
  background-position: 6px center;
  background-repeat: no-repeat;
  outline: none;
  padding: 1px 5px;
  padding-left: 28px;
}

.small-menu li a:hover {
  color: #fff;
  background-color: #3399ff;
}

.small-menu-separator {
  padding-bottom: 0;
  border-bottom: 1px solid #ddd;
}
</style>
