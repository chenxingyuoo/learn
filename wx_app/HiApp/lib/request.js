/**
 * Created by chenxingyu on 2016/11/19.
 */
let API_PATH = 'https://raw.githubusercontent.com/BelinChung/HiApp/master/src/api/'

function _param(obj = {}) {
    let _ = encodeURIComponent
    return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
}

function request({url, query, data, success, fail, complete, method = 'GET'}) {

    url = API_PATH + url + '?' + _param(query)

    wx.request({
        url: url,
        data: data,
        method: method,
        success: res => {
            let data = res.data
            data['err_msg'] === 'success' ? success(data) : fail(res)
        },
        fail: fail,
        complete: complete
    })
}

module.exports = request