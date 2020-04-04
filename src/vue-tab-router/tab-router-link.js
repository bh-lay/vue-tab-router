export default {
	name: 'tab-router-link',
	props: {
		to: [String, Object],
		replace: Boolean
	},
	render (h) {
		return h(
			'router-link',
			{
				props: {
					to: this.to,
					replace: this.replace
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
