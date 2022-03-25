var gl, theta = 0,
    thetaLoc, mycolor_loc, translate_loc, scale_loc,
    myColor = [10 / 255, 98 / 255, 198 / 255],
	translate_acceralator = 0.1,
	translate_factor = [0, 0],
    scale_factor = 1,
    isDirClockwise = false,
    toggleRotation = false;
    direction = 1,
    delay = 100,




    window.onload = function main() {
        const canvas = document.querySelector("#glcanvas");
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) {
            alert("Tarayıcınız HTML5 canvas desteklemiyor");
            return;
        }
        var program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        
        document.getElementById("color_input").oninput = color_input_func;
		  
		document.getElementById("rotate").oninput = rotate;
        
        window.onkeydown = move;
        
        window.onwheel = scale;
        
        document.getElementById("mymenu").onclick = optionMenuSelect;
        
        document.getElementById("toggleRotation").onmousedown = toggleRotation_func;
        
        document.getElementById("changeDirection").onmousedown = changeDirection;


        var vertices = [
            vec2(-.9, -.4), //O harfi
            vec2(-.9, .4),
            vec2(-.7, .4),
            vec2(-.7, -.4),

            vec2(-.7, .4),
            vec2(-.7, .2),
            vec2(-.2, .2),
            vec2(-.2, .4),

            vec2(-.7, -.2),
            vec2(-.7, -.4),
            vec2(-.2, -.4),
            vec2(-.2, -.2),

            vec2(-.4, .3),
            vec2(-.4, -.3),
            vec2(-.2, -.3),
            vec2(-.2, .3),

            vec2(-.75, .65), //birinci nokta
            vec2(-.75, .50),
            vec2(-.60, .50),
            vec2(-.60, .65),


            vec2(-.5, .65), //ikinci nokta
            vec2(-.5, .50),
            vec2(-.35, .50),
            vec2(-.35, .65),



            vec2(.1, .4), //N harfi
            vec2(.1, -.4),
            vec2(.3, -.4),
            vec2(.3, .4),

            vec2(.6, .4),
            vec2(.6, -.4),
            vec2(.8, -.4),
            vec2(.8, .4),

            vec2(.3, .4),
            vec2(.1, .3),
            vec2(.6, -.4),
            vec2(.8, -.4),


        ];

        var bufferId = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);


        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);


        thetaLoc = gl.getUniformLocation(program, "theta");
        mycolor_loc = gl.getUniformLocation(program, "mycolor");
        translate_loc = gl.getUniformLocation(program, "translate");
        scale_loc = gl.getUniformLocation(program, "scale");

        gl.clearColor(1.0, 1.0, .0, .30);
        render();

    };





function scale(event) {
    if (event.deltaY < 0)
        scale_factor = scale_factor + 0.1;
    else
        scale_factor = (scale_factor - 0.1) <= 0.1 ? 0.1 : (scale_factor - 0.1);
}
function color_input_func(event) {
    const r = parseInt(event.target.value.substr(1, 2), 16);
    const g = parseInt(event.target.value.substr(3, 2), 16);
    const b = parseInt(event.target.value.substr(5, 2), 16);
    myColor = [r / 255, g / 255, b / 255];
}
function move(event) {
    var key = String.fromCharCode(event.keyCode).toUpperCase();
    switch (key) {
        case '1':
            translate_factor[1] += translate_acceralator;
            break;
		case '2':
            translate_factor[1] -= translate_acceralator;
            break;
        case '3':
            translate_factor[0] -= translate_acceralator;
            break;
		case '4':
            translate_factor[0] += translate_acceralator;
            break;

    }
};

function rotate(event) {
    theta = -1 * (event.target.value * (Math.PI / 180));
};
function optionMenuSelect(event) {
    switch (event.target.value) {
        case '1':
            delay *= 2;
            break;
		case '0':
            delay /= 2;
            break;

    }
}
function toggleRotation_func(event) {
    if (toggleRotation) {
        toggleRotation = false;
        event.target.innerText = 'Döndürmeyi Başlat';
    } else {
        toggleRotation = true;
        event.target.innerText = 'Döndürmeyi Durdur';
    }
}
function editTheta() {
    if (toggleRotation) {
        theta += (Math.PI / 180) * direction;
    }
}
function changeDirection(event) {
    if (toggleRotation) {
        if (direction == 1) {
            direction = -1;
            event.target.innerText = "Döndürme Saat Yönünün Tersinde";
        } else {
            direction = 1;
            event.target.innerText = "Döndürme Saat Yönünde";
        }
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    editTheta();

    gl.uniform1f(thetaLoc, theta);
    gl.uniform3fv(mycolor_loc, myColor);
    gl.uniform2fv(translate_loc, translate_factor);
    gl.uniform1f(scale_loc, scale_factor);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 24, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 28, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 32, 4);

    setTimeout(
        function() {
            requestAnimFrame(render);
        }, delay
    );

}

