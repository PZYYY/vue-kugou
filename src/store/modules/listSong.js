/*
* @Author: peng
* @Date:   2017-08-22 00:44:39
* @Last Modified by:   peng
* @Last Modified time: 2017-08-30 22:48:14
*/

'use strict';
const listSong={
	state:{
		//定义播放器的初始状态
		audio:{ songUrl:'',
				lyrics:'',
				name:''
			}
	},
	mutations:{
		 set_State:(state,newState)=>{
		 	state.audio.songUrl=newState.play_url;
		 	state.audio.lyrics=newState.lyrics;
		 	state.audio.name=newState.audio_name;
		 }
	},
	actions:{
		 com_State({ dispatch,commit, state},newState){
			commit('set_State',newState)
		}
	}
}
export default listSong;