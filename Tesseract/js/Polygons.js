var Polygons = function(camera) {

    var self = this;
    this.camera = camera;

    this.insert = function(polygon){

    };

    this.sort = function(camera){

    };

    this.render = function() {
        var list = [];
        for (var i=0; i<polygons.length; i++){
            // calculate viewing angle from polygon normal (is visible?)
            if(polygons[i].isVisible(self.camera.position)) {
                // insert-sort
            }
        }

        // render from far to near
        for (var j=0; j<list.length; j++){
            list[j].render(self.camera.position);
        }
    };
}
