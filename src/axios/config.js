import Qs from 'qs'
export default {
    //设置超时时间
    timeout: 60000,
    //返回数据类型
    responseType: 'json', // default
    // 请求头信息
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },


    // url: '/get',
    // method: 'POST',
    transformRequest: [
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs
        function(data) {
            //由于使用的form-data传数据所以要格式化
            // data = JSON.parse(data);
            data = Qs.stringify(data);
            return data
        }
    ],
    params: {},
    data: {},


    // withCredentials: false, // default


    //将upload事件注释掉，防止跨域状态下发起option请求

    // onUploadProgress: function(progressEvent) {
    // 	// Do whatever you want with the native progress event
    // },


    // onDownloadProgress: function(progressEvent) {
    // 	// Do whatever you want with the native progress event
    // },


    // maxContentLength: 2000,


    /*  validateStatus: function (status) {
     return status >= 200 && status < 300; // default
     },*/


    // maxRedirects: 5, // default
}