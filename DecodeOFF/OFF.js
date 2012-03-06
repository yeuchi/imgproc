(function() {
 //  http://www.holmes3d.net/graphics/offfiles/http://www.holmes3d.net/graphics/offfiles/
  var OFF;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  //var PI = 3.14159265;
	
	OFF = (function() {
		OFF.load = function(url, callback) {
			var xhr;
			xhr = new XMLHttpRequest;
			xhr.open("GET", url, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = __bind(function() {
				var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
				return callback(new OFF(data));
			}, this);
			return xhr.send(null);
		};
		
		function OFF(data) {		
			this.data = data;
			this.numVertex = 0;
			this.numFace = 0;
			this.numEdge = 0;
			
			this.listVertex = null;
			this.listFace = null;
			this.listEdge = null;
			
			this.VERTEX_COUNT_INDEX = 0;
			this.FACE_COUNT_INDEX = 1;
			this.EDGE_COUNT_INDEX = 2;
		}
		
		// return true/false for finding/loading vertex
		OFF.prototype.readVertex = function(index) {
			var sttPos = this.listVertex[index];
			var endPos = this.findEndPos(sttPos);		// return EOF pos if not found
			var vString = this.bin2String(sttPos, endPos);
			var list = vString.split(" ");
			
			if(list.length<3)
				return null;							// invalid vertex
				
			var vertex = new Array();
			for(var i=0; i<3; i++) 
				vertex.push(Number(list[i]));
				
			return vertex;
		};
		
		OFF.prototype.readFace = function(index) {
			var sttPos = this.listFace[index];
			var endPos = this.findEndPos(sttPos);
			var vString = this.bin2String(sttPos, endPos);
			var list = vString.split(" ");
			
			if(list.length<4)
				return null;							// numVertex, vertex1, vertex2, ...
				
			var face = new Array();
			for(var i=0; i<list.length; i++) {
				if(list[i])
					face.push(parseInt(list[i]));
			}
				
			return face;
		};

		OFF.prototype.bin2String = function(sttPos, endPos) {
			var buf="";
			for(var i=sttPos; i<endPos; i++) {
				var char = this.data[i].toString();
				buf += String.fromCharCode(char);
			}
			return buf.replace('\r', '');
		};
		
		// return upon first non number, non dot, not space
		OFF.prototype.findEndPos = function(stt) {
			var i = stt;
			while(i<(this.data.length-1)) {
				// seek linefeed
				if(this.data[i]==10)
					return i;
				i++;
			}			
			return this.data.length-1;
		};
		
		OFF.prototype.getLineType = function(sttPos, endPos) {
			var str = "";
			for(var i=sttPos; i<endPos; i++) {
				var char = String.fromCharCode(this.data[i]);	
				if(char==' '||char=='\r')
					return str;
				else
					str += char;
			}
			return str;
		};
		
		
		OFF.prototype.parseVerticesPos = function() {
			this.listVertex = new Array();
			for(var i=0; i<this.numVertex; i++) {
				var endPos = this.findEndPos(this.pos);
				this.listVertex.push(this.pos);
				this.pos = ++endPos;
			}
			return true;
		};
		
		OFF.prototype.parseFacesPos = function() {
			this.listFace = new Array();
			for(var i=0; i<this.numFace; i++) {
				var endPos = this.findEndPos(this.pos);
				this.listFace.push(this.pos);
				this.pos = ++endPos;
			}
			return true;
		};
		
		OFF.prototype.parseEdgePos = function() {
			this.listEdge = new Array();
			for(var i=0; i<this.numEdges; i++) {
				var endPos = this.findEndPos(this.pos);
				this.listEdge.push(this.pos);
				this.pos = ++endPos;
			}
			return true;
		};
		
		OFF.prototype.parseHeader = function() {
			var endPos = this.findEndPos(this.pos);
			var str = this.bin2String(0, endPos);
			this.pos = endPos+1;
			
			if (str.length()>=3&&str[0]=='O'&&str[1]=='F'&&str[2]=='F')
				return true;
				
			return false;				
		};
		
		OFF.prototype.skipComment = function(stt) {
			while (true) {
				var char = String.fromCharCode(this.data[stt]);
				if(char != '#')
					return stt;
				else
					stt = this.findEndPos(stt);
			}
			return -1;
		};
		
		OFF.prototype.parseCount = function() {
			var endPos = this.findEndPos(this.pos);
			var str = this.bin2String(this.pos, endPos);
			var list = str.split(" ");
			
			if(list.length() == 3) {
				this.numVertex = list[this.VERTEX_COUNT_INDEX];
				this.numFace = list[this.FACE_COUNT_INDEX];
				this.numEdge = list[this.EDGE_COUNT_INDEX];
			}
		};
		
		OFF.prototype.decode = function() {
	
			this.pos = this.skipComment(this.pos=0);
			if(this.parseHeader()) {
				this.pos = this.skipComment(this.pos);
				if(this.parseCount()) {
					if(this.parseVerticesPos()) {
						if(this.parseFacesPos()) {
							if(this.parseEdgePos()) {
								return this.listFace.length;
							}	
						}
					}
				}
				
			}
			return 0;
		};
		
		return OFF;
	})();
	
	window.OFF = OFF;
}).call(this);
// JavaScript Document