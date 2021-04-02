/**
 * Created by chenxingyu on 2017/2/10.
 */

//返回数组中随机的一个
exports.randomArray = function (array){
    return array[Math.floor(Math.random() * array.length)]
};

/**
 * 如果该对象存在此数组 ， 则返回数组的索引
 *
 * @param {Array} arr
 * @param {*} obj
 */

exports.indexOf =  function indexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
};