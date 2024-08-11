---
title: Fuwari博客升级
published: 2024-08-11
description: '因为Fuwari更新了，还支持图片放大，所以有必要更新一下。接下来会简单说一下如何更新，也是方便以后更新时查阅。'
image: ''
tags: [
    Blog,
    Fuwari,
    Tech
]
category: 'Tech'
draft: false 
---

## 起因

因为Fuwari更新了，还支持图片放大，所以有必要更新一下。  
接下来会简单说一下如何更新，也是方便以后更新时查阅。

## 步骤

1. 在Fuwari中生成新存储库。

    ![生成](<./2024-08-11 140912.png>)

2. 用VS Code克隆至本地。

    ![克隆](<./2024-08-11 141007.png>)

3. 保存工作区。

4. 安装Fuwari

   ```bash
   pnpm install
   ~~pnpm add sharp~~
   ```

   ![网络问题](<./2024-08-11 122445.png>)
   出现这种情况应该是网络问题，挂梯子勉强解决。之后梯子也不行，就改了淘宝镜像源。  
   `pnpm dev` 试一试，没问题就继续。

5. 配置 `.gitignore` 文件，添加（我安装了Local History插件）

   ```text
   .history
   *.code-workspace
   ```

6. 改顶栏

   照着之前发的文章「从Hexo转到Astro」。

   `src/config.ts`  
   `src/types/config.ts`  
   `src/pages` 中新建 `页面.astro`  
   `src/i18n/i18nKey.ts`  
   `src/i18n/languages/zh_CN.ts`  
   `src/constants/link-presents.ts`  
   `src/content/spec/` 中添加 `页面.md`  

7. 改底栏  
   `src/components/Footer.astro`

8. 自动更正的东西我也顺便改了一下  

   `.vscode/settings.json`  
   把旧博客 `src/content/` 中的 `post` 和 `page` 复制至新的博客

9. 添加netlify，cloudflare pages，zeabur的部署，步骤略了。
   最开始要在GitHub设置 - Applications中设置各平台能访问到的存储库（之前fork的MagiskOnWSA居然还在这里）
   ![GitHub设置](<./2024-08-11 133623.png>)
   这里出现一个小问题，下面再说。

10. 删除GitHub存储库，删除netlify，cloudflare pages，zeabur的部署。
   ![删除](<./2024-08-11 145614.png>)

11. 在VS Code里面提交更改，坐和放宽，完成！\^o^/
   ![提交](<./2024-08-11 150018.png>)

### 小问题
刚才添加部署那一步发现cloudflare pages又可以自动部署了？？
![成功](<./2024-08-11 134239.png>)

结果提交更改后就报错了，不过和之前不一样。
![出错](<./2024-08-11 150441.png>)
![出错](<./2024-08-11 150615.png>)
然后发现netlify也相同报错，怀疑是我本地有问题？
![出错](<./2024-08-11 151146.png>)

我就打算 `pnpm dev`，结果弹出以下报错。

```bash
PS D:\sturdy-funicular> pnpm dev

> fuwari@0.0.1 dev D:\sturdy-funicular
> astro dev

16:04:33 [vite] Error when evaluating SSR module D:\sturdy-funicular\astro.config.mjs: failed to import "astro-icon"
|- file:///D:/sturdy-funicular/node_modules/.pnpm/@iconify+tools@3.0.7/node_modules/@iconify/tools/lib/svg/index.mjs:1
import cheerio from 'cheerio';
       ^^^^^^^
SyntaxError: The requested module 'cheerio' does not provide an export named 'default'
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:134:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:217:5)
    at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at async nodeImport (file:///D:/sturdy-funicular/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_lightningcss@1.25.1_sass@1.77.8_stylus@0.63.0_terser@5.31.5/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:52928:15)
    at async ssrImport (file:///D:/sturdy-funicular/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_lightningcss@1.25.1_sass@1.77.8_stylus@0.63.0_terser@5.31.5/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:52786:16)
    at async eval (D:/sturdy-funicular/astro.config.mjs:8:31)
    at async instantiateModule (file:///D:/sturdy-funicular/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_lightningcss@1.25.1_sass@1.77.8_stylus@0.63.0_terser@5.31.5/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:52844:5)

[astro] Unable to load your Astro config

The requested module 'cheerio' does not provide an export named 'default'
  Stack trace:
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:134:21)
    at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at async ssrImport (file:///D:/sturdy-funicular/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_lightningcss@1.25.1_sass@1.77.8_stylus@0.63.0_terser@5.31.5/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:52786:16)
    at async instantiateModule (file:///D:/sturdy-funicular/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_lightningcss@1.25.1_sass@1.77.8_stylus@0.63.0_terser@5.31.5/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:52844:5)
 ELIFECYCLE  Command failed with exit code 1.
```

仔细看了一下，发现里面提到了一个叫 `cherrio` 的东西，在它的Github Issues中找到一个 [#3986](https://github.com/cheeriojs/cheerio/issues/3986)，跟我一模一样的问题。还是前天开的issue。  
应该是我刚刚不知道哪一步更新了，然后把它从 `1.0.0-rc.12` 升级到了 `1.0.0`，而这个版本就会出问题。

`1.0.0` 版本是3天前出的，而fuwari是5天前更新的，这下大概明白了。
可以把 fuwari 的 `pnpm-lock.yaml` 和 `package.json` 替换回来。

![替换](<./2024-08-11 161446.png>)

我感觉那个存储库不太能用了，所以再次生成了一个存储库，并且确保依赖项不会更新。
![重新开始](<./2024-08-11 162434.png>)
结果还是一样。原来我修好的是 `pnpm dev`，而不是deploy的问题。

最后，我搞明白了，原来是安装的时候不能输入 `pnpm add sharp`，否则 `sharp` 会从 `0.33.0` 升级到 `0.33.4` ，就导致错误了。  
这样，终于是完成了部署......
![成功](<./2024-08-11 164349.png>)

## 总结

最近的更新我挺满意的。图像可以放大；还增加了RSS功能（本来之前就准备自己搞的），不过我还没试过。  
然后更新也是比我想象中的要简单，快一点的话一个小时以内可以搞好。前提是不会出问题（  
这件事也告诉我们：有些东西更新了可能会变卡，而有些东西更新了直接就出问题了。  

v1: 2024-08-11T06:59:42.246Z  
v2: 2024-08-11T08:53:59.107Z
