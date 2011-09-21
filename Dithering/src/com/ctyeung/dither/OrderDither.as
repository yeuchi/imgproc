package com.ctyeung.dither
{
	import flash.display.BitmapData;
	import flash.display.Shader;
	import flash.display.ShaderJob;
	import flash.filters.ShaderFilter;
	import flash.utils.ByteArray;
	
	//http://en.wikipedia.org/wiki/Ordered_dithering
	public class OrderDither
	{
		[Embed(source="assets/OrderDither.pbj", mimeType="application/octet-stream")]
		static protected var pbFilter:Class;
		
		protected var screen:Array;
		protected static const SCALE:Number = 255.0/9.0;
		protected var cellWidth:int;
		public function OrderDither()
		{
			screen = [	[3,7,4],
						[6,1,9],
						[2,8,5]];
			cellWidth = 3;
		}
		
		
		public function apply(bmd:BitmapData):BitmapData {
			//return ASCMethod(bmd);
			return pbMethod(bmd);
		}
		
		static public function pbMethod(bmd:BitmapData):BitmapData{
			var bmdDes:BitmapData = new BitmapData(bmd.width, bmd.height);
			var shader:Shader = new Shader();
			shader.byteCode = new pbFilter() as ByteArray;
			shader.data.src.input = bmd;
			
			var job:ShaderJob = new ShaderJob(shader); 
			job.target = bmdDes; 
			job.start();
			
			return bmdDes;
		}
		
		static public function get bitmapFilter():ShaderFilter {
			var shader:Shader = new Shader();
			shader.byteCode = new pbFilter();
			var filter:ShaderFilter;
			filter = new ShaderFilter(shader);
			return filter;
		}
		
		protected function ASCMethod(bmd:BitmapData):BitmapData {
			for(var y:int=0; y<bmd.height; y+=cellWidth) {
				for(var x:int=0; x<bmd.width; x+=cellWidth) {
					
					for(var j:int=0; j<cellWidth; j++) {
						for(var i:int=0; i<cellWidth; i++) {
							var p:int = bmd.getPixel(x+i,y+j)&0xFF;
							var d:Number = Number(p)/SCALE;
							p = filter(d, i, j);
							bmd.setPixel(x+i, y+j, (p<<16)+(p<<8)+p);
						}
					}
				}
			}
			return bmd;
		}
		
		private function filter(d:Number, 	// [in] normalized value
								i:int, 		// [in] column
								j:int)		// [in] row
								:int {		// [out] threshold value
								
			return ((d-1)>=screen[j][i])?255:0;
		}
	}
}