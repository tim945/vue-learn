define({
  "name": "apidoc-demo",
  "version": "0.2.0",
  "description": "You write something here to describe your project",
  "title": "The title of this doc",
  "header": {
    "title": "文档说明",
    "content": "<!--\n * @Author: tim\n * @Date: 2020-06-12 10:46:41\n * @LastEditors: tim\n * @LastEditTime: 2020-06-12 10:49:51\n * @Description: \n--> \n<h1>THIS IS HEADER</h1>\n<p>如果你使用了 <code>package.json</code> 来管理项目, 你可以将 <code>apidoc.json</code> 放在 <code>package.json</code> 里面, 以 <code>apidoc</code> 为key即可</p>\n<pre class=\"prettyprint lang-sh\">{\n  \"name\": \"apidoc-demo\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"author\": \"Eve\",\n  \"license\": \"MIT\",\n  \"apidoc\": {\n    \"name\": \"apidoc-demo\",\n    \"description\": \"You write something here to describe your project\",\n    \"title\": \"The title of this doc\",\n    \"header\": {\n      \"title\": \"文档说明\",\n      \"filename\": \"header.md\"\n    },\n    \"footer\": {\n      \"title\": \"文档结尾\",\n      \"filename\": \"footer.md\"\n    }\n  }\n}\n</pre>\n"
  },
  "footer": {
    "title": "文档结尾",
    "content": "<!--\n * @Author: tim\n * @Date: 2020-06-12 10:46:41\n * @LastEditors: tim\n * @LastEditTime: 2020-06-12 10:51:24\n * @Description: \n--> \n<h1>THIS IS FOOTER</h1>\n<p>以上为文章的全部内容，如有疑问请联系负责人.</p>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2020-06-12T06:07:49.507Z",
    "url": "http://apidocjs.com",
    "version": "0.23.0"
  }
});
