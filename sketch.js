// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variaveis raquete

let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

// variaveis do oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload () {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

//loop toca a musica sem parar 

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda ();
  mostraRaquete (xRaquete, yRaquete);
  movimentoRaquete ();
  //verificaColisaoRaquete ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar ();
  marcaPonto();

}
  

function mostraBolinha () {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha () {
   xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
  
  //+= siginifica a variável somando por ela + outro numero/variavel;
    
}

function verificaColisaoBorda () {
  
  if (xBolinha + raio > width || xBolinha - raio < 0) { 
    velocidadeXbolinha *= -1;
  // as || significa ou
  // xBolinha + raio (ou -) serve para que a bolinha não entre nas bordas.
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYbolinha *= -1;
  }
}

function mostraRaquete (x, y) {
   rect (x, y, wRaquete, hRaquete);
}


function movimentoRaquete () {
  if (keyIsDown (87)) {
    yRaquete -= 10;
  }
  
  if (keyIsDown (83)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete () {
  if (xBolinha - raio < xRaquete + wRaquete 
      && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete - hRaquete ) {
    velocidadeXbolinha *= -1;
    raquetada.play()
    
  //&& significa "e"
  }
}

function verificaColisaoRaquete (x, y) {
  colidiu =
  collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu){ 
    velocidadeXbolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente () {
   if (keyIsDown (UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown (DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
  // para jogar contra a maquina - velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
  //yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke (255)
  textAlign(CENTER)
  textSize(16);
  fill (255, 140, 0);
  rect(150, 10, 40, 20);
  fill (255);
  text(meusPontos, 170, 26);
  fill(2550, 140, 0)
  rect(450, 10, 40, 20);
  fill (255);
  text(pontosOponente, 470, 26);
}

function marcaPonto () {
  if (xBolinha + raio > 595){
    meusPontos += 1;
    ponto.play();
}
  
  if (xBolinha - raio < 5){
    pontosOponente += 1;
    ponto.play()
  }
}
