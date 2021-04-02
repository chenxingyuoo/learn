import ItemList from '../components/ItemList.vue'

//这是一个用于动态创建根级别列表视图的工厂函数，
//因为它们共享大多数逻辑，除了要显示的项目的类型。
//它们本质上是包装ItemList.vue的更高阶的组件。
export function createListView (type) {
    return {
        name: `${type}`,
        // this will be called during SSR to pre-fetch data into the store!
        preFetch (store) {
            // return store.dispatch('FETCH_LIST_DATA', { type })
        },
        render (h) {
            return h(ItemList, { props: { type }})
        }
    }
}
