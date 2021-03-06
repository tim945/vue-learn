<!--
 * @Author: tim
 * @Date: 2020-03-02 10:58:40
 * @LastEditors: tim
 * @LastEditTime: 2020-05-25 11:41:24
 * @Description: 
--> 
# 本地代码首次推送到远程仓库

``` sh
#…or create a new repository on the command line
echo "# node" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/tim945/node.git
git push -u origin master
                
#…or push an existing repository from the command line
git remote add origin https://github.com/tim945/node.git
git push -u origin master
```

``` sh
git init   // 初始化版本库

git add .   // 添加文件到版本库（只是添加到缓存区），.代表添加文件夹下所有文件 

git commit -m "first commit" // 把添加的文件提交到版本库，并填写提交备注

首次推送

git remote add origin http://orgin.git  // 把本地库与远程库关联（http://orgin.git你的远程库地址）

git push -u origin master    // 第一次推送时

再次推送

git add .   // 添加文件到版本库（只是添加到缓存区），.代表添加文件夹下所有文件 

git commit -m "first commit" // 把添加的文件提交到版本库，并填写提交备注

git push  // 第一次推送后，直接使用该命令即可推送修改。有时需使用git push origin master

开发dev分支

git checkout -b dev // 创建并切换到dev分支

git push --set-upstream origin dev // 将dev分支推送到远程仓库


合并dev分支至master

git checkout master // 切换到master分支

git merge dev // 合并dev分支到当前分支（master）

查看所有分支

git branch -a // 查看所有分支

历史版本库不统一时（开发不规范删除了master从新提交时会导致）

git merge origin/mater --allow-unrelated-histories // 拉取远程master到当前分支

查看历史及版本回退

git log // 查看提交历史

git reset --hard 2406befe620 // 回退到指定版本2406befe620f045e6471a82e1e39e1619e530899即为图中项目创建提交后的代码。指定版本输入前几位即可，无需输入全部

git push -f origin dev_qzq // 强制推送当前分支到远程qzq分支

更换当前git账号密码

git config --global credential.helper store
 
git pull /git push (第一次输入，后续就不用再次数据)

删除分支

git branch -D dev-self // 删除本地dev-self分支

git push origin --delete dev-self // 删除远程dev-self分支

暂存分支

git add . // 有修改,添加修改文件

git stash save '本次暂存的标识名字'

git stash list // 查看暂存列表

git stash pop stash@{index} // pop通过list索引index取出，恢复暂存并删除暂存区记录

git stash apply stash@{index} // apply通过list索引index取出，恢复暂存并保留暂存区记录

git stash drop stash@{index} // drop通过list索引index取出，删除暂存区记录

git stash clear // 删除全部暂存

克隆一份带提交历史的版本库
1.克隆一份裸版本库

git clone --bare http://github.com/project.git

2.创建新的git项目
3.将裸库推送到新创建的git仓库http://github.com/newproject.git

cd project.git

git push --mirror http://github.com/newproject.git

4.克隆远程仓库到本地。可查看历史版本

git clone http://github.com/newproject.git
```

# Git 之 恢复修改的文件

## 只是修改了文件，没有任何 git 操作，直接一个命令就可回退
``` sh
git checkout -- aaa.txt # aaa.txt为文件名
```

## 修改了文件，并提交到暂存区（即编辑之后，git add 但没有 git commit -m ....）
``` sh
$ git log --oneline    # 可以省略
$ git reset HEAD    # 回退到当前版本
$ git checkout -- aaa.txt    # aaa.txt为文件名
```

## 修改了文件，并提交到仓库区（即编辑之后，git add 和 git commit -m ....）
``` sh
$ git log --oneline    # 可以省略
$ git reset HEAD^    # 回退到上一个版本
$ git checkout -- aaa.txt    # aaa.txt为文件名
```