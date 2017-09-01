<template>
	<div class="about">
	  <!-- 头部 -->
		<div class="c">
			<div class="top">
				<router-link to="/index"><span><</span></router-link>
				<!-- <span><</span> -->
				<p>About薛之谦</p>
			</div>
		</div>
		<div class="content">
			<div>薛之谦</div>
			<div>名言：我的心愿是世界和平</div>
			<div>1983年7月17日 | 上海 | 中国</div><br>
			<div>
			&nbsp;&nbsp;&nbsp;&nbsp;薛之谦（Joker Xue），1983年7月17日出生于上海，华语流行乐男歌手、影视演员、音乐制作人，毕业于格里昂酒店管理学院。<br>
			&nbsp;&nbsp;&nbsp;&nbsp;2005年，因参加选秀节目《我型我秀》而正式出道。十年沉浮，不温不火，期间通过经商获取资金坚持音乐创作，2015年凭借优异的创作才华，幽默的性格及出众的颜值重回大众视野，获奖无数，红透半边天。2017年4月，“我好像在哪见过你”全国巡回演唱会在大连开启，点燃整个春夏......
			</div>
			
		</div>
		</div>
	   
</template>
<script>

</script>

<style scoped>
.about{
	width: 100%;
	height:100%;
	background: url('../assets/images/aback.png') no-repeat;
	background-size:cover;
	overflow: hidden;
	position: fixed;
}
.c{ 
	width: 100%;
	position: fixed;

}
.content{
	padding:14rem 1rem 0rem 1rem;
	text-align:left;
}
div:nth-of-type(1){  /* 选择相同元素的第一个 */
	font-size:3rem;
}
div:nth-of-type(2){
	font-size:2rem;
	color:#012c45;
}
div:nth-of-type(3){
	font-size:2rem;
	color:#012c45;
}
div:nth-of-type(4){
	font-size:1.8rem;
	color:#012438;
}
.top{
	width: 100%;
	background:rgba(0,0,0,0.6);
	height:4rem;
    line-height:1.5rem;
	text-align: left;
}
span{
	font-family:"宋体";
	color:#028fe2; 
	float: left;
	font-size:4rem;
	padding-left:1rem;
	padding-top:1.5rem;
}
p{ float:right;
   font-weight:bold;
   font-size:2.5rem;
   color:#ebebeb;
   margin-right:1rem;
   font-family:"华文行楷";
}
</style>