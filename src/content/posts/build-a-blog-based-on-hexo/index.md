---
title: 修建基于Hexo的博客以及踩过的坑
published: 2024-07-13
description: '※ 因为已经用Astro了，现在看这个已经没什么用了。'
image: './2024-07-15 215045.png'
tags: [
    Tech,
    Blog
]
category: 'Tech'
draft: false 
---

:::important
因为已经用Astro了，现在看这个已经没什么用了。
:::

一两个月前突然想把之前的个人网站修一下，然后打算从0开始写一个个人主页。没学过 HTML 和 CSS，所以那天一边看[教程](<https://developer.mozilla.org/zh-CN/docs/Learn>)一边写了一个下午，然后个人觉得还比较满意。

前几天刚好是放暑假了，我搞了一台日版Xperia XZ，上网搜一些教程时看到了一个人的[博客](<https://blog.shinoaa.com/2024/01/01/Sony Xperia 5/>)。我当时就突然想到，像这种应该不是自己写的界面，应该是有主题模板的，于是我找到了网站里面写着的Hexo，这样就制作了这个博客。其中根据的[教程](<https://blog.csdn.net/cat_bayi/article/details/128725230>)确实挺好的，现在主题用的是 [vivia](<https://github.com/saicaca/hexo-theme-vivia>)。

其实还有一点对于我来说不是很舒服，我之前写的网页在链接后面是带一个箭头的，但是这个主题没有。我还想把它加上去，于是顺藤摸瓜找到这个主题的目录，在css文件夹里面看到 `xxxxxxx.styl` ，上网可知这个是stylus的文件。于是我找到其中 `$text-link` 的部分然后开始魔改，但是我也不知道应该怎么改，随便改了亿下，好像有那种感觉了。

![链接后面有小箭头](<./2024-07-12 210820.png>)

但是我发现标题部分也多了小箭头。自认为可能会越搞越麻烦，于是还原样式，不改了。

![标题前面多了小箭头](<./2024-07-12 210727.png>)

7/12 23点追加：  
刚才写好上面的发现图片太小不好查看，于是上网找到 [fancybox](<https://github.com/fancyapps/fancybox>)插件可以满足我的要求。结果谁又知道这又挖了一个坑呢233333......

**上网找教程，第一类教程[（打开）](<https://tianma8023.github.io/post/hexo-material-intergrate-image-display-feature/>)大概是这样的流程：**
> 下载fancybox，编写js将其应用，在 `head.ejs` 中引入fancybox及js，完成

但是我按照此教程发现不生效，且在 `hexo g` 时提示 `jsLsload is not defined` 与 `cssLsload is not defined` ，上网无解决方案。

**然后换另─类教程[（打开）](<https://alex-mcavoy.github.io/hexo/f343e158.html>)，大概是:**
> 主题lib目录，git clone fancybox插件，在主题 `_config.yml` 中启用，完成

这个甚至更简单了，一看就不太可能，我试了之后也确实用不了。我感觉应该是我这个主题跟他的不一样，可能他那边有对于fancybox的支持，而我目前用的这个 [vivia](<https://github.com/saicaca/hexo-theme-vivia>) 大概率是没有的，至少我没看见。

**还有一个教程[（打开）](<http://gaothink.top/2020/03/31/%E6%9D%82%E8%AE%B0-Hexo%E6%B7%BB%E5%8A%A0%E5%9B%BE%E7%89%87%E6%94%BE%E5%A4%A7%E5%8A%9F%E8%83%BD/>)和第一类的流程相似。不过引入的部分不一样**
> 分析主题的源文件可知，主题文件夹下 `layout/partial` 中的 `head.ejs` 文件即是用来生成静态页面 `<head>` 标签的，在文件中添加如下内容
>
> ```js
> <!-- fancybox support -->
>    <% if(theme.fancybox === true ) { %>
>      <%- css('js/fancybox/jquery.fancybox.min.css') %>
>    <% } %>
> ```
>
> `layout` 文件夹下 `layout.ejs` 文件可以来生成 `body` 中的内容
>
> 我们添加如下内容来引入JS文件
>
> ```js
> <% if(config['fancybox'] = 'true'){ %>
>        <script type="text/javascript" src="/js/fancybox/jquery.fancybox.min.js"></script>
>        <script type="text/javascript" src="/js/wrapImage.js"></script>
>    <% } %>
> ```

照着来还是用不了。  
之后我开始在f12里面研究，这一种教程会在f12的 `<head>` 部分中出现 `<!-- fancybox support -->` ，但是后面的就没有了，看起来像是没过去if，但是我把if删了也没用。 `jquery.fancybox.min.js` 和 `wraplmage.js` 倒是出现了。

折腾到这里已经过去一个小时左右了，我没有死磕到底，继续换教程，此时出现了这一篇教程[（打开）](<https://blog.csdn.net/smileyan9/article/details/124333810>)，  
我只进行了4.1.1-4.1.3的操作，就生效了，不过我稍微修改了一下，

![head.ejs](<./2024-07-13 004445.png>)

![layout.ejs](<./2024-07-13 004507.png>)

其实这两个放一起也可以，不过我随便放了。此时重启即可。

不过此时会发现左边栏玲纱头像变小了，这是因为这个图片也被套上了fancybox。

![玲纱头像变小](<./2024-07-13 014441.png>)

于是稍微修改一下文件，加个判断，如下图所示：

![layout.ejs](<./2024-07-13 014128.png>)

```js
<% if(config['fancybox'] = 'true' && page.fancybox === true) { %>
  <link rel="stylesheet" href="https://lib.baomitu.com/fancybox/3.5.7/jquery.fancybox.min.css">
  <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
  <script src="//lib.baomitu.com/fancybox/3.5.7/jquery.fancybox.min.js"> </script>
<% } %>
```

![fancybox.ejs](<./2024-07-13 121810.png>)

如果有多个图片要屏蔽，则在 `fancybox.ejs` 中增加即可，如

```js
   $('img').not('.avatar img').not('#some-icon img').not('.bar img').each(function() {
   }
```

> 7/13 12点追加：这个地方不能写 `.not('/avatar_reisa.png')` ，刚开始写好还没问题，结果突然全部图片套不上fancybox。  
我也不知道为什么，试了很多次，还重新创了项目，结果发现这个地方应该写 `.not('.avatar img')` 。已经把上面的操作换掉了。

此时，只要在 `_config.yml` 中添加 `fancybox: true` ，以及文章front-matter中添加 `fancybox: true` 就大功告成了。

不过还有两个地方不知道怎么回事搞不好：

1. `hexo s` 打开之后，一访问网页就会在控制台中出现以下内容：

    ```text
    (node:4932) [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
    (Use `node --trace-deprecation ...` to show where the warning was created)
    Deprecation warning: use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used     for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.
    ```

    我也不清楚怎么回事，它告诉我用 `node --trace-deprecation ...` ，但是后面应该是要加一点什么内容。  
    还有就是前面写了 `._headers is deprecated` ，网上有人说要把 `._headers` 改成 `.getHeaders()` ？但是我不知道要改的文件是什么......

2. 样式有问题

   在测试过程中发现表格样式不对，具体见下图。左边为我的，右边为vivia示例。

   ![左边为我的，右边为vivia示例](<./2024-07-13 152057.png>)

   而且引用也缺了左边那一条竖线。

   ![左边为我的，右边为vivia示例](<./2024-07-13 152112.png>)

   在此主题的Github issues中看见有一个人和我遇到了相同的问题 [Markdown 表格样式 #76](<https://github.com/saicaca/hexo-theme-vivia/issues/76>)，但是他突然就关掉了issue，我也不知道为什么。  
   我尝试新建一个hexo项目，然后装上vivia，把表格复制进去，发现问题依旧会出现。我觉得可能是版本的问题，于是前往 `package.json` 里面把hexo和依赖项都降级了几次，还是没有解决。可惜这个主题已经不更新了，现在找开发者寻求支持也不太合理，不搞了。

- 其实还有一个小问题问题，不是我这边的，类似于这个：[font-awesome图标丢失 #49](<https://github.com/saicaca/hexo-theme-vivia/issues/49>)  
  就是网页左边栏中的X的图标不显示了，但是在 `_config.vivia.yml` 与f12中修改 `fa-brands fa-x-twitter` 成 `fa-brands fa-twitter` 之类的其他图标，又可以看见其他logo。

接下来只需要把这个项目接入GitHub，免费花分文，坐和放宽，轰！嚓-嚓-嚓，推-推，头抬起，此时就完成了博客的创建。

7/13 17点追加：已经接入GitHub了，不过过程中遇到一个问题，输入`hexo d`提示：

```text
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.
```

看起来就是我的网络有问题，但是我把我的Clash或Hiddify打开仍然没有用。  
根据网上教程执行 `ssh -T git@github.com` 问题复现。  
此时用443端口连接，输入 `ssh -T -p 443 git@ssh.github.com` ，成功连接，出现以下内容：

```text
Hi MediateFrystal! You've successfully authenticated, but GitHub does not provide shell access.
```

此时要修改SSH设置，但是我不知道设置文件在哪里改，搜索后知在`用户文件夹\.ssh\`，新建文件`config`，输入以下内容：

```text
# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443
```

保存然后关闭。此时，再执行 `hexo d` 即可在 <https://mediatefrystal.github.io/> 上面看见此博客了。

___

## 完 END

___

*刚刚（7/12 23点）写着不小心点到了链接（我是在网页上面写的），结果链接直接在当前标签页里面打开了，然后一点返回什么都没有了。无语ね！还好我常年开OBS以及回放缓存，养成了良好的习惯，拯救回了后面一部分，于是用QQ截屏的文本识别，再修改错误的地方以及把上面补回来才终于写回来。*  
*睡醒一觉感觉还是不太完美，于是又花了一个上午和半个下午继续修改。*

*这算是我第一篇博客吧，感觉写博客还挺麻烦的，而且不应该在在线编辑器里面写那么久还不保存的......已经不想再修改了......*

如果没问题的话，我将会在接下来一段时间更新一下之前折腾过的东西，（其实有一点类似于视频转文字教程），可能是那个百视通的R3300L，也有可能是Xperia XZ（如果搞好了的话），PSP1000，或者是Windows 11 21996实体机体验的简单报告？不过，应该不涉及很多专业知识，就是记录一下我优化/破解/使用之类的过程吧。

其实还有想要增加的内容，比如RSS订阅源，因为导航栏上面有按钮，所以最好还是加上。可能以后再整吧。

2024-07-13T07:56:39.588Z
