const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const session = await this.session('name');
    console.log('session', session)
    await this.session('name', 'value');
    const user = this.model('user'); // controller 里实例化模型
    const data = await user.select();
    this.assign({
      title: 'ThinkJS Application',
      data: data
    });
    return this.display('index_index');
  }

  async saveUserAction() {
    const req = this.ctx.req
    this.ctx.body = 'hello'
  }
};
