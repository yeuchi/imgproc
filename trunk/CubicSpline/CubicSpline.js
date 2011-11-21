// ============================================================================
// Module:		CubicSpline.js
//
// Description:	Cubic Spline interpolation in javascript as defined by reference.
//				
// Reference:	Numerical Recipes in C 2nd Edition, Press, Teukolsky, Vetterling, Flannery, pg.113
//			
// Authors:		William H. Press
//				William T. Vetterling
//				Saul A. Teukolsky
//				Brian P. Flannery
//
//				C.T. Yeung (porting from C into javascript)
//
// Input:		pSrcX - array of anchors' x
//				pSrcY - array of anchors' y
//
// Output:		getY(x) => returns interpolated Y value.
//
// History:	
// 20Nov11		ported it to javascript, working in HTML5 canvas.			cty
// ============================================================================
		var arySrcX;
		var arySrcY;
		var aryB;
		var aryC;
		var aryD;
		var aryH;
		var arySIG;
		var aryL;
		var aryU;
		var aryZ;
		
		function init() {
			aryB = new Array();
			aryC = new Array();
			aryD = new Array();
			aryH = new Array();
			arySIG = new Array();
			aryL = new Array();
			aryU = new Array();
			aryZ = new Array();
		}
							   
		// do cubic spline interpolation						// [out] destination y
		function formulate(ptSrcX, 								// [in] anchors x
						   ptSrcY) { 							// [in] anchors y
		
			arySrcX = ptSrcX;
			arySrcY = ptSrcY;
			
			// Theorem 3.11		[A].[x] = [b]					[A] -> n x n Matrix
			//													[b] -> n x n Matrix
			//													[x] -> c[] 0..n
			//	STEP 1		eq. 4 (pg. 134)
			for (var aa = 0; aa < ptSrcX.length-1; aa ++)
				aryH[aa] = ptSrcX[aa+1] - ptSrcX[aa];			// [A], Hj = Xj+1 - Xj
		
			// STEP 2
			for (aa = 1; aa < ptSrcX.length-1; aa ++)			// 0 -> n-1
				arySIG[aa] = (3.0/aryH[aa] * (ptSrcY[aa+1] - ptSrcY[aa])) - 
								  (3.0/aryH[aa-1] * (ptSrcY[aa] - ptSrcY[aa-1]));
			
			// STEP 3
			aryL[0] = 0;
			aryU[0] = 0;
			aryZ[0] = 0;
		
			// STEP 4
			for (aa = 1; aa < ptSrcX.length-1; aa ++)
			{
				aryL[aa] = (2.0 * (ptSrcX[aa+1] - ptSrcX[aa-1])) - (aryH[aa-1] * aryU[aa-1]);
				aryU[aa] = aryH[aa] / aryL[aa];
				aryZ[aa] = (arySIG[aa] - (aryH[aa-1] * aryZ[aa-1])) / aryL[aa];
			}
			
			// STEP 5		TAIL BOUNDARY @ 0
			aryL[arySrcX.length-1] = 1;
			aryZ[arySrcX.length-1] = 0;
			aryC[arySrcX.length-1] = 0;
			
			// STEP 6
			for (aa = ptSrcX.length-2; aa >= 0; aa --)
			{
				aryC[aa] = aryZ[aa] - (aryU[aa] * aryC[aa+1]);					// Theorem 3.11
				aryB[aa] = (ptSrcY[aa+1] - ptSrcY[aa]) / aryH[aa] 
					       - (aryH[aa] * (aryC[aa+1] + 2 * aryC[aa]) / 3);		// eq. 10
				aryD[aa] = (aryC[aa+1] - aryC[aa]) / (3 * aryH[aa]);			// eq. 11
			}
		}
		
		function getY(x) {
			var index = bisection(x);
			
			if(arySrcX[index] == x)
				return arySrcY[index];
			else
				return doCubicSpline(x, index);
		}
		
		function bisection(ab) {
			var ju = arySrcX.length-1;											// upper limit
			var jl = 0;															// lower limit
			var jm;																// midpoint
		
			while (ju - jl > 1)							
			{
				jm = Math.round((ju + jl)/2);									// midpoint formula
		
				if (ab > arySrcX[jm])
					jl = jm;
				else
					ju = jm;
			}
			return jl;		
		}
		
		function doCubicSpline(x, 				// [in] x value
							   index) {			// [in] index of anchor to use
			var Y;
			
			Y = arySrcY[index]									+ 
			 aryB[index] *	(x - arySrcX[index])				+
			 aryC[index] *	Math.pow((x - arySrcX[index]), 2) 	+
			 aryD[index] * Math.pow((x - arySrcX[index]), 3);
			return Y;
		}