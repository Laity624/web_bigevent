// 注意：每次调用 $.get() ，$>post() ，$.ajax()的时候
// 会先掉这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置参数

$.ajaxPrefilter(function (options) {
    // console.log(options);
    // console.log(options.url);

    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})