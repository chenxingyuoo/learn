/**
 * 获取点（x,y）到坐标原点的距离
 * @param {number} x 点x
 * @param {number} y 点y
 */
const getLength = (x, y) => Math.sqrt(x * x + y * y)

/**
 * 获取中心点
 * @param {number} width 
 * @param {number} height 
 * @param {number} left 
 * @param {number} top 
 */
const getCenterPoint = (width,height,left,top) => {
  const center = {
    x: left + width / 2,
    y: top + height / 2
  }
  return center
}

// 获取角度
const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const dot = x1 * x2 + y1 * y2 // 数量积
  const det = x1 * y2 - y1 * x2 // 向量积
  
  const angle = Math.atan2(det, dot) / Math.PI * 180
  return (angle + 360) % 360
}

/**
 * 角度转换弧度
 * @param {number} deg 角度
 */
const degToRadian = (deg) => deg * Math.PI / 180

/**
 * 弧度转角度
 * @param {number} radian 弧度
 */
const radianToDeg = (radian) => radian * 180 / Math.PI

/**
 * 获取sin对边比斜边 x/R
 * @param {number} deg 角度
 */
const sin = (deg) => Math.sin(degToRadian(deg))

/**
 * 获取cos邻边比斜边 y/R
 * @param {number} deg 角度
 */
const cos = (deg) => Math.cos(degToRadian(deg))

/**
 * 获取tan对边比邻边 x/y
 * @param {number} deg 角度
 */
const tan = (deg) => Math.tan(degToRadian(deg))

// 反三角函数
/**
 * 通过x/R比获取角度
 * @param {number} ratio x/R比
 */
const arcsin = (ratio) => Math.asin(ratio) * (180 / Math.PI)
/**
 * 通过y/R比获取角度
 * @param {number} ratio y/R比
 */
const arccos = (ratio) => Math.acos(ratio) * (180 / Math.PI)
/**
 * 通过x/y比获取角度
 * @param {number} ratio x/y比
 */
const arctan = (ratio) => Math.atan(ratio) * (180 / Math.PI)



/**
 * 通过角度、距离、获取偏移坐标
 * @param {number} angle 角度
 * @param {number} distance 距离
 */
const getOffsetByDistanceAndAngle = (angle, distance) => {
  const radians = degToRadian(angle)
  const offsetX = Math.round(Math.cos(radians) * distance)
  const offsetY = Math.round(Math.sin(radians) * distance)
  return {
    offsetX,
    offsetY
  }
}

/**
 * 获取点（x,y）到坐标原点的角度
 * @param {number} x x坐标
 * @param {number} y y坐标
 */
const getAngleByXY = (x, y) => {
  const radian = Math.atan2(y, x)
  const angle = radianToDeg(radian)
  return (angle + 360) % 360
}

/**
 * 获取点（x,y）到坐标原点的距离
 * @param {number} x 点x
 * @param {number} y 点y
 */
const getDistanceByXY = (x, y) => Math.sqrt(x * x + y * y)