---
title: 从Hexo转到Astro
published: 2024-07-19
description: '前几天不是说最近不打算转到Astro吗？真香了。既然Fancybox用不了那我就不用了！看不清楚就自己想办法吧！ ※ 之后有人创建了issue并且官方已经搞好了，所以看这个并没有什么用'
image: ''
tags: [
    Tech,
    Blog,
    Fuwari
]
category: 'Tech'
draft: false 
---

前几天不是说最近不打算转到Astro吗？真香了。

## 添加图片插件（失败

上网找了很久，好不容易看见一个叫做lightbox的插件，听介绍感觉跟fancybox差不多，而且适用于Astro，试一试！

:::note
以下为添加Lightbox操作过程。
:::

`ImageWrapper.astro` 添加 `data-lightbox`

![ImageWrapper.astro](<./2024-07-18 194901.png>)

`Layout.astro` 添加`lightbox`，注意要放在 `<head>` 元素的里面！

![Layout.astro](<./2024-07-18 195015.png>)
![Layout.astro](<./2024-07-18 195041.png>)

然后就可以使用lightbox了，**但是头像还有banner都可以点击放大，这就不太好了**。

f12发现套用的是 `src/pages/posts/[...slug].astro`，而现在用的是 `/src/layouts/Layout.astro`

![F12](<./2024-07-18 195249.png>)

并且在代码中可以看见： `[...slug].astro`中引用了 `MainGridLayout`，而 `MainGridLayout.astro`中引用了 `Layout`，和f12看到的一致。

所以我把 `layout.astro` 中两行代码移至 `[...slug].astro` 中，结果：

![emm](<./2024-07-18 200034.png>)

某种程度上确实没问题（

这就不好整了，因为也没多少给astro加灯箱之类的图片插件，好不容易找到一个却发现效果也不太好。

其实这里应该不用改，在刚刚的基础上加一个判断就说不定可以了。但是我还是放弃了，因为这个插件感觉没有之前那个fancybox那么好！fancybox是真好用啊！

:::note
Fancybox实在是难以在这上面运行。
:::

然后我强行上fancybox，不要问我为什么这么做，就是按照感觉来：先安装React，然后搞了一个fancybox.jsx，在之后把ImageWrapper.astro改了一下，套了`<a>`元素进去。结果不出所料，用不了。主要是这个地方怎么写img都试过了，输出都是字符串"img"，而不是那个路径，所以没有办法了。

现在其实就差这个图片的插件了，其他的都搞定了，我也不要求什么其他的插件，只要图片能够放大就可以了！lightbox虽然可以放大，但是看起来像是会放大到全屏，还不能缩小，还要自己想办法写一个判断。

~~好像我整hexo的都没有现在这么麻烦。（因为有教程~~

目前最好的办法就是不整这些了，说真的，我也是有点烦了。虽然图片不能放大，但是你可以新标签页打开，就是不方便。！用不了那我就不要了！你们看不清楚就自己想办法吧！  
..真的还是觉得自己写html+css+js会比较好，至少自定义程度上可以说无敌。

## 部署网站

### Vercel

正常网络下，Fuwari的示例进不去，而其基于Vercel运行，说明在我这里Vercel被墙了。就不使用了，因为还是考虑到国内访问的问题。

### Netlify

注册账号，添加存储库，然后就创建好了，我还把梯子关了，在Microsoft Edge上确实可以加载出来，就采用了。  
之后我才发现用Firefox和我的手机浏览器打不开，挂上梯子又可以了，证明被墙了。  
本来已经接受被墙的事实，已经过了半天，用正常网络访问居然可以加载了？！（但是随后几分钟就又寄了一半，所以能用，但不完全能用。

我尝试用VSCode来clone仓库，这次源代码管理器就可以正常使用了，所以之前的做法好像不太对。  
稍微改了一点东西然后提交更改就可以看见仓库更新了。

![仓库更新了](<./2024-07-18 125101.png>)

此时Netlify这边也开始deploy，之后网站更新就完成了。

![部署成功](<./2024-07-18 125202.png>)

