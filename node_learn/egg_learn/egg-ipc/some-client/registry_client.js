'use strict'

const URL = require('url');
const Base = require('sdk-base');

class RegistryClient extends Base {
  constructor(options) {
    super({
      // 指定异步启动的方法
      initMethod: 'init',
    });
    this._options = options;
    this._registered = new Map();
  }

  /**
   * 启动逻辑
   */
  async init() {
    this.ready(true);
  }

  /**
   * 获取配置
   * @param {String} dataId - the dataId
   * @return {Object} 配置
   */
  async getConfig(dataId) {
    return this._registered.get(dataId);
  }

  /**
   * 订阅
   * @param {Object} reg
   *   - {String} dataId - the dataId
   * @param {Function}  listener - the listener
   */
  subscribe(reg, listener) {
    const key = reg.dataId;
    console.log('subscribe key', key)
    this.on(key, listener);

    const data = this._registered.get(key);
    if (data) {
      process.nextTick(() => listener(data));
    }
  }

  /**
   * 发布
   * @param {Object} reg
   *   - {String} dataId - the dataId
   *   - {String} publishData - the publish data
   */
  publish(reg) {
    const key = reg.dataId;
    let changed = false;

    if (this._registered.has(key)) {
      const arr = this._registered.get(key);
      if (arr.indexOf(reg.publishData) === -1) {
        changed = true;
        arr.push(reg.publishData);
      }
    } else {
      changed = true;
      this._registered.set(key, [reg.publishData]);
    }
    if (changed) {
      this.emit(key, this._registered.get(key).map(url => URL.parse(url, true)));
    }
  }
}

module.exports = RegistryClient;