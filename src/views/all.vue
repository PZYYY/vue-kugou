	<template>
		<div>

			<router-view></router-view>
			<!-- 底部播放器 -->
			<router-link to="/detail">
			  <div class="bloser">
			    <mt-tab-item>
			      <img slot="icon" src="../assets/images/bottom.jpg" @click="detail">
			    </mt-tab-item>
			     <audio :src="songSrc.songUrl" controls autoplay loop id="myaudio"></audio>
			  </div>
			</router-link>
		</div>
	</template>
	<script>
	import store from '../store/index'
	 export default{
	 	data(){
	 	  return{
	 	     songSrc:store.state.listSong.audio
	 	  }
	 	},
	 	mounted:function(){
	 	     document.getElementById("myaudio").currentTime=localStorage.getItem('currentTime')  //本地取值 
	 	},
	 	methods:{
	 	   detail(){
	 	   	  var myaudio=document.getElementById("myaudio");
	 	   	  console.log(myaudio.currentTime)
	 	   	  localStorage.setItem('currentTime',myaudio.currentTime)   //本地存储

	 	   }
	 	}
	 }
		
	</script>
	<style>
		 .bloser{width: 100%;
		         height: 4rem;
		         line-height: 4rem;
		         background:rgba(0,0,0,0.5);
		         position: fixed;
		         bottom: 0rem;
		}
		 .mint-tab-item {
		         width:4rem;
		         float: left;
		         padding-top:0.5rem;
		}
		 .mint-tab-item img{ 
		         width:3rem;
		         height:3rem;
		}
		audio{
		         float:right;
		         width:80%;
		         padding-right:2rem;
		         padding-top:0.4rem; 
		}
		
	</style>