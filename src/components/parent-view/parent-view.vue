<template>
	<transition name="fade" mode="out-in">
		<router-view class="children-view"></router-view>
	</transition>
</template>

<script type="text/javascript">
	export default {
		name: 'parentView'
	}
</script>

<style type="text/css" lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}
</style>