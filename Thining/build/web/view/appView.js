
var AppView = Backbone.View.extend({
    
    el: $("#divAppView"),
    
    events: {
      "click .btnThin"      : "onThin",
      "click .btnClear"     : "onClear",
      "click #myCanvas"     : "onDraw",
      "change #sliderThick" : "onStrokeWidth",
      "change #sliderColor" : "onColor"
    },

    initialize: function() {
      
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      
      this.canvas = document.getElementById('myCanvas');
      this.context = this.canvas.getContext('2d');
      
      this.onStrokeWidth();
      this.onColor();
    },

    render: function() {
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
      var listPts = this.model.get("listPts");
      
      if(listPts.length>1) {
         this.context.beginPath();
         this.context.strokeStyle = "#"+this.model.get("color");
         this.context.lineWidth = this.model.get("strokeWidth");

         var ptLast = listPts[0];
         for(var i=1; i<listPts.length; i++){
            var pt = listPts[i];
            this.context.moveTo(ptLast.x, ptLast.y);
            this.context.lineTo(pt.x, pt.y);
            ptLast = pt;
         }
         this.context.stroke();
      }
    },
    
    onAddPoint: function(event) {
      var pos = $(".divCanvas").position();
      var off = $("#myCanvas").position();
      var pt = new Point(event.pageX-pos.left-off.left, event.pageY-pos.top-off.top);
      var listPts = this.model.get("listPts");
      listPts.push(pt);
      this.model.set({listPts: listPts});
    },
    
    onDraw: function(event) {
      var pos = $(".divCanvas").position();
      var off = $("#myCanvas").position();
      var pt = new Point(event.pageX-pos.left-off.left, event.pageY-pos.top-off.top);
      
      var listPts = this.model.get("listPts");
    
      if(listPts.length) {
         this.context.beginPath();
         this.context.strokeStyle = "#"+this.model.get("color");
         this.context.lineWidth = this.model.get("strokeWidth");;
      
         var ptLast = listPts[listPts.length-1];
         this.context.moveTo(ptLast.x, ptLast.y);
         this.context.lineTo(pt.x, pt.y);
         this.context.stroke();
      }
      listPts.push(pt);
      this.model.set({listPts:listPts});
    },
    
    onClear: function() {
       this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
       this.model.clear();
    },
    
    onThin: function() {
       alert("start Thinning");
       // dispatch event for thinning.
    },
    
    onStrokeWidth: function() {
       this.model.set({strokeWidth: $("#sliderThick").val()});
    },
    
    onColor: function() {
       this.model.set({color: $("#sliderColor").val()});
    }
});

