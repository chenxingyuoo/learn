/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 12:07:53
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

// src/components/book/schema.js
const { gql } = require('apollo-server-koa')

const schema = gql`
  enum BookStatus {
    DELETED
    NORMAL
  }

  type Book {
    id: ID
    name: String
    price: Float
    status: BookStatus
    created: Date
  }

  extend type Query {
    book: Book @auth
    hello: String
  }
`

module.exports = { schema }
