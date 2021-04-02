export default (router)=>router.map({
	'/':{
		name:'join',
		component:require('./views/join')
	},
	'/index':{
		name:'index',
		component:require('./views/index'),
		auth:true
	}
})