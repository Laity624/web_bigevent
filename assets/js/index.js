$(function () {

    var layer = layui.layer

    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()


    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm(
            '确定退出登录?',
            { icon: 3, title: '提示' },
            function (index) {
                // 1、清空本地的token
                localStorage.removeItem('token')
                // 2、跳转到登录页面
                location.href ='/login.html' 
                layer.close(index); 
            }
        );
    })

})


// 获取用户的基本信息 
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },

        // 无论成功还是失败，都会执行这个函数
        /*complete: function (res) {
            // console.log('都会执行这个函数');
            console.log(res);
            //可以使用 res.responseJSON拿倒服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1、强制清空token
                localStorage.removeItem('token')
                // 2、强制跳转到登录页面
                location.href = '/login.html'
            }
        }*/
    })
}


// 渲染用户头像
function renderAvatar(user) {
    // 1、获取用户的名称
    var name = user.nickname || user.username
    // 2、设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 3、按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}