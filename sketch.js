let trator; // Posição do trator (como vetor x, y)
let milhos = []; // Lista de milhos na tela
let pontos = 0; // Contador de milhos colhidos
let tempo = 30; // Tempo total de jogo (em segundos)
let jogoAcabou = false; // Controla se o jogo acabou
let inicio; // Guarda o tempo em que o jogo começou

function setup() {
  createCanvas(600, 400); // Cria a área do jogo (canvas)
  trator = createVector(width / 2, height / 2); // Posiciona o trator no centro

  // Cria 10 milhos em posições aleatórias
  for (let i = 0; i < 10; i++) {
    milhos.push(createVector(random(width), random(height)));
  }

  inicio = millis(); // Armazena o tempo inicial do jogo
}

function draw() {
  background(150, 200, 100); // Cor de fundo do jogo (verde claro)

  // Se o tempo ainda não acabou
  if (!jogoAcabou) {
    // Calcula o tempo restante em segundos
    let tempoRestante = tempo - int((millis() - inicio) / 1000);

    // Se o tempo chegou a 0, termina o jogo
    if (tempoRestante <= 0) {
      jogoAcabou = true;
    }

    // Desenha o trator como emoji na posição atual
    textSize(30);
    text("🚜", trator.x, trator.y);

    // Desenha todos os milhos na tela
    for (let i = 0; i < milhos.length; i++) {
      textSize(25);
      text("🌽", milhos[i].x, milhos[i].y);
    }

    // Verifica se o trator colidiu com algum milho
    for (let i = milhos.length - 1; i >= 0; i--) {
      if (dist(trator.x, trator.y, milhos[i].x, milhos[i].y) < 30) {
        milhos.splice(i, 1); // Remove o milho colhido
        pontos++; // Adiciona ponto
        // Cria um novo milho em posição aleatória
        milhos.push(createVector(random(width), random(height)));
      }
    }

    // Mostra os pontos e tempo restante
    fill(0);
    textSize(16);
    text("Milhos colhidos: " + pontos, 10, 20);
    text("Tempo restante: " + tempoRestante + "s", 10, 40);

  } else {
    // --- Fase final: Tela do banquete com o vovô ---

    background(255, 245, 200); // Fundo bege (parece mesa de fazenda)
    textSize(30);
    textAlign(CENTER);
    text("🎉 Banquete Rural 🎉", width / 2, 50); // Título

    // Mostra o banquete de acordo com os pontos
    let banquete = "🍞🥛"; // básico
    if (pontos >= 5) banquete += "🧀🍯"; // intermediário
    if (pontos >= 10) banquete += "🍗🥚🌽"; // banquete completo

    textSize(40);
    text(banquete, width / 2, height / 2); // Mostra os alimentos

    textSize(18);
    text("Você colheu " + pontos + " milhos!", width / 2, height / 2 + 60);

    // Mostra o vovô com uma frase rural
    textSize(25);
    text("👴", width / 2 - 150, height / 2 + 50); // Desenha o emoji do vovô
    textSize(16);
    text('"Muito bem, meu netinho!\nCom esforço vem a fartura!"', width / 2 + 60, height / 2 + 100);
  }
}

function keyPressed() {
  let velocidade = 10; // Velocidade do trator (mais rápida agora)

  // Move o trator conforme a tecla pressionada
  if (keyCode === LEFT_ARROW) trator.x -= velocidade;
  if (keyCode === RIGHT_ARROW) trator.x += velocidade;
  if (keyCode === UP_ARROW) trator.y -= velocidade;
  if (keyCode === DOWN_ARROW) trator.y += velocidade;
}
