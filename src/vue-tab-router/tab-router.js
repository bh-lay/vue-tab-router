import {setNextData} from './tab-pre-storage.js'

class TabRouter {
	constructor (tabData, $router) {
		this.tabData = tabData
		this.$router = $router
	}
	setNextData () {
		setNextData({
			target: this.tabData.name,
			tabTitle: this.tabData.title,
			forceRefresh: true,
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
