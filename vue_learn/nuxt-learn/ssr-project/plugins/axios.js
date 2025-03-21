/*
 * @Description: 这是***页面
 * @Date: 2022-09-23 18:43:08
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const http = $axios.create({
    
  })


  // Set baseURL to something different
  http.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('http', http)
}