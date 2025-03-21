/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:31:56
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

import { createSSRApp } from "vue";
import App from "./App.vue";

// 为了保证数据的互不干扰，每次请求需要导出一个新的实例
export const createApp = () => {
    const app = createSSRApp(App);
    return { app };
}

