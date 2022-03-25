var gl;
var theta;
var thetaLoc;
var isDirClockwise = false;
var delay = 1000;

function buttonPressedFunc(){
	isDirClockwise=!isDirClockwise;
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}
  
	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );
	
	var myButton = document.getElementById("DirectionButton"); 
	myButton.addEventListener("click", buttonPressedFunc);
	
	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
		switch (m.selectedIndex) {
			case 0:
				isDirClockwise = !isDirClockwise;
				break;
			case 1:
				if(delay>2)
					delay /= 20.0;
				break;
			case 2:
				if(delay<100)
					delay *= 20.0;
				break;
		}
	});

	
	var vertices = [
				vec3(-0.5,-0.5,0.5),
				vec3(-0.5,0.5,0.5),
				vec3(0.5,0.5,0.5),
				vec3(0.5,-0.5,0.5),
				vec3(-0.5,-0.5,-0.5),
				vec3(-0.5,0.5,-0.5),
				vec3(0.5,0.5,-0.5),
				vec3(0.5,-0.5,-0.5),

				];

	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	theta = 0;
	gl.uniform1f(thetaLoc, theta);

	
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	requestAnimFrame(render);
}

function render(){
	setTimeout(function() {
		// Clear the color buffer with specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);
		theta += (isDirClockwise ? 0.1 : -0.1);
		gl.uniform1f(thetaLoc, theta);
		gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		render();
		}, delay);


	
	
}