$(document).ready(function() {

    var leftView = new CanvasView("canvasLeft");
    var rightView = new CanvasView("canvasRight");
    var W = $("#canvasLeft").width();
    var H = $("#canvasLeft").height();
    leftView.randomDot(.5, 0, 0, W, H);

    rightView.copyExternal("canvasLeft");
    var w = 50;
    var h = 80;
    var x = ($("#canvasLeft").width()-w)/2;
    var y = ($("#canvasLeft").height()-h)/2;
    var id = rightView.crop(x, y, w, h);

    rightView.randomDot(.0, x, y, w, h);
    rightView.copyInternal(id, x+5, y);
});

