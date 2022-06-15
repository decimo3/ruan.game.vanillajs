const TAMANHO = 50; // Tamanho das entidades do jogo
const VELOCIDADE = 5; // Velocidade de deslocamento

window.onload = criarSound();
var quadro = document.getElementById("app");
var lapis = quadro.getContext("2d");
document.addEventListener("keydown", setDirection);
var player1 = {
  size: TAMANHO / 2,
  posicaoX: TAMANHO,
  posicaoY: TAMANHO,
  cor: "#FF0000",
  direcao: 0
}
var player2 = {
  size: TAMANHO,
  posicaoX: quadro.width - TAMANHO,
  posicaoY: quadro.height - TAMANHO,
  cor: "#0000FF",
  direcao: 0
}
desenhar();

function criarSound() {
  let som = document.createElement("audio");
  som.src = "./asserts/bulletimpact.mp3";
  som.setAttribute("id", "som")
  som.setAttribute("preload", "auto");
  som.setAttribute("controls", "none");
  som.style.display = "none";
  document.body.appendChild(som);
}

function sound() {
  let som = document.getElementById("som");
  som.play();
}

function setDirection(event) {
  switch (event.code) {
    // Teclas para o player1
    case "KeyA":
      player1.posicaoX -= VELOCIDADE;
      break
    case "KeyD":
      player1.posicaoX += VELOCIDADE;
      break
    case "KeyS":
      player1.posicaoY += VELOCIDADE;
      break
    case "KeyW":
      player1.posicaoY -= VELOCIDADE;
      break
    case "ShiftLeft":
      player1.size += VELOCIDADE;
      break
    case "ControlLeft":
      player1.size -= VELOCIDADE;
      break
      // Teclas para o player2
    case "ArrowLeft":
      player2.posicaoX -= VELOCIDADE;
      break
    case "ArrowRight":
      player2.posicaoX += VELOCIDADE;
      break
    case "ArrowDown":
      player2.posicaoY += VELOCIDADE;
      break
    case "ArrowUp":
      player2.posicaoY -= VELOCIDADE;
      break
    case "ShiftRight":
      player2.size += VELOCIDADE;
      break
    case "ControlRight":
      player2.size -= VELOCIDADE;
      break
  }
  requestAnimationFrame(desenhar);
  if (detectColision() == 1) {
    sound();
  }
}

function detectColision() {
  lat1 = player1.posicaoX
  lat2 = player2.posicaoX
  lon1 = player1.posicaoY
  lon2 = player2.posicaoY
  latc = false // colisão de latitude
  lonc = false // colisão de longitude
  if (lat1 > lat2) {
    if ((lat1 - lat2) <= TAMANHO) latc = true;
  } else {
    if ((lat2 - lat1) <= TAMANHO) latc = true;
  }
  if (lon1 > lon2) {
    if ((lon1 - lon2) <= TAMANHO) lonc = true;
  } else {
    if ((lon2 - lon1) <= TAMANHO) lonc = true;
  }
  return (latc & lonc);
}

function desenhar() {
  // Limpando a tela para novo desenho
  lapis.clearRect(0, 0, quadro.width, quadro.height);
  // Desenhando o player1
  lapis.beginPath();
  lapis.strokeStyle = player1.cor;
  lapis.arc(player1.posicaoX, player1.posicaoY, player1.size, 0, 2 * Math.PI);
  lapis.fillRect(player1.posicaoX, player1.posicaoY, 1, 1);
  lapis.stroke();
  // Desenhando o player2
  lapis.beginPath();
  lapis.strokeStyle = player2.cor;
  lapis.rect(player2.posicaoX - (TAMANHO / 2), player2.posicaoY - (TAMANHO / 2), player2.size, player2.size);
  lapis.fillRect(player2.posicaoX, player2.posicaoY, 1, 1);
  lapis.stroke();
  // Desenhando o debug de posicionamentos
  lapis.fillStyle = "black";
  lapis.beginPath();
  lapis.moveTo(player2.posicaoX, player2.posicaoY);
  lapis.lineTo(player1.posicaoX, player1.posicaoY);
  lapis.stroke();
  lapis.font = "12px Arial";
  lapis.textAlign = "center";
  lapis.fillText(`Distância ${Math.sqrt(Math.pow((player2.posicaoX - player1.posicaoX), 2) + Math.pow((player2.posicaoY - player1.posicaoY), 2)).toFixed(2)}`, quadro.width / 2, quadro.height - 12)
  lapis.fillText(`Colisão: ${(detectColision()) ? "True" : "False"}`, quadro.width / 2, quadro.height);
}