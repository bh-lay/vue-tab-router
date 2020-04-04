<style lang='stylus' scoped>
.tab-router-container
	display flex
	flex-direction column
.router-view
	height 100px
	flex-grow 1
	padding 0 10px
	overflow auto
</style>

<script>
import tabList from './tab-list.vue'
let cacheID = 0
export default {
	name: 'tab-router',
	components: { tabList },
	data () {
		return {
			opendTab: null,
			opendTabList: []
		}
	},
	render (h) {
		let aliveTabElemenList = []
		let keepAliveElement = null
		let noCacheElement = null

		const createTabElement = (tabItem, options) => {
			let tabItemVNode = h(tabItem.components, {
				class: ['router-view', tabItem.cacheType],
				directives: options ? options.directives : undefined,
				props: {
					visible: tabItem === this.opendTab,
					cacheType: tabItem.cacheType
				},
				on: {
					'update-title': param => {
						tabItem.title = param.title
					}
				}
			})
			tabItemVNode.context.$tabRoute = tabItem
			console.log('tabItemVM', tabItemVNode)
			return tabItemVNode
		}
		this.opendTabList.forEach(tabItem => {
			switch (tabItem.cacheType) {
			case 'alive':
				aliveTabElemenList.push(
					createTabElement(tabItem, {
						directives: [
							{
								name: 'show',
								value: tabItem === this.opendTab
							}
						]
					})
				)
				break
			case 'keep-alive':
				if (tabItem === this.opendTab) {
					keepAliveElement = createTabElement(tabItem)
				}
				break
			case 'nocache':
				if (tabItem === this.opendTab) {
					noCacheElement = createTabElement(tabItem)
				}
				break
			}
		})
		return h(
			'div',
			{
				class: 'tab-router-container'
			},
			[
				h('tabList', {
					props: {
						list: this.opendTabList,
						active: this.opendTab
					}
				}),
				h('keep-alive', {}, [keepAliveElement]),
				...[aliveTabElemenList],
				noCacheElement
			]
		)
	},
	mounted () {
		this.handleRouteChange(this.$route)
		console.log('注册拦截器')
		this.removeRouterListener = this.$router.beforeEach(
			(after, before, next) => {
				this.handleRouteChange(after)
				// this.$forceUpdate()
				// this.$nextTick(next)
				next()
			}
		)
	},
	methods: {
		handleRouteChange (route) {
			let { path, query, meta, matched } = route
			this.opendTab = this.getTabInOpendList('path', path)
			if (this.opendTab) {
				if (route.fullPath !== this.opendTab.fullPath) {
					if (Object.keys(route.query).length === 0) {
						this.$router.replace(this.opendTab.fullPath)
					} else {
						this.opendTab.fullPath = route.fullPath
						this.opendTab.query = route.query
					}
				}
				return
			}
			console.log('route', route)
			let matchedRoute = matched ? matched[matched.length - 1] : null
			if (!matchedRoute) {
				throw new Error('路由缺失，请补全！')
			}
			console.log('matchedRoute.components.default', matchedRoute.components.default)
			let tabItem = {
				id: cacheID++,
				path,
				query,
				fullPath: route.fullPath,
				title: meta.title,
				cacheType: (meta.tabCache || '').match(/^(nocache|keep-alive|alive)$/)
					? meta.tabCache
					: 'keep-alive',
				components: matchedRoute.components.default
			}

			this.opendTabList.push(tabItem)
			this.opendTab = tabItem
		},
		getTabInOpendList (key, value) {
			for (let i = 0; i < this.opendTabList.length; i++) {
				if (this.opendTabList[i][key] === value) {
					return this.opendTabList[i]
				}
			}
			return null
		}
	},
	beforeDestroy () {
		console.log('解除注册拦截器')
		this.removeRouterListener()
	}
}
</script>