用Netlify完全没问题，可惜有墙，感觉这个还挺好的说......

### Cloudflare Pages

因为我两三年前用freenom注册了一个免费域名，当时就注册了一个cloudflare。

创建Pages-选择存储库，框架预设选Astro，然后点击保存并部署，但是出现了问题。

![构建失败](<./2024-07-18 122441.png>)

不知道为什么会出现SyntaxError，点击重试无果，删除重建还是没用。

```text
13:09:05.179  SyntaxError: Unexpected token 'with'
13:09:05.180      at ESMLoader.moduleStrategy (node:internal/modules/esm/translators:119:18)
13:09:05.180      at ESMLoader.moduleProvider (node:internal/modules/esm/loader:468:14)
13:09:05.193  Failed: Error while executing user command. Exited with error code: 1
13:09:05.203  Failed: build command exited with code: 1
13:09:06.116  Failed: error occurred while running build command
```

于是尝试使用Wrangler。build，然后deploy，成功。

![成功了](<./2024-07-18 131648.png>)

但是通过这种方法，实质上就是本地构建，然后把构建好的网页上传到cloudflare，所以其实完全可以不需要Github那边的存储库的。
这样感觉没那么好，毕竟要输入：

```text
pnpm build
npx wrangler pages deploy dist
```

而之前只需提交然后同步更改就可以了！感觉没那么方便了！
※2024-8-11追加：换了一个就正常了，可以自动构建了，不知道怎么回事，一头雾水。

### Microsoft Azure

点击免费开始使用就白屏，挂全局梯子也没反应。

### Zeabur

好像只能选New Jersey那个节点，其他节点要付费了。
※2024-8-11追加：现在我看见了，还可以选一个德国的节点。
![节点](<./2024-08-11 133936.png>)

自动部署成功，也可以在Github上看到状态。

![自动部署成功](<./2024-07-18 135948.png>)

在这个项目下面的网络部分可以创建域名，最少长度是3，好像三位英文的都没被占完，所以可以注册一个短一点的。

![比如"mfw"](<./2024-07-18 140911.png>)

---

所以最后就留下了Netlify、CLoudflare Pages和Zeabur，我打算之后将github.io那个网站作为链接站，这样比较方便。

---

## 其他

感觉Astro与Hexo区别很大，

1. 比如设置，我感觉astro第一眼看上去感觉括号好多。毕竟语言也不一样了，一个是Astro，一个是YAML。

2. 然后是文件目录也不太一样，不细说了。

3. 如果像我之前那样，在顶部菜单栏添加几个选项和页面，相比之前更加麻烦了。

:::tip
在Astro/Fuwari中新建一个Todo页面
:::

我们可以照着关于页面复制一个，此时找到 `src/config.ts` ，在 `NavbarConfig` 中添加 `Todo` ：

```ts
export const navBarConfig: NavBarConfig = {
  links: [
    ...
    LinkPreset.Todo,
    ...
  ],
}
```

这里只需要用到一点点编程的通用经验就可以知道这个 `Todo` 是在 `LinkPresent` 中被定义的，  
由开头的 `import { LinkPreset } from './types/config'` 可找到 `src/types/config.ts` ，其中， `n` 为序号。

```ts
export enum LinkPreset {
  ...
  Todo = n,
  ...
}
```

此时应该要增加页面，在 `src/pages` 中看到 `about.astro` ，我猜应该是页面文件，所以复制并替换 `about` 为 `todo`：

```ts
---

import MainGridLayout from "../layouts/MainGridLayout.astro";

import { getEntry } from 'astro:content'
import {i18n} from "../i18n/translation";
import I18nKey from "../i18n/i18nKey";
import Markdown from "@components/misc/Markdown.astro";

const todoPost = await getEntry('spec', 'todo')

const { Content } = await todoPost.render()

---
<MainGridLayout title={i18n(I18nKey.todo)} description={i18n(I18nKey.todo)}>
    <div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
        <div class="card-base z-10 px-9 py-6 relative w-full ">
            <Markdown class="mt-2">
                <Content />
            </Markdown>
        </div>
    </div>
</MainGridLayout>
```

