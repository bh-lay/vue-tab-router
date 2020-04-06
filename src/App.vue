<style lang="stylus" rel="stylesheet/stylus">
html, body, div
	margin 0
	padding 0
body
	font-size 14px
	font-family PingFang SC,Helvetica neue,Helvetica,Tahoma,lantinghei sc,Microsoft Yahei,sans-serif
	-webkit-font-smoothing antialiased
	background #21272c
a
	text-decoration none
#app
	position relative
	height 100vh
	display flex
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	overflow hidden
.tab-router-container
	width 200px
	flex-grow 1
	background #21272c
</style>
<template>
	<div id="app">
		<Navigation/>
		<tab-router-view>
			<template v-slot:tab-title="scope">
				{{scope.tab.cacheType}}-{{scope.tab.title}}
			</template>
		</tab-router-view>
	</div>
</template>

<script>
import Navigation from './components/navigation.vue'
export default {
	name: 'App',
	components: {Navigation}
}
</script>
