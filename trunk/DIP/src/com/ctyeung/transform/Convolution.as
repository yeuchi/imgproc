// ==================================================================
// Module:		Convolution
//
// Description:	Quick common convolution filters
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
	import flash.filters.BitmapFilter;
	import flash.filters.ConvolutionFilter;
	import flash.geom.Point;
	
	public class Convolution
	{
		// isotropic 1st derivative
		public static function firstDerivative(bmd:BitmapData,
											   threshold:uint=0)
											   :void{
			var matrix:Array = [-1, -1, -1,
								-1,  8, -1,
								-1, -1, -1];
								
			var filter:BitmapFilter = new ConvolutionFilter(3, 3, matrix, 1);
			bmd.applyFilter(bmd, bmd.rect, new Point(), filter);
			bmd.threshold(bmd, bmd.rect, new Point(), "<=", threshold, 0, 0xFFFFFFFF);		
		}
		
	}
}