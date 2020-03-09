<!--
 * @Author: tim
 * @Date: 2020-03-09 14:10:41
 * @LastEditors: tim
 * @LastEditTime: 2020-03-09 15:01:32
 * @Description: 
 -->

# npm 包的发布

- 在终端输入 `npm adduser`，提示输入账号，密码和邮箱，然后将提示创建成功

- 在终端输入 `npm login`，然后输入你创建的账号和密码，和邮箱，登陆
> 【npm adduser成功的时候默认你已经登陆了，所以不需要再接着npm login.

- 通过 `npm publish` 发包
``` sh
npm publish 

# npm publish <包路径>
npm publish --registry http://10.73.34.63:4873/
```

- 取消发布的包
``` sh
npm unpublish 包/包@版本号 --force

# npm publish <包路径>
npm unpublish 包/包@版本号 --force --registry http://10.73.34.63:4873/
```
::: tip
根据规范，只有在发包的24小时内才允许撤销发布的包
:::

- 更新发布后的包
1. 修改包的版本（package.json里的version字段）
2. npm publish

- `npm` 的版本控制
> package.json里面有一个version字段

具体体现为：对于"version":"x.y.z"
1. 修复bug，小改动，增加z
2. 增加了新特性，但仍能向后兼容，增加y
3. 有很大的改动，无法向后兼容，增加x

例如：我原本的项目是1.0.0版本的话
若是1中情况，变为1.0.1
若是2中情况，变为1.1.0
若是3中情况，变为2.0.0

::: tip
通过 `npm version <update_type>` 自动改变版本，自动修改 package.json 里的 `version`的版本号 
update_type 为 `patch`, `minor`, or `major` 其中之一，分别表示补丁，小改，大改
:::