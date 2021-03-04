<template>
	<div class="nothing" :style="{pointerEvents: headerLock ? 'none' : 'auto'}">
		<div class="searchContainer black-box">
			<div class="tabs">
				<div :class="{tab: true, currentTab: !plusMode}" @click="togglePlus(0)">目标检索</div>
				<div :class="{tab: true, currentTab: plusMode == 1}" @click="togglePlus(1)">目标添加</div>
				<div :class="{tab: true, currentTab: plusMode == 2}" @click="togglePlus(2)">路径规划</div>
				<div :class="{tab: true, currentTab: plusMode == 3}" @click="togglePlus(3)">地名编辑</div>
			</div>
			<div class="search" v-if="!plusMode">
				<div class="pre" @click="search">
					<i class="el-icon-search"/>
				</div>
				<input class="cz-input" placeholder="输入关键词" v-model="keyword" @keydown.enter="search">
				<div class="suf" v-show="keyword" @click="clear">
					<i class="el-icon-close"/>
				</div>

				<!-- <div class="add" v-show="!showLonlatContainer" @click="expand">
					<i class="el-icon-plus"/>
				</div> -->
				<!-- <div class="loc" v-show="showLonlatContainer" @click="location">
					<i class="el-icon-location-outline" v-show="!inLocation"/>
					<i class="el-icon-location" v-show="inLocation"/>
				</div> -->
			</div>
			<div class="advanced" v-if="!plusMode">
				<span>目标类别：</span>
				<el-cascader
					expand-trigger="hover"
					:options="targetsTypesAddAll"
					change-on-select
					filterable
					separator="-"
					popper-class="jc_popper"
					placeholder="试试搜索：大桥"
					:props="{
						'value': 'category',
						'label': 'name',
						'children': 'childrenlist'
					}"
					v-model="MainType_array"
					@change="ChangeMainType">
				</el-cascader>
				<br />
				<br />

				<span>空间检索：</span>

				<el-popover
					placement="bottom-start"
					title="说明"
					width="200"
					trigger="hover"
					content="依次点击地球标绘多边形顶点，双击结束。"
				>
					<span
						slot="reference"
						:class="{advButton: true, checked: advMode == 0}"
						@click="checkAdv(0)"
					>多边形</span>
				</el-popover>

				<el-popover
					placement="bottom-start"
					title="说明"
					width="200"
					trigger="hover"
					content="先点击地球标绘圈选圆心，拖动鼠标标绘半径，单击结束。"
				>
					<div slot="reference" :class="{advButton: true, checked: advMode == 1}" @click="checkAdv(1)">圈选</div>
				</el-popover>

				<el-popover
					placement="bottom-start"
					title="说明"
					width="200"
					trigger="hover"
					content="依次点击地球标绘线段每段节点，双击结束。"
				>
					<!-- <span -->
					<div slot="reference" :class="{advButton: true, checked: advMode == 2}" @click="checkAdv(2)">线段</div>
				</el-popover>
			</div>
			<div class="search short" v-if="plusMode == 2">
				<div class="pre">
					起
				</div>
				<input class="cz-input" v-model="startPointStr" @keydown.enter="searchLujing(true)" @keydown.up="prevDmResult" @keydown.down="nextDmResult" @input="getDM(1)" @blur="setDefaultStartPoint" >
					<div class="searchDropdown" tabindex="1" :style="{top: '184px'}" v-show="dropdownType == 1" v-if="dmResults && dmResults.length">
						<div class="list">
							<div :class="{item: true, checked: ind == currentDmIndex}" v-for="(rs, ind) in dmResults" :key='ind' @mouseenter="setPoint(ind)" @mouseleave="setPoint(-1)">{{rs.name}}</div>
						</div>
					</div>
				</input>
				<div class="suf" @click="pickPoint(0)">
					<i class="el-icon-location-outline" v-show="lujingLocation != 0"/>
					<i class="el-icon-location" v-show="lujingLocation == 0"/>
				</div>
			</div>
			<div class="search short" v-if="plusMode == 2">
				<div class="pre">
					终
				</div>
				<input class="cz-input" v-model="endPointStr" @keydown.enter="searchLujing(true)" @keydown.up="prevDmResult" @keydown.down="nextDmResult" @input="getDM(2)" @blur="setDefaultEndPoint" >
					<div class="searchDropdown" tabindex="2" :style="{top: '239px'}" v-show="dropdownType == 2" v-if="dmResults && dmResults.length">
						<div class="list">
							<div :class="{item: true, checked: ind == currentDmIndex}" v-for="(rs, ind) in dmResults" @mouseenter="setPoint(ind)" @mouseleave="setPoint(-1)">{{rs.name}}</div>
						</div>
					</div>
				</input>
				<div class="suf" @click="pickPoint(1)">
					<i class="el-icon-location-outline" v-show="lujingLocation != 1"/>
					<i class="el-icon-location" v-show="lujingLocation == 1"/>
				</div>
			</div>
			<div class="navBtn" v-if="plusMode == 2">
				<img title="点击检索" src="/static/images/gf/daohang.png" alt="" @click="searchLujing(true)">
				<span class="el-icon-download ljDc" @click="JsonOutLj" title="点击导出"/>
			</div>
			<v-target-editor leftVer v-if="addTarget && (plusMode == 1)" @finish="finish"/>
			<!-- <div class="advanced" v-if="plusMode == 2">
				<span>标绘工具：</span>
				<span :class="{advButton: true, checked: drawingMode == 0}" @click="draw(0)">路线</span>
				<span :class="{advButton: true, checked: drawingMode == 1}" @click="draw(1)">标记</span>
				<span class="advRightButton">导入</span>
				<span class="advRightButton">导出</span>
			</div>
			<div class="advanced" v-if="plusMode == 2">
				<span>选择颜色：</span>
				<button :class="['mark', 'red', checkedColor === 'red' ? 'checked' : '']" @click="checkColor($event, 'red')"></button>
				<button :class="['mark', 'orange', checkedColor === 'orange' ? 'checked' : '']" @click="checkColor($event, 'orange')"></button>
				<button :class="['mark', 'green', checkedColor === 'green' ? 'checked' : '']" @click="checkColor($event, 'green')"></button>
				<button :class="['mark', 'yellow', checkedColor === 'yellow' ? 'checked' : '']" @click="checkColor($event, 'yellow')"></button>
				<button :class="['mark', 'grey', checkedColor === 'grey' ? 'checked' : '']" @click="checkColor($event, 'grey')"></button>
				<button :class="['mark', 'blue', checkedColor === 'blue' ? 'checked' : '']" @click="checkColor($event, 'blue')"></button>
				<button :class="['mark', 'purple', checkedColor === 'purple' ? 'checked' : '']" @click="checkColor($event, 'purple')"></button>
			</div> -->
		</div>

		<div class="results" v-show="!plusMode">
			<div class="tabs">
				<div :class="{tab: true, currentTab: tab == 0}" @click="selectTab(0)">目标</div>
				<div :class="{tab: true, currentTab: tab  == 1}" @click="selectTab(1)">地点</div>
			</div>
			<div class="contents">
				<div class="list" v-show="tab == 0">
					<div :class="{item: true, checked: checkedTarget && (rs.id == checkedTarget.id)}" v-for="rs in targets" @click="checkTarget(rs)">{{rs.name.currentName}}</div>
					<div v-if="targets.length < 1" style="color: #c7c7c7">暂无结果</div>
				</div>
				<div class="list" v-show="tab == 1">
					<div class="item" v-for="rs in geoSearchResult" @click="checkResult(rs)">{{rs.name}}</div>
					<div v-if="geoSearchResult.length < 1" style="color: #c7c7c7">暂无结果</div>
				</div>
			</div>
			<el-pagination
				v-if="total && tab == 0 && targets.length"
				layout="prev, pager, next"
				:total="total"
				:page-size="pageSize"
				:current-page="currentPage"
				@current-change="research"
				style="color:#fff"
			/>
			<el-pagination
				v-if="totalPoi && tab == 1 && geoSearchResult.length"
				layout="prev, pager, next"
				:total="totalPoi"
				:page-size="pagesizePoi"
				:current-page="currentPagePoi"
				@current-change="researchPoi"
				style="clolr: #ffffff">
			</el-pagination>
		</div>

		<div class="results" v-if="plans.length" v-show="plusMode == 2" :style="{top: '256px'}">
			<div class="contents">
				<div class="list">
					<div :class="{item: true, checked: plan.name == item.name}" v-for="(item, index) in plans" @click="choosePlan(index)">{{item.name}}</div>
				</div>
			</div>
		</div>
		<v-target-editor v-if="tempTarget"/>
		<v-target-viewer v-if="checkedTarget"/>
		<v-poi-mark v-show="plusMode == 3" />


		<div :class="{drawer: true, open: resultPlan}" >
			<div class="title">{{plan.name}}</div>
			<div id="plugin_result">
				<div class="path" v-for="(item,index) of texts" :key="index">
					<span :class="item.icon" class="leaflet-routing-icon"> </span>
					<div class="text">  {{item.text}}</div>
					<div class="distance">{{formatDistance(plan.instructions[index].distance)}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PropItem from "./propItem";
	import { mapGetters } from "vuex";
	import Earth from "../../viewmodel/cn.iecas.earth/Earth.js";
	import VTargetEditor from "./targetEditor";
	import VTargetViewer from "./targetViewer";
	import VPoiMark from "../../PlaceMarker";
	import Config from "../../../GeoVisConfig.js";
	import convertRoute from "./util";
	import { cloneObj, format } from "../../viewmodel/util.js";
	import {
		mode,
		textFormat
	} from "./util";
	export default {
		components: {
			PropItem,
			VTargetEditor,
			VTargetViewer,
			VPoiMark,
		},
		mounted() {
			console.log(this.targets)
			this.getCode()
		},

		data() {
			return {
				MainType_array: [], //主检索类别
				MainType: "", //主检索类别
				keyword: "",
				advMode: -1,
				drawingMode: -1,
				plusMode: 1,
				tab: 0,
				showLonlatContainer: false,
				lon: "",
				lat: "",
				inLocation: "",
				newTargetParts: [],
				targetsTypesAddAll: [],
				showResults: false,
				geoSearchResult: [],
				
				searchBody: {},
				
				checkedColor: 'red',
				
				lonlats: [], // 当前绘制路线的坐标数组
				points: [], // 绘制的点的数组
				polylines: [], // 绘制的线的数组

				startPointStr: '',
				startPoint: [],
				endPointStr: '',
				endPoint: [],
				lujingLocation: -1,
				dmResults: [],
				dropdownType: 0,
				currentDmIndex: -1,
				result: false,
				plans: [],
				plan: {},
				resultPlan: false,
				texts: [],
				codeList: [],

				currentPage: 0,
				total: 0,
				pageSize: 5, // TODO: 配置文件

				poiDataList: [],
				totalPoi: 0,
				pagesizePoi: 5,
				currentPagePoi: 1,

			};
		},
		computed: {
			height() {
				return 0;
			},
			...mapGetters({
				groupedProps: "groupedProps",
				targets: "targets",
				tempTarget: "tempTarget",
				checkedTarget: "checkedTarget",
				guide: "guide",
				guideStep: "guideStep",
				headerLock: "headerLock",
				addTarget: 'addTarget',
				username: 'username',
				targetsTypes: 'targetsTypes',
			})
		},
		watch: {
			advMode() {
				function resetValue(result) {
					if (!result) return;
					if (!result.entity) return;
					this.$store.commit("deleteCurrentTarget");
					this.$store.commit("setHeaderLock", false);
					if (this.advMode === 1) {
						const cartographic = Engine.Cartographic.fromCartesian(
							result.entity.center
						);
						const longitude = parseFloat(
							Engine.Math.toDegrees(cartographic.longitude)
						);
						const latitude = parseFloat(
							Engine.Math.toDegrees(cartographic.latitude)
						);
						this.searchBody = {
							geoSearchType: "geofilt",
							point: latitude + "," + longitude,
							radius: result.entity.radius + "m",
							from: 0,
							size: this.pageSize,
							keyword: this.keyword,
							category: this.MainType,
							callback: json => {
								Earth.DrawToolOld().removeAll();
								this.advMode = -1;
								this.total = json.total;
								this.currentPage = 1;
							}
						};
						this.$store.dispatch("getTargetsTest", this.searchBody);
					} else if (this.advMode === 0) {
						let positions = [];
						for (const key in result.entity.positions) {
							if (result.entity.positions[key] instanceof Engine.Cartesian3) {
								const cartographic = Engine.Cartographic.fromCartesian(
									result.entity.positions[key]
								);
								const longitude = parseFloat(
									Engine.Math.toDegrees(cartographic.longitude)
								);
								const latitude = parseFloat(
									Engine.Math.toDegrees(cartographic.latitude)
								);
								positions.push([longitude, latitude]);
							}
						}
						this.searchBody = {
							geoSearchType: "polygon",
							polygon: JSON.stringify(positions),
							from: 0,
							size: this.pageSize,
							keyword: this.keyword,
							category: this.MainType,
							callback: json => {
								Earth.DrawToolOld().removeAll();
								this.advMode = -1;
								this.total = json.hits.total;
								this.currentPage = 1;
							}
						};
						this.$store.dispatch("getTargetsTest", this.searchBody);
					} else if (this.advMode === 2) {
						const tempPos = [];
						for (const pos in result.entity.positions) {
							if (!isNaN(parseInt(pos))) {
								const cartographic = Engine.Cartographic.fromCartesian(
									result.entity.positions[pos]
								);
								const longitude = parseFloat(
									Engine.Math.toDegrees(cartographic.longitude)
								);
								const latitude = parseFloat(
									Engine.Math.toDegrees(cartographic.latitude)
								);
								tempPos.push([longitude, latitude]);
							}
						}
						this.searchBody = {
							geoSearchType: "linestring",
							lineString: JSON.stringify(tempPos),
							inflationRadius: 100,
							from: 0,
							size: this.pageSize,
							keyword: this.keyword,
							category: this.MainType,
							callback: json => {
								Earth.DrawToolOld().removeAll();
								this.advMode = -1;
								this.total = json.hits.total;
								this.currentPage = 1;
							}
						};
						this.$store.dispatch("getTargetsTest", this.searchBody);
					}
				}
				if (this.advMode === 1) {
					Earth.DrawToolOld()
						.setMode(true)
						.drawCircle({
							callback: resetValue.bind(this)
						});
				} else if (this.advMode === 0) {
					Earth.DrawToolOld()
						.setMode(true)
						.drawPolygon({
							callback: resetValue.bind(this)
						});
				} else if (this.advMode === 2) {
					Earth.DrawToolOld()
						.setMode(true)
						.drawRectline({
							callback: resetValue.bind(this)
						});
				} else if (this.advMode === -1) {
					Earth.DrawToolOld().setMode(false);
				}
				if (this.advMode != -1) {
					this.$store.commit("setHeaderLock", true);
				}
			},
			guideStep: function() {
				if (this.guide == true && this.guideStep == 9) {
					this.search();
				} else if (this.guide == true && this.guideStep == 11) {
					this.checkTarget(this.targets[0]);
				} else if (this.guide == true && this.guideStep == 13) {
					this.togglePlus(true);
				}
				//  else if (this.guide == true && this.guideStep == 14) {
				// 	this.lon = "104";
				// 	this.lat = "36";
				// } else if (this.guide == true && this.guideStep == 15) {
				// 	this.checkLonlat();
				// } else if (this.guide == true && this.guideStep == 17) {
				// 	document.querySelector(".gv-popup .name").value = "test";
				// 	this.continue();
				// }
			},
			plusMode() {
				if (this.polylines) {
					for (let polyline of this.polylines) {
						polyline.colors = [GeoVis.Color.fromCssString("#5298ff")];
					}
				}
				this.resultPlan = false;
			},
			// startPoint() {
			// 	if (this.startPoint.length && this.endPoint.length) {
			// 		this.searchLujing();
			// 	}
			// },
			// endPoint() {
			// 	if (this.startPoint.length && this.endPoint.length) {
			// 		this.searchLujing();
			// 	}
			// }
		},
		beforeMount() {
			window.mbhcContinue = this.continue;
			for (let i in this.groupedProps) {
				this.newTargetParts[i] = {};
			}
			this.targetsTypesAddAll = cloneObj(this.targetsTypes);
			this.targetsTypesAddAll.unshift({
					category: "",
					name: "全部",
					childrenlist: [],
				});
			this.markerProps = [
				{
					id: "name",
					nameEn: "name",
					nameCn: "名称",
					type: "string",
					required: true,
					des:
						"目标名称（如总统府、穆罕默德空军基地，包括英文名和驻在国语言名）",
					step: "0",
					propsList: [
						{
							id: "currentName",
							nameEn: "currentName",
							nameCn: "现用名",
							type: "string",
							required: true,
							des: "目标现在通用名称（如俄罗斯联邦安全局）",
							step: null,
							propsList: null
						},
						{
							id: "nickname",
							nameEn: "nickname",
							nameCn: "别称",
							type: "string",
							required: false,
							des:
								"曾用名/历史沿革名称/简称/音译（如原为苏联国家安全委员会，简称FSB，也称“克格勃”）",
							step: null,
							propsList: null
						},
						{
							id: "enname",
							nameEn: "enname",
							nameCn: "外文名称",
							type: "string",
							required: false,
							des:
								"驻在国语言名称/英文名称（如Naval Station Norfolk）",
							step: null,
							propsList: null
						}
					]
				},
				{
					id: "category",
					nameEn: "category",
					nameCn: "分类",
					type: "select",
					required: true,
					des: "根据《作战目标分类》（国军标GJB93687-2018）划分",
					step: "0",
					propsList: null
				},
				{
					id: "locationPoint",
					nameEn: "locationPoint",
					nameCn: "参考点地理坐标",
					type: "array-number-point",
					required: false,
					des:
						"目标或采集点坐标，需说明采集点明显参照物，以°′″为单位（位置信息使用高精度GNSS定位仪自动采集标注为准，可手工在目标区域卫星影像图上调节定位点）",
					step: "0",
					propsList: null
				}
			];
		},
		beforeDestroy() {
			this.clearAll();
			this.$store.commit("checkTarget", undefined);
			this.$store.commit("setTempTarget", undefined);
			setTimeout(() => {
				this.$store.commit("setTargets", []);
			}, 100);
		},
		methods: {
			getCode() {
				fetch(Config.ServerIP + 'capturetarget/mbCode', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(json => {
					if (json.status == 'succeed') {
						console.log(json)
						this.codeList = json.message;
						this.$store.commit("setCodeList", this.codeList)
					}
					
				})
			},
			researchPoi(page) {
				console.log(page)
				this.currentPagePoi = page
				this.searchPoi();

			},

			ChangeMainType(){
				var numindex = this.MainType_array.length;
				this.MainType = this.MainType_array[numindex - 1];
			},
			clear() {
				this.keyword = "";
			},
			checkAdv(index) {
				if (index == this.advMode) {
					this.advMode = -1;
				} else {
					this.advMode = index;
				}
			},
			finish () {
				this.$store.commit("setAddTarget", {});
				this.plusMode = 0;
			},
			togglePlus(bool) {
				if (this.plusMode == bool) return;
				if (this.plusMode != 1) {
					this.$store.commit("setAddTarget", {});
					this.plusMode = bool;
				} else {
					this.$confirm(
						"此次所做的所有改动都不会保存，是否确认关闭？",
						{
							customClass: 'xkh_el_messbox',
						}
					).then(() => {
						this.$store.commit("setAddTarget", {});
						this.plusMode = bool;
					});
				}
			},
			selectTab(index) {
				this.tab = index;
			},
			expand() {
				this.showLonlatContainer = true;
				this.lon = "";
				this.lat = "";
			},
			fold() {
				this.showLonlatContainer = false;
			},
			checkLonlat() {
				if (Math.abs(this.lon) > 180 || Math.abs(this.lat) > 90) {
					this.$message.error("请输入合法的经纬度数值！");
					return;
				}
				this.fold();
				if (!this.marker) this.drawMarker();
				this.marker.showPopup();
				earth.flyTo([Number(this.lon), Number(this.lat), 1e6]);
			},
			cancelLonlat() {
				this.fold();
				this.lon = "";
				this.lat = "";
			},
			pickLocation(e) {
				// console.log(e)
				[this.lon, this.lat] = e.lonlat;
				this.inLocation = false;
				this.drawMarker();
			},
			location() {
				if (this.inLocation) {
					this.inLocation = false;
					earth.off("click", this.pickLocation);
				} else {
					this.inLocation = true;
					earth.once("click", this.pickLocation);
				}
			},
			drawMarker() {
				if (this.marker) this.marker.removeFrom(earth.features);
				let dom = document.createElement("i");
				dom.className = "el-icon-location";
				dom.style.color = "#ee0000";
				dom.style.fontSize = "24px";
				dom.style.transform = "translate(-50%, -80%)";
				this.marker = new GeoVis.DomMarker(
					[Number(this.lon), Number(this.lat)],
					{
						dom
					}
				).addTo(earth.features);
				this.marker.bindPopup(this.$refs.popup.innerHTML, 250);
			},
			continue() {
				console.log('continue')
				let tmpTarget = {};
				tmpTarget.name = {};
				tmpTarget.name.currentName = document.querySelector(
					".gv-popup .name"
				).value;
				tmpTarget.category = document.querySelector(
					".gv-popup .category"
				).value;
				if (!tmpTarget.name.currentName) {
					this.$message.error("请输入目标的名称！");
					return;
				}
				// tmpTarget.accuracySpecification = document.querySelector('.gv-popup input.accuracySpecification').value;
				// console.log(tmpTarget);
				tmpTarget.locationPoint = [Number(this.lon), Number(this.lat)];
				this.$store.commit("setTempTarget", tmpTarget);
				if (this.marker) this.marker.showPopup(false);
				window.polygonMb = "";
				window.mbhcMarker = this.marker;
				this.marker.popup.element.remove();
			},
			// SearchPoi(){
			// 	console.log('fdffdsgfsd')
			// 	fetch(Config.PlaceMark + "/poi/searchPoi", {
			// 		method: "post",
			// 		headers: {
			// 			"content-type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 				'from': 0,
			// 				'size': 10,
			// 				'keywords': this.keyword,
			// 			})
			// 	}).then(res => res.json()).then(json => {
			// 		console.log(json)
			// 		// if (json.state === "success") {
			// 			for (let item of json.data) {
			// 				this.geoSearchResult.push({
			// 					name: item.name,
			// 					lonlat: [Number(item.lon), Number(item.lat)]
			// 				});
			// 			}
			// 		// }else{
						
			// 		// }
			// 	})
			// },

			searchTarget() {
				fetch(Config.ServerIP + 'capturetarget/searchcap', {
					method: "post",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({
						from: (this.currentPage - 1) * this.pagesize,
						size: this.pagesize,
						keywords: this.keyword
					})
				})
			},

			searchPoi() {
				if (this.geoSearchResult.length) {
					this.geoSearchResult = []
				}
				console.log(this.searchBody)
				fetch(Config.ServerIP + 'point/search', {
					method: "post",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({
						from: (this.currentPagePoi - 1) * this.pagesizePoi,
						size: this.pagesizePoi,
						keywords: this.keyword
					})
				})
				.then(res => res.json())
				.then(json => {
					console.log(json)
					if (json.status == 'succeed') {
						this.totalPoi = json.total
						for (let item in json.data) {
							this.geoSearchResult.push({
								name: json.data[item].name,
								lonlat: [Number(json.data[item].lon), Number(json.data[item].lat)],
								data: json.data[item]
							})
							// this.poiDataList.push(data.json)
						}
					}
					else {

					}
				})
			},

			geoSearch() {
				fetch(
					`${Config.DMIP}/search?q=${
						this.keyword
					}&format=json&polygon=1&addressdetails=1`
				)
					.then(res => res.json())
					.then(json => {
						console.log(json)
						for (let item of json) {
							this.geoSearchResult.push({
								name: item.display_name,
								boundingBox: item.boundingbox,
								lonlat: [Number(item.lon), Number(item.lat)]
							});
						}
					});
			},
			checkResult(rs) {
				console.log(rs)
				let pos = rs.lonlat.concat(5000);
				this.drawPolydd(rs.data);//绘制目标范围
				earth.flyTo(pos);
				// this.geoSearchResult = [];
			},
			drawPolydd(row){
				//绘制目标范围
				if(window.polygonMb){window.polygonMb.removeFrom(earth.features);window.polygonMb = ""}
				if (row.polygonpositions && row.polygonpositions.length > 1) {
					
					window.polygonMb = new GeoVis.Polygon(row.polygonpositions, {
						outline: true,
						outlineColor: GeoVis.Color.fromCssString("#00acc1").withAlpha(0.4), // 描边颜色
						fill: true,
						fillColor: GeoVis.Color.fromCssString("#2e7d32").withAlpha(0.35), // 填充颜色
						extrudedHeight: 2, //高度
						outlineWidth: 1 // 描边宽度
					}).addTo(earth.features);
				}
			},
			search() {
				this.searchBody = {
					//  getTargetsTest
					keyword: this.keyword,
					category: this.MainType,
					from: 0,
					size: this.pageSize,
					callback: json => {
						Earth.DrawToolOld().removeAll();
						this.advMode = -1;
						// this.total = json.hits.total;
						this.total = json.total
						this.currentPage = 1;
					}
				};
				if (this.geoSearchResult.length) this.geoSearchResult = [];
				this.$store.dispatch("getTargetsTest", this.searchBody);
				// this.searchTarget();
				this.currentPagePoi = 1,
				this.geoSearch();
				// this.SearchPoi();
				this.searchPoi();
			},
			checkTarget(target) {
				console.log(target);
				this.$store.commit("checkTarget", target);
				this.$store.commit('setTempTarget', undefined);
				this.$store.commit('setHistroyTargetShow', false);
				this.$store.commit('setHistroyTargetList', []);
				this.$store.commit('setHistroyViewShow', false);
			},
			research(page) {
				this.searchBody.from = (page - 1) * this.pageSize;
				this.$store.dispatch("getTargetsTest", this.searchBody);
			},
			handleLonlat(value) {
				if (this.lon > 180) this.lon = 180;
				if (this.lon < -180) this.lon = -180;
				if (this.lat > 90) this.lat = 90;
				if (this.lat < -90) this.lat = -90;
			},
			draw (mode) {
				this.drawingMode = mode;
				switch (mode) {
					case 0: this.startDrawingPolyline();break;
					case 1: this.startDrawingPoint();break;
					default: this.finishDrawing();
				}
			},
			checkColor (e, color) {
				this.checkedColor = color;
			},
			startDrawingPolyline () {
				earth.on('click', this.drawingPolyline);
			},
			drawingPolyline (e) {
				if (!this.lonlats.length) {
					this.lonlats.push(e.lonlat);
					return;
				}
				if (!this.dbcFlag) {
					this.dbcFlag = true;
					this.dbcTimer = setTimeout(() => {
						this.dbcFlag = false;
						this.lonlats.push(e.lonlat);
						this.drawPolyline();
					}, 300)
				} else {
					clearTimeout(this.dbcTimer);
					this.dbcTimer = undefined;
					this.lonlats.push(e.lonlat);
					this.drawPolyline();
					this.polylines.push({
						color: this.checkedColor,
						positions: this.lonlats.slice()
					})
					this.draw(-1);
				}
			},
			drawPolyline () {
				if (this.polyline) {
					this.polyline.removeFrom(earth.features);
				}
				this.polyline = new GeoVis.Polyline(this.lonlats, {
					colors: [GeoVis.Color.fromCssString(this.checkedColor)],
				}).addTo(earth.features);
			},
			startDrawingPoint () {
				earth.once('click', this.drawPoint)
			},
			drawPoint (e) {
				let point = new GeoVis.Point(e.lonlat, {
					pixelSize: 10,
					color: GeoVis.Color.fromCssString(this.checkedColor)
				}).addTo(earth.features);
				this.points.push({
					color: this.checkedColor,
					position: e.lonlat,
				})
			},
			finishDrawing () {
				earth.off('click', this.drawingPolyline);
			},
			getDM(type) {
				if (this.abortController) {
					this.abortController.abort();
				}
				this.abortController = new AbortController();
				this.dropdownType = type ;
				let keyword = type == 1 ? this.startPointStr : this.endPointStr;
				fetch(
					`${Config.DMIP}/search?q=${
						keyword
					}&format=json&polygon=1&addressdetails=1`,
					{
						signal: this.abortController.signal,
					}
				)
					.then(res => res.json())
					.then(json => {
						this.abortController = undefined;
						if (this.dmResults.length) this.dmResults = [];
						for (let item of json) {
							this.dmResults.push({
								name: item.display_name,
								boundingBox: item.boundingbox,
								lonlat: [Number(item.lon), Number(item.lat)]
							});
						}
						if (!this.dmResults.length) return;
						if (this.dropdownType == 1) {
							this.startPoint = this.dmResults[0].lonlat.slice();
						} else {
							this.endPoint = this.dmResults[0].lonlat.slice();
						}
					});
			},
			setDefaultStartPoint() {
				if (this.dmResults.length) {
					this.startPoint = this.dmResults[this.currentDmIndex].lonlat;
					this.startPointStr = this.dmResults[this.currentDmIndex].name
				} else {
					this.startPoint = [];
					this.startPointStr = '';
				}
				this.dmResults = [];
				this.currentDmIndex = -1;
			},
			setDefaultEndPoint() {
				if (this.dmResults.length) {
					this.endPoint = this.dmResults[this.currentDmIndex].lonlat;
					this.endPointStr = this.dmResults[this.currentDmIndex].name
				} else {
					this.endPoint = [];
					this.endPointStr = '';
				}
				this.dmResults = [];
				this.currentDmIndex = -1;
			},
			setPoint (rs) {
				this.currentDmIndex = rs;
			},
			nextDmResult () {
				this.currentDmIndex++;
				if (this.currentDmIndex == this.dmResults.length) {
					this.currentDmIndex = 0;
				}
			},
			prevDmResult () {
				this.currentDmIndex--;
				if (this.currentDmIndex < 0) {
					this.currentDmIndex = this.dmResults.length - 1;
				}
			},
			async searchLujing (flag) {
				if (this.dmResults.length && flag) {
					if (this.dropdownType == 1) {
						this.setDefaultStartPoint();
					} else {
						this.setDefaultEndPoint();
					}
				}
				this.clearAll();
				if (this.startPoint.length && this.endPoint.length) {
					let start = this.startPoint[0] + ',' + this.startPoint[1];
					let end = this.endPoint[0] + ',' + this.endPoint[1];
					let url = Config.LJIP + '/route/v1/driving/' + start + ';' + end + '?steps=true';
					this.plans = await fetch(url).then(res => res.json()).then(data => this.analysisJson(data));
					let paths = this.plans;
					this.over = false;
					var linePositions = [];
					for (var i = 0; i < paths.length; i++) {
						for (var j = 0; j < paths[i].coordinates.length - 1; j++) {
							//osrm 是纬度，经度
							start = [paths[i].coordinates[j][1], paths[i].coordinates[j][0], 0];
							end = [
								paths[i].coordinates[j + 1][1],
								paths[i].coordinates[j + 1][0],
								0
							];
							linePositions = linePositions.concat([start, end]);
						}
					}
					this.polylines = this.polylines || [];
					this.polylines.push(this.drawLine(linePositions));
					this.billboards = this.billboards || [];
					this.billboards.push(
						this.addBillboard(
							[Number(this.startPoint[0]), Number(this.startPoint[1]), 0],
							require("../assets/start.png"),
							"start"
						)
					);
					this.billboards.push(
						this.addBillboard(
							[Number(this.endPoint[0]), Number(this.endPoint[1]), 0],
							require("../assets/end.png"),
							"end"
						)
					);
					this.$nextTick(() => {
						let x = (this.startPoint[0] + this.endPoint[0]) / 2;
						let y = (this.startPoint[1] + this.endPoint[1]) / 2;
						let cart = GeoVis.Cartesian3.fromDegrees(x, y, 0);
						let d = GeoVis.Cartesian3.distance(GeoVis.Cartesian3.fromDegrees(...this.startPoint), GeoVis.Cartesian3.fromDegrees(...this.endPoint));
						let r = d / 2;
						let bs = new GeoVis.BoundingSphere(cart, r * 1.1);
						earth.camera.flyToBoundingSphere(bs);
						
					})
				}
			},
			analysisJson(json) {
				var routes = [];
				if (json.code === "Ok") {
					for (var i = 0; i < json.routes.length; i++) {
						routes[i] = convertRoute(json.routes[i]);
					}
				} else {
					return "error";
				}
				return routes;
			},
			drawLine(position) {
				var colors1 = [GeoVis.Color.fromCssString("#5298ff")];
				return new GeoVis.Polyline(position, {
					colors: colors1,
					vertexColor: true,
					followSurface: true,
					width: 4.0
				}).addTo(earth.features);
			},
			addBillboard(coordinate, image, id) {
				var billboard = new GeoVis.Billboard(coordinate, {
					id: id,
					image: image
				}).addTo(earth.features);
				billboard.alignedAxis = Engine.Cartesian3.UNIT_Z;
				return billboard;
			},
			choosePlan(index) {
				console.log(this.plans[index]);
				this.plan = this.plans[index];
				this.resultPlan = !this.resultPlan;
				for (let j = 0; j < this.plan.instructions.length; j++)
					this.texts[j] = this.formatText(this.plan.instructions[j]);
				if (!this.polylines.length) return;
				for (let polyline of this.polylines) {
					polyline.colors = [GeoVis.Color.fromCssString("#5298ff")];
				}
				this.polylines[index].colors = [GeoVis.Color.fromCssString("#ee0000")];
			},
			formatText(instruction) {
				var item = {
					text: "",
					icon: ""
				};
				item = textFormat(instruction);
				console.log(item.text);
				return item;
			},
			clearAll() {
				if (this.billboards && this.billboards.length) {
					for (let billboard of this.billboards) {
						billboard.removeFrom(earth.features);
					}
					this.billboards = [];
				}
				if (this.polylines && this.polylines.length) {
					for (let polyline of this.polylines) {
						polyline.removeFrom(earth.features);
					}
					this.polylines = [];
				}
				this.resultPlan = false;
			},
			formatTime(time){
				time=Number(time)
				let   result=""
				if(time/3600>0){
					result=parseInt(time/3600)+"小时"
				}
				time=time%3600
				if(time/60>0){
					result=result+Math.round(time/60)+"分钟"
				}
				return result;
			},
			formatDistance(value) {
				let distance = "";
				if (value / 1000 <= 0) {
					distance = parseInt(value) + "米";
				} else {
					distance = Math.ceil(value / 1000) + "千米";
				}
				return distance;
			},
			pickPoint (n) {
				this.lujingLocation = n;
				earth.off('click', this.getPoint);
				if (n > -1) {
					earth.once('click', this.getPoint);
				}
			},
			getPoint (e) {
				fetch(Config.DMIP+`/reverse.php?format=json&lat=${e.lonlat[1]}&lon=${e.lonlat[0]}&zoom=8`)
				.then(res => res.json())
				.then(json => {
					if (json.error) {
						console.error(json.error);
						this.$error(json.error);
					} else {
						if (!this.lujingLocation) {
							this.startPoint = e.lonlat.slice();
							this.startPointStr = json.display_name;
						} else {
							this.endPoint = e.lonlat.slice();
							this.endPointStr = json.display_name;
						}
						this.pickPoint(-1);
					}
				})
			},
			JsonOutLj(){
				let text = JSON.stringify(this.plans);
				if("download" in document.createElement("a")){
					this.webDownLoad(text, '路经导出.json');
				}
			},
			webDownLoad: function (content, filename){
				let link = document.createElement("a");
				link.download = filename;
				link.style.display = "none";
				let blob = new Blob([content]);
				link.href = URL.createObjectURL(blob);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
		}
	};
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	.black-box {
		border: 1px solid #000;
		/* border-radius: 8px; */
		background-color: #1c2c35;
	}
	.nothing {
		width: 0;
		height: 100%;
		left: 0;
		top: 0;
		position: fixed;
		z-index: 9;
	}
	.searchContainer {
		position: fixed;
		top: 84px;
		left: 10px;
		width: 440px;
		z-index: 4;
	}
	.navBtn {
		position: absolute;
		width: 55px;
		height: 125px;
		right: 0;
		top: 45px;
		color: white;
		font-size: 30px;
		color: #05eaff;
		padding: 10px 0;
	}
	.navBtn img {
		width: 25px;
		height: 25px;
		margin: 15px;
		cursor: pointer;
	}
	.ljDc{
		cursor: pointer;
    	font-size: 35px;
	}
	.search {
		width: 410px;
		margin: 15px 15px 0 15px;
		height: 40px;
		border: 1px solid #9ca8b5;
		border-radius: 2px;
		background-color: #2f4150;
	}
	.search.short {
		width: 370px;
		margin: 15px;
	}
	.pre,
	.suf {
		width: 40px;
		height: 40px;
		line-height: 40px;
		float: left;
		color: #fff;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
	}
	.search .cz-input {
		width: calc(100% - 80px);
		height: 40px;
		line-height: 40px;
		float: left;
		color: #fff;
		font-size: 16px;
		border: none;
		background: transparent;
	}
	.suf {
		float: right;
	}
	.add {
		width: 40px;
		height: 40px;
		line-height: 40px;
		/* right: 15px; */
		/* top: 15px; */
		/* position: absolute; */
		color: #fff;
		/* font-size: 24px; */
		text-align: center;
		cursor: pointer;
		float: right;
	}
	.loc {
		width: 40px;
		height: 40px;
		line-height: 40px;
		/* right: 15px; */
		/* top: 15px; */
		/* position: absolute; */
		color: #05eaff;
		/* font-size: 24px; */
		text-align: center;
		cursor: pointer;
		float: right;
	}
	.advanced {
		margin: 6px 17px;
		width: 370px;
		height: 78px;
		/* line-height: 40px; */
		font-size: 14px;
		text-align: left;
		color: #fff;
	}
	.advButton {
		cursor: pointer;
		display: inline-block;
		line-height: 17px;
		border: 1px solid #9ca8b5;
		color: #edeff3;
		text-align: center;
		font-size: 12px;
		border-radius: 12px;
		padding: 3px 15px 2px 15px;
		margin-right: 8px;
	}
	.advRightButton {
		cursor: pointer;
		float: right;
		line-height: 17px;
		border: 1px solid #9ca8b5;
		color: #edeff3;
		text-align: center;
		font-size: 12px;
		padding: 3px 15px 2px 15px;
		margin-right: 8px;
		margin-top: 8px;
		transition: all .5s;
	}
	.advRightButton:hover {
		background: #9ca8b5;
		color: #1c2c35;
	}
	.mark {
		border: none;
		width: 14px;
		height: 14px;
		border-radius: 7px;
		cursor: pointer;
		margin: 0 6px;
	}
	.mark.checked {
		width: 18px;
		height: 18px;
		border-radius: 9px;
		border: 2px solid #FFF;
	}
	.red { background-color: rgb(255, 0, 0); }
	.orange { background-color: rgb(255, 166, 0); }
	.yellow { background-color: rgb(255, 255, 0); }
	.green { background-color: rgb(0, 255, 42); }
	.blue { background-color: rgb(0, 153, 255); }
	.purple { background-color: rgb(183, 0, 255); }
	.grey { background-color: rgb(173, 173, 173); }
	.plusButtonL,
	.plusButtonR {
		float: right;
		height: 24px;
		line-height: 24px;
		border: 1px solid #9ca8b5;
		color: #9ca8b5;
		text-align: center;
		width: 50px;
		cursor: pointer;
		margin-top: 8px;
	}
	.plusButtonL {
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
	}
	.plusButtonR {
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}
	.checked {
		border-color: #05eaff;
		color: #05eaff;
	}
	.results {
		width: 440px;
		position: fixed;
		height: calc(100% - 285px);
		top: 275px;
		background-color: #1c2c35;
		left: 10px;
		z-index: 3;
		box-shadow: 0 0 2px #000;
	}
	.tabs {
		width: 100%;
		height: 45px;
		padding: 0 0px;
		background-color: #273b46;
		border-bottom: 1px solid #3b5361;
		color: #5a6772;
		text-align: left;
		line-height: 45px;
		font-size: 16px;
		font-weight: 550;
	}
	.tab {
		display: inline-block;
		padding: 0 20px;
		cursor: pointer;
		-webkit-transition: 0.3s;
		transition: 0.3s;
		color: #d6d6d6;
		border-bottom: 4px solid transparent;
		height: 45px;
	}
	.tab.currentTab,
	.tab:hover {
		color: #fff;
		border-bottom: 3px solid #eee;
	}
	.contents {
		width: 100%;
		height: calc(100% - 90px);
		overflow: auto;
		padding: 5px 0;
		margin-bottom: 10px;
	}
	.item {
		cursor: pointer;
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0 30px;
		font-size: 16px;
		color: #fff;
		text-align: left;
		border-bottom: 1px solid #12252f;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.item:hover {
		background-color: #5a6772;
	}
	.item.checked {
		background-color: #5a6772;
	}
	.lonlatContainer {
		display: none;
		position: fixed;
		/* left: 420px; */
		top: 140px;
		width: 440px;
		height: 70px;
		transition: left 0.5s;
	}
	.lonlatInput {
		width: 370px;
		height: 40px;
		line-height: 40px;
		margin: 15px;
		text-align: left;
		color: #fff;
		font-size: 18px;
		z-index: 1;
	}
	.lonlatInput span {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		width: 40px;
		text-align: center;
	}
	.lonlatInput .cz-input {
		border: 1px solid #9ca8b5;
		border-radius: 2px;
		background-color: #2f4150;
		color: #fff;
		height: 40px;
		width: 100px;
		vertical-align: top;
		text-align: center;
		font-size: 16px;
	}
	.lonlat-check,
	.lonlat-close {
		cursor: pointer;
		font-size: 24px;
	}
	.lonlat-check {
		color: lightgreen;
	}
	.lonlat-close {
		color: orangered;
	}
	.invisiblePopup {
		position: fixed;
		left: 10px;
		top: 164px;
		width: 440px;
		height: 0;
		overflow: hidden;
	}
	.continue {
		height: 40px;
		line-height: 40px;
		margin-left: 300px;
		cursor: pointer;
		width: 85px;
		height: 40px;
		text-align: center;
		border: 1px solid #9ca8b5;
		border-radius: 4px;
		color: #fff;
		font-size: 16px;
	}
	.leftVer {
		width: 440px !important;
		right: 0 !important;
		top: 124px !important;
	}
	.searchDropdown {
		position: fixed;
		width: 408px;
		background: #1c2c35;
		border: 1px solid #9ca8b5;
		top: 184px;
		left: 27px;
	}
	.drawer {
		position: fixed;
		width: 400px;
		right: -400px;
		top: 74px;
		background: #1c2c35;
		transition: right .5s;
		height: calc(100% - 74px);
	}
	.drawer.open {
		right: 0;;
	}
	.drawer * {
		text-align: left;
		color:#fff;
	}
	#plugin_result {
		width:100%;
		height:calc(100% - 50px);
		font-size: 2em;
		overflow-y: auto;
	}

	.title {
		height: 50px;
		line-height: 30px;
		font-size: 20px;
     	margin: 5px 10px;
		padding: 5px 0;
		border-bottom: 1px solid white;
		font-weight: bold;
	}

	.path {
		min-height: 30px;
		font-size: 14px;
		position: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: initial;
		background-color: unset;
		margin-bottom: 10px;
		padding-left: 20px;
		line-height: 30px;
	}
	.icon{
		float: left;
		margin-right:10px;
	}
	.text{
		margin-left:15px;
		white-space:normal; 
		word-wrap : break-word ;
		float: left;
		word-break: break-all;
		width:220px;
		min-height:30px;
		line-height: 30px;
	}
	.distance {
		width: 80px;
		float: right;
	}
	i,
	button span {
		pointer-events: none;
	}
	.leaflet-routing-icon {
		background-image: url(/static/images/style/osrm.directions.icons.color.svg);
		-webkit-background-size: 455px 20px;
		background-size: 455px 20px;
		background-repeat: no-repeat;
		margin: 0;
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
	}
	.leaflet-routing-icon-continue         { background-position: 2px 0px; }
	.leaflet-routing-icon-sharp-right      { background-position: -24px 0px; }
	.leaflet-routing-icon-turn-right       { background-position: -50px 0px; }
	.leaflet-routing-icon-bear-right       { background-position: -74px 0px; }
	.leaflet-routing-icon-u-turn           { background-position: -101px 0px; }
	.leaflet-routing-icon-sharp-left       { background-position: -127px 0px; }
	.leaflet-routing-icon-turn-left        { background-position: -150px 0px; }
	.leaflet-routing-icon-bear-left        { background-position: -175px 0px; }
	.leaflet-routing-icon-depart           { background-position: -202px 0px; }
	.leaflet-routing-icon-enter-roundabout  { background-position: -227px 0px; }
	.leaflet-routing-icon-arrive           { background-position: -253px 0px; }
	.leaflet-routing-icon-via              { background-position: -278px 0px; }
	.leaflet-routing-icon-fork             { background-position: -305px 0px; }
	.leaflet-routing-icon-ramp-right       { background-position: -331px 0px; }
	.leaflet-routing-icon-ramp-left        { background-position: -352px 0px; }
	.leaflet-routing-icon-merge-left       { background-position: -376px 0px; }
	.leaflet-routing-icon-merge-right      { background-position: -403px 0px; }
	.leaflet-routing-icon-end              { background-position: -429px 0px; }
</style>

<style>
	.gv-popup .propRow {
		width: 240px !important;
		margin: 5px !important;
	}
	.gv-popup .propRow .label {
		width: 50px !important;
	}
	.gv-popup .propRow .input {
		width: calc(100% - 50px) !important;
	}
	.gv-popup .continue {
		margin-left: 150px !important;
	}
	.gv-popup .cz-input,
	.gv-popup .cz-select {
		border-color: #9ca8b5 !important;
	}
	.nothing .el-pagination * {
		background: transparent !important;
		color: #fff;
	}
	.nothing .el-pagination .btn-next,
	.nothing .el-pagination .btn-prev,
	.nothing .el-pagination .btn-quicknext,
	.nothing .el-pagination .btn-quickprev {
		color: #fff;
	}
	.nothing .el-pagination .btn-next[disabled],
	.nothing .el-pagination .btn-prev[disabled],
	.nothing .el-pagination .btn-quicknext[disabled],
	.nothing .el-pagination .btn-quickprev[disabled] {
		color: #aaa;
	}
	.nothing .el-pagination .btn-next:hover,
	.nothing .el-pagination .btn-prev:hover,
	.nothing .el-pagination .btn-quicknext:hover,
	.nothing .el-pagination .btn-quickprev:hover {
		color: #03eaff;
	}
	.advanced .el-cascader__label{
		color: #ffffff;
	}
	.advanced .el-cascader__label span{
		color: #ffffff;
	}
	.advanced .el-input__inner{
		background-color: #2f4150;
		color: #fff;
		border: 1px solid #2d424e;
	}
	.jc_popper{
		border-color: rgb(47, 65, 80);
		box-shadow: 0 0 2px #8e8e8e;
	}
	.jc_popper .el-cascader{
		width: 280px;
	}
	.jc_popper .el-cascader-menu{
		background-color: #1c2c35;
		border-color: rgb(47, 65, 80);
	}
	.jc_popper .el-cascader-menu__item{
		color: rgb(255, 255, 255);
		background-color: #1c2c35
	}
	.jc_popper .el-cascader-menu__item__keyword{
    	color: #ff5656;
	}
	.jc_popper .el-cascader-menu__item:focus:not(:active),
	.jc_popper .el-cascader-menu__item:hover{
		background-color: #415057;
	}

	
</style>

<!-- CzSun拒绝维护使用2空格缩进的代码 -->
