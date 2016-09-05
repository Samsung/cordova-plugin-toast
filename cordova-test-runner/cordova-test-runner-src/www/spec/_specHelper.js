(function () {
    var popup = null;
    function getPopup () {
        return popup || (popup=createPopup());
    }
    function createPopup () {
        var pop = document.createElement('div');
        var width = window.innerWidth;
        var height = window.innerHeight;
        var POPUP_HEIGHT = 300;

        pop.style.position = 'fixed';
        pop.style.width = width + 'px';
        pop.style.height = POPUP_HEIGHT + 'px';

        pop.style.left = 0;
        pop.style.top = ((height-POPUP_HEIGHT)/2)+'px';
        pop.style.color = '#fff';
        pop.style.textAlign = 'center';
        pop.style.display = 'block';
        pop.style.zIndex = 10000;
        pop.style.fontSize = '20px';
        document.body.appendChild(pop);
        return pop;
    }

    window.helper = {
        alert: function (msg, callback, timeout) {
            function onKeyDown (e) {
                if(e.keyCode === 13 || e.keyCode === 29443) {
                    obj.done(true);
                    window.removeEventListener('keydown', onKeyDown);
                }
            }
            window.addEventListener('keydown', onKeyDown);
            var obj = this.ask(msg + '<br><br>Press Enter to continue', function () {
                window.removeEventListener('keydown', onKeyDown);
                callback.apply(null, arguments);
            }, timeout);
            return obj;
        },
        aOrB: function (msg, ab, callback, timeout) {
            function onKeyDown (e) {
                if(e.keyCode === 4 || e.keyCode === 37) { // LEFT
                    obj.done(true);
                    window.removeEventListener('keydown', onKeyDown);
                }
                else if(e.keyCode === 5 || e.keyCode === 39) { // RIGHT
                    obj.done(false);
                    window.removeEventListener('keydown', onKeyDown);
                }
            }
            window.addEventListener('keydown', onKeyDown);
            var obj = this.ask(msg + '<br>' +
                    '<div style="width: 50%; test-align: center; float:left; clear: left;">PRESS ◀<br><br>'+ab[0]+'</div>' +
                    '<div style="width: 50%; test-align: center; float:left; clear: right;">PRESS ▶<br><br>'+ab[1]+'</div>', function () {
                window.removeEventListener('keydown', onKeyDown);
                callback.apply(null, arguments);
            }, timeout);
            return obj;
        },
        ask: function (msg, callback, timeout) {
            var pop = getPopup();
            pop.innerHTML = msg;
            pop.style.backgroundColor = 'rgba('+parseInt(Math.random()*128, 10)+', '+parseInt(Math.random()*128, 10)+', '+parseInt(Math.random()*128, 10)+', 0.8)';
            pop.style.display = 'block';
            var handle = {
                popup: {
                    setHTML: function (html) {
                        pop.innerHTML = html;
                    }
                },
                done: function () {
                    itvClose && clearInterval(itvClose);
                    itvClose = null;
                    pop.style.display = 'none';
                    callback.apply(null, arguments);
                }
            };
            if(typeof timeout === 'number') {
                var countSec = Math.ceil(timeout/1000);
                pop.innerHTML = msg + '<br><br>' + countSec + ' sec remained';
                var itvClose = setInterval(function () {
                    if(--countSec <= 0) {
                        itvClose && clearInterval(itvClose);
                        itvClose = null;
                        handle.done('TIMEOUT');
                    }
                    else {
                        pop.innerHTML = msg + '<br><br>' + countSec + ' sec remained';
                    }
                }, 1000);
            }
            return handle;
        }
    };
})(window);
