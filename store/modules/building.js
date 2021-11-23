
const state = {
    model:{id:0,name:"请选择楼栋信息"},
	buildings:[],
}
const getters={
}
const mutations = {
    update(state,value){
        state.model = value;
    },
	updatebuildings(state,value){
		state.buildings = value
		 uni.setStorage({
		     key: 'buildings',
		     data: value
		 })
	}
}
const actions ={
    update(context,value){
        context.commit("update",value)
    },
	updatebuildings(context,value){
		context.commit("updatebuildings",value)
	}
}
export default{
    namespaced:true,
    state,mutations,actions,getters
}