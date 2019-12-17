/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 发送请求日志
 * @Date: 2019-12-16 16:49:15
 * @LastEditTime: 2019-12-17 18:17:43
 */
class Logger {
  /**
   * 配置相关参数
   * @param {string} project 项目前缀
   * @param {string} host 项目的host
   * @param {string} logstore 项目日志存存的位置
   * @param {string} from 来源的项目
   */
  constructor(project, host, logstore, accessId, accessKey, from, ua = 'web', openLog = true) {
    this.project = project
    this.host = host
    this.logstore = logstore
    this.from = from
    this.ua = ua // NOTE: uni:表示builx 编译的uni-app小程序 wx: 表示直接用微信小程序编写的小程序 web: 表示web应用（包含web和H5）
    this.accessId = accessId // NOTE: access id
    this.accessKey = accessKey // NOTE: access key
    this.uri = `https://${project}.${host}/logstores/${logstore}/track?APIVersion=0.6.0` // NOTE: 发送给阿里云的后台接口地址
    this.openLog = openLog
  }

  padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }

  formatDate(d, format = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(d)
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        let str = o[k] + ''
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return format
  }

  /**
   * 查询当前环境的ua
   * 1. 操作系统
   * 2. 应用的版本号，如浏览器版、小程序本号等
   */
  fetchNavigation() {
    let info = {}
    switch (this.ua) {
      case 'uni':
        try {
          uni.getSystemInfo({
            success: res => {
              info = Object.assign(info, {
                os: res.platform,
                browser: `${res.brand}/${res.model}/${res.system}/${res.SDKVersion}/${res.version}`
              })
            }
          })
        } catch (error) {
          console.log(error)
        }
        break
      case 'wx':
        try {
          wx.getSystemInfo({
            success: res => {
              info = Object.assign(info, {
                os: res.platform,
                browser: `${res.brand}/${res.model}/${res.system}/${res.SDKVersion}/${res.version}`
              })
            }
          })
        } catch (error) {
          console.log(error)
        }
        break
      case 'web':
        try {
          let navi = window.navigator
          info = Object.assign(info, {
            os: navi.platform,
            browser: navi.userAgent
          })
        } catch (error) {
          console.log(error)
        }
        break
      default:
        try {
          let navi = window.navigator
          info = Object.assign(info, {
            os: navi.platform,
            browser: navi.userAgent
          })
        } catch (error) {
          console.log(error)
        }
        break
    }
    return info
  }

  /**
   * 获取用户信息
   */
  fetchUserInfo() {
    let info = {}
    switch (this.ua) {
      case 'uni':
        info = Object.assign(info, {
          token: uni.getStorageSync('token') || '',
          userId: uni.getStorageSync('userId') || '',
          username: uni.getStorageSync('loginName') || ''
        })
        break
      case 'wx':
        info = Object.assign(info, {
          token: wx.getStorageSync('token') || '',
          userId: wx.getStorageSync('userId') || '',
          username: wx.getStorageSync('loginName') || ''
        })
        break
      case 'web':
        info = Object.assign(info, {
          token: window.localStorage.getItem('token') || '',
          userId: window.localStorage.getItem('userId') || '',
          username: window.localStorage.getItem('loginName') || ''
        })
        break
      default:
        info = Object.assign(info, {
          token: window.localStorage.getItem('token') || '',
          userId: window.localStorage.getItem('userId') || '',
          username: window.localStorage.getItem('loginName') || ''
        })
        break
    }
    return info
  }
  /**
   * 发送日志请求
   * @param {string} logType 日志类型 request: 请求日志 request-error: 请求失败的日志
   * @param {string} requestUrl 请求的地址
   * @param {string} params 请求的入参
   * @param {string} requestTime 请求执行的时间
   * @param {string} url 发送日志的路由页面
   * @param {string} responseData 请求失败后返回的参数
   * @param {string} stack 错误日志堆栈
   */
  logger(
    logType = 'request',
    requestUrl,
    requestType,
    params,
    requestTime,
    url,
    responseData,
    stack
  ) {
    let userInfo = this.fetchUserInfo()
    let uaInfo = this.fetchNavigation()
    let urlUri = this.uri
    let info = Object.assign(userInfo, uaInfo, {
      logType,
      happenTime: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), // NOTE: 接口发送的时间
      params: JSON.stringify(params),
      url,
      requestUrl,
      requestType,
      requestTime,
      responseData: JSON.stringify(responseData),
      stack: JSON.stringify(stack)
    })
    this.request(urlUri, info)
  }

  jsLogger(logType, url, stack, sourceUrl) {
    let userInfo = this.fetchUserInfo()
    let uaInfo = this.fetchNavigation()
    let urlUri = this.uri
    let info = Object.assign(userInfo, uaInfo, {
      logType,
      happenTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      url,
      stack: JSON.stringify(stack),
      sourceUrl
    })
    this.request(urlUri, info)
  }

  /**
   * 发送请求的函数
   * @param {string} url 请求的url
   * @param {object} params 请求的参数
   */
  request(url, params) {
    if (!this.openLog) return
    let urlUri = url
    let keys = Object.keys(params)
    let xhr = null
    keys.forEach(key => {
      if (key && params[key]) {
        urlUri += `&${key}=${encodeURIComponent(params[key])}`
      }
    })

    switch (this.ua) {
      case 'uni':
        try {
          uni.request({
            method: 'GET',
            url: urlUri,
            header: {
              accessId: this.accessId,
              accessKey: this.accessKey
            }
          })
        } catch (error) {
          console.log(error)
          console.log(error)
        }
        break
      case 'wx':
        try {
          wx.request({
            method: 'GET',
            url: urlUri,
            header: {
              accessId: this.accessId,
              accessKey: this.accessKey
            }
          })
        } catch (error) {
          console.log(error)
        }
        break
      case 'web':
        if (window.ActiveXObject) {
          // eslint-disable-next-line
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        } else if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        }

        try {
          xhr.open('GET', urlUri, true)
          xhr.setRequestHeader('accessId', this.accessId)
          xhr.setRequestHeader('accessKey', this.accessKey)
          xhr.send(null)
        } catch (ex) {
          if (window && window.console && typeof window.console.log === 'function') {
            console.log('Failed to log to log service because of this exception:\n' + ex)
            console.log('Failed log data:', url)
          }
        }
        break
      default:
        if (window.ActiveXObject) {
          // eslint-disable-next-line
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        } else if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        }

        try {
          xhr.open('GET', urlUri, true)
          xhr.setRequestHeader('accessId', this.accessId)
          xhr.setRequestHeader('accessKey', this.accessKey)
          xhr.send(null)
        } catch (ex) {
          if (window && window.console && typeof window.console.log === 'function') {
            console.log('Failed to log to log service because of this exception:\n' + ex)
            console.log('Failed log data:', url)
          }
        }
        break
    }
  }
}

export default Logger
