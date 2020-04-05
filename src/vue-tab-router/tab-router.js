import './style.styl'
import tabList from './tab-list.vue'
import tabPreStorage from './tab-pre-storage.js'

export default {
	name: 'tab-router',
	components: { tabList },
	data () {
		return {
			opendTab: null,
			opendTabList: [],
			maxTabID: 0
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
		this.removeRouterListener = this.$router.beforeEach(
			(after, before, next) => {
				this.handleRouteChange(after)
				next()
			}
		)
	},
	methods: {
		getTabInOpendList (key, value) {
			for (let i = 0; i < this.opendTabList.length; i++) {
				if (this.opendTabList[i][key] === value) {
					return this.opendTabList[i]
				}
			}
			return null
		},
		handleRouteChange (route) {
			let {target, forceRefesh, title, cacheType} = tabPreStorage.next

			// 是否已经定于了 target name
			let hasDefineTargetName = target && target !== '_blank' && target !== '_current'
			let tabName = hasDefineTargetName ? target : this.maxTabID++
			let tabInOpendList = this.getTabInOpendList('name', tabName)
			// 定义了 target name，且已经打开过
			if (hasDefineTargetName && tabInOpendList) {
				// 链接地址与已存在的 tab 地址不一致时
				if (route.fullPath !== tabInOpendList.fullPath) {
					// 是否配置了值了强制刷新
					if (forceRefesh) {
						// 更新 tab 数据
						tabInOpendList.fullPath = route.fullPath
						tabInOpendList.query = route.query
					} else {
						// 修正为原地址
						this.$router.replace(tabInOpendList.fullPath)
					}
				}
				this.opendTab = tabInOpendList
				return
			} else if (target === '_current') {
			} else {
				this.createNewTab(route, {
					name: tabName,
					cacheType,
					title
				})
			}
		},
		createNewTab (route, {name, title, cacheType}) {
			let { path, query, fullPath, matched } = route

			let matchedRoute = matched ? matched[matched.length - 1] : null
			if (!matchedRoute) {
				throw new Error('路由缺失，请补全！')
			}
			let tabItem = {
				name,
				path,
				query,
				fullPath,
				title,
				cacheType,
				components: matchedRoute.components.default
			}

			this.opendTabList.push(tabItem)
			this.opendTab = tabItem
		}
	},
	beforeDestroy () {
		console.log('解除注册拦截器')
		this.removeRouterListener()
	}
}
