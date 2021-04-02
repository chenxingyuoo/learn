/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 12:11:26
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const fs = require('fs')
const { resolve } = require('path')
const { ApolloServer, gql } = require('apollo-server-koa')
const allCustomScalars = require('./scalars/index.js')
const allCustomDirectives = require('./directives/index.js')

const defaultPath = resolve(__dirname, '../components/')
const typeDefFileName = 'schema.js'
const resolverFileName = 'resolver.js'

/**
 * In this file, both schemas are merged with the help of a utility called linkSchema.
 * The linkSchema defines all types shared within the schemas.
 * It already defines a Subscription type for GraphQL subscriptions, which may be implemented later.
 * As a workaround, there is an empty underscore field with a Boolean type in the merging utility schema, because there is no official way of completing this action yet.
 * The utility schema defines the shared base types, extended with the extend statement in the other domain-specific schemas.
 *
 * Reference: https://www.robinwieruch.de/graphql-apollo-server-tutorial/#apollo-server-resolvers
 */
const linkSchema = gql`
  scalar Date

  directive @auth on FIELD_DEFINITION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

function generateTypeDefsAndResolvers() {
  const typeDefs = [linkSchema]
  const resolvers = { ...allCustomScalars }

  const _generateAllComponentRecursive = (path = defaultPath) => {
    const list = fs.readdirSync(path)

    list.forEach((item) => {
      const resolverPath = path + '/' + item
      const stat = fs.statSync(resolverPath)
      const isDir = stat.isDirectory()
      const isFile = stat.isFile()

      if (isDir) {
        _generateAllComponentRecursive(resolverPath)
      } else if (isFile && item === typeDefFileName) {
        const { schema } = require(resolverPath)

        typeDefs.push(schema)
      } else if (isFile && item === resolverFileName) {
        const resolversPerFile = require(resolverPath)

        Object.keys(resolversPerFile).forEach((k) => {
          if (!resolvers[k]) resolvers[k] = {}
          resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] }
        })
      }
    })
  }

  _generateAllComponentRecursive()

  return { typeDefs, resolvers }
}

const isProd = process.env.NODE_ENV === 'production'

const apolloServerOptions = {
  ...generateTypeDefsAndResolvers(),
  formatError: (error) => ({
    code: error.extensions.code,
    message: error.message
  }),
  schemaDirectives: { ...allCustomDirectives },
  context: ({ ctx }) => ({ ctx }),
  introspection: !isProd,
  playground: !isProd,
  mocks: false
}

module.exports = new ApolloServer({ ...apolloServerOptions })
