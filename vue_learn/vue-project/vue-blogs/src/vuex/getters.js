export const getTopicLists = (state) => state.topicLists;

export const getFileId = (state) => state.fileId;

export const getTopicTabs = (state) => state.topicTabs;

export const getTopic = (state) => state.topic;

export const getToken = (state) => state.token;

export const getLoginUser = (state) => state.loginUser;

export const getHint = (state) => state.hint;

export const getImg = (state) => state.image;

export const getMe = (state) => state.me;

export const getFriendLink = (state) => state.friendLink;

export const getWebinfo = (state) => state.webinfo;

export const getSearch = (state) => state.isSearch;

export const getListname = (state) => state.listname;

export const getComments = (state) => {
  // debugger;
  var comments = JSON.parse(localStorage['comments']);
  var articleId = 'article_' + location.hash.replace(/#\/article_details\//,'');
  if(comments && comments[articleId] && state.comments.length === 0){
    return comments[articleId];
  }

  if(comments && comments[articleId]){
    const extend = (to, from) => {
      var keys = Object.keys(from);
      var i = keys.length;
      while (i--) {
        to[keys[i]] = from[keys[i]];
      }
      return to;
    };
    return extend(state.comments, comments[articleId]);
  }else{
    return state.comments;
  }


};
