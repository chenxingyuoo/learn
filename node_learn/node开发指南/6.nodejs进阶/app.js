/**
 * Created by chenxingyu on 2016/12/19.
 */
// 在本书的最后一章，我们打算讨论几个独立的话题，主要内容包括:
// 模块加载机制
// 异步编程模式下的控制流
// Node.js 应用部署
// Node.js的一些劣势。

//模块加载机制

//Node.js 的模块加载对用 来说十分简 ，只需调用 require  可，但其内部机制 为 复杂。我们通过这一节简要介绍一下 Node.js 模块加载的一些细节，帮你 少开发中可能遇 到的问题。

//模块的类型

//Node.js 的模块可以分为两大 ，一 是    ， 一 是    。核心模块就是 Node.js 标准 API 中提供的模块，如 fs、http、net、vm 等，这些都是由 Node.js 官方提供 的模块，
// 编译成了 进制代码。我们可以 接通过 require 获取核心模块，例如 require('fs')。核心模块 有最高的加载优先级， 言之如果有模块与其    ， Node.js  是会加载核心模块。
// 文件模块则是存 为  的文件(或文件 )的模块，可能是 JavaScript 代码、JSON 或 编译好的 C/C++ 代码。

// 文件模块的加载方法 对复杂，但十分灵活， 其是和 npm 结合使 用时。在不显式指定文件模块   的时 ，Node.js 会分别试图加上 .js、.json 和 .node    。
// .js 是 JavaScript 代码，.json 是 JSON 格式的文本，.node 是编译好的 C/C++ 代码。


//按路径加载模块

//文件模块的加载有两种方式，一种是 路 加载，一种是 找 node_modules 文件 。
// 如果 require 参数以  /  开 ，那么就以 对路 的方式 找模块  ，例如 require ('/home/byvoid/module') 将会  优先级 次尝试加载 /home/byvoid/module.js、
// /home/byvoid/module.json 和 /home/byvoid/module.node。

//如果 require 参数以  ./  或  ../  开 ，那么则以 对路 的方式来 找模块，
// 这种方式在应用中是最常见的。例如前面的例 中我们用了require('./hello')来加载 同一文件 下的hello.js。

//   通过  node_modules  录  模块

//如果require参数不以  /  、  ./  或  ../  开 ，而该模块 不是核心模块，那么就 要通过 找 node_modules 加载模块了。我们使用npm获取的包通常就是以这种方式加载的

//在 个目录下 行  npm install express，你会发现出现了一个 做node_modules 的目录

//在 node_modules 目录的外面一层，我们可以 接使用 require('express') 来代  require('./node_modules/express')。这是Node.js模块加载的一个重要特性:通过  找 node_modules 目录来加载模块。

//  require 遇到一个 不是核心模块， 不是以路 形式表示的模块  时，会试图 在 前目录下的 node_modules 目录中来 找是不是有这 一个模块。如果没有找到，
// 则会 在 前目录的上一层中的 node_modules 目录中继续 找， 复 行这一过程， 到遇到  目录为 。 个例 ，我们要在/home/byvoid/develop/foo.js中使用require('bar.js')
//  Node.js会依次查找:

// /home/byvoid/develop/node_modules/bar.js
// /home/byvoid/node_modules/bar.js
// /home/node_modules/bar.js
// /node_modules/bar.js

//为什么要这 做  因为通常一个工程内会有一些 目录，  目录内的文件需要访问
// 到工程共同  的模块时，就需要  目录上 了



// 加载缓存

//我们在前面提到过，Node.js 模块不会被重复加载，这是因为 Node.js 通过文件  存所 有加载过的文件模块，所以以后 访问到时就不会重新加载了。
// 注意，Node.js 是 据实际文 件  存的，而不是 require() 提供的参数 存的，也就是说 使你分别通过 require('express') 和
// require('./node_modules/express') 加载两次，也不会重 复加载，因为 管两次参数不同，解析到的文件却是同一个。


// 加载循序

//下面 结一下使用 require(some_module) 时的加载 序。

// (1) 如果some_module 是一个核心模块， 接加载，结 。
// (2) 如果some_module以  /  、  ./  或  ../  开 ， 路 加载 some_module，结 。
// (3) 假设 前目录为 current_dir， 路 加载 current_dir/node_modules/some_module。
// 如果加载成功，结 。
// 如果加载失 ， current_dir为其 目录。
// 重复这一过程， 到遇到 目录， 出异常，结束。