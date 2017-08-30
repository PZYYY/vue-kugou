/*
* @Author: peng
* @Date:   2017-08-29 22:33:04
* @Last Modified by:   peng
* @Last Modified time: 2017-08-29 22:43:27
*/

'use strict';
const songs={
	state:{
		//定义播放器的初始状态
		songs:[]
	},
	mutations:{
		 set_detState:(state,newState)=>{
		 	state.songs=newState;
		 }
	},
	actions:{
		 com_detState({ dispatch,commit, state},newState){
			commit('set_detState',newState)
		}
	}
}
export default songs;