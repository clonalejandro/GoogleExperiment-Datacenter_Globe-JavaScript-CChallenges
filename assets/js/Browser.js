/**
 * host.
 * User: alejandrorioscalera
 * Date: 19/5/17
 * Time: 18:53
 */

Browser = {

    canvas : !! window.CanvasRenderingContext2D,
    GL: (renderGL()),
    workers: !! window.Worker,
    Fapi: window.File && window.FileReader && window.Blob,

    getWebGLErrorMessage : function () {

        var domElement = document.createElement('div');

        domElement.style.fontFamily = "monospace";
        domElement.style.fontSize = "13px";
        domElement.textAlign = "center";
        domElement.style.background = "#eeeeee";
        domElement.style.padding = "1em";
        domElement.style.width = "475px";
        domElement.style.margin = "5em auto 0";

        if (!this.GL){
            domElement.innerHTML = window.WebGlRenderingContext ? [
                "Sorry, your gpu doesn't support.<br> See " + '<a href="https://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">this</a>'
            ].join('\n') : [
                "Sorry, your gpu doesn't support.<br> See " + '<a href="https://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">this</a>',
                "Please try with: ",
                "<a href='https://www.google.com/chrome'>Chrome</a>,<br>",
                "<a href='https://www.mozilla.com/en-US/firefox/new/'>Firefox 4</a> or<br>",
                "<a href='https://nightly.webkit.org/'>Webkit Nightly (Mac)</a>"
            ].join('\n');
        }
        return domElement;

    },

    addGetWebGLMessage : function (parameters) {
        var parent, id, domElement;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        domElement = Browser.getWebGLErrorMessage();
        domElement.id = id;

        parent.appendChild(domElement);
    }

};


function renderGL() {
    try {
        return !!window.WebGLRenderingContext
                &&
            !!document.createElement('canvas').
            getContext('experimental-webgl');
    }
    catch (e){
        return false;
    }
}