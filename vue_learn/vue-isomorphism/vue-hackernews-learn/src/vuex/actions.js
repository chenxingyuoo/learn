/**
 * Created by chenxingyu on 2016/12/9.
 */
import 'whatwg-fetch';  //网络请求

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _get = ({ url, query }) => {
  let _url;
  if (query) {
    _url = `https://cnodejs.org/api/v1${url}?${query}`;
  } else {
    _url = `https://cnodejs.org/api/v1${url}`;
  }

  return fetch(_url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};

/**
 * post请求
 * @param  {String} url    api地址
 * @param  {Object} params 包含post内容的object
 * @return {Promise}        Promise
 */
const _post = (url, params) => {
  return fetch(`https://cnodejs.org/api/v1${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};

/**
 * 获取文章列表
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topicTab         主题分类
 * @param  {Number} page             页数
 * @return {Promise}                  Promise
 */
export const fetchTopicLists = ({ commit }, topicListObject) => {
  const topicTab = topicListObject.topicTab;
  const currentPage = topicListObject.currentPage;
  const url = '/topics';
  const query = `tab=${topicTab}&page=${currentPage}`;
  return _get({ url, query })
    .then((json) => {
      if (json.success) {
        json.topicTab = topicTab;
        json.currentPage = currentPage;
        return commit('FETCH_TOPIC_LISTS_SUCCESS', json);
      }
      return Promise.reject(new Error('fetchTopicLists failure'));
    })
    /*.catch((error) => {
      commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page);
      return Promise.reject(error);
    });*/
};


/**
 * 获取某一文章
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} id               文章id
 * @return {Promise}                  Promise
 */
export const fetchTopic = ({ commit }, id) => {
  const url = `/topic/${id}`;
  return _get({ url })
    .then((json) => {
      if (json.success){
        commit('FETCH_TOPIC_SUCCESS', json.data);
        return json.data.author.loginname;
      }
      return Promise.reject(new Error('fetchTopic failure'));
    })
    /*.catch((error) => {
      commit('FETCH_TOPIC_FAILURE');
      return Promise.reject(error);
    });*/
};


/**
 * 获取某一用户收藏的文章
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} loginName        用户名
 * @return {Promise}                  Promise
 */
export const fetchCollection = ({ commit }, loginName) => {
  const url = `/topic_collect/${loginName}`;
  return _get({ url })
    .then((json) => {
      if (json.success) {
        return commit('FETCH_COLLECTION_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchCollection failure'));
    });
};

/**
 * 加入收藏
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topic_id         文章id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const addCollection = ({ commit }, collectionObject) => {
  const topic_id = collectionObject.id;
  const accesstoken = collectionObject.token;
  const url = '/topic_collect/collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return commit('ADD_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('addCollection failure'));
    });
};

/**
 * 取消收藏
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topic_id         文章id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const deCollection = ({ commit }, collectionObject) => {
  const topic_id = collectionObject.id;
  const accesstoken = collectionObject.token;
  const url = '/topic_collect/de_collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return commit('DE_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('deCollection failure'));
    });
};


/**
 * 点赞或取消点赞
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} reply_id         回复id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const star = ({ commit }, starObject) => {
  const reply_id = starObject.replyId;
  const token = starObject.token;
  const url = `/reply/${reply_id}/ups`;
  const params = { token };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        console.log('star/unstar success');
        return json.action;
      }
      return Promise.reject(new Error('star failure'));
    });
};

/**
 * 发表评论
 * @param  {Function} options.dispatch    store对象解构出来的函数，无需手动提供
 * @param  {String} options.topic_id    文章id
 * @param  {String} options.content     回复内容
 * @param  {String} options.accesstoken accesstoken的值
 * @param  {String} options.reply_id    回复id
 * @param  {Object} options.replyData   包含回复内容，作者，时间，头像的object
 * @return {Promise}                     Promise
 */
export const reply = ({ dispatch }, { topic_id, content, accesstoken, reply_id, replyData }) => {
  const url = `/topic/${topic_id}/replies`;
  let params;
  if (reply_id) {
    params = { content, accesstoken, reply_id };
  } else {
    params = { content, accesstoken };
  }
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        console.log('reply success');
        /* eslint-disable no-param-reassign */
        replyData.reply_id = json.reply_id;
        return replyData;
      }
      return Promise.reject(new Error('reply failure'));
    })
    .then((r) => dispatch('ADD_REPLIES', r))
    .catch((error) => {
      dispatch('REPLY_FAILURE');
      return Promise.reject(error);
    });
};


/**
 * 改变文章收藏状态
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Boolen} status           是否收藏
 */
export const changeCollectStatus = ({ commit }, status) => commit('CHANGE_COLLECT_STATUS', status);


