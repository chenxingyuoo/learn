/**
 * 获取2个盒子等比例缩放居中信息
 * @param {object} originBox
 * @param {number} originBox.width    原宽度
 * @param {number} originBox.height   原高度
 * @param {object} tergetBox 
 * @param {number} tergetBox.width    目标宽度
 * @param {number} tergetBox.height   目标高度
 * @returns {object} {x,y,width,height}
 */
const getZoomCentered = (originBox, tergetBox) => {
  const zoom = Math.min(tergetBox.width / originBox.width, tergetBox.height / originBox.height);
  const width = Math.round(originBox.width * zoom)
  const height = Math.round(originBox.height * zoom)
  const x = Math.round((tergetBox.width - width) / 2)
  const y = Math.round((tergetBox.height - height) / 2)

  return {
    x,
    y,
    width,
    height
  }
}

/**
 * 获取2个盒子的宽比、高比
 * @param  {object}  originBox  原宽高对象
 * @param  {object}  targetBox  目标宽高对象
 * @return {object}             返回宽高比
 */
const getBox2WHRatio = (originBox, targetBox) => {
  return {
    widthRatio:  targetBox.width / originBox.width,
    heightRatio: targetBox.height / originBox.height
  }
}