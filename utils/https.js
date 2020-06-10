module.exports = function(param){
    var _self = this, 
        url = param.url,
        method = param.method,
        header = param.header || {},
        data = param.data || {};
    
    
    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
    if(method){
        method = method.toUpperCase();//小写改为大写
        if(method=="POST"){
            header = {'content-type' : "application/x-www-form-urlencoded"};
		}
     }
    
    //用户交互:加载圈
    if (!param.hideLoading) {
        uni.showLoading({title:'加载中...'});
    }
    
    //网络请求
    uni.request({
        url: url,
        method: method || 'GET',
        header: header,
        data: data,
        success: res => {
            if (res.statusCode && res.statusCode != 200) {//api错误
                uni.showModal({
                    content:"" + res.msg
                });
                return;
            }
            
            typeof param.success == "function" && param.success(res.data);
        },
        fail: (e) => {
            uni.showModal({
                content:"" + e.msg
            });
            typeof param.fail == "function" && param.fail(e.data);
        },
        complete: () => {
            console.log("网络请求complete");
            uni.hideLoading();
            typeof param.complete == "function" && param.complete();
            return;
        }
    });
}
