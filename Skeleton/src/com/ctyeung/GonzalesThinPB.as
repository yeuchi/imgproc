// ==================================================================
// Module:		GonzalesThinPB.as
//
// Description:	Thinning algorithm as defined in the text,
//				Digital Image processing by Gonzales & Woods, 1993.
//				Pages (492-493), 8.1.5 Skeleton of a Region.
//
//				Same as GonzalesThinning except using pixelbender.
//				Strange, but it is slower.
//
// Input:		Image with bounding pixels of a closed shape over
//				white backgroun.
//
// Output:		skeletonized line
//
// Author(s):	Chi T. Yeung	(cty)
//
// History:
// ==================================================================
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
		
		[Embed(source="assets/DeleteOp.pbj", mimeType="application/octet-stream")]
		protected var deleteOpClass:Class;
		
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
		protected var thinShader:Shader;
		protected var count:int=0;
		protected function thinning():void {
			if(!thinShader) {
				thinShader = new Shader();
				thinShader.byteCode = borderDeleteFilter;
				thinShader.data.src.input = bmd;
			}
			var value:int = (stepType==STEP1)?1:2;
			thinShader.data.stepOp.value = [value];
			
			var job:ShaderJob = new ShaderJob(thinShader); 
			job.target = bmdDelete; 
			job.start();
			job.addEventListener(ShaderEvent.COMPLETE, onCompleteThinning, false, 0, true);
		}
		
		protected function onCompleteThinning(e:Event):void {
			if(isValidRect()) 
				deleteBorder();
			else
				dispatchEvent(new Event(Event.COMPLETE));
		}
		
		private function isValidRect():Boolean {
			count++;
			if(count%5==1) {
				var mask:uint = 0xFFFFFFFF;
				var color:uint = 0xFF00FFFF;
				var r:Rectangle = bmdDelete.getColorBoundsRect(mask, color, true);
	
				if(r) 
					return(r.width&&r.height)?true:false;
				return false;
			}
			return true;
		}
		
		private function get borderDeleteFilter():ByteArray {
			return new borderDeleteClass() as ByteArray;
		}
		
		private function get deleteOpFilter():ByteArray {
			return new deleteOpClass() as ByteArray;
		}
		
		protected var deleteShader:Shader;
		protected function deleteBorder():void {
			if(!deleteShader) {
				deleteShader = new Shader();
				deleteShader.byteCode = deleteOpFilter;
				deleteShader.data.src.input = bmd;
				deleteShader.data.mask.input = bmdDelete;
			}
			var job:ShaderJob = new ShaderJob(deleteShader); 
			job.target = bmd; 
			job.start();
			job.addEventListener(ShaderEvent.COMPLETE, onCompleteDelete, false, 0, true);
		}
		
		protected function onCompleteDelete(e:Event):void {
			bmdDelete.fillRect(bmdDelete.rect, 0x0);
			stepType=(stepType==STEP1)?STEP2:STEP1;
			thinning();
		}
	}
}