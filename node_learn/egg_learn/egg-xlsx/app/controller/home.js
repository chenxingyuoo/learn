'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {


   const res = await this.ctx.curl('http://127.0.0.1:7001/api/user/list2?keyWord=&page=1&pageSize=20', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    this.ctx.body = res;
  }
}

module.exports = HomeController;
