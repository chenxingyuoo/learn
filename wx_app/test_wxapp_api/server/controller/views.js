/**
 * Created on 2017/6/25.
 */

'use strict';

//首页
exports.index = async (ctx, next) => {
  ctx.render('index.html', {
    title: 'Welcome'
  });
};
