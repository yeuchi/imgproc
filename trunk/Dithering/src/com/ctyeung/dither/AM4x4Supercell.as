package com.ctyeung.dither
{
	import flash.display.BitmapData;

	//http://www.hpl.hp.com/personal/Robert_Ulichney/papers/2000-halftoning-review.pdf
	public class AM4x4Supercell
	{
		protected var screen:Array;
		protected static const SCALE:Number = 255.0/32.0;
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
		}
		
		public function apply(bmd:BitmapData):BitmapData {
			for (var y:int=0; y<bmd.height; y+=8) {
				for (var x:int=0; x<bmd.width; x+=8) {
					
					for(var j:int=0; j<8; j++) {
						for(var i:int=0; i<8; i++) {
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
		
		private function filter(d:Number,	// [in] normalized value
								i:int,		// [in] col
								j:int)		// [in] row
								:int {		// [out] threshold value
			return ((d-1)>=screen[j][i])?255:0;
		}
	}
}