
###　划分目录结构src中
```
src:
    components: 一般放公共的组件 views中都有用的组件
        common: 完全和项目无关的- 其他项目也可能使用
        content: 业务相关的公共组件
    views: 业务项目的模块
    router: 路由相关
    store: 状态管理
    network: 网络相关-网络请求封装
    common: 公共的js {const.js|utils.js}  -> 其他项目也会用的公共
    assets:
        css
            normalize.css |  base.css 两个css文件
        img
```
### cli3 里面配置别名
    需要创建 vue.config.js 固定的文件
    module.exports

### 创建 .editorconfig 配置统一文件
    脚手架二中有，3中已经删除，但是要自己搞一个

