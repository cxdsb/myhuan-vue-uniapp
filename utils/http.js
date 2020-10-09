import baseUrl from './config.js'
const http = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl + options.url,
			data:options.data || {},
			method:options.method || "get",
			header:options.header || {
				"content-type":"application/json"
			},
			success:resolve,
			fail:reject
		})
	})
}
export default http;