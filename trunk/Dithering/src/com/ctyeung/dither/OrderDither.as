// ==================================================================
// Module:		OrderDither.as
//
// Description:	Order dither of gray scale to binary.
//				demonstration between pixelbender from actionscript.
// 
// Reference:	http://en.wikipedia.org/wiki/Ordered_dithering
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
	
	public class OrderDither extends BaseAMScreen
	{
		[Embed(source="assets/OrderDither.pbj", mimeType="application/octet-stream")]
		protected var orderDitherClass:Class;
				
		public function OrderDither() {
			screen = [	[3,7,4],
						[6,1,9],
						[2,8,5]];
			cellWidth = 3;
			scale = 255.0/10.0; 
		}
		
		override public function apply(	bmd:BitmapData,
										method:String=METHOD_PIXELBENDER)
										:BitmapData {
			return super.apply(bmd, method);
		}
		
		override public function get pixelBenderFilter():ByteArray {
			return new orderDitherClass() as ByteArray;
		}
	}
}