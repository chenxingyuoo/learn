/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:42:47
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createPinia } from 'pinia';
import useUserStore from './user';

export default () => {
    const pinia = createPinia();

    useUserStore(pinia);

    return pinia;
};

