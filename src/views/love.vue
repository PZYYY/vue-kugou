<template>
	<div class="love">
	  <!-- 头部 -->
		<div class="c">
			<div class="top">
				<img src="../assets/images/logo.png" alt="" height="80%" >
				<p>我喜欢</p>
			</div>
			<div class="nav">
				 <ul>
				 	<router-link to="/index"><li>首页</li></router-link>
					<router-link to="/rank"><li>排行</li></router-link>
					<router-link to="/songList"><li>歌单</li></router-link>
					<router-link to="/other"><li>其他</li></router-link>
				 </ul>
			</div>
			<mt-search
			  v-model="value"
			  cancel-text="取消"
			  placeholder="搜索">
			</mt-search>
		</div>
		<!-- 歌单列表 -->
		<div class='list'>
			<ul
			  infinite-scroll-immediate-check="false"
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="10">
			  <li v-for="(item,index) in list.songlist"  @click="play(index)">
			     {{index+1}}
			     {{ item.songName }}
			     <img src="../assets/images/delete.png" alt="">
			  </li>
			</ul>
		</div>
		<All></All>
		<!-- <p>歌单</p>
		<router-link to="mine"><mt-button type="danger">歌单</mt-button></router-link> -->
	</div> 
</template>
<script>
 import store from '../store/index'
 import {api} from '../global/api'
 import All from './all'
 export default{
 	components:{ All }, 
	data(){
		return{
			list:{
				songlist:[]
			},
			loading:false,
			value:"",
			songSrc:""
		}
	},
	mounted:function(){
		this.getData();
	},
	methods:{
		//显示列表数据
		getData:function(){
			var listpage=this;
		    this.$http.get(api.getLove).then(function(response){
		    	listpage.list.songlist=response.data.love;
		    	store.dispatch('com_detState',response.data.love)
		    	// console.log(listpage.list.songlist);	
		    },function(response){
		    	console.log("抱歉，新歌列表请求失败了 T_T ")
		    });
		},

		loadMore() {  //自动加载
		  this.loading = true;
		  setTimeout(() => {
		    let last = this.list.songlist[this.list.songlist.length - 1];
		    for (let i = 1; i <= 10; i++) {
		      this.list.songlist.push(last + i);
		    }
		    this.loading = false;
		  }, 2500);
		},
		play(index){  //index为列表中的索引
			var oneHash=this.list.songlist[index].hash;
			console.log("歌曲的hash：",oneHash)  //可拿到hash
			//jsonp 解决ajax跨域请求问题    this.axios.get
			let url = '/yy/index.php?r=play/getdata&hash='+oneHash

				//http://www.kugou.com/yy/index.php?r=play/getdata&hash=DF3926E1293530EF351F52B9C2260BE7
			this.$http.get(url).then(function(response){
					console.log("response：",response);
					//this.list=response.data.data;   //返回的json数据对象
					console.log("赋值后的list",response.data.data)
				    // this.songSrc=response.data.data.play_url;//取到mp3文件并赋值给songSrc
				    store.dispatch('com_State',response.data.data);//分发action
			    },function(response){
				   console.log("抱歉，新歌列表请求失败了 T_T ",response)
			});
		}
	}
}
</script>

<style scoped>
.love{
	width: 100%;
	height:100%;
	background: url('../assets/images/iBack.jpg') no-repeat;
	background-size:100% 100%;
	position: fixed;
	overflow: auto;
}
    .c{ 
    	width: 100%;
    	position: fixed;

    }
	.top{
		width: 100%;
		background:rgba(0,0,0,0.6);
		height:4rem;
	    line-height:2rem;
		text-align: left;
	}
	.top img{
		     float: left;
		     margin: 2.4% 0% 2% 3%;
			}
	p{ float:right;
	   height:0px;
	   font-weight:bold;
	   font-size:2rem;
	   color:#ebebeb;
	   margin-right:6%;
	   font-family:"华文行楷";
	}
	.nav{width:100%;
		 padding-top: 0.1rem;
		 clear:both;	
		}
	.nav ul li{
		 list-style:none;
		 float:left;
		 font-size: 1.7rem;
		 margin:0rem 1.6rem;
		 color:#005151;	
	}
	.mint-search {clear: both;
				  height: 7%;}
	.list{
		   /*margin-top:-0.3rem;*/
		   padding-left: 4%;
		   padding-right:8%;
		   padding-top: 38%;
		  }
	.list img{
		float:right;
		padding-top:1rem;
		padding-right:1rem;
		width:5%;
	}
	.list ul{
		margin:0px;
		padding:0px;
	}
	.list ul li{
		width:100%;
		height:3rem;
		list-style:none;
		border-bottom:0.5px solid #929292;
		text-align:left;
		line-height:4rem;
		font-size: 1.5rem;
		padding:0px 1% 0px 3%;
		color: #000;
		/*padding-bottom: 4rem;*/
	}
	
	 

</style>