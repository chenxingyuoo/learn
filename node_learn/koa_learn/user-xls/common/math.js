/*
 * @Description: 解决浮点数精度问题
 * @Date: 2019-12-23 11:41:08
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

/**
 * 加法
 * @param {number} arg1
 * @param {number} arg2
 */
exports.accAdd = function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (exports.accMultiply(arg1, m) + exports.accMultiply(arg2, m)) / m
}

/**
 * 减法
 * @param {number} arg1
 * @param {number} arg2
 */
exports.accSub = function accSub(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (exports.accMultiply(arg1, m) - exports.accMultiply(arg2, m)) / m
}

/**
 * 乘法
 * @param {number} arg1
 * @param {number} arg2
 */
exports.accMultiply = function accMultiply(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

/**
 * 除法
 * @param {number} arg1
 * @param {number} arg2
 */
exports.accDivision = function accDivision(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1
  var r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * 最大公约数（Greatest Common Divisor）
 * 欧几里得算法
 * @param {*} a
 * @param {*} b
 */
exports.gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

/**
 * 取余 - js运算精度丢失问题
 * @param arg1  数1
 * @param arg2  数2
 * 12.24 % 12  ==> 0.2400000000000002
 * {{ 12.24 | mod( -12 ) }}  ==>  0.24
 */
exports.accMod = (arg1, arg2) => {
  arg1 = Number(arg1)
  arg2 = Number(arg2)
  if (!arg2) {
    return null
  }
  if (!arg1 && arg1 !== 0) {
    return null
  } else if (arg1 === 0) {
    return 0
  }
  let intNum = arg1 / arg2
  intNum = intNum < 0 ? Math.ceil(arg1 / arg2) : Math.floor(arg1 / arg2)
  let intVal = exports.accMultiply(intNum, arg2)
  return exports.accSub(arg1, intVal)
}

exports.floatMod = (arg1, arg2) => {
  return exports.accMod(exports.accAdd(exports.accMod(arg1, arg2), arg2), arg2)
}
