// import Koa from 'koa'
import "reflect-metadata";
import { createKoaServer } from 'routing-controllers'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'

const app = createKoaServer({
  controllers: [`${__dirname}/controllers/*{.js,.ts}`],
})

app.use(koaStatic(`${__dirname}/publich`))
app.use(bodyParser())

export default app
