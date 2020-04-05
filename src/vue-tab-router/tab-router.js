import {setNextData} from './tab-pre-storage.js'

let emptyCallback = () => {}
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
	push (location, onComplete, onAbort) {
		this.setNextData()
		this.$router.push(location, onComplete || emptyCallback, onAbort || emptyCallback)
	}
	replace (location, onComplete, onAbort) {
		this.setNextData()
		this.$router.replace(location, onComplete || emptyCallback, onAbort || emptyCallback)
	}
}
export default TabRouter