这里出现了 `I18nKey`（就是管理多语言的东西），打开 `src/i18n/i18nKey.ts` ，增加：

```ts
enum I18nKey {
  ...
    todo = 'todo',
  ...
}
```

另外还要在对应的语言中添加翻译，如 `src/i18n/languages/zh_CN.ts` ：

```ts
export const zh_CN: Translation = {
  ...
  [Key.todo]: 'Todo',
  ...
}
```

但是此时还是缺一点内容，省略几步，我们发现 `src/constants/link-presents.ts`，于是将其修改：

```ts
export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  ...
  [LinkPreset.Todo]: {
    name: i18n(I18nKey.todo),
    url: '/todo/',
  },
  ...
}
```

这样，我们只需要在 `src/content/spec/` 中添加 `todo.md`，就可以随意发挥了！

:::tip
在Hexo/Vivia中新建一个Todo页面
:::

而如果是用Hexo和Vivia，那么就变得非常简单：
修改 `_config.vivia.yml`，

```yaml
# 导航栏
menu:
  ...
  Todo: /todo
  ...
```

然后在 `source` 文件夹中新建 `todo` 以及 `todo/index.md`，就可以随意发挥了。

就两步，完成！非常简单！  
不过，我也清楚，做这么多大概也是为了能够方便多语言以及规范化吧。

---

* 另外，我发现用vscode去修改一些astro文件，保存时vscode会自动格式化，比如：

```astro
---

import { getEntry } from 'astro:content'
import {i18n} from "../i18n/translation";
import I18nKey from "../i18n/i18nKey";
import Markdown from "@components/misc/Markdown.astro";

---
```

保存时就会变成：

```astro
---

import { getEntry } from 'astro:content'
import Markdown from '@components/misc/Markdown.astro'
import I18nKey from '../i18n/i18nKey'
import { i18n } from '../i18n/translation'
---
```

一对比，确实感觉vscode的要更加整齐，但是有时反而会导致代码出错，不信可以试试用vscode打开 `src/layouts/Layout.astro` 然后保存一下。
不要问我为什么，问就是之前干过。

![预览寄了](<./2024-07-19 184841.png>)

![太吓人了](<./2024-07-19 184945.png>)

![吓人](<./2024-07-19 185916.png>)

300多行变成77行，真的很离谱！

打开vscode设置，搜索"格式化"，然后都关闭。

![全部关掉！](<./2024-07-19 185549.png>)

结果发现保存还是会格式化，好像是因为上面的Biome？于是将其改成"无"，结果还是没有用。
直接打开 `/.vscode/settings.json` ，发现

```json
{
  "editor.formatOnSave": false,
  "editor.defaultFormatter": null,
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "quickfix.biome": "always",
    "source.organizeImports.biome": "always"
  },
  ...
}
```

可以说改了，但是没完全改。特别是底下这个 `fixAll` 和 `quickfix` ，看来是有备而来，不讲武德。

![有备而来，不讲武德！](<./2024-07-19 191604.png>)

根据vscode提示，三个都改成 `never`，随便保存就不会自动格式化了。

```json
  "editor.codeActionsOnSave": {
    "source.fixAll": "never",
    "quickfix.biome": "never",
    "source.organizeImports.biome": "never"
  },
```

---

## 总结

其实我本来是html-css-js三件套的，现在用了框架，觉得是有一点不方便，而且还加了主题。这主题也不是我写的，所以我也不太清楚这个主题是如何运作的。  
而至于Hexo和Astro，我觉得算是各有特点吧。我说不出哪一个框架更好，我只能说哪一个主题好看好用我就用哪个了。

可能过几天会把几篇文章复制过去，毕竟主题新一点，所以呢也是希望Fuwari可以做得更好！

### END

---

**以下为之前发布于Hexo版本上的"从Hexo转到Astro？"，有删改**

```markdown
---
title: 从Hexo转到Astro？
tags:
  - tech
categories:
  - tech
fancybox: true
date: 2024-07-15 21:22:37
---
```

