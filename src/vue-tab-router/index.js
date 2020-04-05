import './style.styl'
import tabRouterView from './tab-router-view.js'
import tabRouterLink from './tab-router-link.js'

export default {
	install (Vue) {
		Vue.component('tab-router-view', tabRouterView)
		Vue.component('tab-router-link', tabRouterLink)
		Vue.mixin({
			beforeCreate () {
				let parentVM = this.$options.parent
				if (parentVM && parentVM.$tabRoute && !this.$tabRoute) {
					this.$tabRoute = parentVM.$tabRoute
					this.$tabRouter = parentVM.$tabRouter
				}
			}
		})
	}
}
