/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:52:59
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import { fileURLToPath } from "url"
import koaConnect from 'koa-connect'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const app = new Koa();

     // 创建 vite 服务
     const viteServer = await createViteServer({
      server: { middlewareMode: 'ssr' }
    })
      
    //    // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
     // 使用 vite 的 Connect 实例作为中间件
  app.use(koaConnect(viteServer.middlewares))


    app.use(async ctx => {
      console.log('app.use');
      try {
          // 1. 获取index.html
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

          // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
          template = await viteServer.transformIndexHtml(ctx.path, template)

          // console.log('template2', template);

          // // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
          const { render } = await viteServer.ssrLoadModule('/src/entry-server.ts')

          // //  4. 渲染应用的 HTML
          const { renderedHtml, state } = await render(ctx, {})

          // let renderedHtml = '<h1 style="text-align:center;">现在假装这是一个vue模板</h1>';

          const html = template
                .replace('<!--app-html-->', renderedHtml)
                .replace('<!--pinia-state-->', state);

          ctx.type = 'text/html'
          ctx.body = html
      } catch (e) {
          viteServer && viteServer.ssrFixStacktrace(e)
          console.log(e.stack)
          ctx.throw(500, e.stack)
      }
  })



    app.listen(9000, () => {
        console.log('server is listening in 9000')
    });
})();