其实昨天已经基本上搞好了，但是那几个小问题还是比较烦，偶然打开了[Fuwari](https://github.com/saicaca/fuwari/)主题，也就是基于[Astro](https://astro.build/)框架的[Vivia](https://github.com/saicaca/hexo-theme-vivia)主题的新版本，看见示例非常非常好看，真的心动了。

---

## 下载

先上网看了一下Astro，好像没有那种非常详细的教程，但是有官方中文文档。看了一会感觉发现应该看Fuwari的使用方法才对，于是就照着来做了。  
生成新仓库，下载，解压，安装pnpm，执行 `pnpm install` 和 `pnpm add sharp`，然后`pnpm dev`就可以在`localhost:4321`看见网站了。

Astro的好处：修改完成可以实时预览，这点很棒。还有一点，就是可以用Fuwari主题！但是，主题是安装在博客内的，也就是说，不能通过包管理器更新，也不能随意更换主题。  
而且我对这些玩意根本不熟啊！！

## 想装Fancybox上去

刚装好我发现图片和之前一样不能放大，我就想要给它装一个类似于fancybox的插件，但是在官网看了半天也没找到这种插件，倒是有很多优化图片的插件。

想着自己整，但是看了 [fancybox](https://fancyapps.com/fancybox/)官网，也不知道应该怎么搞上去。试着`pnpm install --save @fancyapps/ui`，然后后面讲：`Once installed, you can include Fancybox as an ES module`，还有两行import。

```astro
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
```

这两行东西我也不知道放哪里，只知道是js，于是打开了`\src\components`下的`GlobalStyles.astro`，或者是`\src\components\misc`下的`ImageWrapper.astro`，找了一个地方塞进去，然后会提示我什么什么，要把在终端里面提示的两行代码复制到上面改掉之前的。  
此时发现vs在保存的时候会自动帮我改掉很多东西，导致直接报错，但是我撤销然后也没用，因为我保存了。遂用Notepad3修改。

改好之后发现没有报错，也没有任何反应。f12查找fancybox，可以看到确实被引用了，但是图片还是那个图片，没有加上`data-fancybox`之类的东西，所以没反应。  
fancybox下面的示例给的是html，然后我把它复制到md里面并且修改图片地址，但是一点击图片就直接以链接的形式打开了。

```html
<a href="image-a.jpeg" data-fancybox data-caption="Single image">
  <img src="thumbnail-a.jpeg" />
</a>
```

其实把这里面`data-fancybox data-caption`给删掉就是普普通通的html，所以点击就会打开图片的链接。这样虽然不是不行，但是毕竟还是简单粗暴，而且没这个插件什么事了。  
其实也可以不整这个插件，就是图片放不大，但是我不知道还可以用什么来在基于Astro上实现图片放大的功能了。我觉得应该还是有机会的，毕竟最后生成的是html，而至于修改哪里就不清楚了。

想想还是算了，至少目前算了。搞好Hexo也没多久。老实说，这几天一直都在搞这个网站，没空看b站和登录ba了。今天早上3点才睡觉，起床发现忘记调闹钟，已经下午1点。起床继续干活，好像没干什么，就到了下午5点了，吃完饭，终于是把win11那篇搞定，搞了一下astro，顺手就写了这一篇短文。

然后感觉好像没多少教程，而且托管到github上要用vs code里面的源代码管理，我在那里选择时出现了`fetch failed`，不太清楚怎么回事，开了梯子也没用。

Turn to Astro? 下次一定！

---

### 2024.8.4追加

两周前我看见有一个 [#131](https://github.com/saicaca/fuwari/issues/131)，提到了图片放大的功能，正是我想要的！！而且开发者也说了「This is exactly what I want to implement.」 目前看到官方的示例，已经搞定了。  
但是更新astro并不是很方便，所以还是等有空再说吧。估计应该是重新生成一个仓库，然后clone到本地，再修改比如顶栏和底栏astro文件吧，应该是大工程。主要是因为我看见现在的底栏多了RSS和Site Map，说明官方改过了这个文件，既然如此还是要手动改一遍。
