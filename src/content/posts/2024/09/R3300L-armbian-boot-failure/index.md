---
title: R3300-L上面的Armbian坏了！！！！
published: 2024-09-16
description: ''
image: ''
tags: [
    Tech,
    Armbian,
    R3300-L
]
category: 'Tech'
draft: false 
---

今天非常非常正常的关机后，再开机就打不开了。  
当时要下载直播回放，发现Alist打开没反应。SSH连接失败，换设备也连不上......

连上采集卡看看到底发生什么了。

![屏幕](<./IPS_2024-09-14.20.52.26.0890.mp4_20240916_071155.290.jpg>)

主要是进入了emergency mode，退出后显示 `A start job is running for Flush Journal to Persistent Storage ( XXs / 1min 30s)`，另外一个是 `A start job is running for dev-sda1.device`。  
看起来sda1超时了，sda1是我外接硬盘分区。看到这里我还以为盘挂了，赶紧拿下来插电脑上看看，还好没什么问题。

上网找了一个[教程](<https://tobyqin.cn/posts/2020-02-03/add-and-delete-swap-files-under-linux/>)，输入：`free -h` 和 `swapon -s`

![输出](<./2024-09-16 072130.png>)

第一个swap显示没有大小，第二个完全没有输出，可以看出swap区没了。于是用`dd`命令生成swap文件，结果卡住了。用`fallocate`命令创建成功，然后一系列命令启用swap等等，但是重启仍然进入emergency mode，还是不行！！！！！

我也不想搞那么多了，于是换了一张64GB的SD卡，重新写了一个系统进去。因为是新卡吧，启动速度果然快了很多。

按照之前的教程，顺利启动了。找出旧卡，复制那两个服务文件，brec文件夹和cloudreve文件夹，就不用重新设置一些东西了。

顺便说说安装Alist，只需用脚本一键安装即可，非常方便。之前安装时都没用电脑，直接用手机装的。  
<https://alist.nn.ci/zh/guide/install/script.html>

（另外发现弹幕姬某天的log特别大，可能是没连接上弹幕服务器所以一直在提示吧）
![log](<./2024-09-14 214238.png>)

花了晚上两个小时搞好，时间算是非常快了。感觉可能是卡的问题，毕竟这张卡只有8GB，而且是SDHC/Class4，远古老卡。实在没其他SD卡了，只能把之前新买的64GB/SDXC/A1/U1/C10的卡换上去了。感觉有一点浪费，因为我这边Armbian还有其他软件加起来最多用8GB。

2024-09-15T23:52:05.331Z
