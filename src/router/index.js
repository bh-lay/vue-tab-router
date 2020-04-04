import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index.vue'
import Inbox from '@/view/inbox.vue'
import Outbox from '@/view/outbox.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/index'
		},
		{
			path: '/index',
			name: 'index',
			component: Index,
			meta: {
				title: '控制台'
			}
		},
		{
			path: '/inbox',
			name: 'inbox',
			component: Inbox,
			meta: {
				title: '收件箱'
			}
		},
		{
			path: '/outbox',
			name: 'outbox',
			component: Outbox,
			meta: {
				title: '发件箱'
			}
		}
	]
})
