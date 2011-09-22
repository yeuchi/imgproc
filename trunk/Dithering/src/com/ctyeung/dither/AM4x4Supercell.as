// ==================================================================
// Module:		AM4x4SuperCell.as
//
// Description:	halftone 4x4 supercell screening commonly found
//				in desktop printers.
//				demonstration between pixelbender from actionscript.
// 
// Reference:	http://www.hpl.hp.com/personal/Robert_Ulichney/papers/2000-halftoning-review.pdf
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
	
	public class AM4x4Supercell extends BaseAMScreen
	{
		[Embed(source="assets/AMSuperCell.pbj", mimeType="application/octet-stream")]
		protected var superCellClass:Class;
		
		public function AM4x4Supercell()
		{
			screen = [	[13, 11, 12, 15, 18, 20, 19, 16],
						[4, 3, 2, 9, 27, 28, 29, 22],
						[5, 0, 1, 10, 26, 31, 30, 21],
						[8, 6, 7, 14, 23, 25, 24, 17],
						[18, 20, 19, 16, 13, 11, 12, 15],
						[27, 28, 29, 22, 4, 3, 2, 9],
						[26, 31, 30, 21, 5, 0, 1, 10],
						[23, 25, 24, 17, 8, 6, 7, 14]];
			cellWidth = 8;
			scale = 255.0/32.0; 
		}
		
		override public function apply(	bmd:BitmapData,
							  			method:String=METHOD_ACTIONSCRIPT)
							  			:BitmapData {
			return super.apply(bmd, method);
		}
		
		override public function get pixelBenderFilter():ByteArray {
			return new superCellClass() as ByteArray;
		}
	}
}