<template>
	<view class="wrapper">
		<wyb-noticeBar :text="notice" type="vert" :show-more="false" class="notice" v-if="coverDetail.notice_show && notice.length > 0" />
		<view class="cover">
			<image :src="coverDetail.pic" mode="" class="cover-img"></image>
		</view>
		<view v-if="coverDetail.is_in_stock">
			<view class="func">
				<text style="font-size: 22rpx; color: #DD524D;" v-if="coverDetail.is_task_together && lockEdInfo.is_task_success !== true">
					此封面需要同时完成下面的两个任务哦！！！
				</text>
				<button plain class="func-btn" open-type="share" v-if="coverDetail.invite_limit > 0  && lockEdInfo.is_task_success !== true">
					<image src="/static/share.png" mode="" class="func-btn-img"></image>
					好友积分领取（{{lockEdInfo.invite_count}}/{{coverDetail.invite_limit}}）
				</button>
				<text style="font-size: 22rpx; color: #DD524D;">
					点击好友积分领取才能成功分享哦！！！
				</text>
				<button plain class="func-btn" @click="lookAd" v-if="coverDetail.ad_limit > 0  && lockEdInfo.is_task_success !== true">
					<image src="/static/video.png" mode="" class="func-btn-img"></image>
					视频积分领取（{{lockEdInfo.look_ad_count}}/{{coverDetail.ad_limit}}）
				</button>
				<button plain class="func-btn success" @click="openModal" v-if="lockEdInfo.is_task_success">
					任务完成啦，免费领封面
				</button>
			</view>
		</view>
		<view v-else>
			<view class="func">
				<button plain class="func-btn field" disabled="true">
					今天送完咯，明天再来呀
				</button>
			</view>
		</view>
		<view class="version">
			<ad unit-id="adunit-fc697f665fcf28ba"></ad>
		</view>
		<view class="modal" @touchmove.stop="handle" @click="closeModal" v-if="modalShow && coverDetail.is_in_stock">
			<view class="modal-content" @click.stop="openModal">
				<view class="modal-content-body" @click="handleCopy">
					<view class="modal-content-body-title">
						领取方式(点击复制内容)
					</view>
					<text user-select decode class="modal-content-body-getdesc">{{coverDetail.receive_desc}}</text>
					<button plain class="modal-content-body-question" open-type="contact">有疑问？</button>
				</view>
				<image src="/static/close.png" mode="" class="modal-content-cancel" @click.stop="closeModal"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		coverDetailApi,
		lookVideoApi
	} from '../../request';

	var rewardedVideoAd = null
	// 在页面中定义插屏广告
	var interstitialAd = null
	export default {
		data() {
			return {
				id: '',
				modalShow: '',
				coverDetail: {},
				lockEdInfo: {},
				ad: '',
				isTaskTogether: false,
				noticeShow: false,
				notice: [],
				isInStock: false,
				receive_data: "",
				isLoad: false
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getCoverDetail(true)
		},
		onShow(e) {
			if (this.isLoad) {
				this.getCoverDetail(false)
			}
		},
		onShareAppMessage(res) {
			var shareConfig = getApp().shareConfig()
			shareConfig.path += '&id=' + this.id
			console.log(shareConfig)
			return shareConfig
		},
		methods: {
			handle() {
				return
			},
			async getCoverDetail(isFirst) {
				console.log(isFirst)
				
				const res = await coverDetailApi({
					id: this.id,
					openid: getApp().globalData.openid,
				})
				// console.log(res)
				this.coverDetail = res.cover_detail
				this.notice = res.tips
				this.lockEdInfo.invite_count = res.invite_count
				this.lockEdInfo.look_ad_count = res.look_ad_count
				this.lockEdInfo.is_task_success = res.is_task_success
				this.modalShow = res.is_task_success
				this.receive_data = res.receive_data
				this.ad = res.ad_config
				if (isFirst && this.ad) {
					//激励视频和插屏广告
					if (this.ad.one) {
						this.adinsertInit(this.ad.one)
					}
					if (this.ad.five) {
						this.adInit(this.ad.five);
					}
				}
				this.isLoad = true
			},
			lookAd() {
				rewardedVideoAd.show().catch(() => {
					rewardedVideoAd
						.load()
						.then(() => rewardedVideoAd.show())
						.catch(err => {
							uni.showToast({
								title: '调起视频失败，请稍后再试',
								icon: 'none',
								duration: 2000
							});
							console.log('激励视频 广告显示失败');
						});
				});
			},
			//初始化视频广告
			adInit(adUnitId) {
				if (wx.createRewardedVideoAd) {
					rewardedVideoAd = wx.createRewardedVideoAd({
						adUnitId: adUnitId
					});
					rewardedVideoAd.onLoad(() => {
						console.log('Ad onLoad event emit');
					});
					rewardedVideoAd.onError(err => {
						console.log('Ad onError event emit', err);
					});
					rewardedVideoAd.onClose(res => {
						console.log('Ad onClose event emit', res);
						if (res && res.isEnded) {
							this.lockEdInfo.lookVideoLockNum++
							console.log('正常播放结束，可以下发游戏奖励');
						} else {
							console.log('播放中途退出，不下发游戏奖励');
						}
						this.trackLookVideo(res.isEnded)
					});
				}
			},
			//初始化插屏广告
			adinsertInit(adUnitId) {
				if (wx.createInterstitialAd) {
					interstitialAd = wx.createInterstitialAd({
						adUnitId: adUnitId
					})
					interstitialAd.onLoad(() => {
						interstitialAd.show().catch((err) => {
							console.error(err)
						})
					})
					interstitialAd.onError((err) => {})
					interstitialAd.onClose(() => {})
				}
			},
			//看视频上报
			async trackLookVideo(isEnded) {
				await lookVideoApi({
					openid: getApp().globalData.openid,
					id: this.id,
					isEnded,
				})
			},
			openModal() {
				this.modalShow = true
			},
			closeModal() {
				this.modalShow = false
			},
			handleCopy() {
				let data = this.receive_data;
				// console.log(data)
				wx.setClipboardData({
					data: data,
					success(res) {},
				});
			},
		}
	};
</script>

<style lang="scss">
	.wrapper {
		.cover {
			background-image: url(https://res.wx.qq.com/a/wx_fed/money-envelope-cover/res/img/skin_bg.59803d00.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			padding: 40rpx 0;
			margin: 10rpx 60rpx;

			&-img {
				width: 300rpx;
				height: 500rpx;
				margin: auto;
				border-radius: 8px;
				display: block;
			}
		}

		.func {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 600rpx;
			margin: auto;
			margin-bottom: 30rpx;

			&-btn {
				border: none;
				padding: 0 40rpx;
				height: 90rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				background-color: #fbd926;
				border-radius: 90rpx;
				margin-top: 30rpx;
				font-size: 34rpx;
				font-weight: 700;

				&.success {
					background-color: #07c160;
					color: #FFFFFF;
				}

				&-img {
					width: 34rpx;
					height: 34rpx;
					display: block;
					margin-right: 6rpx;
				}
			}

			&-or {
				width: 100%;
				text-align: center;
				margin-top: 30rpx;
				font-size: 26rpx;
			}
		}

		.recommand {
			margin-left: 20rpx;
		}

		.modal {
			width: 100%;
			height: 100%;
			background-color: rgba(000, 000, 000, 0.7);
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			&-content {
				&-body {
					width: 600rpx;
					padding: 60rpx 0;
					background-color: #FFFFFF;
					border-radius: 8px;

					&-title {
						font-size: 34rpx;
						color: #333333;
						font-weight: 700;
						text-align: center;
						margin-bottom: 30rpx;
					}

					&-getdesc {
						text-align: center;
						margin: auto;
						display: block;
					}

					&-question {
						margin: auto;
						display: block;
						border: none;
						font-size: 28rpx;
						color: #576b95;
						margin-top: 30rpx;
					}
				}

				&-cancel {
					width: 50rpx;
					height: 50rpx;
					margin: auto;
					display: block;
					margin-top: 60rpx;
				}
			}

		}
	}
	.version {
		// position: fixed;
		bottom: 60rpx;
		display: block;
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #666;
	}
</style>
