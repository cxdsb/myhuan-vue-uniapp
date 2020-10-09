const _checkToken = async (that,token)=>{
	if(!token){
		uni.setTabBarItem({
			index:2,
			text:"未登录"
		})
		return false;
	}
	let res = await that.api._checkToken({"authorization":token})
	// console.log(res)
	if(res.data.code == 200){
		uni.setTabBarItem({
			index:2,
			text:"我的"
		})
		return true;
	}else{
		uni.clearStorage()
		uni.setTabBarItem({
			index:2,
			text:"未登录"
		})
		return false;
	}
} 
export default _checkToken;