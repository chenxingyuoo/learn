import {createStore,applyMiddleware} from 'redux'
import {finalReducer } from './reducers'
import thunk from 'redux-thunk'
//生成store对象
const store = createStore(finalReducer,applyMiddleware(thunk));//内部会第一次调用reducer函数，得到初始state 

export default store