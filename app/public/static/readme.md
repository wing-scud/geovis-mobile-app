# 插件管理
  管理app所有插件组成
  data/插件id 用于存放插件资源，方便打包
## 分类
    插件-function ----单独的模块功能，理解为独立复杂效果集合，插件内容会占用整个页面，映射为一级路由
    工具-tools    ----同插件，映射为二级路由
    控件--widget  ----页面上的视图组件，主要在地图上--没有实际的路由地址，通过开启，component :is显示在页面固定地方

## 组成
    "id": "Navigator",      ---- 唯一名称
    "parent"："widget"      ---父级类型 ，视图所属目录
    "type": "component",    ---- 类型 component/route
    "icon": "navigator",    ---- 图标    
    "name": "功能导航",      ---- 名称
    "enabled": true,        ---- 是否开启是否显示组件图标
    "active": true,         -----是否开启
    "mutex": false          -----是否与其余同类型互斥