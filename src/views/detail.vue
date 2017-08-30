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
				<img class="img1" src="../assets/images/last.png" width="20%" @click="last(index)">
				<img class="img2" src="../assets/images/stop.png" width="30%" @click="playPause">
				<img class="img3" src="../assets/images/next.png" width="20%">
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
	    	songInf:store.state.listSong.audio
	    }
	  },
	  mounted:function(){
	  	  document.getElementById("audio").currentTime = localStorage.getItem('currentTime')  //本地取值歌曲进度
	  },
	  methods:{
	    playPause(){
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
	    Back(){
	    	let audio=document.getElementById('audio');
	    	localStorage.setItem('currentTime',audio.currentTime);//本地存值
	    },
	    Collect(){
	    	document.getElementById('sc').setAttribute('src','../assets/images/love.png')
	    },
	    last(index){
	    	//拿到正在播放的歌曲的索引值
	    },
	    next(){

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
		height:14rem;
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