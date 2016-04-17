$(function () {
    //localStorage.clear();
    function createButton(self){
        var userId = $(self).data('user');
        var text;
        var clazz;
        console.log('timelineUser_' + userId + ':'  + localStorage.getItem('timelineUser_' + userId));
        if (localStorage.getItem('timelineUser_' + userId) == null) {
            text = '非表示';
            clazz = "noShowTimeLine";
        } else {
            text = '表示';
            clazz = "showTimeLine";
        }
        var $d = $('<div>' + text + '</div>');
        $d.addClass('follow-btn').addClass('js-time').addClass(clazz);
        $(self).find('.wrapper').append($d);
    }


    var streamChange = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                createButton(node);
            }
        });
    });
    var $following = $(".followings .items");
    streamChange.observe($following[0], {childList: true});
    $following.find('a').each(function(){
        createButton(this);
    });
    //タイムライン表示ユーザ選択
    document.body.appendChild(function () {
            var sc = document.createElement("script");
            var code = function () {
                window.addEventListener('click', function (e) {
                    var $target = $(e.target);
                    if ($target.is(".js-time")) {
                        e.preventDefault();
                        e.stopPropagation();
                        var userId = $target.closest('a').data('user');
                        //var user = localStorage.getItem('timelineUser_' + userId);
                        if (localStorage.getItem('timelineUser_' + userId) == null) {
                            localStorage.setItem('timelineUser_' + userId, "true");
                            $target.html('表示').removeClass('noShowTimeLine').addClass('showTimeLine');
                        } else {
                            localStorage.removeItem('timelineUser_' + userId);
                            $target.html('非表示').removeClass('showTimeLine').addClass('noShowTimeLine');
                        }
                    }
                }, true);
            };
            sc.type = "text/javascript";
            sc.text = "(" + code.toString() + ")()";
            return sc;
        }()
    );
});
