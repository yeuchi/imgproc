// ==================================================================
// Module:		Hough Transform
//
// Description:	Famous Hough Transform to identify line.
//
// Reference:	Digital Image Processing by Gonzales & Woods
//
// Author(s):	C.T. Yeung									cty
//
// History:
// 20Sep09		start											cty
// ==================================================================
package 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Point;
	
	import mx.core.UIComponent;
	
	public class HoughLine extends UIComponent
	{
		public static const NAME:String = "LINE";
		public var bmd:BitmapData;
		protected var hist:Array;
		protected var radian:Number;
		
		public function HoughLine() {}
		
/////////////////////////////////////////////////////////////////////
// properties
		
		protected function initRhoList(bmd:BitmapData):void {
			hist = new Array();
			var len:int = diagDis(bmd);
			for(var i:int=0; i<len; i++) {
				hist.push(0);
			}
		}
		
		protected function diagDis(bmd:BitmapData):int {
			return Point.distance(new Point(bmd.width, bmd.height),
								  new Point());
		}
		
		public function apply(param:Number,
							  threshold:uint)
							  :Boolean {
			
			if(!bmd) return false;
			
			initRhoList(bmd);
			radian = degree2Radian(param);
			
			// build Rho & Theta plot
			for(var y:int=0; y<bmd.height; y++){
				for(var x:int=0; x<bmd.width; x++) {
					var clr:uint = bmd.getPixel(x,y);
					if((clr&0xFF)>Number(threshold)/5.0) {
						var rho:uint = Number(x) * Math.cos(radian) + Number(y) * Math.sin(radian);
						hist[rho] ++;
					}
				}
			}
			return true;
		}
		
		public function threshold(value:uint):void {
			if(!bmd) return;
			if(!hist) return;
			
			this.graphics.clear();
			this.graphics.lineStyle(1, 0xFFFFFF);
			for(var y:int=0; y<bmd.height; y++){
				for(var x:int=0; x<bmd.width; x++) {
					var clr:uint = bmd.getPixel(x,y);
					if((clr&0xFF)>value) {
						var rho:uint = Number(x) * Math.cos(radian) + Number(y) * Math.sin(radian);
						if(hist[rho]>Number(value)/5.0) {
							this.graphics.drawRect(x,y,1,1);
						}
					}
				}
			}	
			this.graphics.endFill();
		}
		
		public function degree2Radian(angle:Number):Number {
			return Math.PI / 180.0 * angle;
		}
	}
}