/*
* @Author: peng
* @Date:   2017-08-29 22:33:04
* @Last Modified by:   peng
* @Last Modified time: 2017-08-29 22:43:27
*/

'use strict';
const collect={
	state:{
		//定义播放器的初始状态
		myCollect:[]
	},
	mutations:{
		 set_coState:(state,newState)=>{
		 	state.myCollect=newState;
		 }
	},
	actions:{
		 com_coState({ dispatch,commit, state},newState){
			commit('set_coState',newState)
		}
	}
}
export default collect;