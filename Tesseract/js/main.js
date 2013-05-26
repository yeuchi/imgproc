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

    var scaleFactor = 2.0;
    var rotation = {x:1, y:3, z:0};

    function toRadian(rotation) {
        var radian = {x:0, y:0, z:0};
        // convert rotation from degrees to radian
        radian.x = Math.PI / 180.0 * rotation.x;
        radian.y = Math.PI / 180.0 * rotation.y;
        radian.z = Math.PI / 180.0 * rotation.z;
        return radian;
    }

    function affine(radian,
                    vertex) {
        //vtx1[0] = vtx1[0];

        var y = vertex.y;
        var z = vertex.z;
        vertex.y = Math.cos(radian.x)*y-Math.sin(radian.x)*z;
        vertex.z = Math.sin(radian.x)*y+Math.cos(radian.x)*z;

        var x = vertex.x;
        z = vertex.z;
        vertex.x = Math.cos(radian.y)*x+Math.sin(radian.y)*z;
        //vtx1[1] = vtx1[1];
        vertex.z = -Math.sin(radian.y)*x+Math.cos(radian.y)*z;
        return vertex;
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


    var radius = 2;
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


    //requestAnimationFrame()
    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    setInterval(function() {

        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.restore();
        var list = [];

        // apply rotation
        for (var i=0; i<4; i++) {
            list[0] = affine(radian, corner0[i]);
            list[1] = affine(radian, corner1[i]);
            list[2] = affine(radian, corner2[i]);
            list[3] = affine(radian, corner3[i]);

            render(list);
        }
        render(corner0);
        render(corner1);
        render(corner2);
        render(corner3);

    }, 300);

});


