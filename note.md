
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

### 配置路由
如果没有安装vue-router组件
npm install vue-router --save
配置router下面的index.js

### 更改favicon.ico
替换 public下的 favicon.ico即可

### 封装网络框架
npm install axios --save


### 命名问题
.vue文件名 要使用 PascalCase
使用HomeSwiper 不能是使用Home-Swiper 否则会有问题


### better-scroll
(要封装起来) 好的设计架构views中不要直接使用这个better-scroll，
版本不要下载最新 我遇到了bug 有情况不滚动的情况
npm install better-scroll@v1.15.0


### 安装vuex
npm install vuex --save
