<template>
  <div>
    <ul id="treeDemo" class="ztree"></ul>

    <ul id="menu" class="small-menu">
      <li><a id="edit" href="#">编辑</a></li>
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
import $ from "@/geovis/common/lib/jquery";
window.jQuery = $;
// import "../../plugins/zTree/js/jquery-1.4.4.min.js"
// import '../../plugins/zTree/js/jquery.ztree.all.js'
require("./3rdParty/jquery.ztree.all.js");
require("./3rdParty/jquery.popupSmallMenu.js");

const file = require("./assets/images/file/tuceng.svg");

let newCount = 0;
export default {
  name: "ZTree",
  data() {
    return {
      curSrcNode: null,
      curType: "",
      setting: {
        view: {
          selectedMulti: true,
          showLine: false,
          showIcon: true,
          txtSelectedEnable: false
        },
        check: {
          enable: true
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
        data: {
          keep: {
            parent: true,
            leaf: false
          },
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: 0
          }
        },
        callback: {
          beforeDrag: this.beforeDrag,
          beforeRename: this.beforeRename,
          onRemove: this.onRemove,
          beforeDrop: this.beforeDrop,
          onRightClick: this.onRightClick
        }
      },
      zNodes: [
        {
          id: 1,
          pId: 0,
          name: "父节点 1",
          open: true,
          isParent: false,
          icon: file
        },
        { id: 11, pId: 1, name: "叶子节点 1-1", icon: file },
        { id: 12, pId: 1, name: "叶子节点 1-2", icon: file },
        { id: 13, pId: 1, name: "叶子节点 1-3", icon: file },
        { id: 2, pId: 0, name: "父节点 2", icon: file },
        { id: 21, pId: 2, name: "叶子节点 2-1", icon: file },
        { id: 22, pId: 2, name: "叶子节点 2-2", icon: file },
        { id: 23, pId: 2, name: "叶子节点 2-3", icon: file },
        { id: 3, pId: 0, name: "父节点 3", icon: file },
        { id: 31, pId: 3, name: "叶子节点 3-1", icon: file },
        { id: 32, pId: 3, name: "叶子节点 3-2", icon: file },
        { id: 33, pId: 3, name: "叶子节点 3-3", icon: file },
        { id: 4, pId: 0, name: "父节点 3", icon: file },
        { id: 33, pId: 4, name: "叶子节点 3-3", icon: file }
      ]
    };
  },
  methods: {
    beforeClick: function(treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
      if (!treeNode.isParent) {
        zTree.checkNode(treeNode, !treeNode.checked, true, true); //单击勾选，再次单击取消勾选
      }
    },
    onClick: function(event, treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
      if (
        $(event.target).hasClass("ico_close") ||
        $(event.target).hasClass("ico_open")
      ) {
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
        const zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function() {
          zTree.editName(treeNode);
        }, 10);
        return false;
      }
      return true;
    },
    onRightClick: function(event, treeId, treeNode) {
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.selectNode(treeNode);
      if (treeNode) {
        //弹出菜单
        $("#menu").popupSmallMenu({
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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      zTree.editName(treeNode);
    },
    cut: function(e) {
      const zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes();
      if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
      }
      this.curType = "cut";
      this.setCurSrcNode(nodes[0]);
    },
    copy: function(e) {
      const zTree = $.fn.zTree.getZTreeObj("treeDemo"),
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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
      const nodes = zTree.getSelectedNodes();
      let targetNode = nodes.length > 0 ? nodes[0] : null;
      if (this.curSrcNode === targetNode) {
        alert("不能移动，源节点 与 目标节点相同");
        return;
      } else if (
        this.curType === "cut" &&
        ((!!targetNode && this.curSrcNode.parentTId === targetNode.tId) ||
          (!targetNode && !this.curSrcNode.parentTId))
      ) {
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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo");
      const isParent = e.data.isParent;
      const nodes = zTree.getSelectedNodes();
      let treeNode = nodes[0];
      //  console.log(treeNode);

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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo"),
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
      const zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
      if (nodes.length == 0 || !nodes[0].isParent) {
        alert("请先选择一个父节点");
        return;
      }
      zTree.removeChildNodes(treeNode);
    }
  },
  mounted() {
    this.$nextTick(function() {
      $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
      $("#edit").bind("click", this.edit);
      $("#remove").bind("click", this.removenode);
      $("#copy").bind("click", this.copy);
      $("#cut").bind("click", this.cut);
      $("#paste").bind("click", this.paste);
      $("#addParent").bind("click", { isParent: true }, this.add);
      $("#addLeaf").bind("click", { isParent: false }, this.add);
      $("#clearChildren").bind("click", this.clearChildren);
    });
  }
};
</script>

<style>
@import "./assets/css/zTreeStyle/zTreeStyle.css";
#treeDemo {
  position: fixed;
  left: 10px;
  top: 100px;
}
.ztree li a {
  /* 节点文字 */
  color: white;
}
.ztree li a:hover {
  text-decoration: none;
}

.ztree li a.curSelectedNode {
  background-color: rgb(21, 157, 248);
  color: black;
  border: none;
  opacity: 1;
}

/* .ztree li a.curSelectedNode_Edit{
     color:khaki;
   }  */
/* .ztree li span.button.switch.level0 {display:none;} */
.ztree li a.curSelectedNode_Edit span.node_name input {
  outline: none;
}
.small-menu {
  position: absolute;
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

#edit {
  background-image: url(./assets/images/componet/edit.svg);
}
#remove {
  background-image: url(./assets/images/componet/remove.svg);
}
#cut {
  background-image: url(./assets/images/componet/cut.svg);
}
#copy {
  background-image: url(./assets/images/componet/copy.svg);
}
#paste {
  background-image: url(./assets/images/componet/paste.svg);
}
#addLeaf {
  background-image: url(./assets/images/componet/add.svg);
}
#addParent {
  background-image: url(./assets/images/componet/add.svg);
}
#clearChildren {
  background-image: url(./assets/images/componet/add.svg);
}

/* 样式修改 */
.roots_close {
}
.center_open {
}
.bottom_close {
}
.switch {
}
.ztree {
  background-color: rgb(39, 38, 38);
}
.ztree li span.button.chk {
  width: 13px;
  height: 13px;
}
/* .ztree li span.button.chk.checkbox_false_full{background-image:'../assets/images/checkbox/checkbox.png'!important}
.ztree li span.button.chk.checkbox_false_full_focus{background-image:'../assets/images/checkbox/checkbox.png'!important }
.ztree li span.button.chk.checkbox_true_full{background-image:'../assets/images/checkbox/checkboxactive.png'!important}
.ztree li span.button.chk.checkbox_true_full_focus{background-image:'../assets/images/checkbox/checkboxactive.png'!important} */
</style>
