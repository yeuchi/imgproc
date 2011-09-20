package com.ctyeung.dither
{
	import flash.display.BitmapData;

	public class FloydSteinberg
	{
		protected var div:Number = 1/16.0;
		
		public function FloydSteinberg()
		{
		}
		
		//http://en.wikipedia.org/wiki/Error_diffusion
		public function apply(bmd:BitmapData):BitmapData {
			var isOdd:int=1;
			
			for(var y:int=0; y<bmd.height; y++) {
				for(var x:int=1; x<bmd.width-1; x++) {
					var X:int = (isOdd==1)?x:bmd.width-x;
					var p:int = bmd.getPixel(X,y)&0xFF;
					var remain:Number;
					
					if(p>128)
						remain = p - 255;
					else
						remain = p;
					
					remain/=16.0;
					
					var k2:Number = limit(Number(bmd.getPixel(X+isOdd, y)&0xFF)+Number(remain*7.0));
					var k3:Number = limit(Number(bmd.getPixel(X-isOdd, y+1)&0xFF)+Number(remain*3.0));
					var k4:Number = limit(Number(bmd.getPixel(X, y+1)&0xFF)+Number(remain*5.0));
					var k5:Number = limit(Number(bmd.getPixel(X+isOdd, y+1)&0xFF)+Number(remain));
					
					bmd.setPixel(X,y, (remain>=0)?0x0:0xFFFFFF);
					bmd.setPixel(X+isOdd, y, (k2<<16)+(k2<<8)+(k2));
					bmd.setPixel(X-isOdd, y+1, (k3<<16)+(k3<<8)+(k3));
					bmd.setPixel(X, y+1, (k4<<16)+(k4<<8)+(k4));
					bmd.setPixel(X+isOdd, y+1, (k5<<16)+(k5<<8)+(k5));
				}
				isOdd = (isOdd==1)?1:-1;
			}
			return bmd;
		}
		
		protected function limit(value:Number):Number {
			if(value<0) return 0;
			if(value>255) return 255;
			return value;
		}
	}
}