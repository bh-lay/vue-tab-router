import {setNextData} from './tab-pre-storage.js'

class TabRouter {
	constructor (tabData, $router) {
		this.tabData = tabData
		this.$router = $router

		// if (vm.replace) {
		// 	vm.$router.replace(vm.to)
		// } else {
		// 	vm.$router.push(vm.to)
		// }
	}
	setNextData () {
		setNextData({
			target: this.tabData.name,
			tabTitle: this.tabData.title,
			forceRefesh: true,
			cacheType: this.tabData.cacheType
		})
	}
	push (location) {
		this.setNextData()
		this.$router.push(location)
	}
	replace (location) {
		this.setNextData()
		this.$router.replace(location)
	}
}
export default TabRouter
