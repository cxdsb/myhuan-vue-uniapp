<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" v-if="true">
			<view class="row" v-for="(item,index) of categoodPage" :key="index">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{ item.goodsname }}</text>	
					<text>￥{{ item.price }}</text>	
					<text>3565评论</text>	
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
	data(){
		return {
		id:null,
		page:1,
		size:4,
		categoodPage:[]
		}
	},
	onLoad(options){
		console.log(options)
		let {id,title}=options
		uni.setNavigationBarTitle({
			title,
		})
		this.getcategoodPage(id)
	},
	methods:{
		async getcategoodPage(id){
			let data={
				fid:id,
				page:this.page,
				size:this.size
			}
			uni.showLoading({
				title:"请求中"
			})
			let res = await this.api._getcategoodPage(data)
			// console.log(res.data.list)
			if(res.data.list == undefined || res.data.list[1] == null){
				uni.hideLoading()
				uni.showToast({
					title:"暂时没有数据",
					icon:"none"
				})
				return;
			}
			if(res.data.list[1].length > 0){
				uni.hideLoading()
			}
			
			res.data.list[1].forEach((item)=>{
					item.img = this.baseUrl + item.img
				})
				// 总页数
			this.totalPage = res.data.list[0]
			console.log(res.data.list)
			res.data.list[1] = this.categoodPage.concat(res.data.list[1])
			
			this.categoodPage = res.data.list[1]
			
		},
		onReachBottom(){
			this.page++
			if(this.page > this.totalPage){
				uni.showToast({
					title:"没有数据了",
					icon:"none"
				})
				return;
			}
			
			this.getcategoodPage()
		}
		
	}
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
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
