module.exports = class extends think.Model {
  getList() {
    return this.field('username').select();
  }
};