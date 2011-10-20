package com.ctyeung
{
	import flash.display.BitmapData;
	import flash.display.Shader;
	import flash.display.ShaderJob;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.ShaderEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;
	
	import mx.core.UIComponent;
	[Event(name="complete", type="flash.events.Event")]
	
	public class GonzalesThinPB extends EventDispatcher
	{
		public static const DEFAULT_COLOR:uint = 0xFFFFFF;
		public static const OUTER_BOUND_COLOR:uint = 0xFF00FF00;
		
		[Embed(source="assets/BorderDelete.pbj", mimeType="application/octet-stream")]
		protected var borderDeleteClass:Class;
		
		protected static const STEP1:String = "step1";
		protected static const STEP2:String = "step2";
		
		protected var bmdDelete:BitmapData;
		public var bmd:BitmapData;
		
		public function GonzalesThinPB(wid:int,
									   len:int) {
			bmd = new BitmapData(wid, len, true, 0xFFFFFFFF);
			bmdDelete = new BitmapData(wid, len, true, 0);
		}
		
		public function clear():void {
			bmd.fillRect(bmd.rect, 0x0);
			bmdDelete.fillRect(bmd.rect, 0x0);
		}
		
		public function apply(uic:UIComponent):void {		// [in] input graphics object
			clear();
			bmd.draw(uic);
			bmd.floodFill(0,0, OUTER_BOUND_COLOR);
			thinning();
		}
		
		protected var stepType:String = STEP1;
		
		protected function thinning():void {
			var shader:Shader = new Shader();
			shader.byteCode = pixelBenderFilter;
			shader.data.src.input = bmd;
			var value:int = (stepType==STEP1)?1:2;
			shader.data.stepOp.value = [value];
			
			var job:ShaderJob = new ShaderJob(shader); 
			job.target = bmdDelete; 
			job.start();
			job.addEventListener(ShaderEvent.COMPLETE, onComplete, false, 0, true);
		}
		
		protected var count:int = 0;
		protected function onComplete(e:Event):void {
			var mask:uint = 0xFFFFFFFF;
			var color:uint = 0xFFFFFFFF;
			var r:Rectangle = bmdDelete.getColorBoundsRect(mask, color, true);
			if(r&&count<90) {
				count++;
				deleteBorder();
				stepType=(stepType==STEP1)?STEP2:STEP1;
				thinning();
			}
			else{
				bmd = bmdDelete;
				dispatchEvent(new Event(Event.COMPLETE));
			}
		}
		
		private function get pixelBenderFilter():ByteArray {
			return new borderDeleteClass() as ByteArray;
		}
		
		protected function deleteBorder():void {
			for (var y:int=1; y<bmd.height; y++) {
				for(var x:int=1; x<bmd.width; x++) {
					var clr:uint = bmdDelete.getPixel32(x,y);
					if(clr!=0)
						bmd.setPixel(x,y, 0xFF000000);
				}
			}
			bmdDelete.fillRect(bmdDelete.rect, 0x0);
		}
	}
}