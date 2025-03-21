/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:43:32
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { defineStore } from 'pinia';

export default defineStore('user', {
    state: () => {
        return {
            name: '张三',
            age: 20
        };
    },
    actions: {
        updateName(name: string) {
            this.name = name;
        },
        updateAge(age: number) {
            this.age = age;
        }
    }
});



