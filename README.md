## 项目来自[小疯子](https://github.com/zwpro)大神的[外卖红包](https://github.com/zwpro/redCover)

大神开源的项目，我根据自己的需求做了一些显示和功能上的修改

增加了后端接口版本。

### 微信红包封面领取小程序，用户观看视频广告或者邀请新用户可获取微信红包封面序列号，还可给外卖优惠券引流

微信红包封面领取小程序

<img src="https://raw.githubusercontent.com/zwpro/redCover/master/unpackage/cover1.png" width="30%"/> <img src="https://raw.githubusercontent.com/zwpro/redCover/master/unpackage/cover2.jpg" width="30%"/> <img src="https://raw.githubusercontent.com/zwpro/redCover/master/unpackage/cover3.png" width="30%"/>

### 使用方法

源码为uniapp项目，需下载hbuilder导入项目打包，编译成小程序

[在线文档](http://lianghua.wxthe.com/docs/)

### 常见问题

1.封面配置（待整理）

2.广告位配置（待整理）

3.优惠券配置（待整理）

另附：[外卖CPS红包小程序](https://github.com/zwpro/coupons)

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 ❤️

<img src="http://cdn.letwind.com/me/zanshang.jpg" width="200"/>

如有问题疑惑，赞赏时可留下你微信，会添加你解答

## 修改的内容

主要修改了封面详情相关的逻辑，对应字段为下面的内容。

```json
{
	"cover": {
	    "data": [
	        {
	            "isTaskTogether": false,
	            "isInStock": true,
	            "notice": "今日封面剩余  0  ！！",
	            "noticeShow": false
	        }
	    ]
	}
}
```

### 增加了下架封面的字段

活动封面送完之后可以将该封面改为暂未开始的状态，避免用户做无用的分享，导致生气😤的用户用户举报。

```json
{
	"isInStock": true,
}
```

将封面中的这个字段改为`false`，在封面详情中关闭该封面的任务，显示为**暂未开发**。

### 封面详情页增加了公告栏

封面详情页增加了公告栏，可以放一条公告。可以选择公告展示或者不展示，对应字段如下。

```json
{
	"notice": "今日封面剩余  0  ！！",
	"noticeShow": false
}
```

### 完成任务方式做了修改

现在可以设置封面任务为广告任务和邀请任务都完成才可以领取。

```json
{
	"isTaskTogether": false,
}
```
