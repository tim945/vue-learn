``` js
// 方式1：
export default {
  components: {
    'component': (resolve) => {             
      let filePath = 'filepath/file'
      if(filePath){          
        return require([`@/${filePath}.vue`], resolve)
      }else{
        return null
      }
    }
  }
}

// 方式2：webpack alias
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    '@': resolve('src'),
    'homePageView': resolve('src/dashboard/index')
  }
}
// 文件引入
export default {
  components: {
    'component': () => import('homePageView')
  }
}
```
