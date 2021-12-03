let cartas = []
let cartasViradas = []
let figuras = []
let primeiraCarta = null
let contadorClique = 0
let acerto = 0
let inicioJogo = new Date()
let melhorTempo = 0
criaCartas()
desenhaCartas()
function mostrarMelhorTempo(){
	if(window.localStorage.getItem("melhorTempo")){
    melhorTempo = window.localStorage.getItem("melhorTempo")
    window.alert(`O melhor tempo realizado no jogo foi: ${Math.round(melhorTempo)} segundos`)
  }else{
    window.alert(`Ainda não houve registro de melhor tempo:`)
  }
}
function iniciar() {
  inicioJogo = new Date()
  acerto = 0
  for (let elemento of document.getElementsByClassName("carta")) {
    elemento.className = "carta"
  }
  embaralhaCartas()
  desenhaCartas()
  setTimeout(function () {
    viraTodasCartas()
  }, 2000);
}
function fimDeJogo() {
  let finalJogo = new Date()
  let tempo = (finalJogo - inicioJogo) / 1000
  window.alert(`Você terminou o jogo em ${Math.round(tempo)} segundos`)
  if (tempo <= melhorTempo ||
    !window.localStorage.getItem("melhorTempo")){
    window.localStorage.setItem("melhorTempo", tempo)
  }
}
function criaCartas() {
  let j = 1
  for (let i = 1; i <= 16; i++) {
    cartas.push(i)
    cartasViradas.push("costascartas.png")
    figuras.push(`figura${j}.png`)
    j = j + (i % 2 == 0 ? 1 : 0)
  }
}
function embaralhaCartas() {
  cartas.sort(() => (Math.random() > .5) ? 1 : -1)
  figuras = []
  for (let carta of cartas) {
    let j = carta % 2 == 0 ? (carta / 2) : (carta + 1) / 2
    figuras.push(`figura${j}.png`)
  }
}
function desenhaCartas() {
  document.getElementById("tabuleiro").innerHTML = null
  for (let carta of cartas) {
    document.getElementById("tabuleiro").innerHTML += `
    <div class="carta" id="carta-${carta}" onclick="compara(${carta})">
    <img class="imagem" src="imagens/${figuras[cartas.indexOf(carta)]}"> 
    </div>
    `
  }
}
function viraTodasCartas() {
  document.getElementById("tabuleiro").innerHTML = null
  for (let carta of cartas) {
    document.getElementById("tabuleiro").innerHTML += `
    <div class="carta" id="carta-${carta}" onclick="compara(${carta})">
    <img class="imagem" src="imagens/${cartasViradas[cartas.indexOf(carta)]}"> 
    </div>
    `
  }
}
function viraUmaCarta(carta) {
  document.getElementById(`carta-${carta}`).innerHTML = `
  <img class="imagem" src="imagens/${figuras[cartas.indexOf(carta)]}"> 
  </div>
  `
}
function desviraCartas(carta, primeiraCarta) {
  document.getElementById(`carta-${carta}`).innerHTML = `
  <img class="imagem" src="imagens/${cartasViradas[cartas.indexOf(carta)]}"> 
  </div>
  `
  document.getElementById(`carta-${primeiraCarta}`).innerHTML = `
  <img class="imagem" src="imagens/${cartasViradas[cartas.indexOf(primeiraCarta)]}"> 
  </div>
  `
}
function clicarCarta(carta) {
  document.getElementById(`carta-${carta}`).className = "carta clicada"
}
function desclicarCartas(carta) {
  document.getElementById(`carta-${carta}`).className = "carta"
  document.getElementById(`carta-${primeiraCarta}`).className = "carta"
}
function compara(carta) {
  if (contadorClique < 2) {
    if (document.getElementById(`carta-${carta}`).className != "carta clicada") {
      viraUmaCarta(carta)
      if (contadorClique == 0) {
        clicarCarta(carta)
        primeiraCarta = carta
        contadorClique = 1
      } else {
        if (figuras[cartas.indexOf(carta)] == figuras[cartas.indexOf(primeiraCarta)]) {
          clicarCarta(carta)
          contadorClique = 0
          primeiraCarta = null
          acerto = acerto + 1
        } else {
          desclicarCartas(carta)
          contadorClique = 2
          setTimeout(function () {
            desviraCartas(carta, primeiraCarta)
            contadorClique = 0
            primeiraCarta = null
          }, 1000);
        }
      }
    }
    if (acerto == 8) {
      setTimeout(function(){
        fimDeJogo()
      }, 500)
    }
  }
}
