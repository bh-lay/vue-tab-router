import {setNextData} from './tab-pre-storage.js'
export default {
	name: 'tab-router-bar',
	props: {
		list: {
			type: Array,
			default () {
				return []
			}
		},
		active: {
			type: Object
		},
		defaultRoutePath: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
		}
	},
	render (h) {
		let tabListVnode = this.list.map((item, index) => {
			let titleSlot = this.$parent.$scopedSlots['tab-title']

			return h(
				'tab-router-link',
				{
					class: ['tab-item', this.active === item ? 'active' : ''],
					props: {
						to: item.path,
						target: item.name
					},
					key: item.name
				},
				[
					h(
						'span',
						{
							class: 'tab-body'
						},
						[
							titleSlot
								? titleSlot({
									tab: item
								})
								: item.title
						]
					),
					h(
						'span',
						{
							class: 'tab-close',
							on: {
								click: (event) => {
									this.removeItem(index)
									event.preventDefault()
								}
							},
							directives: [
								{
									name: 'show',
									value: this.list.length > 1
								}
							]
						},
						['×']
					)
				]
			)
		})
		return h(
			'div',
			{
				class: 'tab-list'
			},
			tabListVnode
		)
	},
	methods: {
		removeItem (index) {
			if (this.active === this.list[index]) {
				let newIndex
				if (index < this.list.length - 1) {
					newIndex = index + 1
				} else if (index > 0) {
					newIndex = index - 1
				} else {
					newIndex = -1
				}
				if (newIndex > -1) {
					let nextTab = this.list[newIndex]
					setNextData({
						target: nextTab.name,
						forceRefresh: false
					})
					this.$router.replace(nextTab.path)
				} else {
				}
			}
			this.list.splice(index, 1)
		}
	}
}
