// ==================================================================
// Module:		FocusStack.as
//
// Description:	Combine N multiple image with various focal planes.
//				Common technique for photo mac/mic (macrography, micrography).
//
// Author:		C.T. Yeung	(cty)
//
// Reference: 	http://www.republicofcode.com/tutorials/photoshop/video/gradient_mask_blur.php
//
// History:
// 23Oct11		1st implementation								cty
// ==================================================================
package com.ctyeung.focusStacking
{
	import flash.display.BitmapData;

	public class FocusStack
	{
		protected var width:int;
		protected var height:int;			
		protected var bmdDes:BitmapData;		// output destination image
		protected var listImages:Array;			// input images
		protected var radius:int = 7;			// derivative radius
		
		public function FocusStack() {
		}
		
		public function apply(listImages:Array,	// [in] array of images
							 radius:int)
							 :BitmapData {		// [out] focused image
			
			if(!validate(listImages)) 
				return null;
			
			this.radius = radius;
			this.listImages = listImages;
			bmdDes = (listImages[0] as BitmapData).clone();
			
			for(var y:int=radius; y<height-radius; y++) {
				for(var x:int=radius; x<width-radius; x++) {
					var listDelta:Array = [];
					for(var i:int=0; i<listImages.length; i++) {
						var delta:Number = derivative(listImages[i], x, y);
						listDelta.push(delta);
					}
					select(listDelta, x, y);
				}
			}	
			return bmdDes;
		}
		
		protected function validate(listImages:Array):Boolean {
			if(!listImages.length)
				return false;
			
			if(listImages.length==1)
				return true;
			
			width = (listImages[0] as BitmapData).width;
			height = (listImages[0] as BitmapData).height;
			
			for(var i:int=1; i<listImages.length; i++) {
				var bmd:BitmapData = listImages[i] as BitmapData;
				if(bmd.width!=width||bmd.height!=height)
					return false;
			}
			return true;
		}
		
		protected function magnitude(value:Number):Number {
			return(value<0)?value*-1:value;
		}
		
		protected function derivative(bmd:BitmapData, 		// [in] input image
									  x:int, 				// [in] current position
									  y:int)
									  :Number {				// [out] derivative 3x3 magnitude
			var delta:Number=0;
			var clr:Number = Number(bmd.getPixel(x,y));
			for(var j:int=y-radius; j<y+radius; j++) {
				for(var i:int=x-radius; i<x+radius; i++) {
					if(i!=x&&j!=y)
						delta += magnitude(Number(bmd.getPixel(i,j))*-1+clr);
				}
			}
			return delta;
		}
		
		protected function initHistogram(length:int)		// [in] number of images input
										:Array {			// [out] array for histogram
			var list:Array = [];
			for(var i:int=0; i<length; i++)
				list.push(0);
			return list;
		}
		
		protected function histogramMode(list:Array)
										 :int {
			var index:int=0;
			var max:int=0;
			
			for (var k:int=0; k<list.length; k++) {
				if(list[k]>max) {
					index = k;
					max = list[k];
				}
			}
			return index;
		}
		
		protected function histogram(listDelta:Array)
									:int {
									
			var histogram:Array = initHistogram(listDelta.length);
			
			for(var i:int=0; i<listDelta.length; i++) {
				var current:Number = listDelta[i];
				for(var j:int=0; j<listDelta.length; j++) {
					if(i!=j) {
						if(current>listDelta[j])
							histogram[i]++;
					}
				}
			}
			return histogramMode(histogram);
		}
		
		protected function select(listDelta:Array, 
								  x:int, 
								  y:int)
								  :void {
			
			var index:int = histogram(listDelta);
			var bmd:BitmapData = listImages[index];
			bmdDes.setPixel(x,y,bmd.getPixel(x,y));
		}
	}
}