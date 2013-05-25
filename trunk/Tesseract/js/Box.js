/**
 * Created with JetBrains PhpStorm.
 * User: ctyeung
 * Date: 5/5/13
 * Time: 5:20 PM
 * To change this template use File | Settings | File Templates.
 */

var Box = function( canvasId,   // [in] canvas id
                    corner0) {

    var self = this;
    this.canvasId = canvasId;

    this.index = 0;


    this.dispose = function() {
        this.ptsSrc = null;
        this.ptsDes = null;
    };

    this.initValues = function() {
        self.canvas = document.getElementById(self.canvasId);
        self.ctx = canvas.getContext("2d");
    };

    this.clear = function() {
        self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
    }

    // draw lines, fill
    this.render = function() {

        self.ctx.strokeStyle = 'black';

        self.ctx.stroke();
    };

    // migrate from source to destination points
    this.advance = function(percent) {
        // linear interpolation
        for (var i=0; i<self.pts.length; i++){

        }
    }

    this.initValues();
};