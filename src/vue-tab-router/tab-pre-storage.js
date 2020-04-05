let tabPreStorage = {
	data: null
}
Object.defineProperty(tabPreStorage, 'next', {
	get: function get () {
		let data = this.data || {
			target: '_blank',
			tabTitle: '',
			forceRefresh: false,
			cacheType: ''
		}
		this.data = null
		data.cacheType = (data.cacheType || '').match(/^(nocache|keep-alive|alive)$/) ? data.cacheType : 'keep-alive'
		return data
	}
})
export function setNextData ({target, tabTitle, forceRefresh, cacheType}) {
	tabPreStorage.data = {
		target,
		tabTitle,
		forceRefresh,
		cacheType
	}
}
export default tabPreStorage
