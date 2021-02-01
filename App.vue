<script>
/* 本项目为开源项目，作者微信：zheng593446899，如有问题可联系*/
import { loginApi, inviteTrackApi } from "./request"

export default {
	onLaunch: async function(e) {
		console.log('App Launch');
		var openid = uni.getStorageSync('openid');

		if (openid) {
			this.globalData.openid = openid;
			this.inviteTrack(e.query.openid, openid, e.query.id)
		} else {
			// 登录
			const [loginError, loginRes] = await uni.login();
			// console.log(code)
			const res = await loginApi({code: loginRes.code})
			this.globalData.openid = res.openid;
			uni.setStorageSync('openid', res.openid);
			this.inviteTrack(e.query.openid, this.globalData.openid, e.query.id)
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		openid: '',
	},
	methods: {
		shareConfig(){
			var messages = [
				{
					title: '送你个性微信红包封面，发红包时可用',
					path: '/pages/index/index?openid=' + this.globalData.openid,
				},
			];
			return messages[Math.floor(Math.random()*messages.length)];
		},
		//邀请上报
		// shareBelongOpenid 分享链接所属的用户
		// beInviteOpenid 被邀请的用户的id，这里指当前小程序的注册用户
		inviteTrack(shareBelongOpenid, beInviteOpenid, id){
			if(beInviteOpenid && shareBelongOpenid && (beInviteOpenid != shareBelongOpenid)){
				// console.log(beInviteOpenid, shareBelongOpenid)
				inviteTrackApi({
					beInviteOpenid,
					shareBelongOpenid,
					id,
				})
			}
		},
	}
};
</script>

<style>
/*每个页面公共css */
</style>
