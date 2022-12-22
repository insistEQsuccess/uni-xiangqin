import ajax from '../utils/ajax.js'
import { encrypt} from '../utils/index.js'
// const enStr = encrypt()
// console.log('看看加密结果-----')
// console.log(enStr)
// console.log('查看解密结果：---')
// console.log(JSON.parse(decropt(enStr)))
const baseUrl = 'http://mgzz.top:8102/mgs'
const fetchData = (method, url, data, header, config = {}) => ajax({
	url: baseUrl + url,
	method,
	data,
	header,
	config
})

// 列表接口
export const getList = (data) => fetchData('post', '/blindDateWall/visitingCard/list', data, { sign: encrypt() })
// 上传文件
export const uploadImg = (data) => fetchData('post', '/user/icon/upload', data, { sign: encrypt() })
// login
export const loginFun = (data, config) => fetchData('post', '/user/login', data, config)
// 获取验证码
export const getCodeFun = (data, config) => fetchData('post', '/sms/send', data, config)
// 注册用户
export const registerUser = (data) => fetchData('post', '/user/register', data, { sign: encrypt() })
// 用户详情
export const getDetails = (data) => fetchData('post', '/user/h5/details', data, { sign: encrypt() })
// 查询相亲群
export const getGroupsList = (data) => fetchData('post', '/dating/circle/group/list', data, { sign: encrypt() })
// 解锁相亲群
export const deblocking = (data) => fetchData('post', '/dating/circle/group/deblocking', data, { sign: encrypt() })