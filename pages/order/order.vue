]<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" v-if="orderslist.length>0">
			<!-- row 循环体 -->
			<view class="row">
				<view class="products">
					<view class="imagebox" v-for="(item,index) of orderslist" :key="index">
						<image :src="item.child[0].img" mode="widthFix"></image>
						<text class="title">{{ item.child[0].goodsname }}</text>
						<!-- <view class="title">{{ item.countmoney }}</view> -->
					</view>
					
				</view>
				<view class="info">
					<text  space="nbsp">总计{{ total }}商品  </text>  
					<text>应付金额 ￥:{{ Totalprice }}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				orderslist:[]
			}
		},
		onShow(){
			this.getorderslist()
		},
		onLoad(options){
			
		},
	computed:{
		// 总数
		total(){
			let num = 0;
			this.orderslist.forEach((item,index)=>{
				num += item.countnumber
			})
			return num
		},
		// 总价
		Totalprice(){
			let num = 0;
			this.orderslist.forEach((item,index)=>{
				num += item.countnumber * item.countmoney
			})
			return num
		}
	},
		methods: {
			async getorderslist(){
				let uid = uni.getStorageSync("uid")
				let authorization = uni.getStorageSync("token")
				let res = await this.api._orderslist({uid},{authorization})
				// console.log(res.data.list)
				res.data.list = res.data.list || []
				res.data.list.forEach((item)=>{
					item.child = item.child || []
					item.child.forEach((val)=>{
						val.img = this.baseUrl + val.img
					})
				})
				this.orderslist = res.data.list
				console.log(this.orderslist)
			}
		},
		
	}
</script>

<style>
.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		/* float: left; */
		margin:10rpx;
		display: flex;
	}
	.imagebox .title{
		margin-top: 30rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
