export default function ajax (param) {
	const {
		url,
		method: method = 'get',
		data,
		header: header = { 'content-type': 'application/json' },
		config: config = { responseType: 'text' }
	} = param
	console.log(url, method, data, header, config)
	return new Promise((resolve, reject) => {
		uni.request({
		    url,
			method,
		    data,
		    header,
		    success: (res) => {
				resolve(res.data)
		    },
			fail: (err) => {
				reject(err)
			}
		});
	})
}