let trator; // Posição do trator como vetor 2D (x, y)
let milhos = []; // Lista que vai guardar as posições dos milhos na tela
let pontos = 0; // Contador de milhos colhidos
let tempo = 30; // Tempo total do jogo em segundos
let jogoAcabou = false; // Controla se o jogo acabou
let inicio; // Armazena o tempo em que o jogo começou
let jogoComecou = false; // Controla se o jogo já começou (clicou para iniciar)
let mostrarFrase = false; // Controla se deve mostrar a frase explicativa antes de iniciar

function setup() {
  createCanvas(600, 400); // Cria a área de desenho (canvas) com 600x400 pixels
  trator = createVector(width / 2, height / 2); // Posiciona o trator no centro da tela

  // Cria 10 milhos em posições aleatórias na tela e adiciona ao array milhos
  for (let i = 0; i < 10; i++) {
    milhos.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(150, 200, 100); // Pinta o fundo da tela com uma cor verde clara

  // Se o jogo ainda não começou
  if (!jogoComecou) {
    fill(0); // Define a cor do texto para preto
    textAlign(CENTER); // Centraliza o texto na horizontal
    textSize(24); // Define o tamanho do texto

    // Se ainda não clicou para mostrar a frase, pede para clicar
    if (!mostrarFrase) {
      text("Clique na tela para começar o jogo", width / 2, height / 2);
    } else {
      // Se já clicou uma vez, mostra a frase explicativa antes do jogo
      textSize(18);
      text("Colha o máximo de milhos que conseguir em 30 segundos.", width / 2, height / 2 - 20);
      text("Boa sorte!", width / 2, height / 2 + 20);
      textSize(14);
      text("Clique novamente para iniciar!", width / 2, height / 2 + 60);
    }
  } else {
    // Se o jogo começou, mas o tempo inicial não está definido, define agora
    if (!inicio) {
      inicio = millis(); // Registra o tempo atual em milissegundos
    }

    // Se o jogo ainda não acabou
    if (!jogoAcabou) {
      // Calcula o tempo restante em segundos
      let tempoRestante = tempo - int((millis() - inicio) / 1000);

      // Se o tempo acabou, marca o jogo como terminado
      if (tempoRestante <= 0) {
        jogoAcabou = true;
      }

      // Desenha o trator na tela usando o emoji, na posição atual
      textSize(30);
      text("🚜", trator.x, trator.y);

      // Desenha todos os milhos na tela, cada um na sua posição
      for (let i = 0; i < milhos.length; i++) {
        textSize(25);
        text("🌽", milhos[i].x, milhos[i].y);
      }

      // Verifica se o trator colidiu com algum milho (distância < 30)
      for (let i = milhos.length - 1; i >= 0; i--) {
        if (dist(trator.x, trator.y, milhos[i].x, milhos[i].y) < 30) {
          milhos.splice(i, 1); // Remove o milho colhido da lista
          pontos++; // Incrementa o contador de pontos
          milhos.push(createVector(random(width), random(height))); // Adiciona um novo milho em posição aleatória
        }
      }

      // Mostra a pontuação e o tempo restante no canto superior esquerdo
      fill(0);
      textSize(16);
      text("Milhos colhidos: " + pontos, 10, 20);
      text("Tempo restante: " + tempoRestante + "s", 10, 40);
    } else {
      // Se o jogo acabou, mostra a tela final do banquete

      background(255, 245, 200); // Fundo bege para parecer uma mesa de fazenda
      textSize(30);
      textAlign(CENTER); // Centraliza os textos

      text("🎉 Banquete Rural 🎉", width / 2, 50); // Título do banquete

      // Define quais alimentos mostrar no banquete, conforme os pontos
      let banquete = "🍞🥛"; // básico
      if (pontos >= 5) banquete += "🧀🍯"; // intermediário
      if (pontos >= 10) banquete += "🍗🥚🌽"; // banquete completo

      textSize(40);
      text(banquete, width / 2, height / 2); // Mostra os alimentos

      textSize(18);
      text("Você colheu " + pontos + " milhos!", width / 2, height / 2 + 60); // Mostra os pontos finais

      // Desenha o vovô e uma frase rural motivacional
      textSize(25);
      text("👴", width / 2 - 150, height / 2 + 50);
      textSize(16);
      text('"Muito bem, meu netinho!\nCom esforço vem a fartura!"', width / 2 + 60, height / 2 + 100);
    }
  }
}

// Função que é executada quando o mouse é clicado
function mousePressed() {
  if (!jogoComecou) {
    if (!mostrarFrase) {
      mostrarFrase = true; // No primeiro clique, mostra a frase explicativa
    } else {
      jogoComecou = true; // No segundo clique, inicia o jogo de verdade
    }
  }
}

// Função que é executada quando uma tecla é pressionada
function keyPressed() {
  // Só permite mover o trator se o jogo já começou e não acabou
  if (jogoComecou && !jogoAcabou) {
    let velocidade = 10; // Define a velocidade do trator ao mover

    // Move o trator para a esquerda se a seta esquerda foi pressionada
    if (keyCode === LEFT_ARROW) trator.x -= velocidade;

    // Move para a direita
    if (keyCode === RIGHT_ARROW) trator.x += velocidade;

    // Move para cima
    if (keyCode === UP_ARROW) trator.y -= velocidade;

    // Move para baixo
    if (keyCode === DOWN_ARROW) trator.y += velocidade;
  }
}
