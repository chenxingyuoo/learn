/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:31:56
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()]
});