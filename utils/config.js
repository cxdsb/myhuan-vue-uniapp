// let baseUrl="http://localhost:3000";
let  baseUrl = null; 
if(process.env.NODE_ENV === "development"){
	//开发环境
	baseUrl="http://localhost:3000"
}else{
	baseUrl = "https://api.zhaowei.shop"
}
export default baseUrl;