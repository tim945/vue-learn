<!--
 * @Author: tim
 * @Date: 2020-08-25 14:38:31
 * @LastEditors: tim
 * @LastEditTime: 2020-08-25 14:41:33
 * @Description: 
-->
# electron 1 more 卡死解决
1. 编辑 ~/.npmrc （在VSC 开发工具下 ：命令行里输入 ~/.npmrc）
2. 加入以下内容并保存：
  registry=https://registry.npm.taobao.org
  sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
  phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
  electron_mirror=http://npm.taobao.org/mirrors/electron/
3. 在node_modules下将 electron文件删除
4. npm install

