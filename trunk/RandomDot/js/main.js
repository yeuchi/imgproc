$(document).ready(function() {
    // RDS pair - image
    var imgObj = new Image();
    imgObj.onload = onImageLoadHandler;
    imgObj.src = "img/fish.png";
});

var onImageLoadHandler = function() {
    // load image
    var canvas = document.getElementById("canvas4");
    var context = canvas.getContext("2d");
    context.drawImage(this, 0,0);
    var dataSrc = context.getImageData(0,0, canvas.width, canvas.height);
    var dataScreen = context.createImageData(canvas.width, canvas.height);

    RDSImage(dataSrc, dataScreen);
};

var RDSImage = function(dataSrc,        // [in] image loaded into canvas
                        dataScreen) {    // [out] image screen

    var view2 = new CanvasView("canvas2");
    var view3 = new CanvasView("canvas3");
    var W = $("#canvas2").width();
    var H = $("#canvas2").height();

    // draw random dots
    view2.randomDot(.5, 0, 0, W, H);
    view3.copyExternal("canvas2");

    //draw box at bottom right
    /*
    var w = 50;
    var h = 80;
    var x = ($("#canvas2").width()-w)/2;
    var y = ($("#canvas2").height()-h)/2+10;
    var id = view3.crop(x, y, w, h);

    view3.randomDot(.0, x, y, w, h);
    view3.copyInternal(id, x+5, y);
    */
    
    // draw acuo image
    view3.screen(dataSrc, dataScreen, 0,0);
    view3.randomDotScreen(0.5, dataSrc, 0, 0);
    view3.copyScreen(dataSrc, dataScreen, 5,0);
};

