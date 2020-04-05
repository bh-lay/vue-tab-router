<style lang="stylus" rel="stylesheet/stylus" scoped>
.navigation
	width 200px
	.nav-logo
		display block
		margin 40px 20px 20px
		padding 15px 18px
		background #0d9af2
		font-weight bold
		font-size 16px
		color #fff
	.nav-list
		padding 15px
		a
			position relative
			display block
			line-height 30px
			font-size 14px
			font-weight bold
			color #fff
			text-decoration none
			transition .2s
			&.tab-router-link-active
				color #007fff
</style>
<template>
	<div class="navigation">
		<tab-router-link
			to="/"
			class="nav-logo"
		>邮箱管理系统</tab-router-link>
		<div class="nav-list">
			<tab-router-link
				v-for="nav in navList"
				:key="nav.href"
				:to="nav.href"
				:target="nav.target"
				:tabTitle="nav.label"
			>{{nav.label}}</tab-router-link>
		</div>
	</div>
</template>

<script>

export default {
	name: 'navigation',
	data () {
		return {
			navList: [
				{
					label: '控制台',
					href: '/index',
					target: 'index'
				},
				{
					label: '收件箱',
					href: '/inbox',
					target: 'inbox'
				},
				{
					label: '发件箱',
					href: '/outbox/',
					target: 'outbox'
				}
			]
		}
	},
	methods: {
	}
}
</script>
