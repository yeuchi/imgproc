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
package com.ctyeung.transform
{
	import flash.display.BitmapData;
	
	public class HoughLine
	{
		protected static var rhoCount:Array;
		
/////////////////////////////////////////////////////////////////////
// properties
		
		protected static function initRhoList(bmd:BitmapData):void {
			var len:int = diagDis(bmd);
			for(var i:int=0; i<len; i++) {
				rhoCount.push(0);
			}
		}
		
		protected static function diagDis(bmd:BitmapData):int {
			return Math.sqrt(Math.pow(bmd.width,2)+Math.pow(bmd.height,2));
		}
		
		public static function apply(bmd:BitmapData,
							   angle:Number,
							   threshold:uint)
							   :void {
			
			if(!bmd) return;
			rhoCount = new Array();
			initRhoList(bmd);
			var radian:Number = degree2Radian(angle);
			
			var y:int;
			var x:int;
			var clr:uint;
			var rho:uint;
			
			// build Rho & Theta plot
			for(y=0; y<bmd.height; y++){
				for(x=0; x<bmd.width; x++) {
					clr = bmd.getPixel(x,y);
					if((clr&0xFF)>threshold) {
						rho = Number(x) * Math.cos(radian) + Number(y) * Math.sin(radian);
						rhoCount[rho] ++;
					}
				}
			}
			
			// filter pixels on line
			for(y=0; y<bmd.height; y++){
				for(x=0; x<bmd.width; x++) {
					clr = bmd.getPixel(x,y);
					if((clr&0xFF)>threshold) {
						rho = Number(x) * Math.cos(radian) + Number(y) * Math.sin(radian);
						if(rhoCount[rho]>threshold)
							bmd.setPixel32(x,y, 0x00FFFFFF);
						else
							bmd.setPixel32(x,y, 0xFF000000);
					}
				}
			}			
		}
		
		public static function degree2Radian(angle:Number):Number {
			return Math.PI / 180.0 * angle;
		}
	}
}