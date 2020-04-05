<style lang="stylus" rel="stylesheet/stylus" scoped>
.index-page
	min-height 100vh
	padding 200px
	background #fff
</style>
<template>
<div class="index-page">
	这是收件箱
	<div class="mail-list">
		<div
			v-for="mailItem in mailList"
			:key="mailItem.id"
			class="mail-item"
		>
		{{mailItem}}
		</div>
	</div>
	{{$tabRoute.query}}
	<div>
		<button @click="prevPage">下一页</button>
		{{pageIndex}}
		<button @click="nextPage">下一页</button>
	</div>
</div>
</template>

<script>
export default {
	name: 'inbox-page',
	data () {
		return {
			pageIndex: parseInt(this.$tabRoute.query.page, 10) || 1,
			pageItemCount: 10,
			mailList: []
		}
	},
	mounted () {
		this.getList()
	},
	methods: {
		getList () {
			let startIndex = this.pageItemCount * (this.pageIndex - 1)
			this.mailList = new Array(this.pageItemCount).fill(1).map((item, index) => {
				let curIndex = startIndex + index + 1
				return {
					title: `这是第${curIndex}封邮件`,
					id: curIndex
				}
			})
		},
		prevPage () {
			this.$tabRouter.push('/inbox?page=' + (this.pageIndex - 1))
		},
		nextPage () {
			this.$tabRouter.push('/inbox?page=' + (this.pageIndex + 1))
		}
	},
	watch: {
		'$tabRoute.query' (query) {
			this.pageIndex = parseInt(query.page, 10) || 1
			this.getList()
			console.log('query', query)
		}
	}
}
</script>
