// const xlsx = require('node-xlsx');
// const path = require('path');
const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 获取用户列表
   * @return {Promise<void>}
   */
  async index() {
    const { ctx } = this;

    ctx.body = 'hello';
  }
}
module.exports = UserController;
