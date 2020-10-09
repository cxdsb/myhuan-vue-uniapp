<template>
	<view class="container">
		<view class="top">
			<block v-for="(item,index) of cartslist" :key="index">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="cartInfo">
						<view class="cartInfochild">
							<!-- 选择框 -->
							<view class="cartInfo_switch common" @click="_checked(index)">
								<!-- 点击当前商品 -->
								<switch type="checkbox" :checked="item.checked" />
							</view>
							<!-- 图片 -->
							<view class="cartInfo_image common">
								<image :src="item.img" mode=""></image>
							</view>

							<!-- 信息 -->
							<view class="cartInfo_info">
								<label for="" style="font-size: 26rpx;">{{ item.goodsname }}</label>
								<label for="" style="font-size: 24rpx; color: #ccc;">规格：白色</label>
								<label for="" style="color: red;">￥{{ item.price }}</label>
							</view>
							<!-- 加减数量 -->
							<view class="cartInfo_num">
								<view class="cartInfo_num_child">
									<label for="" @click="jian(index)">-</label>
									<label for="">{{item.num}}</label>
									<label for="" @click="jia(index)">+</label>
								</view>
							</view>
						</view>

					</view>
					<view class="cartDel" @click="del(index)">
						<label for="">删除</label>
					</view>
				</scroll-view>

			</block>
			<block v-if="cartslist.length<=0">
				购物车啥也没有
			</block>

		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1" @click="_allchecked()">
				<switch type="checkbox" :checked="allchecked" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{ Totalprice }}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toconfirm()">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{ total }}件)</label>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartslist: [],
				allchecked: false,
			}
		},
		onShow() {
			this.cartlist()

		},
		computed: {
			// 总数
			total() {
				let num = 0;
				this.cartslist.forEach((item, index) => {
					if (!item.checked) return
					num += item.num
				})
				return num
			},
			// 总价
			Totalprice() {
				let num = 0;
				this.cartslist.forEach((item, index) => {
					if (!item.checked) return
					num += item.num * item.price
				})
				return num
			}
		},
		methods: {
			async cartlist() {
				let data = {
					uid: uni.getStorageSync("uid"),
				}
				let header = {
					//检测是否登录
					authorization: uni.getStorageSync("token")
				}
				let res = await this.api._cartlist(data, header)
				res.data.list = res.data.list || []
				res.data.list.forEach((item) => {
					item.img = this.baseUrl + item.img
					item.checked = item.checked == 0 ? false : true
				})
				// console.log(res.data.list)
				this.cartslist = res.data.list
			},
			jia(index) {
				this.cartslist[index].num++
				this.editCart(index)

			},
			jian(index) {
				this.cartslist[index].num--
				if (this.cartslist[index].num < 1) {
					this.cartslist[index].num = 1
				}
				this.editCart(index)
			},

			_allchecked() {

				this.allchecked = !this.allchecked

				this.cartslist.forEach((item) => {
					item.checked = this.allchecked
				})
				// console.log(this.allchecked)
			},
			_checked(index) {
				this.cartslist[index].checked = !this.cartslist[index].checked
				this.cartslist.every((item) => {
					return this.allchecked = item.checked
				})
				this.editCart(index)
			},
			async editCart(index) {
				// console.log(this.cartslist[index])

				let {
					id,
					num,
					checked
				} = this.cartslist[index]
				checked = checked == true ? 1 : 0
				let header = {
					//检测是否登录
					authorization: uni.getStorageSync("token")
				}
				let res = await this.api._editCart({
					id,
					num,
					checked
				}, header)
				// console.log(res)
			},
			del(index) {
				let {
					id
				} = this.cartslist[index]
				let header = {
					//检测是否登录
					authorization: uni.getStorageSync("token")
				}
				uni.showModal({
					title: "提示",
					content: "确定删除吗",
					success: (res) => {
						if (res.confirm) {
							this.api._cartdelete({
								id
							}, header)
							this.cartlist()
						}
					}
				})

			},
			
			toconfirm() {

				let carts = this.cartslist.filter((item) => {
					return item.checked
				})
				// console.log(carts)
				if (carts.length <= 0) {
					uni.showToast({
						title: "请至少选择一个商品",
						icon: "none"
					})
					return
				}
				uni.setStorageSync("carts", carts)

				uni.navigateTo({
					url: "../confirm/confirm"
				})
			}
		},
	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.foot {
		bottom: var(--window-bottom)
	}
</style>
