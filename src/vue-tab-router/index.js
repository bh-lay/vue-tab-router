import './style.styl'
import tabRouter from './tab-router.js'
import tabRouterLink from './tab-router-link.js'

export default {
	install (Vue) {
		Vue.component('tab-router-view', tabRouter)
		Vue.component('tab-router-link', tabRouterLink)
	}
}
