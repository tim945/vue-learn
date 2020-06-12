<!--
 * @Author: tim
 * @Date: 2020-06-12 10:46:41
 * @LastEditors: tim
 * @LastEditTime: 2020-06-12 10:49:51
 * @Description: 
--> 
# THIS IS HEADER
如果你使用了 `package.json` 来管理项目, 你可以将 `apidoc.json` 放在 `package.json` 里面, 以 `apidoc` 为key即可

``` sh
{
  "name": "apidoc-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "Eve",
  "license": "MIT",
  "apidoc": {
    "name": "apidoc-demo",
    "description": "You write something here to describe your project",
    "title": "The title of this doc",
    "header": {
      "title": "文档说明",
      "filename": "header.md"
    },
    "footer": {
      "title": "文档结尾",
      "filename": "footer.md"
    }
  }
}
```