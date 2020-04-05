// thanks to https://github.com/vuejs/vue-router/blob/v3.1.6/src/components/link.js
import {setNextData} from './tab-pre-storage.js'

function guardEvent (e) {
	if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
	if (e.defaultPrevented) return
	if (e.button !== undefined && e.button !== 0) return
	if (e.currentTarget && e.currentTarget.getAttribute) {
		const target = e.currentTarget.getAttribute('target')
		if (/\b_blank\b/i.test(target)) return
	}
	if (e.preventDefault) {
		e.preventDefault()
	}
	return true
}

export default {
	name: 'tab-router-link',
	props: {
		to: String,
		replace: {
			type: Boolean,
			default: false
		},
		target: {
			type: String,
			// _blank、[name]
			default: '_blank'
		},
		forceRefesh: {
			type: Boolean,
			default: false
		},
		tabTitle: String,
		cacheType: String
	},
	render (h) {
		let vm = this
		return h(
			'a',
			{
				class: [
					'tab-router-link',
					this.$route.path === this.to ? 'tab-router-link-active' : ''
				],
				on: {
					click (event) {
						if (guardEvent(event)) {
							setNextData({
								target: vm.target,
								tabTitle: vm.tabTitle,
								forceRefesh: vm.forceRefesh,
								cacheType: vm.cacheType
							})
							if (vm.replace) {
								vm.$router.replace(vm.to)
							} else {
								vm.$router.push(vm.to)
							}
						}
					}
				}
			},
			this.$slots.default
		)
	},
	mounted () {
	},
	methods: {
	}
}
