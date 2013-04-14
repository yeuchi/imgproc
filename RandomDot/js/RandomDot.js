// ---------------------------------------------------------
// Module: RandomDot.js
//
// Description: For random dot stereogram
//              There are 2 RandomDot Instances, one random,
//              the second, random with screened image pattern.
//              This class will generate content for both canvases.
//
// Reference: GPUGems
//   http://http.developer.nvidia.com/GPUGems/gpugems_ch41.html
//
// Author:      C.T. Yeung
//
// ---------------------------------------------------------

var RandomDot = function() {
    var self = this;

    this.dispose = function() {

    };

    // draw random dot background for 1st image (left)
    this.fill = function(canvasId,
                         threshold) {

        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        var dataDes = context.getImageData(0, 0, canvas.width, canvas.height);
        var k = 0;
        for (var s=0; s<canvas.width*canvas.height; s++) {
            var value = Math.random();
            for(var c=0; c<3; c++) {
                dataDes.data[k++] = (value>threshold)?255:0;
            }
            dataDes.data[k++] = 255;
        }
        context.putImageData(dataDes, 0, 0);
    };

    // --- right canvas -----------------------------------------

    // copy left image (dithered)
    this.copy = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');

        var x = 0;
        var y = 0;
        var w = this.canvas.width;
        var h = this.canvas.height;

        var dataSrc = context.getImageData(x, y, w, h);
        this.context.putImageData(dataSrc, x, y);
        this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
    };

    // use left dotted image as a screen to filter the image shape
    this.screen = function(canvasLeftId,        // screen filter
                           canvasImageId,       // image for the knock out
                           canvasRightId){      // destination - right image

        var canvasLeft = document.getElementById(canvasLeftId);
        var contextLeft = canvasLeft.getContext('2d');
        var dataLeft = contextLeft.getImageData(0, 0, canvasLeft.width, canvasLeft.height);

        var canvasImage = document.getElementById(canvasImageId);
        var contextImage = canvasImage.getContext('2d');
        var dataImage = contextImage.getImageData(0,0,canvasImage.width, canvasImage.height);

        // destination screened image
        var canvasRight = document.getElementById(canvasRightId);
        var contextRight = canvasRight.getContext('2d');
        var dataRight = contextRight.getImageData(0,0,canvasRight.width, canvasRight.height);

        // image can't be bigger than canvasRight
        var sttY = (canvasRight.height - canvasImage.height)/2;

        for (var y=0; y<canvasImage.height; y++){
            var k = canvasRight.width*(y+sttY)*4;
            var z = canvasImage.width*y*4;

            for(var x=0; x<canvasImage.width; x++){

                // shape content dither
                if(dataImage.data[z]<128){
                    for(var c=0; c<3; c++) {
                        dataRight.data[k] = dataLeft.data[k];  // modify index if images are different in size
                        k ++;
                    }
                }
                else
                    k+= 3;

                dataRight.data[k] = 255;
                k++;
                z += 4;
            }
        }

        contextRight.putImageData(dataRight, 0, 0);
    };

};