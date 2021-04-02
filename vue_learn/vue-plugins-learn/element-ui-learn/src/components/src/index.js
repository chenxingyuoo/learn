/**
 * Created on 2017/7/3.
 */

'use strict';

import MessageBox from '../me-components/message-box/index.js';

//组件
const components = [
  MessageBox
];

//注册vue全局组件方法
const install = function(Vue, opts = {}) {
  if (install.installed) {
    return;
  }

  //注册vue全局组件
  components.map((component) => {
    return Vue.component(component.name, component);
  });

  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  MessageBox
};
