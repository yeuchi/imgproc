// ============================================================
// Module :     main.js
//
// Description: Tesseract exercise
//
// Author:      C.T. Yeung
//
// ============================================================
$(document).ready(function() {

    // square is defined by 8 points, we have 2 squares
    var p0 = {x:0, y:0, z:0};
    var p1 = {x:10, y:10, z:10};
    var p2 =  {x:10, y:10, z:40};
    var p3 =  {x:0, y:0, z:50};
    var corner0 = [p0, p1, p2, p3 ];

    p0 = {x:50, y:0, z:0};
    p1 = {x:40, y:10, z:10};
    p2 = {x:40, y:10, z:40};
    p3 = {x:50, y:0, z:50};
    var corner1 = [p0, p1, p2, p3 ];

    p0 = {x:0, y:50, z:0};
    p1 = {x:10, y:40, z:10};
    p2 = {x:10, y:40, z:40};
    p3 = {x:0, y:50, z:50};
    var corner3 = [p0, p1, p2, p3 ];

    p0 = {x:50, y:50, z:0};
    p1 = {x:40, y:40, z:10};
    p2 = {x:40, y:40, z:40};
    p3 = {x:50, y:50, z:50};
    var corner2 = [p0, p1, p2, p3 ];

    var canvas = document.getElementById("pixelBox");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'green';
    ctx.save();

    var scaleFactor = 3.0;
    var rotation = {x:0.15, y:1, z:0};

    function toRadian(rotation) {
        var radian = {x:0, y:0, z:0};
        // convert rotation from degrees to radian
        radian.x = Math.PI / 180.0 * rotation.x;
        radian.y = Math.PI / 180.0 * rotation.y;
        radian.z = Math.PI / 180.0 * rotation.z;
        return radian;
    }

    function translate (list,
                        amountX,
                        amountY,
                        amountZ) {
        for(var i=0; i<list.length; i++){
            list[i].x += amountX;
            list[i].y += amountY;
            list[i].z += amountZ;
        }
        return list;
    }

    function scale (list,
                    amount) {
        for (var i=0; i<list.length; i++) {
            list[i].x *= amount;
            list[i].y *= amount;
            list[i].z *= amount;
        }
        return list;
    }

    // get our perspective in radian
    var radian = toRadian(rotation);
    corner0 = translate(corner0, -25, -25, -25);
    corner1 = translate(corner1, -25, -25, -25);
    corner2 = translate(corner2, -25, -25, -25);
    corner3 = translate(corner3, -25, -25, -25);

    scale(corner0, scaleFactor);
    scale(corner1, scaleFactor);
    scale(corner2, scaleFactor);
    scale(corner3, scaleFactor);

    function affine(radian,
                    list) {
        //vtx1[0] = vtx1[0];
        for(var i=0; i<list.length; i++){
            var y = list[i].y;
            var z = list[i].z;
            list[i].y = Math.cos(radian.x)*y-Math.sin(radian.x)*z;
            list[i].z = Math.sin(radian.x)*y+Math.cos(radian.x)*z;

            var x = list[i].x;
            z = list[i].z;
            list[i].x = Math.cos(radian.y)*x+Math.sin(radian.y)*z;
            //vtx1[1] = vtx1[1];
            list[i].z = -Math.sin(radian.y)*x+Math.cos(radian.y)*z;
        }
    }

    var radius = 4;
    var offX = $("#pixelBox").width()/2;
    var offY = $("#pixelBox").height()/2;

    function render(list) {
        // draw the dot
        for (var j=0; j<list.length; j++) {
            // draw vertex point
            ctx.beginPath();
            ctx.arc(list[j].x + offX, list[j].y+offY, radius, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        // stroke line x-y axis
        for (var m=0; m<list.length; m++) {
            // draw lines between them
            ctx.beginPath();
            var k = (m==0)? list.length-1:m-1;
            ctx.moveTo(list[k].x+offX, list[k].y + offY);
            ctx.lineTo(list[m].x + offX, list[m].y + offY);
            ctx.stroke();
        }
    }

    var numSteps = 10;      // number of steps between two points (for interpolation)
    var step = 0;           // current step we are on.

    function interpolate(listSrc) {
       var listDes = [];
       var p0 = listSrc[listSrc.length-1];
       for (var i=0; i<listSrc.length; i++){
           p1 = listSrc[i];

           var xNum = (p1.x - p0.x) * step / numSteps + p0.x;
           var yNum = (p1.y - p0.y) * step / numSteps + p0.y;
           var pN = {x:xNum, y:yNum};
           listDes.push(pN);

           p0 = p1;
       }
        return listDes;

    }

    //requestAnimationFrame()
    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    setInterval(function() {

        ctx.clearRect(0,0,canvas.width, canvas.height);
        //ctx.restore();

        // apply rotation
        affine(radian, corner0);
        affine(radian, corner1);
        affine(radian, corner2);
        affine(radian, corner3);

        // apply interplation
        var list0 = interpolate(corner0);
        var list1 = interpolate(corner1);
        var list2 = interpolate(corner2);
        var list3 = interpolate(corner3);
        step = (step < numSteps)? ++step:0;

        // draw dots and lines
        var lateral = [];
        for (var i=0; i<4; i++) {
            lateral[0] = list0[i];
            lateral[1] = list1[i];
            lateral[2] = list2[i];
            lateral[3] = list3[i];
            render(lateral);
        }

        // draw dots and lines
        render(list0);
        render(list1);
        render(list2);
        render(list3);

    }, 200);

});


