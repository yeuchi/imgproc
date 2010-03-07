package com.ctyeung.view
{
	import flash.display.Shader;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import mx.core.UIComponent;
	import mx.events.FlexEvent;
	
	import spark.filters.ShaderFilter;
	
	public class DrawableUIC extends UIComponent
	{
		[Embed(source="assets/Dashline.pbj", mimeType="application/octet-stream")]
		static protected var pbFilter:Class;
		public static const WIDTH:int = 500;
		public static const HEIGHT:int = 500;
		
		protected var shader:Shader;
		protected var filter:ShaderFilter;
		
		protected var pLast:Point;
		protected var bMouseDown:Boolean
		public function DrawableUIC()
		{
			super();
			this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreationComplete, false, 0, true);
		}
		
		protected function onCreationComplete(e:Event):void {
			this.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
			this.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove, false, 0, true);
			this.addEventListener(MouseEvent.MOUSE_UP, onMouseUp, false, 0, true);
			bMouseDown = false;
			shader = new Shader(new pbFilter());
			filter = new ShaderFilter(shader);
			drawBound();
			this.filters = [filter];
		}
		
		public function drawBound():void {
			graphics.beginFill(0xFFFFFF, .1);
			graphics.drawRect(0,0, WIDTH, HEIGHT);
			graphics.endFill();
		}
		
		protected function onMouseDown(e:MouseEvent):void {
			bMouseDown = true;
			pLast = new Point(mouseX, mouseY);
		}
		
		protected function onMouseMove(e:MouseEvent):void {
			if(!bMouseDown)	return;
			if(!pLast) {
				pLast = new Point(mouseX, mouseY);
				return;
			}
			graphics.lineStyle(1, 0);
			graphics.moveTo(pLast.x, pLast.y);
			graphics.lineTo(mouseX, mouseY);
			pLast.x = mouseX;
			pLast.y = mouseY;
		}
		
		protected function onMouseUp(e:MouseEvent):void {
			bMouseDown = false;
			pLast = null;
			graphics.clear();
			drawBound();
		}
	}
}