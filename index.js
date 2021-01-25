var quadro = document.getElementById("app");
var lapis = quadro.getContext("2d");
document.addEventListener("keydown", setDirection)
var player1 = {
    posicaoX: 0,
    posicaoY: 0,
    size: 10,
    cor: "#000000"
}
var player2 = {
    posicaoX: quadro.width,
    posicaoY: quadro.height,
    size: 10,
    cor: "#000000"
}

function setDirection(event) {
    switch (event.code) {
        // Teclas para o player1
        case "KeyA":
            player1.posicaoX -= 2
            break
        case "KeyD":
            player1.posicaoX += 2
            break
        case "KeyS":
            player1.posicaoY += 2
            break
        case "KeyW":
            player1.posicaoY -= 2
            break
        case "ShiftLeft":
            player1.size += 1
            break
        case "ControlLeft":
            player1.size -= 1
            break
            // Teclas para o player2
        case "ArrowLeft":
            player2.posicaoX -= 2
            break
        case "ArrowRight":
            player2.posicaoX += 2
            break
        case "ArrowDown":
            player2.posicaoY += 2
            break
        case "ArrowUp":
            player2.posicaoY -= 2
            break
        case "ShiftRight":
            player2.size += 1
            break
        case "ControlRight":
            player2.size -= 1
            break
    }
    requestAnimationFrame(desenhar);
}

function desenhar() {
    // Limpando a tela para novo desenho
    lapis.clearRect(0, 0, quadro.width, quadro.height);
    // Desenhando o player1
    player1.cor = 'rgb(' + (Math.floor(Math.random() * (255 - 0)) + 0) + ',' + (Math.floor(Math.random() * (255 - 0)) + 0) + ',0)';
    lapis.beginPath();
    lapis.strokeStyle = player1.cor;
    lapis.arc(player1.posicaoX, player1.posicaoY, player1.size, 0, 2 * Math.PI);
    lapis.stroke();
    // Desenhando o player2
    player2.cor = 'rgb(' + (Math.floor(Math.random() * (255 - 0)) + 0) + ',' + (Math.floor(Math.random() * (255 - 0)) + 0) + ',0)';
    lapis.beginPath();
    lapis.strokeStyle = player2.cor;
    lapis.rect(player2.posicaoX, player2.posicaoY, player2.size, player2.size);
    lapis.stroke();
}