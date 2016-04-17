$(function () {
    //画面左のタイムラインが変更された場合に、非表示ユーザを削除
    var streamChange = new MutationObserver(function (mutations, data2) {
        mutations.forEach(function (mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                console.log(localStorage.getItem('timelineUser_' + $(node).find('>a').data('user')));
                if (localStorage.getItem('timelineUser_' + $(node).find('>a').data('user')) === null) {
                    node.parentNode.removeChild(node);
                }
            }
        });
    });
    var $stream = $("div.stream");
    streamChange.observe($stream[0], {childList: true});
});