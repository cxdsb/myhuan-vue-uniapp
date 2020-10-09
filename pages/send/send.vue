<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="tel" placeholder="输入手机号" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="sendyan()">{{ tishimsg }}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button  type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="_login()">登录</button>
		</view>
		<view class="row">
			<!-- <text style="color: #006699;text-align: center;" >通过微信授权登录</text> -->
		</view>
	</view>
</template>

<script>
	
	// let app = getApp()
	
	export default {
		data() {
			return {
				tishimsg:"获取手机验证码",
				isSend:false,
				tel:null,
				code:"",
				tag:""
			}
			
		},
		mounted(){
					// console.log(typeof uni.getStorageSync("code"));
		},
		onLoad: function(options) {
			console.log(options)
			let {tag} = options
			this.tag = tag
		},
		methods: {
			//获取，发送验证码
			async sendyan(){
				if(this.isSend)return
				let tel = this.tel
				let  regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
				if(!regExp.test(tel)){
					uni.showToast({
						title:"手机号输入不规范",
						icon:"none"
					})
					return
				}
				let res = await this.api._sms({phone:tel})
				// console.log(res.data.list)
				let num = 60;
				if(this.timer)clearInterval(this.timer)
				this.timer = setInterval(()=>{
					num--;
					this.tishimsg = num + "秒后重新获取验证码";
					if(num<0){
						clearInterval(this.timer);
						this.tishimsg = "获取手机验证码";
						this.isSend = false;
						uni.removeStorageSync("code")
					}
					
				},1000)
				this.isSend = true;
				uni.setStorageSync("code",res.data.list.code)
			},
			async _login(){
		
				let code = this.code;
				let tel = this.tel;
				let  regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
				if(!regExp.test(tel)){
					uni.showToast({
						title:"手机号输入不规范",
						icon:"none"
					})
					return
				}
				// console.log(code,uni.getStorageSync("code"))
				if(tel == ""){
					uni.showToast({
						title:"请输入手机号",
						icon:"none"
					})
					
					return;
				}else if(uni.getStorageSync("code") == ""){
					
					uni.showToast({
						title:"验证码已过期",
						icon:"none"
					})
					return;
				}else if(code != uni.getStorageSync("code")){
					uni.showToast({
						title:"验证码错误",
						icon:"none"
					})
					
					return;
				}
				
				let res = await this.api._wxDoLogin({phone:tel})
				// console.log(res)
				if(res.data.list != null){
					let {phone,token,uid} = res.data.list
				uni.setStorage({
					key:"phone",
					data:phone
				})
				uni.setStorage({
					key:"token",
					data:token
				})
				uni.setStorage({
					key:"uid",
					data:uid
				})
				
				uni.showToast({
					title:"登录成功"
				})
				switch(this.tag){
					case "login":
					setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				},1500)
					break;
					case "details":
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
					break;
				}
				
				}else{
					uni.showToast({
						title:"登录失败",
						icon:"none"
					})
				}
				
			
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
