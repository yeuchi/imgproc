$(document).ready(function() {

    // square is defined by 8 points, we have 2 squares
    var p0 = {x:0, y:0, z:0};
    var p1 = {x:10, y:10, z:10};
    var p2 =  {x:10, y:10, z:20};
    var p3 =  {x:0, y:0, z:30};
    var corner0 = [p0, p1, p2, p3 ];

    p0 = {x:50, y:0, z:0};
    p1 = {x:40, y:10, z:10};
    p2 = {x:40, y:10, z:20};
    p3 = {x:50, y:0, z:30};
    var corner1 = [p0, p1, p2, p3 ];

    p0 = {x:0, y:50, z:0};
    p1 = {x:10, y:40, z:10};
    p2 = {x:10, y:40, z:20};
    p3 = {x:0, y:50, z:30};
    var corner2 = [p0, p1, p2, p3 ];

    p0 = {x:50, y:50, z:0};
    p1 = {x:40, y:40, z:10};
    p2 = {x:40, y:40, z:20};
    p3 = {x:50, y:50, z:30};
    var corner3 = [p0, p1, p2, p3 ];

    var canvas = document.getElementById("pixelBox");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'green';

    var rotation = {x:45, y:0, z:0};

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
        var scale = 2.0;
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
                    amountX,
                    amountY,
                    amountZ) {
        for (var i=0; i<list.length; i++) {
            list[i].x *= amountX;
            list[i].y *= amountY;
            list[i].z *= amountZ;
        }
        return list;
    }

    // get our perspective in radian
    var radian = toRadian(rotation);
    corner0 = translate(corner0, -25, -25, -25);
    corner1 = translate(corner1, -25, -25, -25);
    corner2 = translate(corner2, -25, -25, -25);
    corner3 = translate(corner3, -25, -25, -25);

    //requestAnimationFrame()
    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    setInterval(function() {

        ctx.clearRect(0,0,canvas.width, canvas.height);
        var vtx = [];
        // apply rotation
        for (var i=0; i<4; i++) {
            vtx[0] = affine(radian, corner0[i]);
            vtx[1] = affine(radian, corner1[i]);
            vtx[2] = affine(radian, corner2[i]);
            vtx[3] = affine(radian, corner3[i]);




            var radius = 2;
            var offset = 100;
            for (var j=0; j<vtx.length; j++) {
                // draw vertex point
                ctx.beginPath();
                ctx.arc(vtx[j].x + offset, vtx[j].y+offset, radius, 0, 2 * Math.PI, false);
                ctx.fill();
            }

            for (var m=0; m<vtx.length; m++) {
                 // draw lines between them
                 ctx.beginPath();
                 var k = (m==0)? 3:m-1;
                 ctx.moveTo(vtx[k].x+offset, vtx[k].y + offset);
                 ctx.lineTo(vtx[m].x + offset, vtx[m].y + offset);
                 ctx.stroke();
            }
        }

    }, 1000);

});


