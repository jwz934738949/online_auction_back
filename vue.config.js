// module.exports = {
//   outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
//   lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
//   runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
//   transpileDependencies: [
//     /* string or regex */
//   ], // 是否为生产环境构建生成sourceMap?

//   productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//   chainWebpack: () => {},
//   configureWebpack: () => {}, // CSS 相关选项

//   pwa: {}, // configure webpack-dev-server behavior
//   devServer: {
//     open: process.platform === "darwin",
//     disableHostCheck: false,
//     port: 8088,
//     https: false,
//     hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
//     proxy: {
//       "/api": {
//         target: "http://auction.redarm.cn/api", //你要跨域的网址  比如  'http://news.baidu.com',
//         // secure: true, // 如果是https接口，需要配置这个参数
//         changeOrigin: true, //这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
//         pathRewrite: {
//           "^/api": "/api", //路径的替换规则
//           //这里的配置是正则表达式，以/api开头的将会被用用‘/api’替换掉，假如后台文档的接口是 /api/list/xxx
//           //前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx
//         },
//       },
//     }, // string | Object
//     // before: app => {}
//   }, // 第三方插件配置

//   pluginOptions: {
//     // ...
//   },
// };
