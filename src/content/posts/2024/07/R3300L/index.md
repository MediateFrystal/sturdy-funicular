---
title: R3300L刷机和安装Cloudreve
published: 2024-07-23
description: '两个月前，我朋友给了我一个电视盒子 R3300L，我觉得可以折腾一下。这个盒子闲鱼上面还挺多，而且价格十分便宜。'
image: './IMG_6563.jpg'
tags: [
    Tech
]
category: 'Tech'
draft: false 
---
> ## 目录
>
> [开端](#开端)
>
> * [参数](#简单的参数)
>
> [刷机](#刷机)
>
> [安卓体验](#安卓体验)
>
> [Cloudreve](#cloudreve)
>
> * [开机自启动](#开机自启动)
> * [挂载](#挂载)
> * [修改Linux img大小](#修改linux-img大小)
> * [如何关机](#如何关机)
> * [Tailscale](#tailscale)
> * [一些想法](#一些想法)

---

## 开端

两个月前，我朋友给了我一个电视盒子 R3300L，我觉得可以折腾一下。这个盒子闲鱼上面还挺多，而且价格十分便宜。\^o^/
![I/O](<./IMG_6565.jpg>)

### 简单的参数

* 处理器：晶晨S905L
* ROM：8GB
* RAM：1GB
* 百兆网口x1，2.4G WiFi，没有蓝牙，TF卡槽x1，MicroUSBx1，USB-Ax1，AV接口x1，HDMIx1，DC5525x1。

这个I/O也是比较有意思，在现在常见的基础上还多了TF卡槽和MicroUSB。不过只有一个USB-A没那么方便。  
那个MicroUSB好像不能当成手机的接口，插电脑没反应，好像只在刷机的时候用？说到刷机，在AV口里面有一个隐藏的按钮（能想到放这里面的也是人才了），刷机的时候要按。

开机进系统发现疑似是刷过了的系统，安卓4.4.2。我想吐槽这个屏幕分辨率，比如说设置界面根本没有1080p，像是720p。但当我打开视频时发现视频确实是1080p的，所以怀疑是为了降低分辨率提升性能。4K的视频播放不了，只有音频。  
而且1GB运行内存确实是太小了，好像实际上可用就300MB左右。

![运行内存小](<./2024-07-17 165855.png>)

另外，我测过这个盒子的功耗，测的方式比较独特：  
用一个12v诱骗线让PD充电头输出12v，然后另一头DC直接接电视盒子。在中间放一个电流表，我用的是买了刚到的cc1。  
实测待机功耗0.5W，开机后平均功耗在2W左右，如果开机关机或者使用最高可以跑到4W。可以接受。  
开30分钟1.1Wh，1个小时2.3Wh，1小时22分钟3Wh。

![30分钟1.1Wh](<./IMG_6407.jpg>)
![1个小时2.3Wh](<./IMG_6415.jpg>)
![1小时22分钟3Wh](<./IMG_6418.jpg>)

---

## 刷机

因为安卓4很多软件都安装不了，所以刷机。  
某些安卓7.1.2和9的下载完之后要密码，怀疑是要进群，对于我来说还是算了。  
还有安卓6.0带谷歌框架的，我刷过后感觉谷歌框架在这上面没什么用。给张图：
![谷歌框架](<./2024-07-23 125453.png>)

网上有一个比较纯净安卓6.0的系统 [(固件)魔百和R3300L-Q7-S905L-安卓6-ROOT纯净系统-20191217版](https://www.right.com.cn/forum/thread-1761250-1-1.html)。  
最后也是留了这个，具体是哪个桌面的版本就记不清楚了。

[刷机教程](https://www.znds.com/tv-990056-1-1.html)

> 下载晶晨的刷机工具，然后安装对应的驱动。  
> 盒子关机状态用牙签之类的按住AV孔内按钮，然后插MicroUSB数据线，此时刷机工具应该显示出设备。

实际上，不知道是不是线的问题，总是连上然后突然就断开了。有时总是连上了没反应。然后我怀疑是usb口的问题，就前面板usb一路试到板载usb，不清楚这个有没有用。  

![4%](<./2024-07-23 122953.png>)

好不容易连上了发现刷机卡4%，教程说重新点一下刷机但是还是出现4%，之后就是卡2%。

![报错报错报错报错报错](<./2024-07-23 123333.png>)

我还怀疑是固件问题，用了其他固件；换了刷机工具的版本；换了线；仍然没有解决。┗|｀O′|┛
上网搜索了好久发现这个：<https://www.znds.com/tv-1189829-1-1.html> 。

原来**还要插电源线**，我 (￣_￣|||)，为什么这些教程没提啊。插电，轻松秒杀。直接刷好。

另外，刷机之后AV孔里面按钮没用了，所以要进入线刷模式，可以在盒子里用 `Reboot to LibreELEC` 这个软件重启至rec，然后再关机就可以被电脑识别。  
但是，这个盒子刷机最难的步骤就是连接上电脑，我之前平均要试十几分钟才可以连上。连上就简单，直接刷就完事了。

## 安卓体验

在这之后就可以搞软件了，另外这个系统其实可以从底下拉出导航栏的，之前无意中试出来了。
![导航栏](<./2024-07-23 125915.png>)

安装了[BBLL](https://github.com/xiaye13579/BBLL)还有Kodi。

ps。刚刚搜索BBLL时发现这个作者还开发了ACAC，这到时候必须下载一个！

Kodi挺好用的，不过那个拖动进度条做的非常拉跨。然后听说Kodi插件非常强大，但是我并没有找到多少个插件，还有那个中文插件库里面只有两三个插件，怀疑是版本太新了（v21）。另外很多Kodi相关的视频、文章都发布于三四年前，所以怀疑很多东西很久没有维护了......  
然后Kodi还支持网页端遥控器，我觉得这个很厉害，还可以AirPlay（虽然只是勉强能用）。安装的插件，两个哔哩哔哩都失效了，意料之中。但是网易云音乐插件居然还可以用，听音乐看MV，不过音质就是听个响级别。

大概就是这样，可以看b站，听音乐，但是总感觉是没多大用处。

---

## Cloudreve

电视盒子，应该比较适合长时间运行，功耗性能都比较低，适合拿来干什么呢？（其实我看见有人在这上面跑openwrt，不过我觉得那个对我来说没什么用）

改造成云盘！

其实我之前试过FTP，用的是primitive ftp这个软件，但是这个软件一点击启动就闪退，安卓4.4和安卓6都是如此。
![闪退](<./2024-07-23 130029.png>)

这次是看见了有一个人的个人网盘 <https://blog.yuchu.me/posts/30e5/> 。

![网盘](<./2024-07-17 155522.png>)

感觉还挺不错的界面，于是翻了一下他的博客，看看有没有相关信息。看见了他的 [用docker搭建cloudreve个人网盘系统](https://blog.yuchu.me/posts/cf51/)
于是上网找了一篇教程跟着操作： [Android搭建Cloudreve私人云盘](https://cloud.tencent.com/developer/article/2046860)

> 概括一下，就是在安卓里面安装linux deploy，然后运行debian，用debian启动cloudreve。

:::warning
本人之前在虚拟机里面体验过一会ubuntu，但是没有深入了解linux，没有linux开发经历，甚至指令都没有了解几个，所以接下来有出错的地方可以指正。
:::

![完成](<./2024-07-16 184757.png>)

过程很简单，要处理一下网络问题，很快就搞定了，输入网址可以访问。但是接下来的操作就出问题了。

### 开机自启动

因为关闭ssh服务就掉了，所以按照他说的，要设置进程守护。创建好 `cloudreve.service` ，执行命令，结果发现：

```text
root@localhost:/home/android# systemctl daemon-reload
Running in chroot, ignoring request.
```

就是Linux deploy用的是 `chroot`，所以用不了 `systemctl`。

![chroot](<./2024-07-17 151823.png>)

上网发现管理服务都是用 `systemctl`，所以很麻烦。

> **TL;DR**  
> 可行的解决方案 ↓ [配置rc.local](#可行方式-配置rclocal)

#### 几个解决方案

1. 换用 [servicectl](https://github.com/smaknsk/servicectl)

    按照教程执行代码：

    ```bash
    wget https://github.com/smaknsk/servicectl/archive/1.0.tar.gz
    tar -xf 1.0.tar.gz -C /usr/local/lib/
    ln -s /usr/local/lib/servicectl-1.0/servicectl /usr/local/bin/servicectl
    ln -s /usr/local/lib/servicectl-1.0/serviced /usr/local/bin/serviced
    ```

    结果输入servicectl报错：（同 <https://github.com/smaknsk/servicectl/issues/4>）

    ```text
    /usr/bin/servicectl: 16: [: -ne: unexpected operator
    /usr/bin/servicectl: 23: /usr/bin/servicectl: Syntax error: "(" unexpected
    ```

    issue中提到解决方案：

    `sudo nano /usr/bin/servicectl`  
    将第1行 `#!/bin/sh` 改成 `#!/bin/bash`  
    第16行 `if [ $EUID -ne 0 ]; then` 改成 `if [ "$EUID" -ne 0 ]; then`

    修改完成，Ctrl+O，Ctrl+X退出（我使用的是Xshell，也可以用Xftp在windows这边把文件修改好再替换，感觉比较方便一点）
    ![windows这边修改更方便](<./2024-07-17 152608.png>)

    这样就可以使用指令了：  
    `servicectl enable cloudreve`  
    `servicectl start cloudreve`  
    然后按Ctrl+C就可以关闭cloudreve

    但是开机并不会自启动，而且关闭也ssh会掉，于是上网找解决方案，但是十个有九个让我用systemctl，拜托！我不是不想用，而是用不了！

2. service命令

    找不到我的服务，之后把这个服务扔到 `/etc/init.d/cloudreve.service`就显示出来了，但是：

    ```text
    root@localhost:/home/android# service --status-all
     [ + ]  cloudreve.service
     [ - ]  cron
     [ ? ]  hwclock.sh
     [ ? ]  kmod
     [ ? ]  networking
     [ - ]  procps
     [ - ]  rsyslog
     [ + ]  ssh
     [ - ]  sudo
     [ - ]  udev
     [ - ]  ufw
    root@localhost:/home/android# service cloudreve   
    cloudreve: unrecognized service
    root@localhost:/home/android# service cloudreve.service
    /etc/init.d/cloudreve.service: 1: /etc/init.d/cloudreve.service: [Unit]: not found
    /etc/init.d/cloudreve.service: 3: /etc/init.d/cloudreve.service: https://docs.cloudreve.org: not found
    /etc/init.d/cloudreve.service: 7: /etc/init.d/cloudreve.service: [Service]: not found
    /etc/init.d/cloudreve.service: 17: /etc/init.d/cloudreve.service: [Install]: not found
    ```

    启动不了！

3. rc-service

    ```text
    root@localhost:/home/android# rc-service reload          
    bash: rc-service: command not found
    ```

    说要安装openrc，`apk add openrc --no-cache`

    但是apk是Alpine Linux的命令，所以 `command not found`，于是我替换成了 `apt install openrc`
    还真可以安装，但是装好之后执行还是出问题了

    ```text
    root@localhost:/home/android# rc-service cloudreve.service start
     * rc-service: Exec format error
    ```

4. 配置rc.local

    这是最后一个方法了。一开始运行没反应，后面发现部分教程要求在linux deploy里面打开初始化，然后路径就是默认的 `rc.local`。

    但是很多次在linux deploy中出现 `rc.local ... fail`，就是说明写的有问题。  
    最后发现直接在 `rc.local` 里写 `servicectl start cloudreve` 就可以运行了。  
    点击启动，就会自动启动了。但是点击停止的时候，还是会执行 `rc.local` ，也就是说关机都关不了，此时网站还是可以打开的。（效果疑似有点太好了！）
    ![关了又开](<./2024-07-17 130145.png>)
    总之就是现在整了好久都不行，目前这样不是说不可以，就是不太好。于是我就继续乱改，真的，就是像死马当活马医了。

    打开属性-初始化-初始化设置中的异步处理选项，然后点击停止服务器。
    ![弹了一大串东西](<./2024-07-17 141433.png>)
    弹了一大串东西，但是此时发现已经关闭了。点击启动然后再停止，就不会出现那么多东西了。
    ![stop done](<./2024-07-17 141632.png>)
    好像是修好了？！！？！o(><；)oo 没想到随便乱改都可以搞出一个解决方案（

总结一下：

#### 可行方式 配置rc.local

在教程建好cloudreve.service的基础上，
安装 1. [servicectl](https://github.com/smaknsk/servicectl)，如果用不了还需要修改，详见上文！  
打开初始化，异步处理。  
修改 `/etc/rc.local`，里面只需写 `servicectl start cloudreve` 就可以了。

要注意，这个毕竟不太规范，而且我也没有linux开发经历，只是随便乱折腾出来的解决方案，也不知道这样做会不会有什么其他问题！！！！  
不过我也找不到其他方法了，除非不用linux deploy！！但是至少现在可以跑起来了，我就不去动了！！（当然如果对此更好的解决方案可以告诉我！

之后设置开机自启动，在Linux deploy设置中勾选开机自动启动，延迟可以调一下，我调的是10秒。  
重启试一试，开机后会自动启动linux deploy（在后台），然后过一会就可以访问网盘了。(～￣▽￣)～

---

### 挂载

还有一点，那个教程没有提，还可以在配置中启用挂载，比如这样：
![挂载点](<./2024-07-16 203402.png>)
就是把我的外接的存储设备中的cloudreve文件夹挂载到linux中的 `/cloud/extsd/`。你也可以改成比如手机内部存储 `/storage/emulated/0/`，如：
![挂载点](<./2024-07-17 153840.png>)
这样做还有一点，之前文件是存在 `linux.img` 内的，现在可以直接在安卓系统里访问到这些文件了。对于我这种局域网网盘的来说还是挺好的，不过要是公用的就可能不太安全？

---

### 修改Linux img大小

补充，如果像我一样想要修改Linux Deploy的linux.img大小，看这个 <https://blog.csdn.net/qq_44839815/article/details/139195092>

---

### 如何关机

为了完全脱离鼠标操作，还差一步。

该如何关闭呢？ 我打算通过SSH连上然后再输入命令关闭。

根据： <https://blog.csdn.net/m0_59677938/article/details/124986115>

（以下命令均需要root权限，所以可以加一个sudo在开头。）

```bash
# 重启Linux deploy
unchroot linuxdeploy stop
# 重启
unchroot am start -a android.intent.action.REBOOT
# 关机
unchroot am start -a android.intent.action.ACTION_REQUEST_SHUTDOWN
```

用手机连接比较方便，我用的是JuiceSSH，在JuiceSSH中可以创建代码片段，一键输入。  
连接上后，长按终端界面打开菜单，选择代码片段就可以选择输入了！

---

### Tailscale

其实之后也可以用Tailscale来远程访问这个网盘，结果发现安卓版本过低。
在apkpure上1.62.0要求Android 5.1+，而1.66.0要求Android 8.0+。看看1.62.0还可不可以用。

![打不开](<./2024-07-17 164455.png>)

出现黑屏或者白屏，可能是内存不够？算了，目前没有这样的需求，而且还有其他方法，这里不细说了。

---

### 一些想法

另外我还有打算将这个盒子带出去，就相当于一个移动的NAS？  
如果是连接别人的wifi，然后ip比较好解决。比如用NetX，PingTools Pro软件扫描连接的wifi下面的所有设备，然后找到对应mac地址的设备即可找到ip。  
或者这个盒子也可以开热点，开了热点之后连上热点就可以访问了。不过这样都会改变ip，还是不是很方便，而且在cloudreve还会提示你网址变了要修改。

---

写完了，感觉好不容易啊！不校对了，直接发了。发完这一篇感觉接下来可能写不了了，7/31要开学了＞︿＜...  
2024-07-23T07:13:31.637Z
