import axios from "axios";
import {ElMessage} from "element-plus";

const authItemName = "authorize"

axios.defaults.baseURL = 'http://localhost:8080'

const accessHeader = () => { // 获取请求头
    return {  // 返回请求头
        'Authorization': `Bearer ${takeAccessToken()}`  // 返回token
    }
}

const defaultError = (error) => {
    console.error(error)
    ElMessage.error('发生了一些错误，请联系管理员')
}

const defaultFailure = (message, status, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
    ElMessage.warning(message)
}

function takeAccessToken() {  // 获取token
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);  // 从localStorage或sessionStorage中获取token
    if(!str) return null  // 如果没有token，返回null
    const authObj = JSON.parse(str)  // 将字符串转换为对象
    if(authObj.expire <= new Date()) {  // 如果token过期
        deleteAccessToken()  // 删除token
        ElMessage.warning("登录状态已过期，请重新登录！")  // 提示用户
        return null  // 返回null
    }
    return authObj.token  // 返回token
}

function storeAccessToken(remember, data){  // 存储token
    const authObj = {  // 创建对象
        id: data.id,  // 存储用户id
        token: data.token,    // 存储token
        expire: data.expire,  // 存储token过期时间
        username: data.username,  // 存储用户名
        name: data.name,      // 存储用户名
        role: data.role,    // 存储用户角色
        avatar: data.avatar,  // 存储用户头像
        email: data.email,
        phone: data.phone
    }
    const str = JSON.stringify(authObj)  // 将对象转换为字符串
    if(remember === true)  // 如果用户选择了记住我
        localStorage.setItem(authItemName, str)  // 将token存储到localStorage中
    else if(remember === false)  // 如果用户没有选择记住我
        sessionStorage.setItem(authItemName, str)  // 将token存储到sessionStorage中
}

function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

function internalPost(url, data, headers, success, failure, error = defaultError){  // 封装post请求
    axios.post(url, data, { headers: headers }).then(({data}) => {  // 发送post请求
        if(data.code === 200)  // 如果状态码为200
            success(data.data)  // 调用success函数
        else  // 如果状态码不为200
            failure(data.message, data.code, url)  // 调用failure函数
    }).catch(err => error(err))  // 如果发生错误，调用error函数
}

function internalGet(url, headers, success, failure, error = defaultError){
    axios.get(url, { headers: headers }).then(({data}) => {
        if(data.code === 200)
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}

function login(username, password, remember, success, failure = defaultFailure){
    internalPost('/api/auth/login', {
        username: username,
        password: password
    }, {
        'Content-Type': 'application/x-www-form-urlencoded'
    }, (data) => {
        storeAccessToken(remember, data) // 存储token
        ElMessage.success(`登录成功，欢迎 ${data.name} 来到我们的系统`)  // 提示用户
        success(data)
    }, failure)
}

function post(url, data, success, failure = defaultFailure) {
    internalPost(url, data, accessHeader() , success, failure)
}

function logout(success, failure = defaultFailure){
    get('/api/auth/logout', () => {
        deleteAccessToken()
        ElMessage.success(`退出登录成功，欢迎您再次使用`)
        success()
    }, failure)
}

function get(url, success, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}

function unauthorized() {
    return !takeAccessToken()
}

export { post, get, login, logout, unauthorized}
