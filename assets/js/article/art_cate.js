$(function () {
    layer = layui.layer
    form = layui.form

    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg('获取信息失败！')
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 为添加类别按钮绑定店家事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '添加文章分类',
            // 注意：这是一种新方法，配合   <script type="text/html" >
            content: $('#dialog-add').html()
        });
    })

    // 为 form-add 表单绑定  submit 事件
    // 此处不能使用以往的方式,因为form是动态凭借上去的
    // $('#form-add').on('submit',function(e){})
    // 得通过代理的方式
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
            
        })
    })


    // 通过代理的方式，为 编辑按钮绑点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // console.log('ok')
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        
        var id = $(this).attr('data-id')
        // console.log(id);
        // 发起请求，获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: "/my/article/cates/"+id,
            success: function (res) {
                // console.log(res);
                // 为表单填充数据
                // 记得先给表单添加 lay-filter 属性
                form.val('form-edit', res.data)
                // 此处顺便保存一下 id 值，后面更新需要用到（使用隐藏域）
            }
        })
    })


    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                // 关闭弹出层
                layer.close(indexEdit)
                // 重新加载表格数据
                initArtCateList()
            }
        })
    })


    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // console.log('ok');
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index);
                        // 重新加载表格数据
                        initArtCateList() 
                    }
                })
            }
        );       
    })
})