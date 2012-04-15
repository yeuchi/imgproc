package com.ctyeung.text
{
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;

	public class HistEqual
	{
		public var percentLimit:Number = 1;
		
		public function HistEqual() {
		}
		
		public function dispose():void {
			
		}
		
		public function apply(bmdSrc:BitmapData,		// [in]		source image
							  bmdDes:BitmapData,		// [out]	destination image
							  kernelWid:int=1)			// [in] 	value > 1 = adaptive histogram equalization
									:Boolean {			// [out] 	success or failure
			return (kernelWid>1)?
					adaptive(bmdSrc, bmdDes, kernelWid):
					global(bmdSrc, bmdDes);
		}
		
		protected function findHistogramMin(hist:Array,
											numPixels:int)
													:int {
			var min:Number = Number(numPixels)*(this.percentLimit/100.0);
			for(var k:int=0; k<hist.length; k++) {
				if(hist[k] > min)
					return k;
			}
			return -1;
		}
		
		protected function findHistogramMax(hist:Array,
											numPixels:int)
													:int {
			var min:Number = Number(numPixels)*(this.percentLimit/100.0);
			for(var k:int=hist.length-1; k>0; k--) {
				if(hist[k] > min)
					return k;
			}
			return -1;
		}
		
		protected function buildLUT(hist:Array,
									min:int,
									max:int)
										:Array {
			var lut:Array = new Array(255);	
			var range:Number = max - min;
			var ratio:Number = 255.0/range;
			
			for(var i:int=0; i<lut.length; i++) {
				if(i<=min)
					lut[i]=0;
				else if(i>=max)
					lut[i]=255;
				else
					lut[i]=int((i-min)*ratio);
			}
			return lut;
		}
		
		protected function equalize(bmdSrc:BitmapData, 
									bmdDes:BitmapData, 
									lut:Array,
									rect:Rectangle)
										:Boolean {
			var rlut:Array = new Array(255);
			var glut:Array = new Array(255);
			for(var i:int=0; i<255; i++) {
				rlut[i] = lut[i]<<16;
				glut[i] = lut[i]<<8;
			}
			bmdDes.paletteMap(bmdSrc, rect, new Point(rect.x, rect.y), rlut, glut, lut);
			return true;
		}
		
		protected function buildHistogram(bmdSrc:BitmapData):Array {
			var hist:Vector.<Vector.<Number>> = bmdSrc.histogram();
			var lut:Array = new Array(255);
			for(var i:int=0; i<255; i++) {
				lut[i] = (hist[0][i] + hist[1][i] + hist[2][i])/3;
			}
			return lut;
		}
		
		protected function global(bmdSrc:BitmapData,		// [in]		source image
								  bmdDes:BitmapData)		// [out]	destination image
										:Boolean {			// [out] 	success or failure

			var hist:Array = buildHistogram(bmdSrc);
			var min:int = findHistogramMin(hist, bmdSrc.width*bmdSrc.height);
			var max:int = findHistogramMax(hist, bmdSrc.width*bmdSrc.height);
			var lut:Array = buildLUT(hist, min, max);
			return equalize(bmdSrc, bmdDes, lut, bmdSrc.rect);
		}
		
		protected function createHistogram(bmdSrc:BitmapData,
										   rect:Rectangle)
											:Array {
			var byteArray:ByteArray = bmdSrc.getPixels(rect);	
			var size:int = rect.width*rect.height*4;
			var hist:Array = new Array(255);
			for(var j:int=0; j<hist.length; j++)
				hist[j] = 0;
			
			for(var i:int=0; i<size; i+=4) {

				/*var r:int = byteArray[i];
				var g:int = byteArray[i+1];
				var b:int = byteArray[i+2];
				var a:int = byteArray[i+3];*/
				var clr:int = (byteArray[i+1] + byteArray[i+2] + byteArray[i+3])/3;
				hist[clr]++;
			}
			return hist;
		}
		
		protected function adaptive(bmdSrc:BitmapData,		// [in]		source image
									bmdDes:BitmapData,		// [out]	destination image
									kernelWid:int=1)		// [in] 	value > 1 = adaptive histogram equalization
											:Boolean {		// [out] 	success or failure
			var radius:int = (kernelWid-1)/2;
			var length:int = bmdSrc.height-radius;
			var numPixels:int = kernelWid*kernelWid;
			var width:int = bmdSrc.width-radius;
			var rect:Rectangle = new Rectangle(0,0,kernelWid, kernelWid);
			for(var y:int=radius; y<length; y++) {
				for(var x:int=radius; x<width; x++) {
					rect.x = x-radius;
					rect.y = y-radius;
					var hist:Array = createHistogram(bmdSrc, rect);
					var min:int = findHistogramMin(hist, numPixels);
					var max:int = findHistogramMax(hist, numPixels);
					var lut:Array = buildLUT(hist, min, max);
					equalize(bmdSrc, bmdDes, lut, rect);
				}
			}
			return true;
		}
	}
}