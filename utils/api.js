// 管理所有的api接口
import  http  from "./http.js"
// 1.获取一级分类
const  _getTopCates = () =>{
	var options = {
		url:"/api/getcate"
	}
	return  http(options)
}

// 2.获取轮播图
const  _getbanner = () =>{
	var options = {
		url:"/api/getbanner"
	}
	return  http(options)
}
// 3.获取秒杀活动
const  _getseckill = () =>{
	var options = {
		url:"/api/getseckill"
	}
	return  http(options)
}
// 4.获取首页商品
const  _getindexgoods = () =>{
	var options = {
		url:"/api/getindexgoods"
	}
	return  http(options)
}
// 获取一级分类下的所有商品（分页版本）
const  _getcategoodPage=(data={})=>{
	var options = {
		url:"/api/getcategoodPage",
		data,
	}
	return  http(options)
}
// 获取所有分类
const  _getCates = ()=>{
	var options = {
		url:"/api/getcates"
	} 
	
	return  http(options)
}
//7.获取一个商品信息
const  _getgoodsinfo=(data={})=>{
	var options = {
		url:"/api/getgoodsinfo",
		data,
	}
	return  http(options)
}
//8.获取手机验证码
const  _sms=(data={})=>{
	var options = {
		url:"/api/sms",
		data,
	}
	return  http(options)
}
//9.执行登录
const  _wxDoLogin=(data={})=>{
	var options = {
		url:"/api/wxlogin",
		data,
	}
	return  http(options)
}
// 10检测是否登录或者是否过期
const  _checkToken = (header={})=>{
	var options = {
		url:"/api/checktoken",
		header,
	}
	return  http(options)
}
// 11。插入购物车

const  _cartAdd = (data={},header={})=>{
	var options = {
		url:"/api/cartadd",
		data,
		header,
	}
	return  http(options)
}
// 12.获取购物车信息
const  _cartlist= (data={},header={})=>{
	var options = {
		url:"/api/cartlist",
		data,
		header,
	}
	return  http(options)
}
// 13.修改购物车信息
const  _editCart= (data={},header={})=>{
	var options = {
		url:"/api/cartedit",
		data,
		header,
	}
	return  http(options)
}
// 14.删除购物车信息
const  _cartdelete= (data={},header={})=>{
	var options = {
		url:"/api/cartdelete",
		data,
		header,
	}
	return  http(options)
}
// 15.提交订单
const  _orderadd= (data={},header={})=>{
	var options = {
		url:"/api/orderadd",
		data,
		header,
	}
	return  http(options)
}
// 16.查询全部订单
const  _orderslist= (data={},header={})=>{
	var options = {
		url:"/api/orders",
		data,
		header,
	}
	return  http(options)
}
export  default {
	_getbanner,
	_getTopCates,
	_getseckill,
	_getindexgoods,
	_getcategoodPage,
	_getCates,
	_getgoodsinfo,
	_sms,
	_wxDoLogin,
	_checkToken,
	_cartAdd,
	_cartlist,
	_editCart,
	_cartdelete,
	_orderadd,
	_orderslist
}