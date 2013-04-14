$(document).ready(function() {
    // RDS pair - image
    var imgObj = new Image();
    imgObj.onload = onImageLoadHandler;
    imgObj.src = "img/fish.png";
});

var onImageLoadHandler = function() {
    // draw image into a canvas so we can get the pixels
    var canvas = document.getElementById("canvasImage");
    var context = canvas.getContext("2d");
    context.drawImage(this, 0,0);

    // draw random dots for left eye
    var viewLeft = new RandomDot();
    viewLeft.fill("canvasLeft",.5);

    // draw screened image for right eye
    var viewRight = new RandomDot();
    //viewRight.copy("canvasLeft");
    viewRight.fill("canvasRight",.5);
    viewRight.screen("canvasLeft", "canvasImage", "canvasRight");
};

