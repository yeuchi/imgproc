var Polygon = function(context, color) {
    var self = this;

    this.list = [];
    this.indexies = [];
    this.context = context;
    this.color = color;

    this.clear = function() {
        this.list = [];
        this.indexies = [];
    };

    this.insertVertex = function(list,
                                 index) {
       //assume right hand rule for plane
       this.list.push(list);
       this.indexies.push(index);
    };

    this.isVisible = function() {
        // validate 1st 3 points from right hand rule
    };

    this.angleFromNorm = function(p) {

    };

    this.fillColor = function(color){
        self.context.fillStyle = color;
        self.context.beginPath();

        var list = self.list[0];
        var p = list[self.indexies[0]];
        self.context.moveTo(p.x, p.y);

        for (var i= 1; i<self.list.length; i++) {
            list = self.list[0];
            p = list[self.indexies[0]];
            self.context.lineTo(p.x, p.y);
        }
        self.context.closePath();
        self.context.fill();
    };

    this.render = function(p) {     // camera's position

       // if(self.isVisible(p)){
            // get reflectance
            var angle = self.angleFromNorm(p);
            self.fillColor();
       // }
    };

    this.getCenter = function() {
       var c = {x:0, y:0, z:0};
       for(var i=0; i<self.list.length; i++){
           var list = self.list[i];
           var p = list[self.indexies[i]];
           c.x += p.x;
           c.y += p.y;
           c.z += p.z;
       }
        c.x /= self.list.length;
        c.y /= self.list.length;
        c.z /= self.list.length;
        return c;
    };

    this.getDistance = function(p) {
        var P = self.getCenter();
        var x = (p.x- P.x);
        var y = (p.y- P.y);
        var z = (p.z- P.z);
        var d = math.sqrt(x*x+y*y+z*z);
        return d;
    };
}