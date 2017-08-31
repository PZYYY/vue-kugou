<template>
	<div class="l">
	  <!-- 头部 -->
		<div class="c">
			<div class="top">
				<img src="../assets/images/logo.png" alt="" height="80%" >
				<p>我好像在哪见过你</p>
			</div>
			<div class="nav">
				 <ul>
				 	<router-link to="/all/index"><li>首页</li></router-link>
					<router-link to="/all/rank"><li>排行</li></router-link>
					<li>歌单</li>
					<router-link to="/all/other"><li>其他</li></router-link>
				 </ul>
			</div>
			<div  @keyup.enter="search()">
				<mt-search
				  v-model="value"
				  cancel-text="取消"
				  placeholder="搜索">
				</mt-search>
			</div>
			
		</div>
		<!-- 歌单列表 -->
		<div class='list'>
			<ul
			  infinite-scroll-immediate-check="false"
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="10">
			  <li v-for="(item,index) in list.songlist">
			     {{index+1}}
			     <span @click="play(index)">{{ item.songName }}</span>
			     <img src="../assets/images/delete.png" alt="" @click="del(index)">
			  </li>
			</ul>
		</div>
		
	</div> 
</template>
<script>
 import store from '../store/index'
 import {api} from '../global/api'
 export default{
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
		    this.$http.get(api.getList).then(function(response){
		    	listpage.list.songlist=response.data;
		    	store.dispatch('com_detState',response.data)	
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
.l{
	width: 100%;
	height: 100%;
	background: url('../assets/images/iBack.jpg') no-repeat;
	background-size:cover;
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
	    line-height:1rem;
		text-align: left;
	}
	.top img{
		     float: left;
		     margin:0.3rem 0rem 0rem 0.5rem;
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
		 padding-top: 0.1rem;
		 clear:both;	
		}
	.nav ul li{
		width:18%;
		text-align: center;
		list-style:none;
		float:left;
		font-size: 1.7rem;
		margin:0rem 0.5rem;
		color:#005151;
	}
	.mint-search {clear: both;
				  height: 7%;}
	.list{
		   /*margin-top:-0.3rem;*/
		   padding-left: 4%;
		   padding-right:8%;
		   padding-top: 38%;
		   padding-bottom: 4rem;
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