package com.ctyeung.ChainCode
{
	import flash.display.BitmapData;
	import flash.display.Shader;
	import flash.display.ShaderJob;
	import flash.filters.ShaderFilter;
	import flash.geom.Point;
	import flash.utils.ByteArray;
	
	import mx.messaging.AbstractConsumer;

	public class FloodFill
	{
		[Embed(source="assets/FloodFillPass.pbj", mimeType="application/octet-stream")]
		protected var floodFillPass:Class;
		
		public function FloodFill() {
			
		}
		
		public function apply(bmd:BitmapData,
							  pt:Point)
							  :BitmapData {
			var bmdDes:BitmapData = bmd.clone();
			bmdDes.floodFill(pt.x, pt.y, 0xFF0000);
			//bmdDes = passFloodFill(bmdDes);
			return bmdDes;
		}
		
		private function passFloodFill(bmd:BitmapData):BitmapData {
			var bmdDes:BitmapData = new BitmapData(bmd.width, bmd.height);
			var shader:Shader = new Shader();
			shader.byteCode = pixelBenderFilter;
			shader.data.src.input = bmd;
			
			var job:ShaderJob = new ShaderJob(shader); 
			job.target = bmdDes; 
			job.start();
			
			return bmdDes;
		}
		
		private function get pixelBenderFilter():ByteArray {
			return new floodFillPass() as ByteArray;
		}
	}
}