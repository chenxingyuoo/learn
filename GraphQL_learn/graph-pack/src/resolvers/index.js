/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 15:26:38
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import Db from '../db'

export default {
  Query: {
    user: (parent, { id }) => Db.user({ id }),
    users: (parent, args) => Db.users({})
  },
  Mutation: {
    createUser: (parent, { id, name, email, age, gender }) =>
      Db.user({ id })
        .then((existUser) => {
          if (existUser) throw new Error('已经有这个id的人了')
        })
        .then(() => Db.createUser({ id, name, email, age, gender }))
  }
}
