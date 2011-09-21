package com.ctyeung.dither
{
	import flash.display.BitmapData;

	public class FloydSteinberg
	{
		protected var div:Number = 1/16.0;
		
		public function FloydSteinberg()
		{
		}
		
		public function apply(bmd:BitmapData):BitmapData {
			var bmdDes:BitmapData = bmd.clone();
			var isOdd:int=1;
			
			for(var y:int=0; y<bmdDes.height; y++) {
				for(var x:int=1; x<bmdDes.width-1; x++) {
					var X:int = (isOdd==1)?x:bmd.width-x;
					var p:int = bmdDes.getPixel(X,y)&0xFF;
					var remain:Number = (p>=128)?p-255:p;
					remain /= 16.0;
					
					var k2:int = limit(Number(bmdDes.getPixel(X+isOdd, y)&0xFF)+Number(remain*7.0));
					var k3:int = limit(Number(bmdDes.getPixel(X-isOdd, y+1)&0xFF)+Number(remain*3.0));
					var k4:int = limit(Number(bmdDes.getPixel(X, y+1)&0xFF)+Number(remain*5.0));
					var k5:int = limit(Number(bmdDes.getPixel(X+isOdd, y+1)&0xFF)+Number(remain));
					
					bmdDes.setPixel(X,y, (remain>=0)?0x0:0xFFFFFF);
					bmdDes.setPixel(X+isOdd, y, (k2<<16)+(k2<<8)+(k2));
					bmdDes.setPixel(X-isOdd, y+1, (k3<<16)+(k3<<8)+(k3));
					bmdDes.setPixel(X, y+1, (k4<<16)+(k4<<8)+(k4));
					bmdDes.setPixel(X+isOdd, y+1, (k5<<16)+(k5<<8)+(k5));
				}
				isOdd = (isOdd==1)?1:-1;
			}
			return bmdDes;
		}
		
		protected function limit(value:int):int {
			if(value<0) return 0; 
			if(value>255) return 255;
			return value;
		}
	}
}