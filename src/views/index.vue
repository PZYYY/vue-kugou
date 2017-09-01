<template>
	<div class="i">
		<!-- 头部 -->
		<div class="top">
			<img src="../assets/images/logo.png" alt="">
			<p>我好像在哪见过你</p>
		</div>
		<!-- 导航 -->
		<div class="nav">
	 		<ul>
	  			    <li>首页</li>
	  				<router-link to="/rank"><li>排行</li></router-link>
	  				<router-link to="/songList"><li>歌单</li></router-link>
	  				<router-link to="/other"><li>其他</li></router-link>
	  			 </ul>
		</div>
		<!-- 轮播 -->
		<div class="Carousel">
			<mt-swipe :auto="4000">
	  		  <mt-swipe-item><img src="../assets/images/a.jpg" width="100%"></mt-swipe-item>
	  		  <mt-swipe-item><img src="../assets/images/b.jpg" width="100%"></mt-swipe-item>
	  		  <mt-swipe-item><img src="../assets/images/c.jpg" width="100%"></mt-swipe-item>
	  		</mt-swipe> 
		</div>
		<!-- 中间层 -->
		<div class="content">
			<router-link to="/songList">
		<div class="local">
		    <img src="../assets/images/mysong.png" alt="" >
			<span>本地音乐</span>
		</div>
			</router-link>
		<div class="local2">
		  <router-link to="/collect">
			<div class="lo2">
				<img src="../assets/images/co.png" alt="" >
				<span>收藏</span>
			</div>
		</router-link>
			<router-link to="/rank">
				<div class="lo2">
					<img src="../assets/images/ph.png" alt="" >
					<span>排行</span>
				</div>
			</router-link>
			
		</div>
		<div class="local2">
		  <router-link to="/love">
			<div class="lo2">
				<img src="../assets/images/like.png" alt="" >
				<span>我喜欢</span>
			</div>
		  </router-link>
		  <router-link to="/about">
		  	<div class="lo2">
		  		<img src="../assets/images/about.png" alt="" >
		  		<span>关于他</span>
		  	</div>
		  </router-link>
		</div>
		</div>
		<All></All>
	</div>
</template>
<script>
import All from './all'
	export default{
		components:{ All },
		data(){
			return{
				Rolls:[],//轮播json数据
				newsongsList:[0],  //新歌json数据
				loading:false

			}
		},
		mounted:function(){
			this.getData();
		},
		methods:{
			//请求json轮播图
			getData:function(){  
				let page1=this;
				this.$http.get('../../static/jsons/roll.json').then(function(response){
					page1.Rolls=response.data;  //将返回的json赋值给Roll数组
				},function(response){
					console.log("抱歉,轮播图请求失败了 T_T ")
				});
			},
			loadMore() {  //自动加载
			  this.loading = true;
			  setTimeout(() => {
			    let last = this.newsongsList[this.newsongsList.length - 1];
			    for (let i = 1; i <= 10; i++) {
			      this.newsongsList.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			}
			
		}
	}
</script>
<style scoped>
	.i{
	 	width: 100%;
	 	height:100%;
		background: url('../assets/images/iBack2.jpg') no-repeat;
		background-size:100% 100%;
		position:fixed;
    	top:0;
    	left: 0;
    	right: 0;

	} 
    .top{
    	position:fixed;
    	width: 100%;
    	background:rgba(0,0,0,0.6);
    	top:0;
    	left: 0;
    	right: 0;
    }
    .top img{
    	width:10%;
    	float: left; 
        margin: 1.2% 0% 2% 2%;
    }
    .top p{
    	  margin: 0rem;
    	  padding: 0rem; 
    	   float:right;
    	   color:#d9d9d9;
    	   font-weight:bold;
    	   font-size:2.5rem;
    	   margin-right:5%;
    	   font-family:"华文行楷";
    	   margin-top:5%;
    }
     .nav{
	   	 width: 100%;
	   	 height:6%;
	   	 clear:both;
	   	 margin-top: 4rem;
   	}
    .nav ul li{
	   	 width: 22%;
	   	 color:#005151;
	   	 list-style:none;
	   	 float: left;
	   	 font-size: 1.7rem;
	   	 text-align: center;
	   	 padding-top:1.4rem;
   	} 
   	.Carousel{
   		width: 100%;
   	}
    .mint-swipe{
  		position: fixed;
  		width:100%;
  		height:25%;
  		} 	
	.content{width: 100%;
			 margin-top:60%;
			 }
	.local{
		margin: auto;
		width:82%;
		height: 7rem;
		color: #fff;
		font-family: "华文彩云";
		font-size: 3rem;
		line-height: 7.5rem;
		background:rgba(0,0,0,0.6);
	}
	.local img{
		width:3.8rem;
		padding-top:1.8rem;
		padding-left:6rem;
		float: left;
	}
	.local span{
		margin-left:-3rem;
	}
	.local2{
		width:100%;
		height: 4rem;
		text-align: center;
		margin: auto;
		padding-left: 10%;
	}
	.lo2{
			margin-top: 1rem;
			margin-right:1.6rem;
			width:38%;
			height:4rem;
			color: #fff;
			font-family: "华文彩云";
			font-size: 2rem;
			line-height: 4rem;
			background:rgba(0,0,0,0.6);
			float: left;
		}
	.lo2 img{
		width:1.5rem;
		padding-top:1.2rem;
		padding-left:1.5rem;
		float: left;
	}
	.lo2 span{
		margin-left: -1.2rem;
	}
</style>