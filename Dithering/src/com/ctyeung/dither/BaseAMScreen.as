// ==================================================================
// Module:		BaseAMScreen.as
//
// Description:	Base class for amplitude modulation dithering
//				demonstration between pixelbender from actionscript.
//
// Author:		C.T. Yeung	cty
// ==================================================================
package com.ctyeung.dither
{
	import flash.display.BitmapData;
	import flash.display.Shader;
	import flash.display.ShaderJob;
	import flash.filters.ShaderFilter;
	import flash.utils.ByteArray;
	
	public class BaseAMScreen
	{
		public static const METHOD_PIXELBENDER:String = "pixelbender";
		public static const METHOD_ACTIONSCRIPT:String = "actionscript";
		
		protected static const VERSION_PIXELBENDER1:Number = 1.0;
		protected static const VERSION_PIXELBENDER2:Number = 2.0;
		
		protected var screen:Array;
		protected var scale:Number;
		protected var cellWidth:int;
		
		public function BaseAMScreen()
		{
			
		}
		
		public function apply(bmd:BitmapData,
							  method:String=METHOD_PIXELBENDER)
							 :BitmapData {
			switch(method) {
				default:
				case METHOD_PIXELBENDER:
					return pbMethod(bmd);
					
				case METHOD_ACTIONSCRIPT:
					return ASCMethod(bmd);
			}
		}
		
		protected function ASCMethod(bmd:BitmapData):BitmapData {
			var bmdDes:BitmapData = new BitmapData(bmd.width, bmd.height);
			for (var y:int=0; y<bmd.height; y+=cellWidth) {
				for (var x:int=0; x<bmd.width; x+=cellWidth) {
					
					for(var j:int=0; j<cellWidth; j++) {
						for(var i:int=0; i<cellWidth; i++) {
							var p:int = bmd.getPixel(x+i,y+j)&0xFF;
							var d:Number = Number(p)/scale;
							p = filter(d, i, j);
							bmdDes.setPixel(x+i, y+j, (p<<16)+(p<<8)+p);
						}
					}
				}
			}
			return bmdDes;
		}
		
		private function filter(d:Number,	// [in] normalized value
								i:int,		// [in] col
								j:int)		// [in] row
								:int {		// [out] threshold value
			if(screen)
				return ((d-1)>=screen[j][i])?255:0;
			return -1;
		}
		
		public function pbMethod(bmd:BitmapData):BitmapData{
			var bmdDes:BitmapData = new BitmapData(bmd.width, bmd.height);
			var shader:Shader = new Shader();
			shader.byteCode = pixelBenderFilter;
			shader.data.src.input = bmd;
			shader.data.version = VERSION_PIXELBENDER2;
			
			var job:ShaderJob = new ShaderJob(shader); 
			job.target = bmdDes; 
			job.start();
			
			return bmdDes;
		}
		
		public function get pixelBenderFilter():ByteArray {
			return null;
		}
	}
}