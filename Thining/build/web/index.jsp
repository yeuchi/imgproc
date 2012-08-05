<%-- 
    Document   : index
    Created on : Aug 4, 2012, 12:26:12 PM
    Author     : ctyeung
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Thinning</title>   
      <link rel="stylesheet" href="view/appView.css" />
   </head>
   <body>
<div id="divAppView">
   
   
   <h1>Thinning</h1>
   
   <!-- content area (top) -->
   <div class="divContent">
      <!-- image area (left) -->
      <div class="divCanvas">
         <canvas id="myCanvas" width="400" height="300">
            HTML5 canvas failed to load.
         </canvas>
      </div>
 
      <!-- tutorial, credit, reference (right) -->
      <div class="divInfo"></div>
   </div>
   
   <div style="clear:both;"></div>
   
   <!-- operations control (bottom) -->
   <div class="divControls">

      <div class="divSlider">
         <span>Thickness:</span>
         <!--<a class="sliderKnob"></a>-->
         <input id="sliderThick" type="range" value=20  min="1" max="50" step="1" />
      </div>
 
      <div class="divColor">
         <span>Color:</span>
         <input id="sliderColor" type="text" value="0F0" />
      </div>
      
      <a class="btn btnThin">Thin</a>
      <a class="btn btnClear">Clear</a>
      
   </div>
</div>

</body>
   
   <!-- jQuery library -->	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script src="lib/json2.js"></script>
   <script src="lib/underscore.js"></script>
   <script src="lib/backbone.js"></script>
   <script src="lib/backbone-localstorage.js"></script>
   <script src="model/model.js"></script>
   <script src="model/point.js"></script>
   <script src="view/appView.js"></script>
   <script src="fascade.js"></script>
</html>
