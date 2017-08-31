// import permission_default from 'src/global/permission_default'

const getters = {
  	list_get:state=>{
  		//返回初始状态的值
  		return state.songlist.audio
  	},
  	songs_get:state=>{
  		return state.songs.songs
  	},
  	collect_get:state=>{
  		return state.collect.mycollect
  	}
    
};
export default getters
