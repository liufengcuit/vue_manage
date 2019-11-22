import config from './config';
import { assembleParams } from '@/utils/publicMethods';

const http = {
    post(service, params, isEncrypt = false, timeout) {
        return new Promise((resolve, reject) => {
            params = assembleParams(service, params, isEncrypt);
            if (timeout) {
                config.timeout = timeout;
            }
            config.params = "";
            axios.post(service, params, config)
                .then(res => {
                    console.log(res)
                    httpCallback(res, "post", resolve, reject);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    /**
     * axios  Get请求
     * @param service  服务器api
     * @param params  路径参数
     * @param isEncrypt  data是否加密
     * @returns {Promise}
     * @constructor
     */
    get(service, params, isEncrypt = false) {
        return new Promise((resolve, reject) => {
            params = assembleParams(service, params, isEncrypt);
            config.params = params;
            axios.get(service, config)
                .then(res => {
                    //请求成功回调
                    httpCallback(res, "get", resolve, reject);
                })
                .catch(err => {
                    reject(err);
                })

        })
    }
}


/**
 * http返回处理
 */
function httpCallback(res, type, resolve, reject) {
    console.log(res)
        //请求成功回调
    if (res.data.code === 200) {
        resolve(res.data.body);
    } //服务器错误
    else if (res.data.code === 500) {
        reject(res.data.message ? res.data : { code: 500, message: "服务器异常，错误码：500" });
        errorHandler({...res, type: "api" }); // 错误上报 服务器500异常
    } else if (res.data.code === 409) {
        //查询结果为空
        resolve("");
    } else if (res.data.code === 415) {
        //415  该接口为缓存接口   服务端未更新数据缓存  前端不更新数据缓存
        resolve("");
    }
    //其它异常
    else {
        reject(res.data);
    }
}



export default http;