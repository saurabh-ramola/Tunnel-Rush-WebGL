
Mousetrap.bind('a', function() { moveLeft(); });
Mousetrap.bind('d', function() { moveRight(); });
Mousetrap.bind('b', function() { giveBoost(); document.getElementById('boost').play();});
Mousetrap.bind('g', function() { checkMate = 1;});
Mousetrap.bind('n', function() { checkMate = 0;});
Mousetrap.bind('x', function() { checkMate = 2;});
var score = 0;
var a = 0.0;
var b = 0.0;
var cubeRotation = 0.0;;
var timer = 0.0;
var lengths = [];
var count = 0;
var checkMate = 0;
var scoreFlag = 0;
var sec = 0;
var level = 2;
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

main();
//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  document.getElementById('backaudio').play();

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
 
   var vsSource1 = `
        attribute vec4 aVertexPosition;
         attribute vec3 aVertexNormal;
         attribute vec2 aTextureCoord;
         uniform mat4 uNormalMatrix;
         uniform mat4 uModelViewMatrix;
         uniform mat4 uProjectionMatrix;
         varying highp vec2 vTextureCoord;
         varying highp vec3 vLighting;
   
         highp vec3 vector = vec3(0.084, 0.210, 0.210);
         void main(void) {
           gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
           vTextureCoord = aTextureCoord;
           // Apply lighting effect
           highp vec3 ambientLight = vec3(0,0,0);
           highp vec3 directionalLightColor = vector;
           
   
           highp vec3 directionalVector = normalize(vec3(0.0, -1.0, 1.0));
           highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
           highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
           vLighting = ambientLight + (directionalLightColor * directional);
         }
       `;
     
    var vsSource2 = `
     attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      attribute vec2 aTextureCoord;
      uniform mat4 uNormalMatrix;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying highp vec2 vTextureCoord;
      varying highp vec3 vLighting;
  
      highp vec3 vector = vec3(0.184, 0.310, 0.310);
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
        // Apply lighting effect
        highp vec3 ambientLight = vec3(0.3,0.3,0.3);
        
          highp vec3 directionalLightColor = vec3(1,1,1);
  
        highp vec3 directionalVector = normalize(vec3(0.0, -1.0, 1.0));
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
      }
    `;
  
  
  const fsSource1 = `
     varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;
   const fsSource2 = `
     varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      gl_FragColor.r += 0.45;
      gl_FragColor.g += 0.45;
      gl_FragColor.b += 0.45;

    }
  `;
  


  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.

  const shaderProgram = initShaderProgram(gl, vsSource2, fsSource2);
  const shaderProgram1 = initShaderProgram(gl, vsSource2, fsSource1);
  const shaderProgram2 = initShaderProgram(gl, vsSource1, fsSource1);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
     program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
},
  };
   const programInfo1 = {
     program: shaderProgram1,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram1, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram1, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
},
  };
   const programInfo2 = {
     program: shaderProgram2,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram2, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram2, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
},
  };
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);
  const texture = loadTexture(gl, 'wall.jpeg');
  const texture2 = loadTexture(gl,'dung.jpeg');
  const obstacleBuffers = [];
  
  for(var i = 0 ; i < 100 ; i++)
  {
    obstacleBuffers.push(initObstacleBuffers(gl,(i+1)*50,i%4));
    lengths[i] = -(i+1)*50;
  }
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    score++;
    sec++;
    if(scoreFlag == 0)
      document.getElementById('score').innerHTML = score;
    else
    {  
      document.getElementById('score1').innerHTML = "Sorry You died, Your score is : ";
      document.getElementById('speed').innerHTML = "";
      document.getElementById('speed1').innerHTML = "";


      } 
     
     if(sec%10 == 0)
     {
        document.getElementById('speed').innerHTML = 0.5;
     }   
      


    if(checkMate == 1)
      drawScene(gl, programInfo2, buffers,texture, deltaTime);
    else if(checkMate == 0)
      drawScene(gl, programInfo1, buffers,texture, deltaTime);
    else if(checkMate == 2)
      drawScene(gl, programInfo, buffers,texture, deltaTime);

    for(var i = 0 ; i < 100; i++)
    {
      if(checkMate == 1)
        drawObstacleScene(gl, programInfo2, obstacleBuffers[i],texture2,deltaTime,i%4);
      else if(checkMate == 0)
        drawObstacleScene(gl, programInfo1, obstacleBuffers[i],texture2,deltaTime,i%4);
      else if(checkMate == 2)
        drawObstacleScene(gl, programInfo, obstacleBuffers[i],texture2,deltaTime,i%4);
        
    }
    for(var i = 0 ; i < 100; i+=4)
    {
      if((lengths[i] + timer) > 0 && (lengths[i] + timer)<0.7)
        {
         
            var y = (cubeRotation1 + cubeRotation)*180/Math.PI;
            while(y<0)
              y = y+360;
            if(((y)%360>65 && (y)%360<110) || ((y)%360>245 && (y)%360<290))
            { 
            
              continue;
            }
            else 
            { 
              
              document.getElementById("backaudio").pause(); 
              document.getElementById("dead").play();            
                    scoreFlag = 1;

              wait(7000);  

            }
          
        }

      }
      for(var i = 1 ; i < 100; i+=4)
      { 
        if((lengths[i] + timer) > 0 && (lengths[i] + timer)<0.7)
          {
           
              var y = (cubeRotation2 + cubeRotation)*180/Math.PI;
              while(y<0)
                y = y+360;
              if(((y)%360>=0 && (y)%360<=20) || ((y)%360>=155 && (y)%360<205) || ((y)%360>=340 && (y)%360<=360))
              { 
               
              
                continue;

                
              }
              else 
              { 
                  document.getElementById("backaudio").pause(); 
              document.getElementById("dead").play();
                    scoreFlag = 1;

                wait(7000);
              }
            
          }
          
        }
        for(var i = 2 ; i < 100; i+=4)
        {
          if((lengths[i] + timer) > 0 && (lengths[i] + timer)<0.7)
            {
             
                var y = (cubeRotation3 + cubeRotation)*180/Math.PI;
                while(y<0)
                  y = y+360;
                if(((y)%360>40 && (y)%360<135) || ((y)%360>220 && (y)%360<315))
                { 
                  
                  continue;
                }
                else 
                { 
                 
                    document.getElementById("backaudio").pause(); 
              document.getElementById("dead").play();
                    scoreFlag = 1;

                  wait(7000);   

                }
              
            }

          }
          for(var i = 3 ; i < 100; i+=4)
          {
            if((lengths[i] + timer) > 0 && (lengths[i] + timer)<0.7)
              {
               
                  var y = (cubeRotation4 + cubeRotation)*180/Math.PI;
                  while(y<0)
                    y = y+360;
                  if(((y)%360>=20 && (y)%360<=160))
                  { 
                    
                    continue;
                  }
                  else 
                  { 
                   
                    
                    document.getElementById("backaudio").pause(); 
                    document.getElementById("dead").play();
                    scoreFlag = 1;
                    wait(7000);  
                  }
                
              }

            }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}




//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

