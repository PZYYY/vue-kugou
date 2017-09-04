<template>
	<div class="r">
			<!--返回键 搜索栏 -->
		<div class="top">
				<router-link to="/all/index"><mt-button><</mt-button></router-link>
				<div @keyup.enter="search()" style="width:100%">
					<mt-search
					  v-model="value"
					  cancel-text="取消"
					  placeholder="搜索歌曲">
					</mt-search>
				</div>
					
		<img src="../assets/images/rank.jpg" alt=""  >
		</div>
		<!-- 排行列表 -->
		<div class='list'>
		<!-- infinite-scroll-immediate-check 当没有数据时不加载 -->
			<ul
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-immediate-check="false"   
			  infinite-scroll-distance="10">
			  <li v-for="(item,index) in list.ranksongsList">
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
					ranksongsList:[]
				},
				loading:false,
				value:"",
				songSrc:"",
				oneHash:""
			}
		},
		// dataType: '
		mounted:function(){
			this.getData();		
		},
		methods:{
			getData:function(){
				var rankpage=this;
			    this.$http.get(api.getRank).then(function(response){
			    	rankpage.list.ranksongsList=response.data.rankSongs; //json数据必须是对象 
			    	//将json数据传入Vuex
			    	store.dispatch('com_detState',response.data.rankSongs)
			    },function(response){
			    	console.log("抱歉，新歌列表请求失败了 T_T ")
			    });
			},

			loadMore() {  //自动加载
			  this.loading = true;
			  setTimeout(() => {
			    let last = this.list.ranksongsList[this.list.ranksongsList.length - 1];
			    for (let i = 1; i <= 10; i++) {
			      this.list.ranksongsList.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			},

			//播放
			play(index){  //index为列表中的索引
				var that=this;
				this.oneHash=this.list.ranksongsList[index].hash;
				console.log("歌曲的hash：",this.oneHash)  //可拿到hash
				//jsonp 解决ajax跨域请求问题    this.axios.get
				let url = '/yy/index.php?r=play/getdata&hash='+this.oneHash  //解决跨域问题
   				//http://www.kugou.com/yy/index.php?r=play/getdata&hash=DF3926E1293530EF351F52B9C2260BE7
				this.$http.get(url).then(function(response){
						console.log("response：",response);
						//this.list=response.data.data;   //返回的json数据对象
						console.log("赋值后的list",response.data.data)
					    store.dispatch('com_State',response.data.data) 

				    },function(response){
					    console.log("抱歉，新歌列表请求失败了 T_T ",response)
				});
			},
			
			del(index){
				this.list.ranksongsList.splice(index,1)
			},
			//搜索
			search(){
				this.$http.get(api.getRank).then(function(response){
					let v=this.value;
					let len=this.list.ranksongsList.length;
					let rankArr=[];
					let newArr=[];
					for(let i=0;i<len;i++){
						rankArr.push(this.list.ranksongsList[i].songName);
					}
					if(rankArr.indexOf(v)!=-1){
						//rankArr.indexOf(this.value)]返回输入值在rankArr中的索引值
							newArr.push(this.list.ranksongsList[rankArr.indexOf(this.value)])
							console.log(newArr);
							this.list.ranksongsList=newArr;
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
    .r{ width: 100%;
    	height:100%;	
    	background: url('../assets/images/iBack.jpg') no-repeat;
    	background-size:cover;
    	overflow: auto;
    	position: fixed;
    	}
	.top{position: fixed;
		width: 100%;
		height: 35%;
	}
	.top img{
		 width:100%;
	}
	 .mint-search {
	   float:right;
	   width: 88%;
	   height:7%;
       margin-left: 12%;
       position:fixed;
	  } 
     .mint-button{
     	background:#d9d9d9;
     	font-family:"宋体"; 
     	float: left;
     	font-size:3rem;
     	width: 12%;
     	height:20%;
     	border-radius: 0px;
     }
     .list{
     	   margin-top:-0.3rem;
     	   padding-left: 4%;
     	   padding-right:4%;
     	   padding-top: 48%;
     	   padding-bottom: 4rem;
     	   overflow:hidden;
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
     	color: #000;
     	border-top:0.5px solid #d9d9d9;
     	text-align:left;
     	line-height:3.5rem;
     	padding:0px 1% 0px 3%;
     }
      .mint-tab-item {
         position: fixed;
         bottom: 0px;
         width: 2.5rem;
         height: 2.5rem;
         padding: 4px 0;
     }
     .mint-tab-item-icon > * {
         width: 2.5rem;
         height:2.5rem;
     }

</style>