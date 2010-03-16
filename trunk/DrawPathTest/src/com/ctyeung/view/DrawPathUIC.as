// ==================================================================
// Module: 		Test drawPath with vectors
// 
// Description:	http://www.senocular.com/flash/tutorials/flash10drawingapi/
//				testing out code from this great article above.
//
// Author:		Trevor McCauley wrote the key algorithms
//				C.T.Yeung, I just implemented them here for test
//
// History:
// 08Mar10		implemented										cty
package com.ctyeung.view
{
	import flash.display.GraphicsPathCommand;
	import flash.display.GraphicsPathWinding;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import mx.core.UIComponent;
	import mx.events.FlexEvent;
	
	public class DrawPathUIC extends UIComponent
	{
		public static const TEST_EVENODD:String 	= "EVENODD";
		public static const TEST_NONZERO:String 	= "NONZERO";
		public static const WIDTH:int 				= 600;
		public static const HEIGHT:int 				= 600;
		protected var bMouseDown:Boolean;
		protected var pLast:Point;
		protected var cmds:Vector.<int>;
		protected var data:Vector.<Number>;
		protected var testOption:String;
		
		public function DrawPathUIC()
		{
			super();
			this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreationComplete, false, 0, true);
			drawBound();
		}
		
		public function set option(method:String):void {
			testOption = method;
		}
		
		protected function onCreationComplete(e:Event):void {
			addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
			addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove, false, 0, true);
			addEventListener(MouseEvent.MOUSE_UP, onMouseUp, false, 0, true);
		}
		
		protected function onMouseDown(e:MouseEvent):void {
			drawBound();
			bMouseDown = true;
			pLast = new Point(mouseX, mouseY);
			cmds = new Vector.<int>();
			data = new Vector.<Number>();
			cmds.push(GraphicsPathCommand.MOVE_TO);
			data.push(mouseX);
			data.push(mouseY);
		}
		
		protected function onMouseMove(e:MouseEvent):void {
			if(!bMouseDown) return;
			
			graphics.lineStyle(1, 0);
			graphics.moveTo(pLast.x, pLast.y);
			graphics.lineTo(mouseX, mouseY);
			pLast.x = mouseX;
			pLast.y = mouseY;
			
			cmds.push(GraphicsPathCommand.LINE_TO);
			data.push(mouseX);
			data.push(mouseY);
		}
		
		protected function onMouseUp(e:MouseEvent):void {
			graphics.beginFill(0x60A0FF);
			
			switch(testOption) {
				case TEST_EVENODD:
					graphics.drawPath(cmds,data,GraphicsPathWinding.EVEN_ODD);
					break;
				
				case TEST_NONZERO:
					graphics.drawPath(cmds,data,GraphicsPathWinding.NON_ZERO);
					break;
			}
			graphics.endFill();
			bMouseDown = false;
			pLast = null;
		}
		
		protected function drawBound():void {
			graphics.clear();
			graphics.beginFill(0xFFFFFF, 0.1);
			graphics.drawRect(0,0,WIDTH, HEIGHT);
			graphics.endFill();
		}
	}
}