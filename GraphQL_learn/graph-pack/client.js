/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 16:59:53
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const axios = require('axios')

const http = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 1000
})

const userId = '1'

http
  .get('/', {
    params: {
      query: `
        { 
          user(id: "${userId}") {
            id
            name
            email
            age
          }
          users {
            id
            name
          }
        }
        
      `
    }
  })
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })

// http
//   .post('/', {
//     operationName: 'createUser',
//     query: `
//         mutation createUser ($id: ID!, $name: String!, $email: String!, $age: Int) {
//           createUser(id: $id, name: $name, email: $email, age: $age) {
//             id
//             name
//             age
//           }
//         }
//       `,
//     variables: { id: '3', name: '小陈', email: 'xxxx@qq.com', age: 19 }
//   })
//   .then(function (response) {
//     console.log('createUser', response.data)
//   })
//   .catch(function (error) {
//     console.log(error)
//   })
