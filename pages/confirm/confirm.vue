<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.name }}</label>
				<label for="">{{ information.phone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts" v-for="(item,index) of carts">
			<!-- cartsInfo 循环体 -->
			<view class="cartsInfo">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{ item.goodsname }}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:白色</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{ item.price }}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="jian(index)">-</label>
						<label for="" class="num">{{ item.num }}</label>
						<label for="" class="jia" @click="jia(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="jies" v-model="jifen" placeholder="输入积分" />
				<label for="" class="input_use" @click="_jifen()">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{ Totalprice }}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red" v-if="this.jifen==null">￥{{ Totalprice }}</label>
			<label for="" style="color:red" v-else>￥{{ Totalprices }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="placeOrder()">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: {
					name: '小明同学',
					phone: '19988877766',
					address: '四川省南充市啥子村'
				},
				carts: [],
				jifen: null,
				Totalprices: null
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getgoodInfo()
			this.Totalprices = this.Totalprice
		},
		computed: {
			// 总数
			total() {
				let num = 0;
				this.carts.forEach((item, index) => {
					if (!item.checked) return
					num += item.num
				})

				return num
			},
			// 总价
			Totalprice() {
				let num = 0;
				this.carts.forEach((item, index) => {
					if (!item.checked) return
					num += item.num * item.price
				})

				return num
			},
			
		},
		methods: {
			
			//提交订单
			async placeOrder() {
				let countmoney
				let uid = uni.getStorageSync("uid");
				let username = this.information.name;
				let userphone = this.information.phone;
				let address = this.information.address;
				if (this.jifen == null) {
					countmoney = this.Totalprice
				} else {
					countmoney = this.Totalprices;
				}

				let countnumber = this.total;
				let addtime = new Date().getTime();
				let idstr = ""; //商品的id，是一个逗号隔开的字符串
				let authorization = uni.getStorageSync("token")
				this.carts.forEach((item) => {
					idstr += item.id + ",";
				})

				//去掉最后一个逗号
				idstr = idstr.substr(0, idstr.length - 1)
				console.log(idstr)
				// console.log(typeof idstr)
				let params = {
					uid,
					username,
					userphone,
					address,
					countmoney,
					countnumber,
					addtime
				}
				// console.log(params)
				params = JSON.stringify(params)
				// console.log(params)

				let resorder = await this.api._orderadd({
					idstr,
					params
				}, {
					authorization
				})

				console.log(resorder)
				if (resorder.data.code == 200) {
					uni.showToast({
						title: "提交成功"
					})
					uni.removeStorageSync("carts")
					setTimeout(() => {
						uni.navigateTo({
							url: "../order/order"
						})

					}, 1500)

				} else {
					uni.showToast({
						title: "提交失败",
						icon: "none"
					})
				}

			},

			getgoodInfo() {
				let carts = uni.getStorageSync("carts")
				// console.log(carts)

				this.carts = carts || []
			},

			jia(index) {
				this.carts[index].num++
				this.editCart(index)

			},
			jian(index) {
				this.carts[index].num--
				if (this.carts[index].num < 1) {
					this.carts[index].num = 1
				}
				this.editCart(index)
			},
			async editCart(index) {
				let {
					id,
					num,
					checked
				} = this.carts[index]
				checked = checked == true ? 1 : 0
				// console.log(id, num, checked)
				let header = {
					//检测是否登录
					authorization: uni.getStorageSync("token")
				}
				let res = await this.api._editCart({
					id,
					num,
					checked
				}, header)
				console.log(res)
				if (res.data.code == 403) {
					//登录状态过期
					this.loginstu = false;
					uni.showToast({
						title: "登录已过期",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "../send/send"
						})
					}, 1500)

				}
			},
			_jifen() {
				// console.log(this.jifen)
				this.Totalprices = this.Totalprice - this.jifen
				// console.log(this.Totalprices)
			}

		},
		onLoad: function(options) {
			// this.getgoodInfo()
			// console.log(options)
			// let {
			// 	id,
			// 	title
			// } = options
			// this.id = id;
			// this.title = title;
			// uni.setNavigationBarTitle({
			// 	title,
			// })
		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
