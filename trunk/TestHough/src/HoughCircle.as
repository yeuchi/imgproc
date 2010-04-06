package 
{
	import flash.display.*;
	
	public class HoughCircle extends HoughLine
	{
		public static const NAME:String = "CIRCLE";
		protected var bmdHist:BitmapData;
		protected var radius:Number;
		
		public function HoughCircle() {}
		
		protected function init():void {
			if(bmdHist) 
				bmdHist.fillRect(bmdHist.rect, 0x0);
			else
				bmdHist = new BitmapData(bmd.width, bmd.height, false, 0);
		}
		
		override public function apply (param:Number,
										threshold:uint)
										:Boolean {
			if(!bmd) return false;
			init();
			radius = param;
			var x:uint;
			var y:uint;
			for (y=0; y<bmd.height; y++) {
				for (x=0; x<bmd.width; x++) {
					var clr:uint=bmd.getPixel(x,y);
					if((clr&0xFF)>threshold) {
						for(var angle:int=0; angle<360; angle++) {
							var theta:Number = degree2Radian(angle);
							var a:Number = Number(x) - radius*Math.cos(theta);
							var b:Number = Number(y) - radius*Math.sin(theta);
							if((a<bmd.width&&a>=0)&&(b<bmd.height&&b>=0)) {
								var cnt:uint = bmdHist.getPixel(a,b);
								cnt ++;
								bmdHist.setPixel(a,b,cnt);
							}
						}
					}
				}
			}	
			return true;
		}
		
		override public function threshold(value:uint):void {
			if(!bmd)  return;
			
			this.graphics.clear();
			this.graphics.lineStyle(1, 0xFFFFFF);
			for(var y:int=0; y<bmd.height; y++){
				for(var x:int=0; x<bmd.width; x++) {
					var cnt:uint = bmdHist.getPixel(x,y);
					if(cnt>value) 
						this.graphics.drawCircle(x,y, radius);
				}	
			}
			this.graphics.endFill();
		}
	}
}