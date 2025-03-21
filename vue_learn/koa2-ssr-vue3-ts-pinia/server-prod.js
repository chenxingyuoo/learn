/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 02:01:53
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import { fileURLToPath } from "url"
import sendFile from 'koa-send'
import { render } from './dist/server/entry-server.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));



const resolve = (p) => path.resolve(__dirname, p);

const clientRoot = resolve('dist/client');
const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
const manifest = JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'));


(async () => {
    const app = new Koa();

    app.use(async (ctx) => {
				
				// 请求的是静态资源
        if (ctx.path.startsWith('/assets') || ctx.path.startsWith('/vite.svg')) {
            await sendFile(ctx, ctx.path, { root: clientRoot });
            return;
        }

        const { renderedHtml, state, preloadLinks } = await render(ctx, manifest);

        const html = template
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--pinia-state-->', state)
            .replace('<!--app-html-->', renderedHtml);

        ctx.type = 'text/html';
        ctx.body = html;
    });

    app.listen(8080, () => console.log('started server on http://localhost:8080'));
})();

