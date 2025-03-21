/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 00:39:56
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],

  rules: {
    // override/add rules settings here, such as:
  }
}
