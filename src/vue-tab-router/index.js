import './style.styl'
import tabRouter from './tab-router.js'

export default {
	install (Vue) {
		Vue.components('tab-router', tabRouter)
	}
}
