var Renderer = function () {

    var self = this;
    var polygons = [];
    var geometry = new Geometry();
    var pt = {x:0, y:0, z:0};

    this.dispose = function() {

    };

    this.render = function() {

        for (var i=0; i<polygons.length; i++){
            // calculate viewing angle from polygon normal (is visible?)
            if(polygons[i].isVisible(pt)) {
                // sort planes from viewing angle.

                // frustrum / culling

                // get reflecance

                // fill or void polygon - winding rule

            }
        }
    };
};