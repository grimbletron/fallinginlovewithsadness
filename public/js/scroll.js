        setInterval(function(){
            $('#list').stop().animate({scrollTop:40},2650,'linear',function(){
                $(this).scrollTop(0).find('span:last').after($('span:first', this));
            });
        }, 2700);
