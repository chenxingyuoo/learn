/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 01:11:57
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';
import type { ParameterizedContext } from 'koa'
import { createRouter } from './router'
import createStore from '@/store';

export const render = async (ctx: ParameterizedContext, manifest: Record<string, string[]>) => {
  const { app } = createApp();

   // 路由注册
   const router = createRouter('server');

   const pinia = createStore()

   app.use(router);

    app.use(pinia);
    
    const state = JSON.stringify(pinia.state.value);

   await router.push(ctx.path);
   await router.isReady();

  const renderCtx: { modules?: string[] } = {};

  const renderedHtml = await renderToString(app, renderCtx);

  const preloadLinks = renderPreloadLinks(renderCtx.modules, manifest);

  return {
    renderedHtml, preloadLinks, state
  };


}


/**
 * 解析需要预加载的链接
 * @param modules
 * @param manifest
 * @returns string
 */
 function renderPreloadLinks(
  modules: undefined | string[],
  manifest: Record<string, string[]>
): string {
  let links = '';
  const seen = new Set();
  if (modules === undefined) throw new Error();
  modules.forEach((id) => {
      const files = manifest[id];
      if (files) {
          files.forEach((file) => {
              if (!seen.has(file)) {
                  seen.add(file);
                  links += renderPreloadLink(file);
              }
          });
      }
  });
  return links;
}

/**
* 预加载的对应的地址
* 下面的方法只针对了 js 和 css，如果需要处理其它文件，自行添加即可
* @param file
* @returns string
*/
function renderPreloadLink(file: string): string {
  if (file.endsWith('.js')) {
      return `<link rel="modulepreload" crossorigin href="${file}" pre="1">`;
  } else if (file.endsWith('.css')) {
      return `<link rel="stylesheet" href="${file}" pre="1">`;
  } else {
      return '';
  }
}




