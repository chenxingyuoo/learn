/*
 * @Description: 这是***页面
 * @Date: 2021-03-01 14:38:30
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
const DataLoader = require('dataloader')

const foods = [
  { id: 1, name: 'milk' },
  { id: 2, name: 'apple' },
  { id: 3, name: 'fish' }
]

const cats = [
  { color: 'white', foodId: 1 },
  { color: 'red', foodId: 2 },
  { color: 'black', foodId: 3 }
]

const fakerIO = (arg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(arg), 300)
  })

const getFoodByIds = async (ids) => {
  console.log('--- enter getFoodByIds ---', { ids })
  return fakerIO(foods.filter((food) => ids.includes(food.id)))
}

const foodLoader = new DataLoader((ids) => getFoodByIds(ids))

const getFoodByIdBatching = (foodId) => {
  return foodLoader.load(foodId)
}

const resolvers = {
  Query: {
    cats: async (parent, args, context, info) => fakerIO(cats)
  },
  Cat: {
    love: async (cat) => getFoodByIdBatching(cat.foodId)
  }
}

module.exports = resolvers
