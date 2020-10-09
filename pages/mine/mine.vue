<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">

			<view class="mineTop_left" v-if="loginstu">
				<view class="mineTop_left_image">
					<image src="@/static/mine/1577549281298.jpeg" mode=""></image>
				</view>
				<view class="mineTop_left_info">
					<text for="" style="color: #000;">{{ phone }}</text>
					<text for="" @click="leave()">退出</text>
				</view>
			</view>
			<view class="" v-else>
				<button type="default" size="mini" @click="gologin">请登录</button>
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info">
					<text for="">每日签到</text>
				</view>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list">
				<image src="@/static/mine/quanbudingdan.png" mode=""></image>
				<text class="list_text" @click="toorder()">全部订单</text>
			</view>
			<view class="order_state_list">
				<image src="@/static/mine/daifukuan.png" mode=""></image>
				<text class="list_text">待付款</text>
			</view>
			<view class="order_state_list">
				<image src="@/static/mine/daishouhuo.png" mode=""></image>
				<text class="list_text">待收货</text>
			</view>
		</view>

		<!-- 个人信息 -->
		<view class="person_msg">
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="@/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
					<text>地址管理</text>
				</view>
				<view class="MsgItemRight">
					<image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="@/static/mine/zu.png" alt class="MsgItemLogo" />
					<text>我的钱包</text>
				</view>
				<view class="MsgItemRight">
					<text class="remaB" v-show="true">200余额</text>
					<image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="@/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
					<text>我的优惠券</text>
				</view>
				<view class="MsgItemRight">
					<image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="@/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
					<text>我的二维码</text>
				</view>
				<view class="MsgItemRight">
					<image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="@/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
					<text>我的小伙伴</text>
				</view>
				<view class="MsgItemRight">
					<image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import checkToken from '../../utils/utils.js'
	export default {
		data() {
			return {
				//   个人信息
				loginstu: false,
				phone: null,
				personMsgList: [{
						name: "地址管理",
						icon: "../../static/mine/dizhiguanli.png"
					},
					{
						name: "我的钱包",
						icon: "../../static/mine/zu.png",
						remaBala: "200余额"
					},
					{
						name: "我的优惠券",
						icon: "../../static/mine/wodeyouhuiquan.png",
					},
					{
						name: "我的二维码",
						icon: "../../static/mine/wodeerweima.png",
					},
					{
						name: "我的小伙伴",
						icon: "../../static/mine/xiaohuoban.png"
					}
				],
			}
		},
		onShow() {
			this.getuser();

		},
		methods: {
			async getuser() {
				let token;
				 let istoken = (await uni.getStorage({key:"token"}))[1]
				 let isphone = (await uni.getStorage({key:"phone"}))[1]
				 if(istoken != undefined && isphone != undefined){
					  token = istoken.data;
				this.phone = isphone.data;
				
				 }
				

				// let token = await uni.getStorageSync("token");
				// this.phone = await uni.getStorageSync("phone");
				this.loginstu = await checkToken(this, token)

			},
			gologin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			leave() {
				uni.clearStorage()
				uni.navigateBack({
					delta: 0
				})
			},
			toorder() {
				uni.navigateTo({
					url: "../order/order"
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/css/mine.css");
</style>
