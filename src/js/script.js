//---------elementos---------

const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const botaoJogar = document.getElementById('btn-jogar');
const botaoHome = document.querySelector('#btn-home')
const niveis = document.querySelectorAll(".nivel")
const carta = document.querySelector('#carta')
const virar = document.querySelector('#btn-virar')


//---------estados do jogo--------

let perguntas = []
let nivelAtual = "novato"
let cartaAtual = []
let mostrandoRespostas = false

async function carregarPerguntas() {
    const arquivo = await fetch('src/data/perguntas.json');
    const dados = await arquivo.json();
    perguntas = dados;
}

function sortearPergunta(nivel, tema) {
    const perguntasFiltradas = perguntas.filter(p => p.nivel === nivel && p.tema === tema);
    const perguntaSorteada = perguntasFiltradas[Math.floor(Math.random() * perguntasFiltradas.length)];
    return perguntaSorteada;
}

function montarCarta() {
    cartaAtual = []
    const linhas = document.querySelectorAll("#carta li")
    linhas.forEach(function (linha) {
        const tema = linha.dataset.tema
        const pergunta = sortearPergunta(nivelAtual, tema)
        const texto = linha.querySelector(".texto")
        texto.textContent = pergunta.pergunta
        cartaAtual.push(pergunta)
    });
}



function mostrarVerso() {
    const linhas = document.querySelectorAll("#carta li");
    mostrandoRespostas = true;

    linhas.forEach(function (resposta, i) {
        const texto = resposta.querySelector(".texto");
        texto.textContent = cartaAtual[i].resposta;
    });
}

function mostrarFrente() {
    const linhas = document.querySelectorAll("#carta li");
    mostrandoRespostas = false;

    linhas.forEach(function (resposta, i) {
        const texto = resposta.querySelector(".texto");
        texto.textContent = cartaAtual[i].pergunta;
    });
}



function jogar() {
    telaInicio.hidden = true
    telaJogo.hidden = false
    montarCarta()
}

function home() {
    telaInicio.hidden = false
    telaJogo.hidden = true
}


//---------eventos----------

botaoJogar.addEventListener("click", jogar)
botaoHome.addEventListener("click", home)

niveis.forEach(function (botaoNivel) {
    botaoNivel.addEventListener("click", function () {
        nivelAtual = botaoNivel.dataset.nivel
        montarCarta()
        carta.dataset.nivel = nivelAtual
        carta.querySelector("h2").textContent = botaoNivel.textContent + " - Perguntas"
        niveis.forEach(function (outro) {         // 2º forEach: DENTRO do clique
            outro.setAttribute("aria-pressed", "false")
        })
        botaoNivel.setAttribute("aria-pressed", "true")
    })

})




virar.addEventListener("click", function () {
    if (mostrandoRespostas) {
        mostrarFrente();
        mostrandoRespostas = false;
        virar.textContent = "Ver respostas";
    } else {
        mostrarVerso();
        mostrandoRespostas = true;
        virar.textContent = "Ver perguntas";
    }
});





carregarPerguntas();