/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 12:16:47
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const moment = require('moment')
const { Kind } = require('graphql/language')
const { GraphQLScalarType } = require('graphql')

const customScalarDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue: (value) => moment(value).valueOf(),
  serialize: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss:SSS'),
  parseLiteral: (ast) =>
    ast.kind === Kind.INT ? parseInt(ast.value, 10) : null
})

module.exports = { Date: customScalarDate }
