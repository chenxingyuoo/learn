//Vuex 带来一个日志插件用于一般的调试:
import createLogger from 'vuex/dist/logger'

export default process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : [];

 //createLogger 方法有几个配置项：

/*const logger = createLogger({
  collapsed: false, // 自动展开记录 mutation
  transformer (state) {
    // 在记录之前前进行转换
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 格式 { type, payload }
    // 我们可以按照想要的方式进行格式化
    return mutation.type
  }
})*/