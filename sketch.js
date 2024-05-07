let horaLaPaz = 0; // Hora de La Paz en formato 12 horas
let horaCDMX = 1; // Hora de Ciudad de México en formato 12 horas
let horaBarcelona = 8; // Hora de Barcelona en formato 12 horas

let diferenciaHorariaCDMX = 1;
let diferenciaHorariaBarcelona = 8; // Diferencia horaria de Barcelona respecto a La Paz

let inputHora;
let botonActualizar;

function setup() {
  createCanvas(800, 400); // Ancho del lienzo

  inputHora = createInput('00:00', 'time');
  inputHora.position(800, 700); // Posición del input

  botonActualizar = createButton('Actualizar'); // Posición del botón
  botonActualizar.mousePressed(actualizarHoras);
  inputHora.style('width', '150px'); // Ancho personalizado
  inputHora.style('font-size', '16px'); // Tamaño de fuente
  inputHora.style('padding', '5px'); // Espaciado interno
  inputHora.style('margin-right', '10px');
  inputHora.style('border-radius','10px'); 
}

function draw() {
  background(220);

  // Dibujar reloj de La Paz
  drawRelojPuntoPendiente(width / 6, height / 2, horaLaPaz, 'La Paz');

  // Dibujar reloj de Ciudad de México
  drawRelojDDA(width / 2, height / 2, horaCDMX, 'CDMX');

  // Dibujar reloj de Barcelona
  drawRelojBressenham(width * 5 / 6, height / 2, horaBarcelona, 'Barcelona');
}

function drawRelojPuntoPendiente(x, y, hora, ciudad) {
  // Dibujar el círculo del reloj usando el algoritmo del punto medio
  stroke(0);
  strokeWeight(2);
  fill(255);
  drawCircle(x, y, 75);
  // Dibujar números de las horas
  textSize(18);
  textAlign(CENTER, CENTER);
  text("12", x, y - 50); // 12 arriba
  text("3", x + 50, y); // 3 a la derecha
  text("6", x, y + 50); // 6 abajo
  text("9", x - 50, y); // 9 a la izquierda

  // Dibujar las líneas de los minutos
  strokeWeight(1);
  for (let i = 0; i < 60; i++) {
    let angulo = map(i, 0, 60, -PI / 2, TWO_PI - PI / 2); // Alineación correcta de las líneas de minutos
    let len = i % 5 === 0 ? 10 : 5; // Longitud de las líneas cada 5 minutos
    let startX = x + cos(angulo) * 70;
    let startY = y + sin(angulo) * 70;
    let endX = x + cos(angulo) * (70 - len);
    let endY = y + sin(angulo) * (70 - len);
    line(startX, startY, endX, endY);
  }

  // Calcular las posiciones de las manecillas
  let segundo = map(second(), 0, 60, 0, TWO_PI) - PI / 2;
  let minuto = map(minute(), 0, 60, 0, TWO_PI) - PI / 2;
  let horaActual = map(convertirFormato12(hora), 0, 12, 0, TWO_PI) - PI / 2;

  // Dibujar el segundero con la ecuación punto-pendiente
  drawManecilla(x, y, segundo, 70);
  
  // Dibujar el minutero con la ecuación punto-pendiente
  drawManecilla(x, y, minuto, 60);
  
  // Dibujar el horario con la ecuación punto-pendiente
  drawManecilla(x, y, horaActual, 50);

  // Mostrar la ciudad
  textSize(15);
  text(ciudad, x, y + 100); // Espacio adicional entre la ciudad y el reloj
}
function drawRelojDDA(x, y, hora, ciudad) {
  // Dibujar el círculo del reloj usando el algoritmo del punto medio
  stroke(0);
  strokeWeight(2);
  fill(255);
  drawCircle(x, y, 75);
    // Dibujar números de las horas
    textSize(18);
    textAlign(CENTER, CENTER);
    text("12", x, y - 50); // 12 arriba
    text("3", x + 50, y); // 3 a la derecha
    text("6", x, y + 50); // 6 abajo
    text("9", x - 50, y); // 9 a la izquierda
    
    // Dibujar las líneas de los minutos
    strokeWeight(1);
    for (let i = 0; i < 60; i++) {
      let angulo = map(i, 0, 60, -PI / 2, TWO_PI - PI / 2); // Alineación correcta de las líneas de minutos
      let len = i % 5 === 0 ? 10 : 5; // Longitud de las líneas cada 5 minutos
      let startX = x + cos(angulo) * 70;
      let startY = y + sin(angulo) * 70;
      let endX = x + cos(angulo) * (70 - len);
      let endY = y + sin(angulo) * (70 - len);
      line(startX, startY, endX, endY);
    }
    
    // Calcular las posiciones de las manecillas
    let segundo = map(second(), 0, 60, 0, TWO_PI) - PI / 2;
    let minuto = map(minute(), 0, 60, 0, TWO_PI) - PI / 2;
    let horaActual = map(convertirFormato12(hora), 0, 12, 0, TWO_PI) - PI / 2;
    
    // Dibujar el segundero
    strokeWeight(1);
    line(x, y, x + cos(segundo) * 70, y + sin(segundo) * 70);
    
    // Dibujar el minutero
    strokeWeight(2);
    drawManecillaDDA(x, y, minuto, 60);
    
    // Dibujar el horario
    strokeWeight(4);
    drawManecillaDDA(x, y, horaActual, 50);
    
    // Mostrar la ciudad
    textSize(15);
    text(ciudad, x, y + 100); // Espacio adicional entre la ciudad y el reloj
}
function drawRelojBressenham(x, y, hora, ciudad) {
  // Dibujar el círculo del reloj usando el algoritmo del punto medio
  stroke(0);
  strokeWeight(2);
  fill(255);
  drawCircle(x, y, 75);
    // Dibujar números de las horas
    textSize(18);
    textAlign(CENTER, CENTER);
    text("12", x, y - 50); // 12 arriba
    text("3", x + 50, y); // 3 a la derecha
    text("6", x, y + 50); // 6 abajo
    text("9", x - 50, y); // 9 a la izquierda
    
    // Dibujar las líneas de los minutos
    strokeWeight(1);
    for (let i = 0; i < 60; i++) {
      let angulo = map(i, 0, 60, -PI / 2, TWO_PI - PI / 2); // Alineación correcta de las líneas de minutos
      let len = i % 5 === 0 ? 10 : 5; // Longitud de las líneas cada 5 minutos
      let startX = x + cos(angulo) * 70;
      let startY = y + sin(angulo) * 70;
      let endX = x + cos(angulo) * (70 - len);
      let endY = y + sin(angulo) * (70 - len);
      line(startX, startY, endX, endY);
    }
    
    // Calcular las posiciones de las manecillas
    let segundo = map(second(), 0, 60, 0, TWO_PI) - PI / 2;
    let minuto = map(minute(), 0, 60, 0, TWO_PI) - PI / 2;
    let horaActual = map(convertirFormato12(hora), 0, 12, 0, TWO_PI) - PI / 2;
    
    // Dibujar el segundero con el algoritmo de Bresenham
    strokeWeight(1);
    drawLineBresenham(x, y, cos(segundo) * 70, sin(segundo) * 70);
    
    // Dibujar el minutero con el algoritmo de Bresenham
    strokeWeight(2);
    drawLineBresenham(x, y, cos(minuto) * 60, sin(minuto) * 60);
    
    // Dibujar el horario con el algoritmo de Bresenham
    strokeWeight(4);
    drawLineBresenham(x, y, cos(horaActual) * 50, sin(horaActual) * 50);
    
    // Mostrar la ciudad
    textSize(15);
    text(ciudad, x, y + 100); // Espacio adicional entre la ciudad y el reloj
}

