var obstacleTimer = 0.0;
var cubeRotation1 = 0.0;
var cubeRotation2 = 0.0;
var cubeRotation3 = 0.0;
var cubeRotation4 = 0.0;

var binding = {};
var side = 0.0;
var flagObs = 0.0;
function makeObstacle(length,flag){
    

    if(flag == 0)
    { 
      side = 4.0*(Math.sqrt(4) + 1);

      const positions = [
        // Front face
        -0.4, -side,  -length,
         0.4, -side,  -length,
         0.4,  side,  -length,
        -0.4,  side,  -length,
       
      ];
      return positions;

    }
    else if(flag == 1)
    {
      // console.log("hello");
      var angle = 45.0;
      side = 1.8;
      var current_angle = 22.5;
      var arr = [];
      for(var i = 0; i < 24 ;)
      {
        arr[i++] = side*Math.cos(current_angle*Math.PI/180); //2
        arr[i++] = side*Math.sin(current_angle*Math.PI/180);
        arr[i++] = -length;
        current_angle += angle;

      }
      const positions = [
        
        arr[0],arr[1],arr[2],
        arr[3],arr[4],arr[5],
        arr[18],arr[19],arr[20],
        arr[21],arr[22],arr[23],

        arr[6],arr[7],arr[8],
        arr[9],arr[10],arr[11],
        arr[12],arr[13],arr[14],
        arr[15],arr[16],arr[17],
      ];
      return positions;
    }
    else if(flag == 2)
    {
      
      side = 2;
      
      const positions = [
        
        0,0,-length,
        side*Math.cos(67.5*Math.PI/180),side*Math.sin(67.5*Math.PI/180),-length,
        0,2*side,-length,
        side*Math.cos(112.5*Math.PI/180),side*Math.sin(112.5*Math.PI/180),-length,
        

        0,0,-length,
        side*Math.cos(67.5*Math.PI/180),-side*Math.sin(67.5*Math.PI/180),-length,
        0,-2*side,-length,
        side*Math.cos(112.5*Math.PI/180),-side*Math.sin(112.5*Math.PI/180),-length,
        
      ];
      return positions;
    }
    else if(flag == 3)
    {
     
      side = 2;
     
      
      const positions = [
        
        0,1.5*side,-length,
        side*Math.cos(22.5*Math.PI/180) + 0.2,side*Math.sin(22.5*Math.PI/180), -length,
        side*Math.cos(22.5*Math.PI/180) + 0.2,-side*Math.sin(22.5*Math.PI/180),-length,
        0,-1.5*side,-length,

        
      ];
      return positions;
    };
  }
function initObstacleBuffers(gl,length,flag) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = makeObstacle(length,flag);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  

  if(flag == 0)
  {
     
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);


  const vertexNormals = [
    0.0,0.0,1.0,
    0.0,0.0,1.0,
    0.0,0.0,1.0,
    0.0,0.0,1.0,

    0.0,0.0,-1.0,
    0.0,0.0,-1.0,
    0.0,0.0,-1.0,
    0.0,0.0,-1.0,


  ];

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                 gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
   
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      
    ];
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer, 
      indices: indexBuffer,
    };
  }
  else if(flag == 1)
  { 

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);


    const vertexNormals = [
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
  
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
  
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
  
    ];

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                 gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,

    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
   
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);
     

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

 
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
    ];
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }
  else if(flag == 2)
  { 
  
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);


    const vertexNormals = [
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
  
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
  
    ];

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                 gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,

    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
   
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

 
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
    ];
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
   return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }
  else if(flag == 3)
  { 
      
      const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);


    const vertexNormals = [
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
      0.0,0.0,1.0,
  
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      0.0,0.0,-1.0,
      

  
    ];

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                 gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,

    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
   
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

 
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
    ];
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
   
   return {
      position: positionBuffer,
      normal: normalBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }
}

//
// Draw the scene.
//
function drawObstacleScene(gl, programInfo, buffers,texture2, deltaTime,i) {
                 
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things



  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 65.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  
  
  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [0, (1)*Math.cos(22.5*Math.PI/180) ,timer]);  // amount to translate

  
  cubeRotation1 -= 0.0002; 
  cubeRotation2 += 0.00015; 
  cubeRotation3 -= 0.00015; 
  cubeRotation4 += 0.00015; 


  if(i%4 == 0)
  {  
      mat4.rotate(modelViewMatrix,  // destination matrix
                  modelViewMatrix,  // matrix to rotate
                  cubeRotation + cubeRotation1,     // amount to rotate in radians
                  [0, 0, 1]);       // axis to rotate around (Z)
    
  }
  else if(i%4 == 1)
  {
      mat4.rotate(modelViewMatrix,  // destination matrix
                  modelViewMatrix,  // matrix to rotate
                  cubeRotation + cubeRotation2,     // amount to rotate in radians
                  [0, 0, 1]);       // axis to rotate around (Z)
  }
  else if(i%4 == 2)
  {
      mat4.rotate(modelViewMatrix,  // destination matrix
                  modelViewMatrix,  // matrix to rotate
                  cubeRotation + cubeRotation3,     // amount to rotate in radians
                  [0, 0, 1]);       // axis to rotate around (Z)

  }
  else if(i%4 == 3)
  {
      mat4.rotate(modelViewMatrix,  // destination matrix
                  modelViewMatrix,  // matrix to rotate
                  cubeRotation + cubeRotation4,     // amount to rotate in radians
                  [0, 0, 1]);       // axis to rotate around (Z)

  }
  // mat4.rotate(modelViewMatrix,  // destination matrix
  //             modelViewMatrix,  // matrix to rotate
  //             cubeRotation * .7,// amount to rotate in radians
  //             [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  const normalMatrix = mat4.create();
    mat4.invert(normalMatrix,modelViewMatrix);
    mat4.transpose(normalMatrix,normalMatrix);
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
}
    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
normalMatrix);

      gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
      gl.bindTexture(gl.TEXTURE_2D, texture2);

  // Tell the shader we bound the texture to texture unit 0
      gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  { 
    
    if(i%4 == 1)
    { 
      
      
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, 12, type, offset);
    }
    else if(i%4 == 2)
    { 
      
      // console.log("howello3");
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, 12, type, offset);
    }
    else if(i%4 == 3)
    { 
      
      // console.log("howello3");
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, 6, type, offset);
    }
    else if(i%4 == 0)
    {
     
      
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, 6, type, offset);
    }
  }

  // Update the rotation for the next draw

}