<template>
	<div class="tab-list" v-if="list.length > 1">
		<router-link
			v-for="(item, index) in list"
			:key="item.id"
			:to="item.path"
			class="tab-item"
		>
			<span class="tab-body">{{item.title}}</span>
			<span
				class="tab-close"
				@click="removeItem($event, index)"
			>×</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'page-tab-list',
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
	methods: {
		removeItem (event, index) {
			if (this.active === this.list[index]) {
				let newIndex
				if (index < this.list.length - 1) {
					newIndex = index + 1
				} else if (index > 0) {
					newIndex = index - 1
				} else {
					newIndex = -1
				}
				let nextPath = newIndex > -1 ? this.list[newIndex].path : this.defaultRoutePath
				this.$router.push(nextPath)
			}
			this.list.splice(index, 1)

			event.preventDefault()
		}
	}
}
</script>
