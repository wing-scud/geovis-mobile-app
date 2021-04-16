# 插件管理
  管理app所有插件组成
  data/插件id 用于存放插件资源，方便打包
## 分类
    工具-tools    ---- 常用的工具
    控件--widget  ----地图有关的功能
    功能 --function  ----应用相关的功能
## 组成
    "id": "Navigator",      ---- 唯一名称
    "parent"："widget"      ---父级类型 ，视图所属目录
    "type": "component",    ---- 类型 component/route
    "icon": "navigator",    ---- 图标    
    "name": "功能导航",      ---- 名称
    "enabled": true,        ---- 是否开启是否显示组件图标
    "active": true,         -----是否开启
    "mutex": false          -----是否同类型互斥
    "componentIcon"： false ----是否含有图标