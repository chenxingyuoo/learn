//Map 是一种无序的键值对的集合。Map 最重要的一点是通过 key 来快速检索数据，key 类似于索引，指向数据的值。
// Map 是一种集合，所以我们可以像迭代数组和切片那样迭代它。不过，Map 是无序的，我们无法决定它的返回顺序，这是因为 Map 是使用 hash 表来实现的。

// 定义 Map
// 可以使用内建函数 make 也可以使用 map 关键字来定义 Map:
/* 声明变量，默认 map 是 nil */
// var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
// map_variable := make(map[key_data_type]value_data_type)

// 如果不初始化 map，那么就会创建一个 nil map。nil map 不能用来存放键值对

// package main

// import "fmt"

// func main() {
//    var countryCapitalMap map[string]string
//    /* 创建集合 */
//    countryCapitalMap = make(map[string]string)
   
//    /* map 插入 key-value 对，各个国家对应的首都 */
//    countryCapitalMap["France"] = "Paris"
//    countryCapitalMap["Italy"] = "Rome"
//    countryCapitalMap["Japan"] = "Tokyo"
//    countryCapitalMap["India"] = "New Delhi"
   
//    /* 使用 key 输出 map 值 */
//    for country := range countryCapitalMap {
//       fmt.Println("Capital of",country,"is",countryCapitalMap[country])
//    }
   
//    /* 查看元素在集合中是否存在 */
//    captial, ok := countryCapitalMap["France"]

//    fmt.Println("captial:",captial);  
//    fmt.Println("ok :",ok);  

//    /* 如果 ok 是 true, 则存在，否则不存在 */
//    if(ok){
//       fmt.Println("Capital of United States is", captial)  
//    }else {
//       fmt.Println("Capital of United States is not present") 
//    }
// }


// Capital of India is New Delhi
// Capital of France is Paris
// Capital of Italy is Rome
// Capital of Japan is Tokyo
// captial: Paris
// ok : true
// Capital of United States is Paris



// delete() 函数
// delete() 函数用于删除集合的元素, 参数为 map 和其对应的 key。实例如下：

package main

import "fmt"

func main() {   
   /* 创建 map */
   countryCapitalMap := map[string] string {"France":"Paris","Italy":"Rome","Japan":"Tokyo","India":"New Delhi"}
   
   fmt.Println("原始 map")   
   
   /* 打印 map */
   for country := range countryCapitalMap {
      fmt.Println("Capital of",country,"is",countryCapitalMap[country])
   }
   
   /* 删除元素 */
   delete(countryCapitalMap,"France");
   fmt.Println("Entry for France is deleted")  
   
   fmt.Println("删除元素后 map")   
   
   /* 打印 map */
   for country := range countryCapitalMap {
      fmt.Println("Capital of",country,"is",countryCapitalMap[country])
   }
}

// 原始 map
// Capital of France is Paris
// Capital of Italy is Rome
// Capital of Japan is Tokyo
// Capital of India is New Delhi
// Entry for France is deleted
// 删除元素后 map
// Capital of Italy is Rome
// Capital of Japan is Tokyo
// Capital of India is New Delhi

