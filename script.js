/* -------------------------------------------------------------------------- 
/*                    inicialización de variables                        */
/* -------------------------------------------------------------------------- */
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
var timerInicial = timer;
var intervalo;
let tiempoRegresivoId = null;

//Apuntando a documento HTML:

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let mostrarFinDeJuego = document.getElementById("game-over");
let tabla = document.querySelector("#tabla");

let timerAudio = new Audio("./media/timerAudio.mp3");
let winAudio = new Audio("./media/victoria.mp3");
let loseAudio = new Audio("./media/derrota.mp3");
let clickAudio = new Audio("./media/destaparTarjeta.mp3");
let rightAudio = new Audio("./media/respuestaCorrecta.mp3");
let wrongAudio = new Audio("./media/respuestaIncorrecta.wav");

/* -------------------------------------------------------------------------- */
/*                 //Generación de números aleatorios.                    */
/* -------------------------------------------------------------------------- */
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});

//funciones:
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    timerAudio.play();

    mostrarTiempo.innerHTML = `⏳: ${timer} segundos`;

    if (timer == 0) {
      timerAudio.pause();
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      mostrarCartel();
      loseAudio.play();
    }
  }, 1500);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt= "">`;
    tarjetaBloqueada.disabled = true;
  }
}

function mostrarCartel() {
  document.getElementById("game-over").style.display = "block";
}

//Función Principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;

  if (tarjetasDestapadas == 1) {
    //Mostrar primer número
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt= "">`;
    clickAudio.play();

    //Deshabilitando el primer botón.
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //Mostrar SEGUNDO NÚMERO.
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt= "">`;

    //Deshabilitando el primer botón.
    tarjeta2.disabled = true;

    //Incrementando (Movimientos).
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      //Encerrar contador tarjetas destapadas:
      tarjetasDestapadas = 0;
      rightAudio.play();

      //Aumentar Aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        timerAudio.pause();
        winAudio.play();
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}😱`;
        clearInterval(tiempoRegresivoId);
        mostrarTiempo.innerHTML = `¡Fantástico!🥳🤩 solo tardaste ${
          timerInicial - timer
        } segundos.`;
        mostrarMovimientos.innerHTML = `Movimientos: ${Movimientos}😎👌`;
      }
    } else {
      wrongAudio.play();
      //Mostrar momentaneamente valores y volver a tapar:
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 500);
    }
  }
}
