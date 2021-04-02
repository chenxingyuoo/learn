'use strict';

const contentTypes = {
  form: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json;charset=UTF-8',
  formData: 'multipart/form-data;charset=UTF-8'
};

export default {
  get(opts) {
    let url = opts.url
    let data = opts.data

    if (data) {
      let paramsArray = [];
      //encodeURIComponent
      Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }

    return fetch(url, {
      method: 'GET',//如果为GET方式，则不要添加body，否则会出错    GET/POST
      header: {//请求头
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response)
      }
    }).then((response) => {
      if (response.code === 0) {
        return Promise.reject(response)
      }

      return response.data
    }).catch((error) => {
      return Promise.reject(error)
    });
  },


  post(opts) {
    let url = opts.url

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': contentTypes[opts.contentType || 'form']
      },
      body: opts.contentType === 'json' ? JSON.stringify(opts.data) : opts.data,
    }).then((response) => {
      console.log('response', response);

      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response)
      }
    }).then((response) => {
      if (response.code === 0) {
        return Promise.reject(response)
      }
      return response.data
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}