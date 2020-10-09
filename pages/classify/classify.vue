<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<!--  -->
			<view :class="cateIndex == index ? 'left_list activeList':'left_list' " @click="changeIndex(index)" v-for="(item,index) of cates" :key="index">
				<label for="">{{ item.catename }}</label>
			</view>
			
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<block v-if="cates.length>0">
					<view class="bottom_list" v-for="(item,index) of cates[cateIndex].children">
						<view>
							<image :src="item.img" alt="">
								<span>{{item.catename}}</span>
						</view>
						
					</view>
					<view v-if="cates[cateIndex].children.length<=0">暂无数据</view>
					</block>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	cates:[],
cateIndex:0
			}
		},
		mounted(){
				this._getcates()
		},
		methods: {
async _getcates(){
				let res = await this.api._getCates()
					
					res.data.list.map((item)=>{
						item.children = item.children || []
						
						item.children.map((val)=>{
							val.img = this.baseUrl + val.img
						})
					})
					
					this.cates = res.data.list
					// console.log(this.cates)
				},
				changeIndex(index){
					this.cateIndex = index
					console.log(this.cates.length)
				}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}

	.bottom {
		text-align: center;
		display: flex;
		flex-direction: row;
	}
</style>
