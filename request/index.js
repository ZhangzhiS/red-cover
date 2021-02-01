// const API_HOST = "127.0.0.1:8000"
const API_HOST = "api.m-pro.zzs7.top"
const PROTOCOL = "https://"
// const PROTOCOL = "http://"

// 用户登录
async function loginApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/login",
			method: "POST",
			data: {
				"code": queryStringParameters.code
			},
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function coverListApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		let url = "/api/v1/wx/app/1/cover"
		if (queryStringParameters.id) {
			url = url + "?cover_id=" + queryStringParameters.id
		}
		uni.request({
			url: PROTOCOL+API_HOST+url,
			method: "GET",
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function cpsApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/cps",
			method: "GET",
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function tipApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/tip",
			method: "GET",
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function coverDetailApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/cover/detail?cover_id="+queryStringParameters.id + "&openid=" + queryStringParameters.openid,
			method: "GET",
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function lookVideoApi(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/invite/track",
			method: "POST",
			data: {
				"openid": queryStringParameters.openid,
				"status": queryStringParameters.isEnded,
				"id": queryStringParameters.id
			},
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

async function inviteTrackApi(queryStringParameters = {}) {
	console.log(queryStringParameters)
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/invite/track",
			method: "POST",
			data: {
				"openid": queryStringParameters.shareBelongOpenid,
				"invite_openid": queryStringParameters.beInviteOpenid,
				"cover_id": queryStringParameters.id
			},
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}


export {
    loginApi, coverListApi, coverDetailApi, lookVideoApi, inviteTrackApi, cpsApi, tipApi
}