package com.ctyeung.dither
{
	import flash.display.BitmapData;
	import flash.display.Shader;
	import flash.display.ShaderJob;
	import flash.filters.ShaderFilter;
	import flash.utils.ByteArray;
	
	//http://en.wikipedia.org/wiki/Ordered_dithering
	public class OrderDither
	{
		[Embed(source="assets/OrderDither.pbj", mimeType="application/octet-stream")]
		protected var orderDitherClass:Class;
		
		
		public function OrderDither() {
		}
		
		public function apply(bmd:BitmapData):BitmapData {
			return pbMethod(bmd);
		}
		
		public function pbMethod(bmd:BitmapData):BitmapData{
			var bmdDes:BitmapData = new BitmapData(bmd.width, bmd.height);
			var shader:Shader = new Shader();
			shader.byteCode = pixelBenderFilter;
			shader.data.src.input = bmd;
			
			var job:ShaderJob = new ShaderJob(shader); 
			job.target = bmdDes; 
			job.start();
			
			return bmdDes;
		}
		
		protected function get pixelBenderFilter():ByteArray {
			return new orderDitherClass() as ByteArray;
		}
	}
}