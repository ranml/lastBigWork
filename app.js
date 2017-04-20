$(function(){
    loadSwiper();
    setTimeout(function () {
        newList.init();
    }, 100)
});

/**
 * fun： 设置录播图
 */
function loadSwiper(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}
var newList = {
    /**
     * fun: 加载轮播图
     */
    loadSliders: function () {
        $.ajax({
            url: "/sliders",
            method: "GET",
            success: function(res) {
                var r = JSON.parse(res);
                newList.bindSliders(r);
            }
        });
    },
    /**
     * fun： 绑定数据
     * @param res
     */
    bindSliders: function (res) {
        var html = "";

        for(var i=0; i<res.length; i++){
            html += '<div class="swiper-slide">';
            html += '<a href="'+res[i]['link']+'">';
            html += '<img src="'+res[i]['imgURL']+'" alt="">';
            html += '</a>';
            html += '</div>';
        }
        $('.banner .swiper-wrapper').html(html);
    },
    /**
     * fun: 加载菜单
     */
    loadMenu: function(){
        $.ajax({
            url: "/tags",
            method: "GET",
            success: function(res) {
                var r = JSON.parse(res);

                newList.bindMenu(r.added);
            }
        });
    },

    /**
     * fun: 绑菜单数据
     * @param res
     */
    bindMenu: function (res) {
        var html = "";

        for(var i=0; i<res.length; i++){
            if(i == 0){
                html += '<a href="javascript:;" class="active">'+res[i]['name']+'</a>'
            }
            html += '<a href="javascript:;">'+res[i]['name']+'</a>';
        }
        $('.header nav').html(html);
    },
    /**
     * fun: 加载菜单列表
     */
    loadNewList: function(){
        $.ajax({
            url: "/news?num=4",
            method: "GET",
            success: function(res) {
                var r = JSON.parse(res);

                newList.binbNewList(r);
            }
        });
    },
    /**
     * fun: 绑定新闻列表数据
     * @param res
     */
    binbNewList: function (res) {
        console.log(res);
       var html = "";

       for(var i=0; i<res.length; i++){
           var type = "";
           if(res[i]['type']){
               type = res[i]['type']
           }
           html += '<li>';
           html += '<img src="'+res[i]['imgURL']+'">';
           html += '<div class="news-list-con">';
           html += '<div>';
           html += '<h2>'+res[i]['title']+'</h2>';
           html += '<p>'+res[i]['title']+'</p>';
           html += '<div class="tags">'+res[i]['post']+"人跟帖 "+type;
           html += '</div>';
           html += '</div>';
           html += '</div>';
           html += '</li>';
       }
        $('.news-list ul').html(html);

    },
    /**
     * fun： 初始化
     */
    init: function () {
        this.loadMenu();
        this.loadSliders();
        this.loadNewList();

    }
};