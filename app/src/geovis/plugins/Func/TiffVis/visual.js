export const files = [
  {
    file: "Temperature_20201208-T--depth_-5",
    name: "西北太平洋深度级别5下表面温度",
    describe: "西北太平洋实况分析产品的海区范围为99°E～150°E，10°S～52°N，垂向为标准层，产品要素包括：三维温度、盐度、密度、声速和地转流",
    space: "水平分辨率为0.125°",
    time: "2000年 07.01"
  },
  {
    file: "ncep_global_353d_67d4_f1bf-tmpsfc--time_1609113600",
    name: "GFS大气模型地面空气温度",
    describe: "全球预报系统 (GFS) 是由美国国家环境预报中心 (NCEP) 生成的一种天气预报模型。 此数据集可提供几十种大气和土壤变量，从温度、风力和降水到土壤湿度和大气臭氧浓度.",
    space: "GFS 以格点间 18 英里（28 公里）的基本水平分辨率覆盖全球",
    time: "2020年 04.11"
  },
  {
    file: "ncep_global_353d_67d4_f1bf-rh2m--time_1609113600",
    name: "GFS大气模型2m处相对湿度",
    describe: "全球预报系统 (GFS) 是由美国国家环境预报中心 (NCEP) 生成的一种天气预报模型。 此数据集可提供几十种大气和土壤变量，从温度、风力和降水到土壤湿度和大气臭氧浓度.",
    space: "GFS 以格点间 18 英里（28 公里）的基本水平分辨率覆盖全球",
    time: "2020年 04.11"
  },
  {
    file: "ncep_global_353d_67d4_f1bf-prmslmsl--time_1609113600",
    name: "GFS大气模型降雨率",
    describe: "全球预报系统 (GFS) 是由美国国家环境预报中心 (NCEP) 生成的一种天气预报模型。 此数据集可提供几十种大气和土壤变量，从温度、风力和降水到土壤湿度和大气臭氧浓度.",
    space: "GFS 以格点间 18 英里（28 公里）的基本水平分辨率覆盖全球",
    time: "2020年 04.11"
  },
  // {
  //   file: "ncep_global_353d_67d4_f1bf-pratesfc--time_1609113600",
  //   name: "GFS大气模型平均海平面压力",
  //   describe: "全球预报系统 (GFS) 是由美国国家环境预报中心 (NCEP) 生成的一种天气预报模型。 此数据集可提供几十种大气和土壤变量，从温度、风力和降水到土壤湿度和大气臭氧浓度.",
  //   space: "GFS 以格点间 18 英里（28 公里）的基本水平分辨率覆盖全球"
  // },
  { file: "olr.daily.ltm.1979-1995-olr--time_-656824", name: "NOAA每日（非内插）外向长波辐射（OLR）", describe: "来自NCEP的栅格化OLR数据", space: "2.5度纬度x 2.5度经度全局网格（144x73）", time: "1970年-1995年平均" },
  //{ file: "全球月干旱严重度指数-pdsi--time_1779456", name: "全球每月Palmer干旱严重度指数", describe: "NCAR在1850-2010年间每月汇总的全球PDSI（帕尔默干旱严重指数）值", space: "空间覆盖率：2.5度经度2.5度经度全局网格（144x55）" },
  // {
  //   file: "世界海洋季节性多深度盐度-salt--time_273-level_1200",
  //   name: "世界海洋季节性盐度",
  //   describe: "NODC（Levitus）世界海洋地图集数据1998,该地图集包含多个深度处的温度和盐度的年度，季节性和每月长期平均值",
  //   space: "纬度1.0度x经度1.0度的全局网格(180x360)"
  // },
  {
    file: "precip.mon.ltm.v2018-precip--time_-656739",
    name: "全球降水（1891-2016）每个月平均值",
    describe: "GPCC全球降水气候中心从1901年至今的每月降水数据集是根据全球站数据计算得出的，基于来自全球67,200个站点的质量控制数据，其记录持续时间为10年或更长时间。此产品包含按月度总计的规则网格",
    space: "0.5度纬度x 0.5度经度全局网格（720x180）90.0N-90.0S，0.0E-360.0E",
    time: "1891年到2016年每月平均"
  },
  { file: "tos_O1_2001-2002-tos--time_15", name: "全球海洋表面温度时刻1", describe: "PCMDI收集的供IPCC使用的海面温度。", time: "2002年12月" },
  // { file: "sresa1b_ncar_ccsm3-example_area", name: "CCSM模型全球表面面积", describe: "根据社区气候系统模型（CCSM），降水通量，气温和东风的一个时间步长" },
  { file: "sresa1b_ncar_ccsm3-example-pr--time_730135.5", name: "CCSM模型全球降水量", describe: "根据社区气候系统模型（CCSM），降水通量，气温和东风的一个时间步长", time: "2005年 09.03" },
  { file: "sresa1b_ncar_ccsm3-example-tas--time_730135.5", name: "CCSM模型全球空气温度", describe: "根据社区气候系统模型（CCSM），降水通量，气温和东风的一个时间步长", time: "2005年 09.03" },
  { file: "sresa1b_ncar_ccsm3-example-ua--time_730135.5-plev_1000", name: "CCSM模型全球1000压强下东风", describe: "根据社区气候系统模型（CCSM），降水通量，气温和东风的一个时间步长", time: "2005年 09.03" },
  {
    file: "otemp.hr.annltm-otemp--time_0-level_0",
    name: "世界海洋温度点",
    describe: "NODC（Levitus）世界海洋地图集数据1994,十年所有年的每月平均值",
    space: "0.25度纬度x 0.25度经度全局网格（720x1440)89.875N-89.875S，0.125E-359.875E",
    time: "1994年到2004年每月平均"
  },
  {
    file: "salt.hr.annltm-salt--time_0-level_0",
    name: "世界海洋0深度盐度",
    describe: "NODC（Levitus）世界海洋地图集数据1994,十年所有年的每月平均值",
    space: "0.25度纬度x 0.25度经度全局网格（720x1440)89.875N-89.875S，0.125E-359.875E",
    time: "1994年到2004年每月平均"
  }
];
export const vectorFiles = [
  {
    file: "ncep_global_e8c2_d882_c623",
    name: "NOAA/NCEP全球预报系统大气模型东风可视化",
    describe: "全球预报系统 (GFS) 是由美国国家环境预报中心 (NCEP) 生成的一种天气预报模型。 此数据集可提供几十种大气和土壤变量，从温度、风力和降水到土壤湿度和大气臭氧浓度.",
    space: "GFS 以格点间 18 英里（28 公里）的基本水平分辨率覆盖全球",
    time: "2020年 04.11"
  },
  {
    file: "world_oscar_vel_5d1993",
    name: "OSCAR 1度海面洋流",
    describe: "OSCAR（实时海面洋流分析）包含近海洋流估计值，这些估计值是使用准线性和稳定流动量方程式得出的。水平速度直接从海面高度，海面矢量风和海面温度数据估算得出。",
    space: "数据在1度网格上，分辨率为5天",
    time: "1997年 10.21"
  }
];
export const colorTables = [
  { name: "NEO_modis_lst", type: "顺序色表", examples: "用例:地表温度" },
  { name: "GISS_isccp_rainbow", type: "彩虹色表", examples: "用例:彩虹" },
  { name: "NEO_modis_chlor", type: "顺序色表", examples: " 用例:海水中叶绿素浓度" },
  { name: "EO_aura_omi_formal", type: "顺序色表", examples: "用例:甲醛." },
  { name: "NEO_snow_water", type: "顺序色表", examples: "用例:雪水量" },
  { name: "NEO_soil_moisture", type: "顺序色表", examples: "用例:土壤湿度" },
  { name: "NEO_aquarius_sss", type: "顺序色表", examples: "用例:海面盐度" },
  { name: "NEO_pollution_conc_9", type: "顺序色表", examples: "用例:污染浓度" },
  { name: "NCDC_precip20in", type: "顺序色表", examples: "用例:总降水量" },
  { name: "NEO_wind_spd_anom", type: "发色表", examples: "用例:风速" },
  { name: "NEO_seasurf_hgt_anom", type: "发色表", examples: "用例:海面高度" },
  { name: "NCDC_pres_anom", type: "发色表", examples: "用例:压力高度" },
  { name: "NYT_drought", type: "发色表", examples: "用例:干旱指数" },
  { name: "GIST_earth", type: "地形颜色表", examples: "用例:海洋和陆地地" },
  { name: "NEO_gebco_bathymetry", type: "地形颜色表", examples: "用例: 海洋深度" },
  { name: "GMT_cyclic", type: "彩虹色表", examples: "彩虹周期性" },
  { name: "NEO_ceres_lw", type: "顺序色表", examples: "用例：长波辐射" }
];
export function getMaxMin(array, missingValue) {
  let sortArry = Array.from(array);
  //从小到大
  sortArry = sortArry.sort(function(x, y) {
    return x - y;
  });
  function getMin(array) {
    let min = 0;
    for (let i = 0; i < array.length; i++) {
      if (!isNaN(array[i]) && array[i] !== missingValue) {
        min = array[i];
        break;
      } else {
        continue;
      }
    }
    return min;
  }
  function getMax(array) {
    let max = 0;
    for (let i = array.length - 1; i > 0; i--) {
      if (!isNaN(array[i]) && array[i] !== missingValue) {
        max = array[i];
        break;
      } else {
        continue;
      }
    }
    return max;
  }
  const min = getMin(sortArry);
  const max = getMax(sortArry);
  return [min, max];
}
export const levelMapDepth = [0, 10, 20, 30, 50, 75, 100, 125, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500];
