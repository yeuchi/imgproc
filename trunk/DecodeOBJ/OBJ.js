(function() {
  /*
  #	Module:			OBJ.js
  #	
  #	Description:	decode OBJ 3D file
  #					modified Devon Govett's bmp.js
  #
  #	Reference:
  # 	BMP.js		http://devongovett.github.com/bmp.js/
  #		OBJ specs	http://www.martinreddy.net/gfx/3d/OBJ.spec
  #      
  # Author(s):		Devon Govett provide a bmp decoding example.
  # 				C.T. Yeung modify to decode OBJ.
  #  
  # History:		
  # 21Jan12			able to decode vertices and face data... but not rendering correctly... buggy
  #					
  #
  # MIT LICENSE
  # Copyright (c) 2012 CT Yeung
  # Copyright (c) 2011 Devon Govett
  # 
  # Permission is hereby granted, free of charge, to any person obtaining a copy of this 
  # software and associated documentation files (the "Software"), to deal in the Software 
  # without restriction, including without limitation the rights to use, copy, modify, merge, 
  # publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
  # to whom the Software is furnished to do so, subject to the following conditions:
  # 
  # The above copyright notice and this permission notice shall be included in all copies or 
  # substantial portions of the Software.
  # 
  # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
  # BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
  # NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
  # DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
  # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */  
  
  var OBJ;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  var PI = 3.14159265;
	
	OBJ = (function() {
		OBJ.load = function(url, callback) {
			var xhr;
			xhr = new XMLHttpRequest;
			xhr.open("GET", url, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = __bind(function() {
				var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
				return callback(new OBJ(data));
			}, this);
			return xhr.send(null);
		};
		
		function OBJ(data) {
			this.NUM_VERTEX = 118;
			this.NUM_FACE = 102;
		
			this.data = data;
			this.vertices = new Array();
		}
		
		OBJ.prototype.readVertex = function() {
		};
		
		// return true/false for finding/loading vertex
		OBJ.prototype.readVertex = function() {
			if(this.data.length<=this.pos)			// over run !!! error condition
				return false;

			// read a line
			var endPos = this.findEndPos(this.pos);	
			if(-1==sttPos)
				return -false;
			
			// convert 2 a string
			var vString = this.bin2String(this.pos, endPos);
			var sttPos = vString.indexOf("v ");
			
			if(-1==sttPos)
				return false;
				
			// parse 3 number string	
			vString = vString.substr(sttPos+2, vString.length);
			var list = vString.split(" ");
			this.pos = endPos+2;
			
			if(3!=list.length)
				return false;
			
			// do converstion of data to vertex (x,y,z)
			var vertex = [0,0,0];
			vertex[0] = Number(list[0]);
			vertex[1] = Number(list[1]);
			vertex[2] = Number(list[2]);
			this.vertices.push(vertex);
			return true;
		};
		
		OBJ.prototype.readFace = function() {
			if(this.data.length<=this.pos)			// over run !!! error condition
				return null;

			// read a line
			var endPos = this.findEndPos(this.pos);	
			if(-1==sttPos)
				return null;
			
			// convert 2 a string
			var vString = this.bin2String(this.pos, endPos);
			var sttPos = vString.indexOf("f ");
			
			if(-1==sttPos)
				return null;
				
			// parse 3 face items	
			vString = vString.substr(sttPos+2, vString.length);
			var face = vString.split(" ");
			this.pos = endPos+2;
			
			if(3!=face.length)
				return null;
			
			return face;
		};
		
		OBJ.prototype.bin2String = function(sttPos, endPos) {
			var buf="";
			for(var i=sttPos; i<endPos; i++) {
				var char = this.data[i].toString();
				buf += String.fromCharCode(char);
			}
			return buf;
		};
		
		// return upon first non number, non dot, not space
		OBJ.prototype.findEndPos = function(stt) {
			var i = stt;
			while(i<this.data.length) {
				// seek linefeed
				if(this.data[i]==10)
					return i-1;
				i++;
			}			
			return -1;
		};
		
		OBJ.prototype.find1stInstance = function(charNum) {
			var i = 0;
			while(i<this.data.length) {
				if(10==this.data[i++])		// linefeed
					if(charNum==this.data[i++])
						if(32==this.data[i++])
							return i-2;
			}
			return -1;
		};
		
		// return number of faces found
		OBJ.prototype.decode = function() {
			this.vertices = new Array();
			// read all vertices
			this.pos = this.find1stInstance(this.NUM_VERTEX);
			if(-1==this.pos)
				return -1;
			
			var vertexFound = true;
			while(vertexFound) 
				vertexFound = this.readVertex();
			
			if(!this.vertices.length)
				return 0;
			return this.vertices.length;
		};
											   
		
		OBJ.prototype.drawWireFrame = function(context,		// [in] canvas context 
											   w, 			// [in] canvas width
											   h, 			// [in] canvas height
											   mag,			// [in] magnification
											   rX,
											   rY,
											   rZ) {
			// read all faces
			this.pos = this.find1stInstance(this.NUM_FACE);
			if(-1==this.pos)
				return -1;
			
			// draw triangles
			var numTriangles = 0;
			while (this.pos<this.data.length) {	  
				if(false==this.drawTriangles(context, w, h, mag, rX, rY, rZ))
					return numTriangles;
				numTriangles ++;
			}
			return numTriangles;
		};
		
		OBJ.prototype.getVertexIndex = function(str) {
			var pos = str.indexOf("/");
			if(-1==pos)
				return -1;
				
			var numStr = str.substr(0, pos);
			var num = Number(numStr);
			return num;
		}
		
		OBJ.prototype.drawTriangles = function(context,		// [in] canvas context 
											   w, 			// [in] canvas width
											   h, 			// [in] canvas height
											   mag,			// [in] magnification
											   rX,			// [in] amount of rotation X
											   rY,			// [in] amount of rotation Y
											   rZ){			// [in] amount of rotation Z
			var offX = w/2;
			var offY = h/2
			context.beginPath();
			
			// convert rotation from degrees to radian
			var radX = PI / 180.0 * rX;
			var radY = PI / 180.0 * rY;
			var radZ = PI / 180.0 * rZ;	
			
			
			var face = this.readFace();
			while(null!=face) {
				var vtx0 = [0,0,0];
				var vtx1;
				for(j=0; j<3; j++) {  
					// retrieve vertices
					var vIndex = this.getVertexIndex(face[j]);
					if(vIndex>this.vertices.length)
						return false;
					
					var vtx1 = this.vertices[vIndex];
				
					this.rotate(vtx1, mag, radX, radY, radZ);
							  
					// draw 2 lengths of a triangle
					if(j==0) {
						context.moveTo(vtx1[0]+ offX, 
									   vtx1[1]+ offY);				// move to 1st triangle corner
						vtx0[0] = vtx1[0];
						vtx0[1] = vtx1[1];
						vtx0[2] = vtx1[2];
					}
					else 
						context.lineTo(vtx1[0]+ offX, 
									   vtx1[1]+ offY);				// render only (x,y)
				} 
				// complete triangle
				context.lineTo(vtx0[0]+ offX, 
							   vtx0[1]+ offY);						// complete triangle
				
				// render on canvase
				context.stroke();
				context.closePath();
				
				// read next face
				face = this.readFace();
			}
			return true;
		};
		
		OBJ.prototype.rotate = function (vtx,		// [in] vertexies (x,y,z)
										 mag,		// [in] magnification
										 radX, 		// [in] rotation amount in radian
										 radY, 
										 radZ){
			var x = vtx[0];
			var y = vtx[1];
			var z = vtx[2];
			
			var dx, dy, dz;
			
			// rotate X
			dy = Math.cos(radX)*y-Math.sin(radX)*z;
			dz = Math.sin(radX)*y+Math.cos(radX)*z;
			
			// rotate Y
			z = dz;
			dx = Math.cos(radY)*x+Math.sin(radY)*z;
			dz = -Math.sin(radY)*x+Math.cos(radY)*z;
			
			// rotate Z
			y = dy;
			dx = Math.cos(radZ)*x-Math.sin(radZ)*y;
			dy = Math.sin(radZ)*x+Math.cos(radZ)*y;
				
			// assign values
			vtx[0] = dx * mag;
			vtx[1] = dy * mag;
			vtx[2] = dz * mag;
		};
		
		return OBJ;
	})();
	
	window.OBJ = OBJ;
}).call(this);
// JavaScript Document