import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {get_token} from './vuex/getters'
import store from './vuex/store'

import configRouter from './router'

Vue.use(VueRouter)
var router = new VueRouter();

configRouter(router)

router.beforeEach((transition)=>{
	const token = get_token(store.state)
	if(transition.to.auth){
		if(token){
			transition.next()
		}else {
			const redirect = encodeURIComponent(transition.to.path);
      		transition.redirect({ name: 'join', query: { redirect } });
		}
	}else {
		transition.next()
	}
})

router.start(Vue.extend(App),'#app')

export default router;