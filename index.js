window.onload = criarSound();
var quadro = document.getElementById("app");
var lapis = quadro.getContext("2d");
document.addEventListener("keydown", setDirection)
var player1 = {
    size: 10 / 2,
    posicaoX: 5,
    posicaoY: 5,
    cor: "#000000"
}
var player2 = {
    size: 10,
    posicaoX: quadro.width - 10,
    posicaoY: quadro.height - 10,
    cor: "#000000"
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
    if (detectColision() < 1300) {
        sound();
    }
}

function detectColision() {
    lat1 = player1.posicaoX
    lat2 = player2.posicaoX
    lon1 = player1.posicaoY
    lon2 = player2.posicaoY

    rad = function(x) { return x * Math.PI / 180; }

    //Raio da Terra no km (WGS84)
    R = 6378.137;
    // Distância latitudinal
    dLat = rad(lat2 - lat1);
    // Distância longitudinal
    dLong = rad(lon2 - lon1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3);
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
    // Desenhando o debug de posicionamentos
    lapis.font = "8px Arial";
    lapis.fillStyle = "black";
    lapis.textAlign = "center";
    lapis.fillText(`Colisão: ${detectColision()}`, quadro.width / 2, quadro.height);
}