/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 14:38:12
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const { gql } = require('apollo-server-koa')

const schema = gql`
  type Food {
    id: Int
    name: String
  }

  type Cat {
    color: String
    love: Food
  }

  extend type Query {
    cats: [Cat]
  }
`

module.exports = { schema }
