<template>
	<div class="o">
	<div class="top">
		<img src="../assets/images/logo.png" height="80%" >
		<p>我好像在哪见过你</p>
		<div class="nav">
			 <ul>
			 	<router-link to="/all/index"><li>首页</li></router-link>
				<router-link to="/all/rank"><li>排行</li></router-link>
				<router-link to="/all/songList"><li>歌单</li></router-link>
				<li>其他</li>
			 </ul>
		</div>
		<div class="search">
			<!-- <router-link to="/all/index"><span><</span></router-link> -->
			<div  @keyup.enter="search()">
				<mt-search
				  v-model="value"
				  cancel-text="取消"
				  placeholder="搜索" >
				</mt-search>	
			</div>
			
		</div>
	</div>
	<div class='list'>
		<ul
		  infinite-scroll-immediate-check="false"
		  v-infinite-scroll="loadMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10">
		  <li v-for="(item,index) in list.songlist">
		     {{index+1}}
		      <span  @click="play(index)">{{ item.songName }}</span>
		     <img src="../assets/images/delete.png" alt="" @click="del(index)">
		  </li>
		</ul>
	</div>
	<!-- <All></All> -->
	</div>
</template>
<script>
import store from '../store/index'
import {api} from '../global/api'
// import All from './all'
	 export default{
	 	// components:{ All }, 
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
				    this.$http.get(api.getOther).then(function(response){
				    	listpage.list.songlist=response.data.other;
				    	store.dispatch('com_detState',response.data.other)
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
				},
				//删除
				del(index){
					this.list.songlist.splice(index,1)
				},
				//搜索
				search(){
					this.$http.get(api.getRank).then(function(response){
						let v=this.value;
						let len=this.list.songlist.length;
						let rankArr=[];
						let newArr=[];
						for(let i=0;i<len;i++){
							rankArr.push(this.list.songlist[i].songName);
						}
						if(rankArr.indexOf(v)!=-1){
							//rankArr.indexOf(this.value)]返回输入值在rankArr中的索引值
								newArr.push(this.list.songlist[rankArr.indexOf(this.value)])
								console.log(newArr);
								this.list.songlist=newArr;
							}else{
								alert("抱歉，没有找到输入歌曲")
							}	
					},function(response){
						console.log("抱歉，请求失败了 T_T ")
					});

				}
			}
	}
</script>
<style scoped>
	.o{
		width: 100%;
		height:100%;
		background: url('../assets/images/iBack.jpg') no-repeat;
		background-size:100% 100%;
		position: fixed;
		overflow: auto;
	}
	.top{
		width: 100%;
		background:rgba(0,0,0,0.6);
		height:4rem;
	    line-height:1.5rem;
	    position: fixed;
	}
	.top img{float: left; 
			 margin: 1.2% 0% 2% 2%;
			}
	p{ float:right;
	   height:0px;
	   color: #fff;
	   font-weight:bold;
	   font-size:2.5rem;
	   margin-right:5%;
	   font-family:"华文行楷";
	}
	.nav{width:100%;
		 /* line-height: 2rem; */
		 clear:both;	
		 padding-top: 0.1rem;
		}
	.nav ul li{
		 list-style:none;
		 float:left;
		 font-size: 1.7rem;
		 margin:0rem 1.8rem;
		 color:#005151;	
	}
	.search{
		/*width: 100%;*/
		clear: both;
	}
	.mint-search {
	   float:right;
	   width: 100%;
       height: 7%;
      }
   .mint-button{
 	background:#d9d9d9;
 	font-family:"宋体"; 
 	float: left;
 	font-size:2rem;
 	width: 15%;
 	height:3.1rem;
 	border-radius: 0px;
 }  
     .list{
     	   clear: both;
     	   padding-left: 4%;
     	   padding-right:8%;
     	   padding-top:33%;
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
     	height:3.5rem;
     	list-style:none;
     	font-size: 1.5rem;
     	border-bottom:0.5px solid #d9d9d9;
     	text-align:left;
     	line-height:3.2rem;
     	padding:0px 1% 0px 3%;
     	color: #000;
     }
</style>