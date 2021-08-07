function callAll(jsfiles) {
    var src = document.createElement("script");
    src.setAttribute("type", "text/javascript");
    src.setAttribute("src", jsfiles);
    document.getElementsByTagName("head")[0].appendChild(src);
}
callAll("/static/dashboard/js/dist/jquery.validate.min.js'");
callAll("/static/main/js/main.min.js");
callAll("/static/main/js/intlTelInput.min.js");
callAll("/static/main/js/slick.js");
callAll("/static/main/js/lightbox.min.js");