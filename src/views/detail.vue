<template>
	<div class="d">
		<div class="top">
			<router-link to="/all/rank"><p @click="Back"><</p></router-link>
			<span v-model="songInf.name">{{songInf.name}}</span>
		</div>
		<div class="middle" v-model="songInf.lyrics">
			{{songInf.lyrics}}
		</div>
		<div class="middle2">
			<img src="../assets/images/sc.png" width="9%" id="sc" @click="Collect">
			<img src="../assets/images/love.png"  width="11%" id="love">
		</div>
		<div class="bottom">
			<audio :src="songInf.songUrl" controls autoplay loop id="audio"></audio>
			<div class="imgs">
				<img class="img1" src="../assets/images/last.png" width="20%" @click="last">
				<img class="img2" src="../assets/images/stop.png" width="30%" @click="playPause">
				<img class="img3" src="../assets/images/next.png" width="20%" @click="next">
			</div>
			
		</div>
	</div>
	</template>
<script>
	import store from '../store/index'
	export default {
	  name: 'app',
	  data(){
	    return{
	    	songInf:store.state.listSong.audio,
	    	songsjson:store.state.songs.songs,
	    	add:[],
	    	collect:{
	    		songName:store.state.listSong.audio.name,
	    		hash:store.state.listSong.audio.Hash
	    	}
	    }
	  },
	  mounted:function(){
	  	  document.getElementById("audio").currentTime = localStorage.getItem('currentTime')  //本地取值歌曲进度
	  },
	  methods:{
	    playPause(){  //暂停播放
	    	var myaudio=document.getElementById("audio");
	    	var myimg=document.getElementsByClassName('img2');
	    	if(myaudio.paused){   //paused()暂停播放
	    		myaudio.play();
	    		myimg.src='../assets/images/start.png'
	    	}else{
		    	myaudio.pause();
		    	myimg.src='../assets/images/stop.png'
	    	}
	    },
	    Back(){  //返回
	    	let audio=document.getElementById('audio');
	    	localStorage.setItem('currentTime',audio.currentTime);//本地存值
	    },
	    Collect(){
	    	// document.getElementById('sc').setAttribute('src','../assets/images/love.png')
	    	// document.getElementById('sc').src='../assets/images/love.png'
	    	// var c=JSON.parse(JSON.stringify(this.collect))
	    	var c=this.collect;
	    	this.add.push(c);
	    	store.dispatch('com_coState',this.add);
	    	this.$router.push({path:'/all/collect'})  //跳转页面
	    },
	    last(){  //上一首
	    	console.log("json中的所有数据",this.songsjson);  //拿到json中的所有数据
	    	console.log("正在播放歌曲的信息",this.songInf);
	    	let songsHash=[];  //遍历将列表中所有的hash存入数组
	    	for(let i=0;i<this.songsjson.length;i++){
	    		songsHash.push(this.songsjson[i].hash)
	    	} 
	    	let index=songsHash.indexOf(this.songInf.Hash);  //正在播放的歌曲在json数组中的索引
	    	console.log(index)
	    	let lasthash=songsHash[index-1]
			let url = '/yy/index.php?r=play/getdata&hash='+lasthash  //解决跨域问题
			this.$http.get(url).then(function(response){
					//this.list=response.data.data;   //返回的json数据对象
				    store.dispatch('com_State',response.data.data) 
			    },function(response){
				    console.log("抱歉，新歌列表请求失败了 T_T ",response)
			});		
	    },
	    next(){  //下一首
	    	let songsHash=[];  //遍历将列表中所有的hash存入数组
	    	for(let i=0;i<this.songsjson.length;i++){
	    		songsHash.push(this.songsjson[i].hash)
	    	} 
	    	let index=songsHash.indexOf(this.songInf.Hash);  //正在播放的歌曲在json数组中的索引
	    	console.log(index)
	    	let nexthash=songsHash[index+1]
			let url = '/yy/index.php?r=play/getdata&hash='+nexthash  //解决跨域问题
			this.$http.get(url).then(function(response){
					//this.list=response.data.data;   //返回的json数据对象
				    store.dispatch('com_State',response.data.data) 
			    },function(response){
				    console.log("抱歉，新歌列表请求失败了 T_T ",response)
			});		
	    }
	  }
	}
</script>
<style scoped>
	*{margin:0rem;
	  padding:0rem;
	}
	.d{
		width:100%;
		height: 100%;
		background:url('../assets/images/dBack.jpg') no-repeat;
		background-size: 100% 70%;
		position: fixed;
	}
	
	.top{
		width: 100%;
		height:4rem;
	    line-height:2rem;
		text-align: left;
		margin-bottom:2rem;
	}
	p{
		font-family:"宋体";
		color:#028fe2; 
		float: left;
		font-size:3rem;
		padding-left:1rem;
		padding-top:0.8rem;
	}
	span{
		width:100%;
		line-height:3.5rem;
		color:#028fe2; 
		font-size:2rem;
		margin-left:2rem;
	}
	.middle{
		width:100%;
		height:48%;
		font-size:1.8rem;
		overflow:auto;
	}
	.middle2{
		padding:2rem 3rem 0rem 3rem;

	}
	.middle2 img:first-child{
		float: left;
	}
	.middle2 img:last-child{
		float: right;
	}
	.bottom{
		width: 100%;
		height: 30%;
		position: fixed;
		bottom: 0rem;
		background:rgba(0, 0, 0, 0.2);
		padding: auto;
	}
	audio{width:100%;
		}
	.imgs{
		width:100%;
		height:15rem;
		padding-left:1rem;
		display:table-cell;
	    vertical-align:middle;
	}
    .img1,.img3{margin-bottom:1rem; }
	.img2{
		margin-left: 2rem;
		margin-right:2rem;
	 }
</style>