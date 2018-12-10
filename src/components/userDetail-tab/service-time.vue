<template>
	<div>
		选择日期：<el-date-picker v-model="dateTime" type="date" placeholder="选择日期" @change="chooseTime"></el-date-picker>
		<el-card class="service-time">
			<div class="service-time-item" v-for="item in dataList">
				<div class="service-title">
					<p class="date">{{item.date}}</p>
					<p class="week">{{item.week}}</p>
				</div>
				<ul>
					<li v-for="(val, key) in initTimeList">
						<div v-if="findTime(key, item.timeList)" @click="reducible(item.timeList[key])">{{key | addZeroFilter}}:00 可预约</div>
						<div v-else class="irreducible" @click="irreducible(key, item.date)">{{key | addZeroFilter}}:00 不可约</div>
					</li>
				</ul>
			</div>
		</el-card>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'serviceTime',
		data() {
			return {
				dateTime: '',
				dataList: [
					{
						date: '2018-12-08',
						week: '星期六',
						timeList: {
							"1": 1001,
							"3": 1005
						}
					},
					{
						date: '2018-12-09',
						week: '星期日',
						timeList: {
							"5": 100516,
							"10": 100517,
							"15": 100518,
							"1": 100112,
							"2": 100515,
						}
					},
					{
						date: '2018-12-10',
						week: '星期一',
						timeList: {
							"1": 1001,
							"3": 1005
						}
					},
					{
						date: '2018-12-11',
						week: '星期二',
						timeList: {
							"1": 100112,
							"2": 100515,
							"5": 100516,
							"10": 100517,
							"15": 100518
						}
					},
					{
						date: '2018-12-12',
						week: '星期三',
						timeList: {
							"1": 100112,
							"2": 100515,
							"5": 100516,
							"10": 100517,
							"15": 100518
						}
					},
					{
						date: '2018-12-13',
						week: '星期四',
						timeList: {
							"1": 1001,
							"3": 1005
						}
					},
					{
						date: '2018-12-14',
						week: '星期五',
						timeList: {
							"1": 100112,
							"2": 100515,
							"5": 100516,
							"10": 100517,
							"15": 100518
						}
					}
				],
				initTimeList: {
					"0": 0,
					"1": 0,
					"2": 0,
					"3": 0,
					"4": 0,
					"5": 0,
					"6": 0,
					"7": 0,
					"8": 0,
					"9": 0,
					"10": 0,
					"11": 0,
					"12": 0,
					"13": 0,
					"14": 0,
					"15": 0,
					"16": 0,
					"17": 0,
					"18": 0,
					"19": 0,
					"20": 0,
					"21": 0,
					"22": 0,
					"23": 0
				}
			}
		},
		filters: {
			addZeroFilter(key) {
				if (key < 10) {
					return '0' + key
				} else {
					return key
				}
			}
		},
		methods: {
			// 选择时间
			chooseTime(val) {
				console.log(val)
			},
			findTime(key, obj) {
				if( obj.hasOwnProperty(key) ){
					return true
				} else {
					return false
				}
			},
			//点击可预约
			reducible(id) {
				console.log(id)
			},
			//点击不可约
			irreducible(time, date) {
				let uploadTime = date + ' ' + this.addZero(time) + ':00:00'
				console.log(uploadTime)
			},
			addZero(key) {
				if (key < 10) {
					return '0' + key
				} else {
					return key
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.service-time {
		width: 950px;
		margin: 15px 0;
		text-align: center;
		overflow: hidden;
		& .service-time-item {
			float: left;
			width: 130px;
			padding-bottom: 20px;
			& .service-title {
				height: 50px;
				font-size: 12px;
				color: #409EFF;
				border: 1px solid #E5E5E5;
				background-color: #E1EFFE;
				& .date {
					font-size: 14px;
					padding: 8px 0 5px;
				}
			}
			& li {
				font-size: 12px;
				color: #676767;
				height: 32px;
				line-height: 32px;
				cursor: pointer;
				border-left: 1px solid #E5E5E5;
				border-bottom: 1px solid #E5E5E5;
				& .irreducible {
					background-color: #F2F6FC;
				}
				&>div:hover {
					color: #fff;
					background-color: #409EFF !important;
				}
			}
			& ul:last-child {
				border-right: 1px solid #E5E5E5;
			}
		}
	}
</style>