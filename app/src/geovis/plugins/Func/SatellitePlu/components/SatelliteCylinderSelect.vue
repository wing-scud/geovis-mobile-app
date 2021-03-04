<template>
<div class="wrapper">
    <el-input class="filter-input" placeholder="输入关键字进行过滤" v-model="filterTexts">
    </el-input>
    
    <el-tree class="filter-tree"
     @check-change="handleNodeClicks"
     :data="data3"
      show-checkbox 
      :props="defaultProps"
      node-key="id" 
      :filter-node-method="filterNodes" 
      ref="tree3">
    </el-tree>
 
</div>
</template>

<script>
import store from '../store';
 
/* eslint-disable */
export default {
    methods: {
      handleNodeClicks(obj,arr,a){ 
         const arrs=[];
         this.$refs.tree3.getCheckedNodes().map(nodes=>{
          if(nodes.label&&!nodes.children){ 
          arrs.push(nodes.label);
          }
        });  
        window.cc.sats.enabledSatellitesCylinder = arrs; //arr表示选中的卫星名称
          this.store.state.selectedSate = arrs;
      },
        filterNodes(value, datas) {
            if (!value) return true;
            return datas.label.indexOf(value) !== -1;
        },
        setTree(tleName){
            const tree={};
                return fetch(`static/data/SatelliteVis/tle/getSatellite.json`).then(response => response.json())
               .then(getSateliteJson => {
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
        getTree(dataArr) {
        
        return this.setTree(dataArr).then(data=>{
                const satliteData = [];
            const country = Object.keys(data); //['中国'，'美国']
            let id=0;
            for (let i = 0; i < country.length; i++) {
                const children = [];
                var country_data = data[country[i]]; // { '民用':{},}
                var purpose = Object.keys(country_data) //['民用']
                purpose.map(use => {
                    var son = [];
                  var type_obj = country_data[use];//{'侦查':[]}
                  var type = Object.keys(type_obj); //['侦查']
                  type.map(todo=>{
                      var gradSon = [];
                      type_obj[todo].map(name=>{
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
            return satliteData;
          })
            
        }  
    },
    data() {
        return {
            filterTexts: '',
            data3: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            store:store
            
        };
    },
    computed:{
    getCount(){
        return this.store.state.count;
    }
    },
  watch: {
        filterTexts(val) {
            this.$refs.tree3.filter(val);
        },
        getCount(newCount, oldCount) {
            //如果主树数据减少空，辅树显示的cylinder全部移除
            // oldCount.map(sate=>{
            //     var bool = newCount.find(function(value){
            //         if(value==sate){
            //             return true;
            //         }
            //     })
            //     if(!bool){
            //       window.cc.sats.disableCylinder = sate;
            //     }
            // })
            
          var  oldSelectedSate = this.store.state.selectedSate ;
         
                  //更新辅树列表
         this.getTree(newCount).then(data=>{
             this.data3 =data;
         });
        //  var newSelectedSate=[];
        //  oldSelectedSate.map(sate=>{
        //      var bool = false;
        //     bool = newCount.find(function(value){
        //             if(value==sate){
        //                 return true;
        //             }
        //     });
        //     if(bool){
        //         newSelectedSate.push(sate);
        //     }
        //  });
        // console.log(this.$refs.tree3.getNode());
        //  newSelectedSate.map(label=>{
             
        //  })
          //如果主树数据减少，辅树保存曾经选中的数据，渲染新的数据，判断新数据中是否包含曾经选中的，若包含则设置为选中
          
        }
      
    },

};
</script>

<style lang="css" scoped>
.el-tree  { 
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #303336!important;
    opacity:0.5
}
 .el-tree-node__content:hover{
     background-color: black!important;
     opacity:0.5
}
  
.el-tree-node__label{
  color:white;
  opacity:1.0;
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
</style>
  