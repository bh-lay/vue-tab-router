<style lang="stylus" rel="stylesheet/stylus" scoped>
.navigation
	width 200px
	.nav-logo
		display block
		margin-bottom 20px
		padding 30px 20px 20px
		background #0d9af2
		font-weight bold
		font-size 18px
		color #fff
	.write-email
		display block
		margin 20px 10px
		padding 10px 15px
		background #abb2ba
		border 1px solid #c7cbd1
		font-weight bold
		font-size 16px
		color #16191d
		transition .15s
		&:hover
			background #fff
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
		<tab-router-link
			:to="'/mail/new/' + newMailID"
			class="write-email"
			@router-change="routerChange"
		>写信</tab-router-link>
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
			],
			newMailID: 1
		}
	},
	methods: {
		routerChange () {
			this.newMailID++
		}
	}
}
</script>
