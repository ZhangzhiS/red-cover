// const API_HOST = "127.0.0.1:8000"
const API_HOST = "api.m.zzs7.top"
const PROTOCOL = "https://"
// const PROTOCOL = "http://"

// 用户登录
async function login(queryStringParameters = {}) {
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

async function cover(queryStringParameters = {}) {
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

async function cps(queryStringParameters = {}) {
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

async function tip(queryStringParameters = {}) {
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

// async function coverDetail(queryStringParameters = {}) {
//     const res = await uniCloud.callFunction({
//         name: "api",
//         data: { path: '/cover/detail', queryStringParameters },
//     });
//     return res
// }

async function coverDetail(queryStringParameters = {}) {
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

// async function lookVideo(queryStringParameters = {}) {
//     const res = await uniCloud.callFunction({
//         name: "api",
//         data: { path: '/look/video', queryStringParameters },
//     });
//     return res
// }

async function lookVideo(queryStringParameters = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/invite/track",
			method: "POST",
			data: {
				"openid": queryStringParameters.openid,
				"invite_openid": queryStringParameters.inviteOpenid
			},
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}

// async function inviteTrack(queryStringParameters = {}) {
//     const res = await uniCloud.callFunction({
//         name: "api",
//         data: { path: '/invite/track', queryStringParameters },
//     });
//     return res
// }

async function inviteTrack(queryStringParameters = {}) {
	console.log(queryStringParameters)
	return new Promise((resolve, reject) => {
		uni.request({
			url: PROTOCOL+API_HOST+"/api/v1/wx/app/1/invite/track",
			method: "POST",
			data: {
				"openid": queryStringParameters.inviteOpenid,
				"invite_openid": queryStringParameters.openid,
				"id": queryStringParameters.id
			},
			success: (res) => {
				// let data = res.data
				resolve(res.data)
			}
		})
	})
}


export {
    login, cover, coverDetail, lookVideo, inviteTrack, cps, tip
}