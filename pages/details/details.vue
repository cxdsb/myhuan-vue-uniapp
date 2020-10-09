<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goodsinfo.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{ goodsinfo.goodsname }}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{ goodsinfo.price }}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="jian()">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="jia()">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{ goodsinfo.specsname }}</label>
					<block v-for="(item,index) of goodsinfo.specsattr">
						<view :class="specsattrIndex == index ? 'threed3i1active':'threed3i1'" :key="index" @click="changespecsattrIndex(index)">{{item}}</view>
					</block>

				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<rich-text :nodes="goodsinfo.description"></rich-text>
			<!-- <image src="@/static/detail/2.jpg" @load="autoImage" :style="{width:autoWidth+'px',height:autoHeight+'px'}" /> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">交易很好，物流很快</label>
				<view class="evalImage">
					<image src="@/static/detail/pingjia1.jpg">
						<image src="@/static/detail/pingjia2.jpg">
							<image src="@/static/detail/pingjia3.jpg">
				</view>
				<label class="evalTime">2020-02-12</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart()">加入购物车</button>
			<button class="footbtn2" @click="toconfirm()">立即购买</button>
		</view>
	</view>
</template>

<script>
	// 导入图片自适应工具类
	let actionimage = require('../../utils/ActionImage.js');
	export default {
		data() {
			return {
				autoHeight: '',
				autoWidth: '',
				goodsinfo: [],
				specsattrIndex: 0,
				num: 1
			}
		},

		methods: {
			jia() {
				this.num++
				this.goodsinfo.num=this.num
			},
			jian() {
				this.num--
				if (this.num < 1) {
					this.num = 1
				}
				this.goodsinfo.num=this.num
			},
			//处理图片自适应方法
			autoImage(e) {
				// 调用图片自适应工具类方法，进行处理图片
				let auto = actionimage.default(e)
				this.autoHeight = auto.autoHeight;
				this.autoWidth = auto.autoWidth;
			},
			async getgoodsinfo(id, title) {
				let data = {
					id,
				}
				let res = await this.api._getgoodsinfo(data)
				// console.log(res.data.list[0])
				this.goodsinfo = res.data.list[0]
				this.goodsinfo.specsattr = this.goodsinfo.specsattr.split(','); //分割规格
				this.goodsinfo.img = this.baseUrl + this.goodsinfo.img
				this.goodsinfo.checked=true
				this.goodsinfo.num=this.num
				
			},
			changespecsattrIndex(index) {
				this.specsattrIndex = index
			},
			//添加购物车
			addCart(){
				
				let url = ""
				let _checked = 0
				this.a_addCart(url,_checked)
			},
			async a_addCart(url,checked) {
let tag = "details"

				let data = {
					uid: uni.getStorageSync("uid"),
					goodsid: this.id,
					num: this.num,
					checked:checked,
					status: 0

				}
				let header = {
					//检测是否登录
					authorization: uni.getStorageSync("token")
				}
				// console.log(data, header)
				let res = await this.api._cartAdd(data, header)
console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						title: "添加成功",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: url
						})
					}, 1500)

				} else {
					//登录过期了
					uni.showToast({
						title: "登录已过期",
						icon: "none"
					})
					uni.clearStorageSync()
					setTimeout(() => {
						uni.navigateTo({
							url: `../send/send?tag=${tag}`
						})
					}, 1500)
				}
			},
			//订单购买及添加购物车
			 async toconfirm(){
				let url="../confirm/confirm"
				let checked = 1;
				
				// console.log(this.goodsinfo)
				let carts =[]
				 carts.push(this.goodsinfo)
				uni.setStorageSync("carts",carts)
				
				await this.a_addCart(url,checked)
				// await this.cartlist()
				// console.log(uni.getStorageSync("carts"))
				//  uni.navigateTo({
				// 	url:"../confirm/confirm"
				// })
				
			},
			// async cartlist() {
			// 	let data = {
			// 		uid: uni.getStorageSync("uid"),
			// 	}
			// 	let header = {
			// 		//检测是否登录
			// 		authorization: uni.getStorageSync("token")
			// 	}
			// 	let res = await this.api._cartlist(data, header)
			// 	res.data.list = res.data.list || []
			// 	res.data.list.forEach((item) => {
			// 		item.img = this.baseUrl + item.img
			// 		item.checked = item.checked == 0 ? false : true
			// 	})
			// 	// console.log(res.data.list[res.data.list.length-1])
			// 	this.carts = res.data.list[res.data.list.length-1]
			// 	uni.setStorageSync("carts",[this.carts])
			// },

		},
		onLoad: function(options) {
			
			// console.log(options)
			let {
				id,
				title
			} = options
			this.id = id,
			this.title = title
				uni.setNavigationBarTitle({
					title,
				})
			this.getgoodsinfo(id)
		}
	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
