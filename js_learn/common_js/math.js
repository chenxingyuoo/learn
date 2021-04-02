/***
 * 获得正多面体的半径
 * @param opts opts.width(元素宽度) opts.number(多少个面)
 * @returns {number}
 */
export const calTranslateZ = (opts) => {
  return Math.round(opts.width / (2 * Math.tan(Math.PI / opts.number)))
};

/**
 * 获取2点的角度
 * @param start
 * @param end
 * @returns {number}
 */
export const getAngle = (start, end) => {
  let x = Math.abs(start.x - end.x);
  let y = Math.abs(start.y - end.y);
  let z = Math.sqrt(x * x + y * y);
  return Math.round((Math.asin(y / z) / Math.PI * 180));
};

/**
 * 获取2点的直线长度
 * @param start
 * @param end
 * @returns {number}
 */
export const distanceCAL = (start, end) => {
  let x1 = start.x;
  //获取第一点的X坐标
  let y1 = start.y;
  //获取第一点的Y坐标
  let x2 = end.x;
  //获取第二点的X坐标
  let y2 = end.y;
  //获取第二点的Y坐标
  let calX = x2 - x1;
  let calY = y2 - y1;
  return Math.pow((calX * calX + calY * calY), 0.5);
};