/**
 * host.
 * User: alejandrorioscalera
 * Date: 20/5/17
 * Time: 1:25
 */


if(!Browser.GL){
    Browser.addGetWebGLMessage();
} else {

    var wparts = ['Europe', 'America'];
    var container = document.getElementById('container');
    var globe = new Data.Globe(container);

    console.log(globe);

    var i, tweens = [];

    var settime = function (globe, t) {
        return function () {
            new TWEEN.Tween(globe).to({time: t / wparts.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();

            var d = document.getElementById('dc' + wparts[t]);

            if (d.getAttribute('class') === 'datacenter active'){
                return;
            }

            var dc = document.getElementsByClassName('datacenter');

            for(i = 0; i < dc.length; i++){
                dc[i].setAttribute('class', 'datacenter');
            }
            d.setAttribute('class', 'datacenter active');
        };
    };

    for (var i = 0; i < wparts.length; i++){
        var d = document.getElementById('dc' + wparts[i]);
        d.addEventListener('mouseover', settime(globe, i), false);
    }

    var xhr;
    TWEEN.start();

    xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/json/loc.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var data = JSON.parse(xhr.responseText);

            window.data = data;

            for(var i = 0; i < data.length; i++){
                globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
            }

            globe.createPoints();

            settime(globe, 0)();

            globe.animate();
        }
    };
    xhr.send(null);
}
