/**
 * Created on 2018/4/19.
 */

'use strict';

const Loading = require('../packages/loading');

const components = [
  Loading
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

module.exports = {
  install
};