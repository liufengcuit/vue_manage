//公共方法
import CryptoJS from 'crypto-js';
import {signKey, dataKey} from './publicParams'

/**
 * 保存cookie
 * @param key
 * @param str
 * @param days  //cookie保存时间   X / 天
 */
export function saveCookie(key, str, days) {
    // let Days = 1; //此 cookie 将被保存 1 天
    let exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + str + ";expires=" + exp.toGMTString();
}

/**
 * 获取cookie
 * @param key
 * @returns {*}
 */
export function getCookie(key) {  //获取指定名称的cookie的值
    let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if (arr != null) {
        return arr[2];
    }
    return null;
}

/**
 * 存储session
 * @param key
 * @param str
 */
export function saveSession(key, str) {
    sessionStorage.setItem(key, des3("111111", str));
    sessionStorage.setItem(alias.catchVersion, xkMangeVersion);
}

/**
 * 根据key获取session
 * @param key
 * @returns {string}
 */
export function getSession(key) {
    return sessionStorage.getItem(key) ? des3Decrypt(sessionStorage.getItem(key), "111111") : "";
}

/**
 * 退出登录
 */
export function loginOut() {
    window.location.reload();
}

//判断是否是微信浏览器的函数
export function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取随机数
 * @param len   随机数长度
 * @returns {string}
 * @constructor
 */
export function mathRand(len) {
    let num = "";
    for (let i = 0; i < len; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

/**
 * 3des 加密data
 * @param salt
 * @param data
 * @returns {string}
 */
export function des3(salt, data) {
    const md5_hash = CryptoJS.MD5(salt + "" + dataKey).toString();
    return CryptoJS.TripleDES.encrypt(data, CryptoJS.enc.Utf8.parse(md5_hash), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}

/**
 * 3des  data内容解密
 * @param data
 * @param key
 * @returns {string}
 */
export function des3Decrypt(data, key) {
    const md5_hash = CryptoJS.MD5(key + "" + dataKey).toString();
    return CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(data)
    }, CryptoJS.enc.Utf8.parse(md5_hash), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
}

/**
 * 重新组装params  生成sign
 * @param service
 * @param param
 * @param isEncrypt  //data是否加密
 * @returns {{service: *, timestamp: number, version: string, salt: string, sign: *, data: string}}
 */
export function assembleParams(service, param, isEncrypt = false) {
    let user = getSession("user") ? JSON.parse(getSession("user")) : {};
    if (user) {
        param.userId = user.id;
        param.token = user.token;
    }
    const arr = service.split("/");
    const api = arr[arr.length - 2];
    const version = arr[arr.length - 1];
    const timestamp = getTimestamp();
    const salt = mathRand(6);
    const data = isEncrypt ? des3(salt, JSON.stringify(param)) : JSON.stringify(param);
    return {
        service: api,
        timestamp,
        version: version,
        salt,
        sign: CryptoJS.MD5(api + timestamp + data + version + salt + signKey).toString(),
        data
    };
}

/**
 * 数组合并去重
 * @returns {any[]}
 */
export function combine() {
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组，之后用Set数据结构的特性来去重
    return Array.from(new Set(arr));
}

/**
 * 获取签名时间戳
 * @returns {*}
 */
function getTimestamp() {
    let temp = localStorage.getItem("timestamp") ? JSON.parse(localStorage.getItem("timestamp")) : {}
    if (temp && temp.temp) {
        return temp.temp + (Date.parse(new Date()) - temp.currentTemp);
    } else {
        return Date.parse(new Date());
    }
}

/**
 * 获取uuid
 * @returns {string}
 */
export function getUUid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
}