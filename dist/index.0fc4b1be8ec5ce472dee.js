/*!
 * 
 * movee-log
 * 利用阿里云web-track记录前端日志，并支持微信小程序和web应用
 * 
 * @version v1.0.3
 * @homepage https://github.com/HongYangHT/movee-log#readme
 * @repository https://github.com/HongYangHT/movee-log.git
 * 
 * (c) 2019 sam.hongyang
 * Released under the MIT License.
 * hash: 0e6ef31c469bb6f9a72a
 * 
 */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var o=t();for(var s in o)("object"==typeof exports?exports:e)[s]=o[s]}}(window,(function(){return(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{43:function(e,t,o){"use strict";o.r(t);var s=o(40),n=o.n(s),c=o(7),a=o.n(c),r=o(0),i=o.n(r),u=(o(71),o(89),o(41)),l=o.n(u),h=o(42),g=o.n(h),d=function(){function e(t,o,s,n,c,a){var r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"web",i=!(arguments.length>7&&void 0!==arguments[7])||arguments[7];l()(this,e),this.project=t,this.host=o,this.logstore=s,this.from=a,this.ua=r,this.accessId=n,this.accessKey=c,this.uri="https://".concat(config.project,".").concat(config.host,"/logstores/").concat(config.logstore,"/track?APIVersion=0.6.0"),this.openLog=i}return g()(e,[{key:"padLeftZero",value:function(e){return("00"+e).substr(e.length)}},{key:"formatDate",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd hh:mm:ss",o=new Date(e);/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(o.getFullYear()+"").substr(4-RegExp.$1.length)));var s={"M+":o.getMonth()+1,"d+":o.getDate(),"h+":o.getHours(),"m+":o.getMinutes(),"s+":o.getSeconds()};for(var n in s)if(new RegExp("(".concat(n,")")).test(t)){var c=s[n]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?c:this.padLeftZero(c))}return t}},{key:"fetchNavigation",value:function(){var e={};switch(this.ua){case"uni":try{uni.getSystemInfo({success:function(t){e=i()(e,{os:t.platform,browser:"".concat(t.brand,"/").concat(t.model,"/").concat(t.system,"/").concat(t.SDKVersion,"/").concat(t.version)})}})}catch(e){console.log(e)}break;case"wx":try{wx.getSystemInfo({success:function(t){e=i()(e,{os:t.platform,browser:"".concat(t.brand,"/").concat(t.model,"/").concat(t.system,"/").concat(t.SDKVersion,"/").concat(t.version)})}})}catch(e){console.log(e)}break;case"web":try{var t=window.navigator;e=i()(e,{os:t.platform,browser:t.userAgent})}catch(e){console.log(e)}break;default:try{var o=window.navigator;e=i()(e,{os:o.platform,browser:o.userAgent})}catch(e){console.log(e)}}return e}},{key:"fetchUserInfo",value:function(){var e={};switch(this.ua){case"uni":e=i()(e,{token:uni.getStorageSync("token")||"",userId:uni.getStorageSync("userId")||"",username:uni.getStorageSync("username")||""});break;case"wx":e=i()(e,{token:wx.getStorageSync("token")||"",userId:wx.getStorageSync("userId")||"",username:wx.getStorageSync("username")||""});break;case"web":default:e=i()(e,{token:window.localStorage.getItem("token")||"",userId:window.localStorage.getItem("userId")||"",username:window.localStorage.getItem("username")||""})}return e}},{key:"logger",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"request",t=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0,s=arguments.length>3?arguments[3]:void 0,n=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,r=arguments.length>6?arguments[6]:void 0,u=arguments.length>7?arguments[7]:void 0,l=this.fetchUserInfo(),h=this.fetchNavigation(),g=this.uri,d=i()(l,h,{logType:e,happenTime:this.formatDate(new Date,"yyyy-MM-dd hh:mm:ss"),params:a()(s),url:c,requestUrl:t,requestType:o,requestTime:n,responseData:a()(r),stack:a()(u)});this.request(g,d)}},{key:"jsLogger",value:function(e,t,o,s){var n=this.fetchUserInfo(),c=this.fetchNavigation(),r=this.uri,u=i()(n,c,{logType:e,happenTime:formatDate(new Date,"yyyy-MM-dd hh:mm:ss"),url:t,stack:a()(o),sourceUrl:s});this.request(r,u)}},{key:"request",value:function(e,t){if(this.openLog){var o=e,s=null;switch(n()(t).forEach((function(e){e&&t[e]&&(o+="&".concat(e,"=").concat(encodeURIComponent(t[e])))})),this.ua){case"uni":try{uni.request({method:"GET",url:o,header:{accessId:this.accessId,accessKey:this.accessKey}})}catch(e){console.log(e),console.log(e)}break;case"wx":try{wx.request({method:"GET",url:o,header:{accessId:this.accessId,accessKey:this.accessKey}})}catch(e){console.log(e)}break;case"web":default:window.ActiveXObject?s=new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest&&(s=new XMLHttpRequest);try{s.open("GET",o,!0),s.setRequestHeader("accessId",this.accessId),s.setRequestHeader("accessKey",this.accessKey),s.send(null)}catch(t){window&&window.console&&"function"==typeof window.console.log&&(console.log("Failed to log to log service because of this exception:\n"+t),console.log("Failed log data:",e))}}}}}]),e}();t.default=d}},[[43,1,2]]])}));