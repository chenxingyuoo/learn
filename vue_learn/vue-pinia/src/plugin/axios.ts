/*
 * @Description: 这是***页面
 * @Date: 2022-09-05 17:13:23
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import Axios from "axios"

const BASE_URL = ''; //请求接口url 如果不配置 则默认访问链接地址
const TIME_OUT = 200; // 接口超时时间
const instance = Axios.create({
	baseURL: BASE_URL,
	timeout: TIME_OUT
})

// 可以添加一个axios的全局配置
// instance.defaults.headers.post = {
// 		"Content-Type":'application/x-www-form-urlencoded'
// }

// 添加请求拦截器
instance.interceptors.request.use((config) => {
        // 可以在此处添加一些共有的请求拦截
	return config
},(error) => {
	return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use((response)=>{
	const res = response.data;
	// 在此处添加一些响应拦截
},(error)=>{
	return Promise.reject(error);
})

export default instance;

