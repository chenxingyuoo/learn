'use strict'

const Base = require('sdk-base');
const cluster = require('cluster-client');
const RegistryClient = require('./registry_client');

class APIClient extends Base {
  constructor(options) {
    super(options);

    // options.cluster 用于给 Egg 的插件传递 app.cluster 进来
    this._client = (options.cluster || cluster)(RegistryClient).create(options);
    this._client.ready(() => this.ready(true));

    this._cache = {};

    // subMap:
    // {
    //   foo: reg1,
    //   bar: reg2,
    // }
    const subMap = options.subMap;

    for (const key in subMap) {
      this.subscribe(subMap[key], value => {
        this._cache[key] = value;
      });
    }
  }

  subscribe(reg, listener) {
    this._client.subscribe(reg, listener);
  }

  publish(reg) {
    this._client.publish(reg);
  }

  get(key) {
    return this._cache[key];
  }
}

// 最终模块向外暴露这个 APIClient
module.exports = APIClient;