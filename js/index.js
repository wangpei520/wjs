/**
 * Created by Administrator on 2017/8/4.
 */
$(function(){
    function resize(){
        //获取屏幕宽度
        var windowWidth = $(window).width();
        //判断屏幕大小
        var isSmallScreen = windowWidth < 768;
        //根据屏幕大小为每一张轮播图设置背景
        $('#main_ad > .carousel-inner >.item').each(function(i,item){
            var $item = $(item);  //将dom对象转换为jq对象
            //$element.data()是一个函数，专门用于获取页面中自定义属性（data-abc)，函数的参数是我们取的属性名称（abc）
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            //设置背景图片
            $item.css('backgroundImage','url("'+imgSrc+'")');
            //因为在小屏幕时我们需要小图时尺寸能够根据屏幕变化等比例变化，所以小图时我们使用img标签，不是背景图
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt=""/>')
            }else{
                $item.empty();
            }
        });

        var $ulContainer = $('.nav-tabs');
        //    获取所有子元素宽度的和
        var width = 20;
        $ulContainer.children().each(function(index,ele){
            // console.log(ele.clientWidth)
            width += ele.clientWidth;
        });
        if(width > $(window).width()){
            $ulContainer.css('width',width)
                .parent().css('overflow-x','scroll');
        }
    }
    $(window).on('resize',resize).trigger('resize');
    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();
// 控制标签页标签宽度
//a点击事件
    var $newstitle = $('.news-tittle');
    $('#news .nav-pills a').on('click', function(){
        //获取当前元素
        var $this =$(this);
        //获取对应的title值
        var $title = $this.data('title');
        // 将title设置到相应位置
        $newstitle.text($title);
    });

    //    第一步获取手指在轮播图上的一个方向（左右）
    //获取轮播图组件容器
    var $carousels = $('.carousel');
    var startX,endX;
    var offset = 50;
    //注册滑动事件
    $carousels.on('touchstart',function(e){
        //    手指触摸开始时记录一下手指所在的x坐标
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });
    //    手指触摸移动时记录一下手指最后离开所在的x坐标
    $carousels.on('touchmove',function(e){
        //变量重复赋值，以最后一个为准
        endX = e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
    $carousels.on('touchend',function(e){
        //控制精度，获取手指滑动的距离，当距离大于一定值时我们认为有方向变化
        var distance = Math.abs(startX-endX);
        // console.log(distance);
        if(distance > offset){
            $(this).carousel(startX > endX ?'next':'prev');
        }
    });




//    根据或得到的方向选择上一张或下一张

    $('#main_ad').carousel('next');
})
