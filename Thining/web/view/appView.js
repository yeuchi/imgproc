
var AppView = Backbone.View.extend({
    
    el: $("#divAppView"),
    
    events: {
      "click .btnThin"      : "onThin",
      "click .btnClear"     : "onClear",
      "mousedown #myCanvas" : "onDrawBegin",
      "mousemove #myCanvas" : "onDraw",
      "mouseup #myCanvas"   : "onDrawEnd",
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

         
        if(listPts.length>2){
            for(var i=0; i<listPts.length-2; i++){
                var ptPrev = listPts[i];
                var ptLast = listPts[i+1];
                var ptNew = listPts[i+2];
                this.context.moveTo(ptPrev.x, ptPrev.y);
                this.context.quadraticCurveTo(ptLast.x, ptLast.y, ptNew.x, ptNew.y);
            }
        }
        else {
            var ptLast = listPts[0];
            var pt = listPts[1];
            this.context.moveTo(ptLast.x, ptLast.y);
            this.context.lineTo(pt.x, pt.y);
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
    
    onDrawBegin: function(event) {
       this.model.set({mouseDown: true});
    },
    
    onDraw: function(event) {
      var isDrag = this.model.get("mouseDown");
      if(isDrag){
         var pos = $(".divCanvas").position();
         var off = $("#myCanvas").position();
         var pt = new Point(event.pageX-pos.left-off.left, event.pageY-pos.top-off.top);

         var listPts = this.model.get("listPts");

         if(listPts.length) {
            this.context.beginPath();
            this.context.strokeStyle = "#"+this.model.get("color");
            this.context.lineWidth = this.model.get("strokeWidth");;

            if(listPts.length>2){
                var ptPrev = listPts[listPts.length-3];
                var ptLast = listPts[listPts.length-2];
                var ptNew = listPts[listPts.length-1];
                this.context.moveTo(ptPrev.x, ptPrev.y);
                this.context.quadraticCurveTo(ptLast.x, ptLast.y, ptNew.x, ptNew.y);
            }
            else if(listPts.length>1) {
                var ptLast = listPts[0];
                var pt = listPts[1];
                this.context.moveTo(ptLast.x, ptLast.y);
                this.context.lineTo(pt.x, pt.y);
            }
            this.context.stroke();
         }
         listPts.push(pt);
         this.model.set({listPts:listPts});
       }
    },
    
    onDrawEnd: function(event) {
       this.model.set({mouseDown: false});
    },
    
    onClear: function() {
       this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
       this.model.clear();
    },
    
    onThin: function() {
       //this.dataSrc = this.context.getImageData(0,0,this.canvas.width, this.canvas.height);
       this.context = this.canvas.getContext('2d');
       this.dataDes = this.context.getImageData(0, 0,this.canvas.width, this.canvas.height);
       this.dataMask = this.context.createImageData(this.canvas.width, this.canvas.height);
      
       this.gonzalezThin = new GonzalezThin();
       this.gonzalezThin.apply(this.dataDes, this.dataMask);
       this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
       this.context.putImageData(this.dataDes, 0, 0);
       //dispatchEvent(EVENT_BUTTON_THIN);
    },
    
    onStrokeWidth: function() {
       this.model.set({strokeWidth: $("#sliderThick").val()});
    },
    
    onColor: function() {
       this.model.set({color: $("#sliderColor").val()});
    }
});

