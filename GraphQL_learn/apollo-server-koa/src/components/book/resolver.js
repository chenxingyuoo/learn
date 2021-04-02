/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 12:07:59
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
// src/components/book/resolver.js
const BookStatus = {
  DELETED: 0,
  NORMAL: 1
}

const resolvers = {
  BookStatus,

  Query: {
    book: (parent, args, context, info) => ({
      name: '地球往事',
      price: 66.3,
      status: BookStatus.NORMAL,
      created: '2020-10-10'
    }),

    hello: (parent, args, context, info) => {
      return 'hello world!'
    }
  }
}

module.exports = resolvers
