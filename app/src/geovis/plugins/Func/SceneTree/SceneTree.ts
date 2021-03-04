import Vue from "vue";
import { earthStore } from "@/geovis/store";
import ZTree from "./ZTree.vue";

const SceneManager = Vue.extend({
  name: "SceneManager",
  components: {
    ZTree
  },
  data() {
    return {
 msg: 'Hello Vue-Ztree-2.0!',
      ztreeDataSource:[],
      dataList:[],
      treeDeepCopy:[],
      parentNodeModel:[],//当前点击节点父亲对象
      nodeModel:null, // 当前点击节点对象
      ztreeDataSourceList:[{
          id:880,
          name:"娱乐",
          iconClass:"iconClassRoot",
          open:true,
          parentId:0,
          children:[{
            id:881,
            name:"游戏",
            parentId:880,
            iconClass:"iconClassNode",
          },{
            id:882,
            name:"电影",
            clickNode:true,
            parentId:880,
            iconClass:"iconClassNode",
          },{
            id:883,
            name:"新闻",
            parentId:880,
            iconClass:"iconClassNode",
          }]
      },{
          id:990,
          name:"BAT",
          iconClass:"iconClassRoot",
          open:false,
          parentId:0,
          children:[{
              id:991,
              name:"马化腾",
              parentId:990,
              iconClass:"iconClassNode",
          },{
              id:992,
              name:"李彦宏",
              parentId:990,
              iconClass:"iconClassNode",
          },{
              id:993,
              name:"马云",
              parentId:990,
              iconClass:"iconClassNode",
          }]
      }],
      ztreeDataSourceSync:[{
          id:220,
          name:"娱乐",
          children:[{
            id:881,
            name:"游戏"
          }]
      }]
    }


  },
  computed: {},
  methods: {
    navigateClick:function(index,item){
        // 递归
        var recurFunc = (data,list) => {
            data.forEach((i)=>{
                if(i.id==item.id){
                  i.clickNode = true;
                  this.nodeModel = i;
                  this.parentNodeModel = data;
                }else {
                  i.clickNode = false;
                }
                if(i.children){
                   recurFunc(i.children,i);
                }
            });
        }
        recurFunc(this.treeDeepCopy, this.treeDeepCopy);
        
        
        // 导航
        var self = this;
        for(var i=0;i<self.dataList.length;i++){
            if(index == i){
                self.dataList[i].clickNode = true
            }else{
                self.dataList[i].clickNode = false
            }
        }
        self.dataList.splice(index+1,self.dataList.length - (index+1))
       this.ztreeDataSource = this.treeDeepCopy
    },
    findById:function(data,parentId) {
        var vm =this;
        for(var i = 0;i<data.length;i++){
            if (parentId == data[i].id){
                vm.dataList.push(data[i]);
                vm.findById(vm.ztreeDataSource, data[i].parentId)
                return data[i]
            }
            if (data[i].hasOwnProperty('children')){
                vm.findById(data[i].children,parentId)
            }
        }
    },
    // 点击节点
    nodeClick:function(m, parent, trees){
       this.treeDeepCopy = trees;
       this.nodeModel = m;  // 当前点击节点对象
       this.parentNodeModel = parent; //当前点击节点父亲对象
       console.log(m);
       console.log(parent);
       
       // 导航菜单
       this.dataList=[]
       this.findById(this.ztreeDataSource,m.parentId)
       this.dataList= this.dataList.reverse();
       this.dataList.push(m);
    },
    // 右击事件
    contextmenuClick:function(m){
       console.log(m);
       console.log(event.target);
       console.log("触发了自定义的contextmenuClick事件");
       alert("触发了自定义");
    },
    // 点击展开收起
    expandClick:function(m){
       console.log(JSON.parse(JSON.stringify(m)));
       // 点击异步加载
       if(m.isExpand) {
          // 动态加载子节点, 模拟ajax请求数据
         // 请注意 id 不能重复哦。
         if(m.hasOwnProperty("children")){
            
            m.loadNode = 1; // 正在加载节点
            setTimeout(()=>{
              m.loadNode = 2; // 节点加载完毕
              m.isFolder = !m.isFolder; 
              m.children.push({
                  id:+new Date(),
                  parentId:m.id,
                  name:"动态加载节点1",
                  path:"",
                  clickNode:false,
                  isFolder:false,
                  isExpand:false,
                  hover:false,
                  loadNode:0,
                  children:[{
                        id:+new Date()+1,
                        parentId:m.id,
                        name:"动态加载末节点",
                        path:"",
                        clickNode:false,
                        isExpand:false,
                        isFolder:false,
                        hover:false,
                        loadNode:0
                  }]
              })
            },1000);
         }
       }
    }
  }
});

export default SceneManager;