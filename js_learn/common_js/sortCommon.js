/**
 * 快速对象检查 
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

/**
 * 升序排序
 * @param arr
 */
const upSort = (arr) => {
  arr.sort((a, b) => {
    return a - b;
  });
};

/**
 * 降序排序
 * @param arr
 */
const downSort = (arr) => {
  arr.sort((a, b) => {
    return b - a;
  });
};

/**
 * 通过属性值升序排序
 * @param arr
 */
const upSortByAttr = (arr, attr) => {
  arr.sort((obj1, obj2) => {
    if (!isObject(obj1) || !isObject(obj2)) {
      throw Error('请确保 obj1 和 obj2 为对象');
    }
    return obj1[attr] - obj2[attr];
  });
};

/**
 * 通过属性值降序排序
 * @param arr
 */
const downSortByAttr = (arr, attr) => {
  arr.sort((obj1, obj2) => {
    if (!isObject(obj1) || !isObject(obj2)) {
      throw Error('请确保 obj1 和 obj2 为对象');
    }
    return obj2[attr] - obj1[attr];
  });
};