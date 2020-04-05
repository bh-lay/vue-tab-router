let tabPreStorage = {
	data: null
}
Object.defineProperty(tabPreStorage, 'next', {
	get: function get () {
		let data = this.data || {
			target: '_blank',
			title: '无标题',
			forceRefesh: false,
			cacheType: ''
		}
		this.data = null
		data.cacheType = (data.cacheType || '').match(/^(nocache|keep-alive|alive)$/) ? data.cacheType : 'keep-alive'
		return data
	}
})
export function setNextData ({target, title}) {
	tabPreStorage.data = {
		target,
		title
	}
}
export default tabPreStorage
