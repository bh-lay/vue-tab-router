import './style.styl'
import tabList from './tab-bar.js'
import tabPreStorage from './tab-pre-storage.js'
import TabRouter from './tab-router.js'

export default {
	name: 'tab-router-view',
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
			return h(tabItem._components, {
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
			let {target, forceRefesh, tabTitle, cacheType} = tabPreStorage.next

			// 是否已经定于了 target name
			let hasDefineTargetName = target && target !== '_blank'
			let tabName = hasDefineTargetName ? target : route.meta.tabName
			let targetTab = null

			if (tabName) {
				targetTab = this.getTabInOpendList('name', tabName)
			} else {
				tabName = String(this.maxTabID++)
			}
			// 若已经打开过
			if (targetTab) {
				// 链接地址与已存在的 tab 地址不一致时
				if (route.fullPath !== targetTab.fullPath) {
					// 是否配置了值了强制刷新
					if (forceRefesh) {
						// 更新 tab 数据
						targetTab.fullPath = route.fullPath
						targetTab.query = route.query
					} else {
						// 修正为原地址
						this.$router.replace(targetTab.fullPath)
					}
				}
				this.opendTab = targetTab
			} else {
				this.createNewTab(route, {
					tabName,
					cacheType,
					tabTitle
				})
			}
		},
		createNewTab (route, {tabName, tabTitle, cacheType}) {
			let { path, query, fullPath, meta, matched } = route

			let matchedRoute = matched ? matched[matched.length - 1] : null
			if (!matchedRoute) {
				throw new Error('路由缺失，请补全！')
			}
			let tabItem = {
				name: tabName,
				path,
				query,
				fullPath,
				title: tabTitle || meta.tabTitle || '无标题',
				cacheType,
				_components: {
					beforeCreate () {
						this.$tabRoute = tabItem
						this.$tabRouter = new TabRouter(tabItem, this.$router)
					},
					extends: matchedRoute.components.default
				}
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
