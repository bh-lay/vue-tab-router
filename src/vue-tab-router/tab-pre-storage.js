let tabPreStorage = {
	data: null
}
Object.defineProperty(tabPreStorage, 'next', {
	get: function get () {
		let data = this.data || {
			target: '_blank',
			tabTitle: '',
			forceRefesh: false,
			cacheType: ''
		}
		this.data = null
		data.cacheType = (data.cacheType || '').match(/^(nocache|keep-alive|alive)$/) ? data.cacheType : 'keep-alive'
		return data
	}
})
export function setNextData ({target, tabTitle}) {
	tabPreStorage.data = {
		target,
		tabTitle
	}
}
export default tabPreStorage
