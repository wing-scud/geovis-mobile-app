

declare namespace GVAPP {
  /// <reference types="node" />

  // 以度为单位的视角参数
  interface Viewport {
    
    lonlat: [Number,Number,Number],
    rotation: {
      // 单位：degree度
      heading: Number,
      // 单位：degree度
      pitch:Number,
      // 单位：degree度
      roll: Number
    }
  }

  interface PluginInfo {
    id: string,
    index: number,
    type: string,
    icon: string,
    name: string,
    enabled: boolean,
    active: boolean,
    mutex: boolean,
    data?:any
  }
  
  interface TreeNode{
    id: string,
    parentId: string,
    name: string,
    checked ?: boolean
    viewport?: Viewport,
    data: any,
    children?:TreeNode[]
  }

  type Bounding = GeoVis.BoundingRectangle | GeoVis.BoundingSphere | GeoVis.OrientedBoundingBox

  interface RasterLayerNode extends TreeNode{
      data: {
        type: string,
        projection: string,
        imgURL: string,
        layerURL: string,
        content: GeoVis.TileLayerOptions,
        offsetZ?: number,
        viewport?:any,
        layerType?:string,
        bounding?:any
        // 可选参数， bounding
      }
  }

}
