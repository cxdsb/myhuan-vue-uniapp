<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			
			<view class="inputView">
				<input class="textinput" style="text-align: center;" type="text" value="" placeholder="寻找商品" @click="gosearch()" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->

		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" scroll-x="{true}">
				<!-- 循环遍历一级分类 -->
				<block v-for="(item,index) of topCates">
					<view class="uni-tab-item">
						<!-- uni-tab-item-title-active -->
						<text :class="topIndex == index ? 'uni-tab-item-title-active uni-tab-item-title':'uni-tab-item-title'" @click="toproduct(index,item.id,item.catename)">{{item.catename}}</text>
					</view>
				</block>

			</scroll-view>

			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="banner-container">
			<swiper :circular="true" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) of bannerlist" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>


			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="@/static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toclassifg()">
				<image src="@/static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="@/static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{ timeObj.h }}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{ timeObj.m }}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{ timeObj.s }}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="seckill.img" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="@/static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="@/static/index/swiper.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="goodsIndex == 0 ? 'tag_list active_tag_list':'tag_list' " @click="goodsIndexchange(0)">
					<label for="">热门推荐</label>
				</view>
				<view :class="goodsIndex == 1 ? 'tag_list active_tag_list':'tag_list' " @click="goodsIndexchange(1)">
					<label for="">最新好货</label>
				</view>
				<view :class="goodsIndex == 2 ? 'tag_list active_tag_list':'tag_list' " @click="goodsIndexchange(2)">
					<label for="">所有商品</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<block v-if="indexgoods.length > 0">
					<view class="product" v-for="(item,index) of indexgoods[goodsIndex].content" :key="item.id" @click="todetails(item.id,item.goodsname)">
						<view class="GoodsLeft">
							<image class="GoodsImg" :src="item.img" alt />
						</view>
						<view class="GoodsCont">
							<view class="GoodConTit">{{ item.goodsname }}</view>
							<view class="GoodsPrice">￥{{ item.price }}</view>
							<view class="yimai">已售50件</view>
							<view class="Immed">立即抢购</view>
						</view>
					</view>
				</block>
			</view>

		</view>
	</view>
</template>

<script>
	// import Api from '../../utils/api.js'
	export default {
		data() {
			return {
				topIndex: 0,
				goodsIndex: 0,
				bannerlist: [],
				topCates: [],
				indexgoods: [],
				seckill: {},
				timeObj:{}, //倒计时的时间对象
				timer:null, //定时器
			}
		},
		onShow() {

			this._getBanner(),
				this._getTopCates(),
				this.getindexgoods(),
				this.getseckill()
		},

		methods: {
			// 秒杀
			async getseckill() {
				let res = await this.api._getseckill()
res.data.list = res.data.list || []
// console.log(res.data.list[0].endtime)
if(res.data.list == [])return
				res.data.list[0].img = this.baseUrl + res.data.list[0].img;
				this.seckill = res.data.list[0]
				// console.log(this.seckill.endtime)
				this._setSeckill(this.seckill.endtime)
			},
			// 倒计时
			_setSeckill(endtime) {
				if (this.timer) clearInterval(this.timer);
			this.timer = setInterval(()=>{
								//倒计时时间差计算
								let t = parseInt((endtime - new Date().getTime()) / 1000);  // s 秒			
								let h,m,s;
								h = parseInt(t/3600);   //  小时
								m = parseInt(t%3600 /  60)  //分钟
								s =  t % 60;  // 秒数
								// 设置格式   
								h = h <10? "0"+h : ""+h;
								m = m <10? "0"+m : ""+m;
								s = s <10? "0"+s : ""+s;
								this.timeObj = {h,m,s};
							},1000)	
			},
			//轮播图
			async _getBanner() {
				let res = await this.api._getbanner()
				console.log(res)
				res.data.list.map((item) => {
					item.img = this.baseUrl + item.img
				})
				this.bannerlist = res.data.list
				console.log(this.bannerlist)
			},
			// 首页一级分类
			async _getTopCates() {
				let res = await this.api._getTopCates()
				this.topCates = res.data.list
				// console.log(this.topCates)

			},
			// 跳转分类
			toproduct(index, id, title) {
				this.topIndex = index;
				// console.log(this.topIndex)
				uni.navigateTo({
					url: `../product/product?id=${id}&title=${title}`
				})
			},
			//获取首页商品分类下标
			goodsIndexchange(index) {
				// console.log(index)
				this.goodsIndex = index

			},
			async getindexgoods() {
				let res = await this.api._getindexgoods()
				// console.log(res.data.list)
				res.data.list.map((item) => {
					item.content.map((val) => {
						val.img = this.baseUrl + val.img
					})
				})
				this.indexgoods = res.data.list
				// console.log(this.indexgoods.length)
			},
			//去详情页
			todetails(id, title) {
				uni.navigateTo({
					url: `../details/details?id=${id}&title=${title}`
				})
			},
			//去商品分类
			toclassifg() {
				uni.navigateTo({
					url: "../classify/classify"
				})
			},
			// 去搜索页
			gosearch(){
				uni.navigateTo({
					url: "../search/search"
				})
			}
		}

	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
