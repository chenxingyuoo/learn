/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 10:30:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const Koa = require('koa')
const apolloServer = require('./src/graphql/index.js')

const app = new Koa()

app.use(require('./src/middlewares/auth.js'))

apolloServer.applyMiddleware({ app })
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  )
)
