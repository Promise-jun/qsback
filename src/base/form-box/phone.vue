<template>
	<div>
		<el-select v-model="phoneCode" placeholder="请选择" style="width: 100px;" @change="changeCode">
            <el-option label="+86" value="86"></el-option>
            <el-option label="+886" value="886"></el-option>
            <el-option label="+852" value="852"></el-option>
            <el-option label="+853" value="853"></el-option>
        </el-select>
        <el-input v-model.number="phoneNum" @change="changeNum" autocomplete="off" placeholder="请输入手机号" style="width: 300px;"></el-input>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'phone',
		props: {
			code: {
				type: String,
				default: ''
			},
			phone: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				phoneCode: '86',
				phoneNum: ''
			}
		},
		methods: {
			changeCode(val) {
				this.$emit('changeCode', val)
			},
			changeNum(val) {
				this.$emit('changeNum', val)
			}
		},
		watch: {
			'code'(newVal) {
				this.phoneCode = newVal
			},
			'phone'(newVal) {
				this.phoneNum = newVal
			}
		}
	}
</script>