// ==================================================================
// Module:		Channel Selector
//
// Description:	filter out just the channel selected for processing
//
// Author(s):	C.T. Yeung									cty
//
// History:
// 20Sep09		start											cty
// ==================================================================
package com.ctyeung.transform
{
	import flash.display.BitmapData;
	import flash.display.BitmapDataChannel;
	import flash.geom.Point;
	
	public class ChannelSelector
	{
		public static const SELECT_GRAY:String 	 = "luminosity";
		public static const SELECT_RED:String	 = "red";
		public static const SELECT_GREEN:String  = "green";
		public static const SELECT_BLUE:String	 = "blue";

		public static function apply(bmd:BitmapData,
							  		 channel:String=SELECT_GRAY)
									 :void {
			// will be processing from blue channel
			switch(channel) {
				case SELECT_GRAY:
				for(var y:int=0; y<bmd.height; y++) {
					for(var x:int=0; x<bmd.width; x++) {
						var clr:uint = bmd.getPixel(x,y);
						var clrDes:uint = uint(	Number(clr&0xFF0000>>16)*.299 +
										  		Number(clr&0xFF00>>8) * .587 +
										  		Number(clr&0xFF) * .114);
						bmd.setPixel(x,y,clrDes);
					}
				}
				break;
				
				case SELECT_RED:
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.RED, BitmapDataChannel.BLUE);
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.RED, BitmapDataChannel.GREEN);
				break;
				
				case SELECT_GREEN:
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.GREEN, BitmapDataChannel.BLUE);
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.GREEN, BitmapDataChannel.RED);
				break;
				
				case SELECT_BLUE:
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.BLUE, BitmapDataChannel.RED);
				bmd.copyChannel(bmd, bmd.rect, new Point(), BitmapDataChannel.BLUE, BitmapDataChannel.GREEN);
				break;
			}							 	
		}

	}
}