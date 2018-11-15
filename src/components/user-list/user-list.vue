<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userid" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号">
		    <el-input v-model="formObj.phone" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.nickName" placeholder="请输入昵称"></el-input>
		  </el-form-item>
		  <el-form-item label="淘宝账号">
		    <el-input v-model="formObj.taobaoId" placeholder="请输入淘宝账号"></el-input>
		  </el-form-item>
		  <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
			    <el-option v-for="item in canalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="客服">
		    <el-select v-model="formObj.kefu" placeholder="请选择">
			    <el-option v-for="item in kefuArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="账户属性">
		    <el-select v-model="formObj.attr" placeholder="请选择">
			    <el-option v-for="item in attrArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert title="总计416个用户" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="userlist"
		    stripe
		    border
		    :data="userList"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="用户ID">
		      <template slot-scope="scope">{{ scope.row.userid }}</template>
		    </el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="nickName" label="昵称"></el-table-column>
		    <el-table-column prop="registerTime" label="注册时间" width="150"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="taobaoId" label="淘宝账号"></el-table-column>
		    <el-table-column prop="canal" label="渠道"></el-table-column>
		    <el-table-column prop="price" label="金额"></el-table-column>
		    <el-table-column prop="gold" label="金币"></el-table-column>
		    <el-table-column prop="diamond" label="钻石"></el-table-column>
		    <el-table-column prop="kefu" label="客服"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
					<el-button @click="editRole(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
			    </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 

	export default {
		name: 'userlist',
		data() {
			return {
				dataPath: ['用户管理', '客户管理'],
				formObj: {
					userid: '',
					phone: '',
					name: '',
					nickName: '',
					taobaoId: '',
					canal: '', //渠道
					kefu: '',
					attr: '',  //客户属性
					dateValue: ''
				},
				canalArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        kefuArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        attrArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        userList: [{
		        	userid: 7541,
		          	phone: '158****1235',
		          	nickName: '俄方岁',
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '',
		          	taobaoId: '',
		          	canal: 'APP',
		          	price: 0,
		          	gold: 0,
		          	diamond: 0,
		          	kefu: '地方可'
		        },{
		        	userid: 7541,
		          	phone: '158****1235',
		          	nickName: '俄方岁',
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '',
		          	taobaoId: '',
		          	canal: 'APP',
		          	price: 0,
		          	gold: 0,
		          	diamond: 0,
		          	kefu: '地方可'
		        }],
		        multipleSelection: []
			}
		},
		methods: {
	      onSubmit() {
	        console.log(this.formObj);
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
	    },
		components: {
			BreadCrumb
		}
	}
</script>