function actualizarHoras() {
  let horaInput = inputHora.value();
  let partesHora = horaInput.split(':');
  let hora = int(partesHora[0]);
  let minutos = int(partesHora[1]);

  horaLaPaz = hora + minutos / 60;
  horaCDMX = horaLaPaz + diferenciaHorariaCDMX;
  horaBarcelona = horaLaPaz + diferenciaHorariaBarcelona;
}

function convertirFormato12(hora24) {
  let hora12 = hora24 % 12;
  return hora12 === 0 ? 12 : hora12;
}

// Función para dibujar un círculo utilizando el algoritmo del punto medio
function drawCircle(xc, yc, r) {
  let x = r;
  let y = 0;
  let p = 1 - r;

  while (x > y) {
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);

    y++;

    if (p <= 0) {
      p = p + 2 * y + 1;
    } else {
      x--;
      p = p + 2 * y - 2 * x + 1;
    }
  }
}

// Función para dibujar una manecilla utilizando la ecuación punto-pendiente
function drawManecilla(x, y, angulo, longitud) {
  let xEnd = x + cos(angulo) * longitud;
  let yEnd = y + sin(angulo) * longitud;
  line(x, y, xEnd, yEnd);
}
function drawManecillaDDA(x, y, angulo, longitud) {
  let xEnd = x + cos(angulo) * longitud;
  let yEnd = y + sin(angulo) * longitud;
  let dx = xEnd - x;
  let dy = yEnd - y;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let xPos = x;
  let yPos = y;

  for (let i = 0; i <= steps; i++) {
    point(xPos, yPos);
    xPos += xIncrement;
    yPos += yIncrement;
  }
}
function drawLineBresenham(x, y, dx, dy) {
  let xEnd = x + dx;
  let yEnd = y + dy;
  let x1 = x;
  let y1 = y;
  let x2 = xEnd;
  let y2 = yEnd;
  let dxAbs = abs(x2 - x1);
  let dyAbs = abs(y2 - y1);
  let dx2 = dxAbs * 2;
  let dy2 = dyAbs * 2;
  let xInc = (x2 > x1) ? 1 : -1;
  let yInc = (y2 > y1) ? 1 : -1;
  let error;

  if (dxAbs >= dyAbs) {
    error = dy2 - dxAbs;
    for (let i = 0; i <= dxAbs; i++) {
      point(x1, y1);
      if (error >= 0) {
        error -= dx2;
        y1 += yInc;
      }
      error += dy2;
      x1 += xInc;
    }
  } else {
    error = dx2 - dyAbs;
    for (let i = 0; i <= dyAbs; i++) {
      point(x1, y1);
      if (error >= 0) {
        error -= dy2;
        x1 += xInc;
      }
      error += dx2;
      y1 += yInc;
    }
  }
}



