<template>
  <div ref="menulist">
    <el-menu router unique-opened :collapse="isFold" :default-active="onRoutes">
    	<div class="fold" @click="fold"><i class="iconfont icon-swap"></i></div>
        <!-- 循环navList数组，将每项的值及index传给nav-item组件 -->
        <nav-item v-for="(item, index) in navList" :item="item" :navIndex="String(index)" :key="index"></nav-item>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
import NavItem from 'components/nav-menu/nav-item'

let data = [
    {
    	name: '角色管理',
    	icon: 'el-icon-menu',
        path: '/role'
    },
    {
    	name: '功能管理',
    	icon: 'el-icon-menu',
        path: '/function'
    },
    {
    	name: '权限管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '角色权限管理',
    			path: '/authority/role'
    		},
    		{
    			name: '用户权限管理',
    			path: '/authority/user'
    		}
    	]
    },
    {
        name: '用户管理',
        icon: 'el-icon-menu',
        child: [
            {
                name: '客户管理',
                path: '/userlist'
            },
            {
                name: '导师管理',
                child: [
                    {
                    	name: '导师列表',
                        path: '/mentor/list'
                    },
                    {
                    	name: '导师审核',
                        path: '/mentor/audit'
                    }
                ]
            },
            {
                name: '主播管理',
                child: [
                    {
                    	name: '主播列表',
                        path: '/anchor/list'
                    },
                    {
                    	name: '主播审核',
                        path: '/anchor/audit'
                    }
                ]
            },
            {
                name: '群组管理',
                path: '/group/list'
            },
            {
                name: '后台用户管理',
                path: '/operator/list'
            },
            {
            	name: '客服组管理',
            	path: '/servicegroup'
            },
            {
            	name: '业务组管理',
            	path: '/businessGroup'
            }
        ]
    },
    {
    	name: '咨询订单',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '平台订单管理',
    			child: [
    				{
    					name: '平台订单',
    					path: '/applicationConsultation/platformOrder'
    				},
    				{
    					name: '客服介入订单',
    					path: '/applicationConsultation/kefuIntervene'
    				}
    			]
    		},
    		{
    			name: '梦立方',
    			child: [
    				{
    					name: '正式订单',
    					path: '/dreamCube/formalOrder'
    				},
    				{
    					name: '体验订单',
    					path: '/dreamCube/experienceOrder'
    				}
    			]
    		},
    		{
    			name: '悦然一心',
    			child: [
    				{
    					name: '正式订单',
    					path: '/pleasantHeart/formalOrder'
    				},
    				{
    					name: '体验订单',
    					path: '/pleasantHeart/experienceOrder'
    				}
    			]
    		},
    		{
    			name: '线下订单',
    			path: '/underLineOrder'
    		}
    	]
    },
    {
    	name: '课程订单',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '订单列表',
    			path: '/courseOrder/list'
    		}
    	]
    },
    {
    	name: '资金管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '现金管理',
    			child: [
    				{
    					name: '提现列表',
    					path: '/cashManage/withdrawCash'
    				},
    				{
    					name: '充值列表',
    					path: '/cashManage/rechargeList'
    				},
    				{
    					name: '加减币管理',
    					path: '/cashManage/addAndSubtractMoney'
    				},
    				{
    					name: '资金流水',
    					path: '/cashManage/fundFlow'
    				},
    				{
    					name: '交易列表',
    					path: '/cashManage/businessList'
    				},
    				{
    					name: '财务明细',
    					path: '/cashManage/financeList'
    				},
    				{
    					name: '退款列表',
    					path: '/cashManage/refundmentList'
    				}
    			]
    		},
    		{
    			name: '金币管理',
    			child: [
    				{
    					name: '金币兑换记录',
    					path: '/gold/goldRecord'
    				},
    				{
    					name: '金币流水',
    					path: '/gold/goldNullah'
    				},
    				{
    					name: '金币加减币',
    					path: '/gold/goldAddSub'
    				}
    			]
    		},
    		{
    			name: '钻石管理',
    			child: [
    				{
    					name: '钻石兑换记录',
    					path: '/diamond/diamondRecord'
    				},
    				{
    					name: '钻石流水',
    					path: '/diamond/diamondNullah'
    				},
    				{
    					name: '钻石加减币',
    					path: '/diamond/diamondAddSub'
    				}
    			]
    		}
    	]
    },
    {
    	name: '咨询管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '咨询设置',
    			child: [
    				{
    					name: '心理分类',
    					path: '/consultSet/mentalCategory'
    				},
    				{
    					name: '个性化标签',
    					path: '/consultSet/personalityLabel'
    				}
    			]
    		},
    		{
    			name: '咨询套餐',
    			child: [
    				{
    					name: '套餐列表',
    					path: '/consultationMenu/list'
    				},
    				{
    					name: '套餐审核',
    					path: '/consultationMenu/auditing'
    				}
    			]
    		}
    	]
    },
    {
    	name: '运营管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '广告管理',
    			child: [
    				{
    					name: 'banner图管理',
    					path: '/advertisement/banner'
    				},
    				{
    					name: 'APP启动图管理',
    					path: '/advertisement/cover'
    				}
    			]
    		},
    		{
    			name: '互动管理',
    			child: [
    				{
    					name: '关键词管理',
    					path: '/interaction/keyWords'
    				},
    				{
    					name: '音频聊天记录',
    					path: '/interaction/audioChat'
    				},
    				{
    					name: '图文聊天记录',
    					path: '/interaction/textChat'
    				}
    			]
    		},
    		{
    			name: '数据统计',
    			child: [
    				{
    					name: '客服统计',
    					path: '/statistics/kefu'
    				},
    				{
    					name: '咨询师统计',
    					path: '/statistics/mentor'
    				}
    			]
    		},
    		{
    			name: '杂志管理',
    			child: [
    				{
    					name: '杂志分类',
    					path: '/magazine/classify'
    				},
    				{
    					name: '杂志列表',
    					path: '/magazine/list'
    				},
    				{
    					name: '杂志审核',
    					path: '/magazine/auditing'
    				}
    			]
    		},
    		{
    			name: '举报信息',
    			path: '/reportInfo'
    		}
    	]
    },
    {
    	name: '直播管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '直播设置',
    			child: [
    				{
    					name: '图库管理',
    					path: '/liveSet/gallery'
    				},
    				{
    					name: '礼物管理',
    					path: '/liveSet/gift'
    				}
    			]
    		},
    		{
    			name: '直播预告',
    			path: '/liveForeshow'
    		},
    		{
    			name: '直播间管理',
    			path: '/liveRoom'
    		}
    	]
    },
    {
    	name: '电台管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '电台设置',
    			child: [
    				{
    					name: '电台分类',
    					path: '/radioSet/list'
    				}
    			]
    		},
    		{
    			name: '专辑管理',
    			child: [
    				{
    					name: '专辑列表',
    					path: '/program/list'
    				},
    				{
    					name: '节目列表',
    					path: '/program/anchorRadio'
    				},
    				{
    					name: '节目统计',
    					path: '/program/radioCount'
    				}
    			]
    		}
    	]
    },
    {
    	name: '课程管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '音频课程',
    			path: '/topicColumn'
    		}
    	]
    },
    {
    	name: '个人中心',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '修改密码',
    			path: '/changePass'
    		}
    	]
    },
    {
    	name: '数据字典',
    	icon: 'el-icon-menu',
    	path: '/dataDictionary'
    }
]

export default {
  name: 'navMenu',
  data() {
    return {
    	navList: data,
    	isFold: false  //是否折叠
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes(){
        return this.$route.path
    }
  },
  methods: {
  	fold() {
  		this.isFold = !this.isFold
  		this.$emit('clickme', this.isFold);
  	}
  },
  components: {
  	NavItem
  }
}

</script>
<style type="text/css" lang="scss" scoped>
	.fold {
		text-align: center;
		font-size: 30px;
		line-height: 30px;
		color: #303133;
		cursor: pointer;
		&:hover {
			background-color: #ECF5FF;
		}
	}
</style>
