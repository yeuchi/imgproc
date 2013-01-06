var CanvasView = function(canvasId) {
    this.id = canvasId;
    this.initValues();
};

CanvasView.prototype.initValues = function() {

    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext('2d');
    this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
    this.listCrop = [];

};

// fill id object, background if no id
CanvasView.prototype.fill = function(id) {

};

// randomDot entire image if no coordinates provided
CanvasView.prototype.randomDot = function(threshold, x, y, w, h) {

    // clone the pixels
    var dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
    for (var s=0; s<this.canvas.width*this.canvas.height*4; s++)
        dataDes.data[s] = this.dataSrc.data[s];

    x = (null!=x&&0!=x)?x:0;
    y = (null!=y&&0!=y)?y:0;
    w = (null!=w&&0!=w)?w:this.canvas.width;
    h = (null!=h&&0!=h)?h:this.canvas.height;

    for(var j=y; j<h+y; j++) {
        var k = j*this.dataSrc.width*4+i*4;
        for(var i=x; i<w+x; i++){
            var value = Math.random();
            for(var c=0; c<3; c++) {
                dataDes.data[k+c] = (value>threshold)?255:0;
            }
            dataDes.data[k+3] = 255;
            k+= 4;
        }
    }
    this.context.putImageData(dataDes, 0, 0);
};

// copy from src
CanvasView.prototype.copyExternal = function(src) {
    var canvas = document.getElementById(src);
    var context = canvas.getContext('2d');

    var x = 0;
    var y = 0;
    var w = this.canvas.width;
    var h = this.canvas.height;

    var dataSrc = context.getImageData(x, y, w, h);
    this.context.putImageData(dataSrc, x, y);
    this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
};

// crop a rectangle of pixels
// return cropped id
CanvasView.prototype.crop = function(x, y, w, h) {
    var pixels = [];

    x = (null!=x&&0!=x)?x:0;
    y = (null!=y&&0!=y)?y:0;
    w = (null!=w&&0!=w)?w:this.canvas.width;
    h = (null!=h&&0!=h)?h:this.canvas.height;

    for(var j=y; j<h+y; j++) {
        var k = j*this.dataSrc.width*4+i*4;
        for(var i=x; i<w+x; i++){
            var value = Math.random();
            for(var c=0; c<4; c++) {
                pixels.push(this.dataSrc.data[k+c]);
            }
            k+= 4;
        }
    }
    this.listCrop.push({p:pixels, w:w, h:h});
    return this.listCrop.length-1;
};

// copy pixels from one cropped area to another
CanvasView.prototype.copyInternal = function(srcId, x, y) {

    // clone the pixels
    var dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
    for (var s=0; s<this.canvas.width*this.canvas.height*4; s++)
        dataDes.data[s] = this.dataSrc.data[s];

    // copy data
    var crop = this.listCrop[srcId];
    var w = crop.w;
    var h = crop.h;
    var pixels = crop.p;
    var z = 0;

    for(var j=y; j<h+y; j++) {
        var k = j*this.dataSrc.width*4+i*4;
        for(var i=x; i<w+x; i++){
            var value = Math.random();
            for(var c=0; c<4; c++) {
                dataDes.data[k+c] = pixels[z++];
            }
            k+= 4;
        }
    }
    this.context.putImageData(dataDes, 0, 0);
};

// 2nd experiement here ========================================================

// create a dotted screen
CanvasView.prototype.screen = function(dataSrc, dataScreen, x, y) {
    for (var j=0; j<dataScreen.height; j++){

        var k = (j+y)*this.dataSrc.width*4+x*4;     // this image index
        var z = j*dataScreen.width*4;               // screen image index

        for(var i=0; i<dataScreen.width; i++){

            if(dataSrc.data[z]<128){
                for(var c=0; c<3; c++)
                    dataScreen.data[z+c] = this.dataSrc.data[k+c];  // modify index if images are different in size
            }

            k+= 4;
            z+= 4;
        }
    }
};

// randomDot entire image if no coordinates provided
CanvasView.prototype.randomDotScreen = function(threshold, dataSrc, x, y) {

    // clone the pixels
    this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
    var dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
    for (var s=0; s<this.canvas.width*this.canvas.height*4; s++)
        dataDes.data[s] = this.dataSrc.data[s];

    for(var j=0; j<dataSrc.height; j++) {

        var k = (j+y)*this.dataSrc.width*4+x*4; // this image's index
        var z = j*dataSrc.width*4;          // dataScreen index

        for(var i=0; i<dataSrc.width; i++){

            // screen by external image red channel, dither if black pixel
            if(dataSrc.data[z]<128){
                var value = Math.random();
                for(var c=0; c<3; c++) {
                    dataDes.data[k+c] = (value>threshold)?255:0;
                }
            }
            k+= 4;
            z+= 4;
        }
    }
    this.context.putImageData(dataDes, 0, 0);
};

// copy pixels from one cropped area to another
CanvasView.prototype.copyScreen = function(dataSrc,        // [in] external image
                                           dataScreen,     // [in] screened image data
                                           x, y) {         // [in] coord on this image

    // clone the pixels
    this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
    var dataDes = this.context.createImageData(this.canvas.width, this.canvas.height);
    for (var s=0; s<this.canvas.width*this.canvas.height*4; s++)
        dataDes.data[s] = this.dataSrc.data[s];

    for(var j=0; j<dataScreen.height; j++) {

        var k = (j+y)*this.dataSrc.width*4+x*4;             // this image's index
        var z = j*dataScreen.width*4;                  // dataScreen index

        for(var i=0; i<dataScreen.width; i++){

            // only mess with (knock-out) pixels
            if(dataSrc.data[z]< 128){
                for(var c=0; c<3; c++)
                    dataDes.data[k+c] = dataScreen.data[z+c];
            }
            k+= 4;
            z+= 4;
        }
    }
    this.context.putImageData(dataDes, 0, 0);
};

