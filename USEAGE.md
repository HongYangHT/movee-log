### 使用方式

- 方法一
> 使用npm包引入

```javascript
// 1. npm i movee-log -S // 下载包
// 2. import Logger from 'movee-log'; // 引入当前包
import Logger from 'movee-log';
/**
 * 查看源码， 先new出对象
 */
 /**
   * @param {string} project 项目前缀
   * @param {string} host 项目的host
   * @param {string} logstore 项目日志存存的位置
   * @param {string} accessId 阿里云的accessId， 参数会添加在请求头中
   * @param {string} accessKey 阿里云的accessKey 参数会添加在请求头中
   * @param {string} from 来源的项目
   * @param {string} ua 表示项目的类型： uni:表示builx 编译的uni-app小程序 wx: 表示直接用微信小程序编写的小程序 web: 表示web应用（包含web和H5）
   * @param {boolean} openLog 是否直接开启发送日志，请在开发环境设置为false，不发送日志，生产环境请开启
  */
 // Logger(project, host, logstore, accessId, accessKey, from, ua = 'web', openLog = true)
 let logger = new Logger(project, host, logstore, accessId, accessKey, from, ua, openLog);

 // logger(logType = 'request', requestUrl, params, requestTime, url, responseData, stack)
 // 调用logger请求
 /**
  * logger 方法用于发送项目中发送的请求（日志），可用于请求拦截器中
  * @param {string} logType 请求的type request:发送请求 request-error: 请求出错， 该参数可自行定制
  * @param {string} requestUrl 请求发送的url
  * @param {string} requestType 请求的方法（get\post\delete\put等）
  * @param {object} params 请求发送的参数，会序列化成string（JSON.stringify）
  * @param {number} requestTime 请求返回的时间间隔，该时间会是毫秒
  * @param {string} url 发送请求的页面（路由）
  * @param {object} responseData 请求返回的参数，可选
  * @param {string} stack 请求错误的堆栈信息，可选
  */
 logger.logger(logType, requestUrl, requestType, params, requestTime, url, responseData, stack);

 // 具体使用方法，用在拦截器中, 项目中的请求
  let startTime = new Date().getTime();
  vm.$http[config.type](url, requestParams).then(response => {
    let endTime = new Date().getTime();
    if (response.data && response.data.resultCode === '000000') {
      // 请求正常
      logger.logger('request', url, config.type,requestParams, (endTime - startTime), router.currentRoute.path);
    } else {
      // 请求失败的情况
      logger.logger('request-error', url, config.type, requestParams, (endTime - startTime), router.currentRoute.path, response.data);
    }
  }, response => {
    let endTime = new Date().getTime();
    logger.logger('request-error', url, config.type, requestParams, (endTime - startTime), router.currentRoute.path, response.data);
  });

  
  // jsLogger 主要用于收集js报错和静态资源报错，只用于web端，因为其是利用window对象进行捕捉，而小程序中不存在window对象 
  // jsLogger(logType, url, stack, sourceUrl)
  /**
   * @param {string} logType 发生错误类型，可自制
   * @param {string} url 发生错误的页面或者路由
   * @param {string|object} stack 发生错误的堆栈
   * @param {string} sourceUrl 静态资源发生错误的请求地址
   */
  logger.jsLogger(logType, url, stack, sourceUrl)
  // 具体使用方法
  // NOTE: vuejs中的报错，使用Vue.config.errorHandler 来捕捉
  Vue.config.errorHandler = (err, vm, info) => {
    let { message, name, stack } = err;
    let stackStr = stack ? stack.toString() : `${name}:${message}`;
    // NOTE: 发送日志请求
    logger.jsLogger('js-error', router.currentRoute.path, stackStr);
  };

  // NOTE: 全局监控错误
  if (window.onerror) {
    window.onerror = e => {
      // NOTE: 其他堆栈错误
      let { message, error } = e;
      let stackStr = error ? error.toString() : `${message}`;
      // NOTE: 监控js或者css的加载错误， js报错等
      let typeName = e.target.localName;
      let sourceUrl = '';
      if (typeName === 'link') {
        sourceUrl = e.target.href;
        logger.jsLogger(
          'static-error',
          router.currentRoute.path,
          stackStr,
          sourceUrl
        );
      } else if (typeName === 'script') {
        sourceUrl = e.target.src;
        logger.jsLogger(
          'static-error',
          router.currentRoute.path,
          stackStr,
          sourceUrl
        );
      } else {
        logger.jsLogger('js-error', router.currentRoute.path, stackStr);
      }
    };
  } else {
    window.addEventListener('error', e => {
      // NOTE: 其他堆栈错误
      let { message, error } = e;
      let stackStr = error ? error.toString() : `${message}`;
      // NOTE: 监控js或者css的加载错误， js报错等
      let typeName = e.target.localName;
      let sourceUrl = '';
      if (typeName === 'link') {
        sourceUrl = e.target.href;
        logger.jsLogger(
          'static-error',
          router.currentRoute.path,
          stackStr,
          sourceUrl
        );
      } else if (typeName === 'script') {
        sourceUrl = e.target.src;
        logger.jsLogger(
          'static-error',
          router.currentRoute.path,
          stackStr,
          sourceUrl
        );
      } else {
        logger.jsLogger('js-error', router.currentRoute.path, stackStr);
      }
    });
  }

  // NOTE: 监控的promise问题
  if (window.onunhandledrejection) {
    window.onunhandledrejection = e => {
      let errorMsg = '';
      if (typeof e.reason === 'object') {
        errorMsg = JSON.stringify(e.reason);
      } else {
        errorMsg = e.reason;
      }
      logger.jsLogger('js-error', router.currentRoute.path, errorMsg);
    };
  } else {
    window.addEventListener('unhandledrejection', e => {
      let errorMsg = '';
      if (typeof e.reason === 'object') {
        errorMsg = JSON.stringify(e.reason);
      } else {
        errorMsg = e.reason;
      }
      logger.jsLogger('js-error', router.currentRoute.path, errorMsg);
    });
  }
```

- 方法二
> 直接复制本项目中`/src/index.js`, 请保证已设置babel，使用方法如上
