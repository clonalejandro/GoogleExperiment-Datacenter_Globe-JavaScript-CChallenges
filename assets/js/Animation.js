/**
 * host.
 * User: alejandrorioscalera
 * Date: 19/5/17
 * Time: 19:20
 */


if (!window.requestAnimationFrame){

    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(callback, 1000/60);
                };
    })();
}