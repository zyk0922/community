const baseUrl = "http://estate.eshareedu.cn/estate";
function request(method, url, data) {
	let token = uni.getStorageSync('token')
	let p = new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url, //仅为示例，并非真实接口地址
			data: data,
			method: method,
			header: {
				'Authorization': token
			},
			success: (res) => {
				if (res.data.errCode == 10000) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
	return p
}

function upload( url,filePath, data) {
	let token = uni.getStorageSync('token')
	let pp = new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl+url, //仅为示例，非真实的接口地址
			filePath: filePath,
			name: 'file',
			method: 'POST', //方法
			header: {
				'Authorization': token
			}, //token
			formData: data,
			success: (uploadFileRes) => {
				resolve(JSON.parse(uploadFileRes.data)); //成功返回数据
			},
			fail: (fail) => {
				reject(fail) //失败返回数据
			}
		});
	})
	return pp
}
export default {
	// get
	get: (url, data) => {
		return request("GET", url, data);
	},
	post: (url, data) => {
		return request("POST", url, data);
	},
	upload: (url,filePath, data) => {
		return upload(url, filePath, data);
	}
}