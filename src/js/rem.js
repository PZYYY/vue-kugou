(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*
    rem的算法：设计稿的尺寸/2/换算单位(1rem=10px,那换算单位为10)
    margin-top:40px(测量出来的尺寸)
    margin-top:2rem(40/2/10)

    图片的宽度为(前提：设计稿的数据)200px(200/2/10=10rem)
    图片的宽度为(前提：主观的数据)200px(200/10=20rem)
*/