---
title: R3300-L运行Armbian
published: 2024-08-24
description: ''
image: '2024-08-24 235127.png'
tags: [
    Tech,
    R3300-L,
    Cloudreve,
    Armbian
]
category: 'Tech'
draft: false 
---
> ### 目录
>
> [安装 Armbian](#安装-armbian)  
> [安装 Cloudreve](#安装-cloudreve)
>
> * [Cloudreve 进程守护](#cloudreve-进程守护)  
> * [挂载](#挂载)
>
> [安装 录播姬](#安装-录播姬)
>
> * [录播姬进程守护](#录播姬进程守护)  
> * [录播姬录播画质问题](#录播姬录播画质问题)
>
> [安装 Tailscale](#安装-tailscale)  
> [总结](#总结)
>
> * [吐槽](#吐槽)  
> * [功耗](#功耗)
> * [结果展示](#结果展示)

先补充一点：我之前说错了，R3300-L的Micro USB接口只需要一个转接器就可以变成普通的USB-A（比如可以接鼠标）。  
我之前怀疑这个接口只能刷机用是因为：这个盒子在安卓系统里无法adb连接电脑，可能是系统原因吧。（我没有在安卓系统中测试micro usb能不能接其他设备）  
总之这样来看USB接口够用了。

---

## 安装 Armbian

安装需要一张8GB及以上 Micro SD卡，或者U盘应该也可以。因为R3300-L有Micro SD卡卡槽，所以我就用SD卡了。

> 参考：<https://www.cnblogs.com/milton/p/11883811.html>

根据参考的教程中提供的 <https://share.weiyun.com/5eCvcvS> 密码：mivmcn，在5.44 -> Kernel 3.14 -> 20180729中下载 `Armbian_5.44_S9xxx_Ubuntu_bionic_3.14.29_icewm_20180729.img.xz`。

用[Etcher](https://etcher.balena.io/)将镜像刷入至SD卡中。刷完后在验证完整时出问题，我对比了压缩文件的MD5无误。解压后再刷入仍报错，但是不影响系统启动所以忽略。

插入SD卡开机如果引导进安卓，可以用[Reboot to LibreELEC](https://www.52pojie.cn/thread-1905070-1-1.html)这个软件，重启后之后开机都直接进Armbian。

初次启动输入账户`root`密码`1234`。此时提示要更改root的密码。更改完后可以选择创建一个普通账户，之后进icewm桌面可以用它登录。（用SSH连接时发现这个账户连接失败，遂用root登录。）
![初次启动](<./2024-08-22 215811.png>)
![登录界面](<./2024-08-22 215843.png>)
我感觉这个界面非常的古老，不过还好，这个界面以后大概率不会看到多少次。
![抽象壁纸](<./2024-08-22 220000.png>)
这个壁纸有点抽象2333
![主题](<./2024-08-22 220113.png>)
自带一些主题，都换了一遍感觉一股95/98/2000/ME/XP的味道。
![Firefox](<./2024-08-22 220232.png>)
自带61.0.1的火狐。感觉这个版本应该是干不了什么了。

我在这个图形化界面中打开armbian-config结果特别卡，然后画面闪来闪去的，不知道是不是爆内存了。如果SSH打开就没问题。

系统还可以添加WiFi。插网线的网络比较好所以没添加。我就不把Armbian写入eMMC里面了，说不定以后这个安卓系统有用呢。

---

## 安装 Cloudreve

> 参考：<https://cloud.tencent.com/developer/article/2046860>  
> <https://docs.cloudreve.org/>

下载Cloudreve并解压。我下载的是`cloudreve_3.8.3_linux_arm64.tar.gz`。

根目录创建cloudreve文件夹，复制cloudreve文件进去。给权限，我这边全部都给了。看看防火墙有没有问题。启动！

```bash
cd /
mkdir cloudreve
cd cloudreve
chmod 777 ./cloudreve
./cloudreve
```

此时会输出一下内容，看到中间会显示用户账户和密码。

```text
root@aml:/cloud# ./cloudreve

   ___ _                 _                    
  / __\ | ___  _   _  __| |_ __ _____   _____ 
 / /  | |/ _ \| | | |/ _  | '__/ _ \ \ / / _ \
/ /___| | (_) | |_| | (_| | | |  __/\ V /  __/
\____/|_|\___/ \__,_|\__,_|_|  \___| \_/ \___|

   V3.8.3  Commit #88409cc  Pro=false
================================================

[Info]    2024-08-22 18:57:38 Initializing database connection...
[Info]    2024-08-22 18:57:38 Start initializing database schema...
[Info]    2024-08-22 18:57:40 Admin user name: admin@cloudreve.org
[Info]    2024-08-22 18:57:40 Admin password: XXXXXXXXX
[Info]    2024-08-22 18:57:45 Start executing database script "UpgradeTo3.4.0".
[Info]    2024-08-22 18:57:45 Finish initializing database schema.
[Info]    2024-08-22 18:57:45 Initialize task queue with WorkerNum = 10
[Info]    2024-08-22 18:57:45 Initialize crontab jobs...
[Info]    2024-08-22 18:57:45 Current running mode: Master.
[Info]    2024-08-22 18:57:45 Listening to ":5212"
```

打开`http://该设备ip:5212/`一般来说就会出现Cloudreve登录页面，用上面的账户密码登录。
此时在终端按Ctrl+C结束进程，给它设置进程守护。

### Cloudreve 进程守护

> 参考：<https://docs.cloudreve.org/getting-started/install#jin-cheng-shou-hu>

创建 `/usr/lib/systemd/system/cloudreve.service` 并添加以下内容。  
将下文 `PATH_TO_CLOUDREVE` 更换为程序所在目录：

```bash
[Unit]
Description=Cloudreve
Documentation=https://docs.cloudreve.org
After=network.target
After=mysqld.service
Wants=network.target

[Service]
WorkingDirectory=/PATH_TO_CLOUDREVE
ExecStart=/PATH_TO_CLOUDREVE/cloudreve
Restart=on-abnormal
RestartSec=5s
KillMode=mixed

StandardOutput=null
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

启用和启动服务。

```bash
root@aml:/cloudreve# systemctl daemon-reload
root@aml:/cloudreve# systemctl start cloudreve
root@aml:/cloudreve# systemctl enable cloudreve
Created symlink /etc/systemd/system/multi-user.target.wants/cloudreve.service → /usr/lib/systemd/system/cloudreve.service.
```

### 挂载

我外接了一个2.5寸的机械硬盘，为了存多点文件，也是为了下文录播姬能够存储视频。

执行`lsblk`可以看见外接硬盘是`sda`，要挂载的分区是`sda1`。用`mount`命令挂载到你喜欢的地方（我这里是`/storage`）

```bash
root@aml:/cloudreve# lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda            8:0    0 465.8G  0 disk 
└─sda1         8:1    0 465.8G  0 part 

root@aml:/cloudreve# mount /dev/sda1 /storage
mount: /storage: unknown filesystem type 'exfat'.
```

提示未知文件系统，那就安装一下exfat。

```bash
sudo apt update
sudo apt install exfat-fuse
```

此时再执行就成功了。

```bash
root@aml:/cloudreve# mount /dev/sda1 /storage
FUSE exfat 1.2.8
```

还需设置为开机自动挂载，否则重启之后挂载就没了。

在`/etc/fstab`最后一行添加：  
`/dev/sda1    /storage    exfat    defaults    0 0`

挂载并查看状态。

```bash
mount -a
df -h

Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       466G   62M  466G   1% /storage
```

看见Mounted on /storage 说明已经挂载了。

Cloudreve管理面板 - 存储策略 - 添加存储策略。
![Cloudreve](<./2024-08-22 210245.png>)
除此之外还要修改用户组的存储策略。

此时就完成了Cloudreve的安装。  
文件复制测试正常：

```bash
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       466G  5.0G  461G   2% /storage
```

---

## 安装 录播姬

> 参考：<https://rec.danmuji.org/install/cli/>

我下载的是`linux-arm64.zip`。

随便找个文件夹，我是在根目录新建`brec`文件夹，解压文件进去。

```bash
cd /
cd brec
./BililiveRecorder.Cli --version
```

显示`Permission denied`就改一下文件的权限。

看看版本号能不能显示

```bash
root@aml:/brec# ./BililiveRecorder.Cli --version
2.12.0+Branch.tags-v2.12.0.Sha.f48fbf4d38fa52fedf40bbe928b0ce3e875c03c5
```

我也想方便一点，所以和官方文档一样简化一下：输入

```bash
alias brec="./BililiveRecorder.Cli"
```

选择一个保存配置文件和录制的文件的工作目录然后启动。我这边选择`/storage/brec/`

```bash
brec run --bind "http://*:2356" "/storage/brec/"
```

然后浏览器 `http://该设备ip:2356/` 就可以打开录播姬的管理页面。
![录播姬管理页面](<./2024-08-22 213255.png>)

### 录播姬进程守护

> 参考：<https://blog.csdn.net/weixin_46256482/article/details/128498549>

新建`/etc/systemd/system/brec.service` 并添加：

```text
[Unit]
Description=BililiveRecorder
After=network.target

[Service]
ExecStart=/brec/BililiveRecorder.Cli run --bind "http://*:2356" "/storage/brec/"

[Install]
WantedBy=multi-user.target
```

然后启动

```bash
systemctl daemon-reload
systemctl start brec
systemctl enable brec
systemctl status brec
```

### 录播姬录播画质问题

> 参考：<https://www.bilibili.com/read/cv27436504/>

这个问题挺麻烦的。最简单的解决方法就是把cookie填上去，建议用小号。

Edge浏览器打开F12开发者工具，打开b站。（最好不用火狐浏览器，原因在下文）

![cookie](<./2024-08-24 195308.png>)

全部复制粘贴过去就可以录制高画质了。

---

最好不要用firefox：主要是因为操作比较麻烦。

![cookie](<./2024-08-22 225915.png>)

在网络页面随便点一些条目，在下方cookie找到`bili_jct`和`SESSDATA`，复制并按照以下格式填入录播姬设置中：

`SESSDATA=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX;bili_jct=XXXXXXXXXXXXXXXXXXXX;`

回去录制一下看看，画质果然变高了。但是弹幕什么的都记录不到，日志中显示：

```bash
23:11:53 Info [Room] XX 弹幕服务器已连接
23:11:53 Info [Room] XX 与弹幕服务器的连接被断开
```

根据[issue #580](https://github.com/BililiveRecorder/BililiveRecorder/issues/580)，要把刚刚那个框里面的全部东西都复制过去。复制过去之后弹幕录制了，但是视频画质又变回去了。

```bash
23:12:01 Warning [StandardRecordTask] XX 返回的直播流地址的画质是 150 而不是请求的 10000
23:12:01 Info [StandardRecordTask] XX 连接直播服务器 d1--cn-gotcha09.bilivideo.com 录制画质 150 (高清)
23:12:01 Info [StandardRecordTask] XX 开始接收直播流
```

![cookie](<./2024-08-24 195119.png>)

我发现Firefox浏览器那里的cookie是长这样的，复制的时候复制不到那个冒号。粘贴出来是这种格式：

```text
bili_jct    "XXXXXXXXXXXXXXXXXXXXXX"
bili_ticket "XXXXXXXXX"
```

而Edge浏览器的cookie格式就是我想要的，而且还不用改动。

问题是可能过几天cookie就过期了，要手动更新。如果cookie过期了我就会在这里追加的！

---

## 安装 Tailscale

上篇文章其实就有点想整这个，不过因为当时是在安卓系统里面安装然后失败了。这次是Linux，这不是随便装？打开 <https://tailscale.com/download>，选择Linux然后自动或者手动安装。过程就略了。

![连接设备](<./2024-08-24 211451.png>)

刚刚发现在Tailscale控制台里面可以关闭Key expiry，之后应该就不用重新验证了。

![Key expiry](<./2024-08-24 211624.png>)

装好之后就很方便，直接远程打开本地网页！只需要打开Tailscale，换个IP地址就可以了。就像回到家里了一样 \\^o^/

---

## 总结

这次给R3300-L装Armbian算是比较顺利了。我也对这一次升级比较满意。  

### 吐槽

1. 之前用Linux Deploy的时候基本上在乱搞。而且它是运行在安卓里面的容器，外接硬盘还要挂载，说实话这对我来说并不方便。更不用说还要多运行一个安卓系统，浪费系统资源。它使用的chroot导致systemctl用不了还要另辟蹊径用servicectl和rc.local之类的东西，就非常的麻烦。

2. 录播姬中的 文件管理器 和 录播文件浏览器 中居然没有删除文件的功能！导致我想删除文件还要通过FTP（

3. 录制的视频好像无法自动添加进Cloudreve中。或者说，直接将文件扔进Cloudreve存储目录里面的文件是不会被检测到的！  
    比如我在一个文件夹中上传了一个文件，再把这个文件放至根目录。实际上在磁盘中文件一直都在那个文件夹中不会移动。这样做对存储设备来说是有益的，但是对我来说不太方便。  
    这是因为Cloudreve是类似于那种对象存储的结构，网盘基本上都是这么做的。（感觉像我之前搞一些东西时顺便安装的SQL Server一样）

    我在上课的时候突然想到：如果要能实时浏览文件，不应该用Cloudreve（毕竟人家是网盘）。我应该用Alist才对！回家后上网搜索了一下，确实，Alist就像是一个文件管理器一样，你所看到的就是真实的文件结构。但是我感觉用FTP也可以勉强胜任，所以就先不安装Alist了。  
    不过我在查看Alist官方文档时看见有能在安卓/iOS上运行的Alist，感觉可以随便玩玩。

### 功耗

机械硬盘的盘面信息：5VDC：0.55A，也就是说额定功率是2.75W。

在稳定运行的前提下简单测了一会。本来最开始只是随便测测没有遵守控制变量法，所以测得的结果仅供参考：

1. 接硬盘，启动Cloudreve，连续写入：测得整机+硬盘平均功耗**2.625W**左右。
2. 接硬盘，启动Cloudreve+录播姬，静置状态：整机+硬盘平均功耗为**2.498W**左右。
3. 不接硬盘，启动Cloudreve，静置状态：整机平均功耗为**1.835W**左右。（此时比之前的安卓+Linux Deploy的方案要更省电。
4. 不接硬盘，启动Cloudreve+录播姬，静置状态：整机平均功耗为**1.830W**左右。

除去误差及其他无关变量外，结果说明：

1. 不接硬盘的情况下，开不开直播姬不会影响功耗。
2. 接硬盘是使功耗增加的主要因素。
3. 根据1和2无法确定功耗的增加和什么因素有关，因为这两个对比的实验组有两个自变量。但是根据3和4得出的第一点结论可以推测出，功耗增加应该和连续写入有关。

（啊，一不小心就写出来了O_o）

### 结果展示

![录播姬](<./2024-08-24 232510.png>)

![直接播放视频](<./Screenshot_20240824_061102_Samsung Internet.jpg>)
在录播姬的文件管理器里点击flv文件，有时可以直接打开播放器。但是点击经常是直接下载了，不知道怎么回事。还是浏览器直接预览会方便一点。

![Cloudreve播放视频](<./2024-08-24 233218.png>)

![外观](<./IMG_7209.jpg>)

---
v1：2024-08-24T15:37:33.859Z
