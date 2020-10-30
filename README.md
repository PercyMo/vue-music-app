## 前言
* 本项目为学习慕课网Vue.js音乐App高级实战课之后的练习项目（在原项目基础上做了些小小改动），需要学习者请转至黄佚老师账号下查看源码，或者慕课网购买原版视频。
* 本项目所使用的音乐及图片等资源，是直接抓取QQ音乐官网的线上接口，仅作为项目练习使用，不用做商业用途。

### 技术栈
vue2 + vuex + vue-router + axios + webpack + ES6 + styls
### 项目运行

```
$ git clone https://github.com/PosyMo/vue-music-app.git
$ cd vue-music-app
$ npm install
$ npm run dev
```

## 说明
### 涉及的技术点
1. jsonp跨域请求
2. 服务器请求代理
3. Base64格式编解码
4. 图片懒加载
5. SVG绘图
6. 原生touch事件

## 部分截图
#### 推荐页
<img src="http://img.vanilla.ink/me/webproject/vue-music-app/recommend.png" width="365" height="619"/> <img src="http://img.vanilla.ink/me/webproject/vue-music-app/recommend.gif" width="365" height="619"/>
#### 歌手页
<img src="http://img.vanilla.ink/me/webproject/vue-music-app/singer.png" width="365" height="619"/> <img src="http://img.vanilla.ink/me/webproject/vue-music-app/singer.gif" width="365" height="619"/>
#### 排行页
<img src="http://img.vanilla.ink/me/webproject/vue-music-app/rank.png" width="365" height="619"/> <img src="http://img.vanilla.ink/me/webproject/vue-music-app/rank.gif" width="365" height="619"/>
#### 搜索页
<img src="http://img.vanilla.ink/me/webproject/vue-music-app/search.png" width="365" height="619"/> <img src="http://img.vanilla.ink/me/webproject/vue-music-app/search.gif" width="365" height="619"/>
#### 播放器界面
<img src="http://img.vanilla.ink/me/webproject/vue-music-app/player.gif" width="365" height="619"/> <img src="http://img.vanilla.ink/me/webproject/vue-music-app/playlist.gif" width="365" height="619"/>
## 项目布局
```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── api                                     // api相关封装
│   ├── base                                    // 基础组件
│   │   ├── toast                               // 文字提示组件
│   │   ├── confirm                             // 确认对话框组件
│   │   ├── listview                            // 歌手列表组件
│   │   ├── loading                             // 加载中...
│   │   ├── no-result                           // 无结果时状态页
│   │   ├── progress-bar                        // 横向进度条
│   │   ├── progress-circle                     // 圆形进度条
│   │   ├── scroll                              // 基础滚动组件
│   │   ├── search-box                          // 搜索框组件
│   │   ├── search-list                         // 搜索历史组件
│   │   ├── silder                              // 幻灯片组件
│   │   └── song-list                           // 歌曲列表
│   ├── common                                  // 公共资源文件
│   │   ├── fonts                               // 字体文件
│   │   ├── image                               // 公共图片
│   │   ├── js                                  // 公用函数封装
│   │   └── stylus                              // 基础样式文件
│   ├── components                              // 业务逻辑组件
│   │   ├── disc                                
│   │   ├── m-header                            // App头部
│   │   ├── music-list                          // 音乐专辑页面
│   │   ├── mv-detail                           // 视频播放页面（后续开发）
│   │   ├── player                              // 播放器组件
│   │   ├── playlist                            // 播放列表
│   │   ├── rank                                // 排行榜
│   │   ├── recommend                           // 热门歌单推荐
│   │   ├── search                              // 搜索页面
│   │   ├── singer                              // 歌手组件
│   │   ├── singer-detail                       // 歌手详情组件
│   │   ├── suggest                             // 搜索结果列表
│   │   ├── tab                                 // 全局tab导航
│   │   └── top-list                            // 
│   ├── router                                  // 路由相关
│   │   └── index.js
│   ├── sotre                                   // vuex状态管理
│   │   ├── actions.js                          // 配置actions
│   │   ├── getter.js                           // 配置getter
│   │   ├── index.js                            // 引用vuex，创建sotre
│   │   ├── mutation-types.js                   // 定义muations常量
│   │   ├── mutations.js                        // 配置mutations
│   │   └── state.js                            // 定义state状态
│   ├── app.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件
├── index.html                                  // 入口html文件
.
```