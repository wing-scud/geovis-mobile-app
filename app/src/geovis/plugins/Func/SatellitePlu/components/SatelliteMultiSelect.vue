<template>
 <!-- eslint-disable -->
<div class="wrapper">
    <el-input class="filter-input" placeholder="输入关键字进行过滤" v-model="filterText">
    </el-input>
    
    <el-tree class="filter-tree"
     @check-change="handleNodeClick"
     :data="data2"
      show-checkbox 
      :props="defaultProps"
      node-key="id" 
      :filter-node-method="filterNode" 
      ref="tree2">
       <span class="custom-tree-node" slot-scope="{node,data}">
         <span>{{node.label}}</span>
         <span>
           {{compute(node)}}项
         </span>
      </span>
    </el-tree>
 
</div>
</template>

<script>
import store from '../store';
/* eslint-disable */
//用于构造树形结构
export default {
    methods: {
      handleNodeClick(obj,arr,a){  //将选中的卫星，更新到window.cc.sats中
        var arr=[];
         this.$refs.tree2.getCheckedNodes().map(nodes=>{
          if(nodes.label&&!nodes.children){ 
          arr.push(nodes.label)
          }
        });  
        this.store.state.count = arr;
       window.cc.sats.enabledSatellitesByName = arr; //arr表示选中的卫星名称
      },
       compute(node){
          var len = 0;
       function  jisuan (node){
            if(node.childNodes.length>0){ 
             node.childNodes.map(everyNode=>{
                jisuan(everyNode); 
            })
          
            }else{
                if(node.checked){
                   ++len;  
                } 
            }
        }; 
        jisuan(node);
      return len;
      },
    
      // :expand-on-click-node='false'
     // :render-content="renderContent"
    //   renderContent(h,{node,data,store}){
    //        console.log(node.label);
    //       if(data.children){
    //           return(
    //               <span class="custom-tree-node">
    //                 <span>{node.label}</span>
    //                  <span>
    //                 {this.compute(data)}项
    //                  </span>
    //              </span>
    //           );
    //       }else{
    //           return(
    //               <span class="custom-tree-node">
    //                 <span>{node.label}</span>
    //                 </span>
    //           );
    //       }
    //   },
  
     
        filterNode(value, datas) {
            if (!value) return true;
            return datas.label.indexOf(value) !== -1;
        },
        getTree() {
            var a = this;
            var trees = {};

            //直接获取getSatellite。json文件的数据，不处理
            // return fetch(`http://192.168.50.90:9000/data/tle/getSatellite.json`).then(response => response.json())
             return fetch(`static/data/SatelliteVis/tle/getSatellite.json`).then(response => response.json())
               .then(getSateliteJson => {
                    //注释部分计算getSatellite.json中剩余未找到的行星名称
                    // getSateliteJson.map(obj=>{
                    //     var arr = obj.name.split(' ');
                    //     var name = arr[0];
                    //     this.allsat[name]=this.allsat[name]||[];
                    //     this.allsat[name].push(Math.random());
                    // })
                    return a.recursion(getSateliteJson, a, trees)
                })
        },
        //递归函数，用于累加所有存在的卫星数据：
        solve(data, json, i, pointer, names) {
            var name = names[i]; 
            if (i === 15) {
                return pointer.setTree(data)
            }
            var trees = pointer.getSateName(json, name, data);
            return trees.then(data => {
                i++;
                return pointer.solve(data, json, i, pointer, names)
            })

        },
        recursion(getSateliteJson, a, data) {
            var json = getSateliteJson;
            var names = ['planet.txt', 'starlink.txt', 'globalstar.txt', 'resource.txt', 'science.txt', 'stations.txt', 'weather.txt', 
            'tle.txt', 'beidou.txt','iridium.txt','gorizont.txt','intelsat.txt','molniya.txt','orbcomm.txt','raduga.txt'];
            var pointer = a;
            return a.solve(data, json, 0, pointer, names)
        },
        setTree(data) {
            var  ceshizwj=[];
            //data:{'中国':{'民用':{'侦查':['GAOFEN 1']}}
            var satliteData = [];
            //  var satlite=window.cc.sats.satlist;
            var country = Object.keys(data); //['中国'，'美国']
            var id=0;
            for (var i = 0; i < country.length; i++) {
                var children = [];
                var country_data = data[country[i]]; // { '民用':{},}
                var purpose = Object.keys(country_data) //['民用']
                purpose.map(use => {
                    var son = [];
                  var type_obj = country_data[use];//{'侦查':[]}
                  var type = Object.keys(type_obj); //['侦查']
                  type.map(todo=>{
                      var gradSon = [];
                      type_obj[todo].map(name=>{
                          ceshizwj.push(name);
                           gradSon.push({
                              id:id++,
                              label: name,  //'GAOFEN 1'
                          })

                      })
                    son.push({
                        id:id++,
                        label: todo,  //'侦查'
                        children: gradSon
                    })

                  })
                    children.push({
                        id:id++,
                        label: use,  //民用
                        children: son
                    })
                })
                
                satliteData.push({
                    id:id++,
                    label: country[i],  //中国
                    children: children   
                })
            }
            // 注释部分计算getSatellite.json中剩余未找到的行星名称
            // console.log('目前包含的卫星数量',ceshizwj);
            // var keyname = Object.keys(this.allsat);
            // keyname.map(all=>{

            // ceshizwj.map(sat=>{
            //     var arr = sat.split(' ');
            //     var name = arr[0];
            //     if(all==name)
            //         delete this.allsat[all];
            //     })
            // })
            // console.log('我是没有的卫星',this.allsat);

            return satliteData;
        },
        getSateName(getSateliteJson, name, tree) {

            // var tree={};
            return fetch(`static/data/SatelliteVis/tle/norad/` + name).then(response => response.text())
                .then(data => {
                    const lines = data.split(/\r?\n/);
                    return lines;
                  
                }).then(lines => {
                    var tleName = [];
                    var len = lines.length;
                    for (let i = 0; i < len; i = i + 3) {
                        let tle = lines[i].replace(/(\s*$)/g, ""); //将txt文件中卫星字符串去除后面所有空格
                        tleName.push(tle); //得到现有所有卫星名称
                        
                    }
                    return tleName;
                }).then(tleName => {
                    getSateliteJson.map(obj => {
                        tleName.map(string => {
                            if (obj.name == string) {
                                tree[obj.country] = tree[obj.country] || {};  //{'中国':{}}
                                tree[obj.country][obj.purpose] = tree[obj.country][obj.purpose] || {};
                                tree[obj.country][obj.purpose][obj.type_string] = tree[obj.country][obj.purpose][obj.type_string]||[];
                                tree[obj.country][obj.purpose][obj.type_string].push(obj.name);
                            }
                        })
                    })
                    return tree;
                })
        },
          update(){

    },
    },
    data() {
        return {
            store:store,
            filterText: '',
            data2: [],
            allsat:{},
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            len:0,
        };
    },
  watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    mounted() {
        var a = this
        this.getTree().then((data) => {
            a.data2 = data
        });
    }
};
</script>

<style lang="css"  >
.el-tree  { 
    height: 800px;
             
    overflow-y: scroll;
    overflow-x: scroll;
    background-color: rgba(27, 26, 26, 0.2)!important;
     opacity:0.8;
}
.el-tree-node__label{
  color:white;
 
}
 .el-tree-node__content:hover{
     background-color: black!important;
     opacity:0.5
}
 .el-tree-node__content{
     background-color: rgba(27, 26, 26, 0.2)!important;
  
 }
 .el-tree::-webkit-scrollbar {
     width: 10px;
  }
  .el-tree::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 33px;
    -webkit-box-shadow: inset 0 0 6px #7cea65;
    background-color: #a4a4a4;
}

 .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color:  rgb(124, 234, 101)!important;
    border-color: rgb(124, 234, 101)!important;
}


.custom-tree-node{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:14px;
    padding-right:8px;
    color:white;
}
</style>
  