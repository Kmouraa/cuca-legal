//---------elementos---------

const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const botaoJogar = document.getElementById('btn-jogar');
const botaoHome = document.querySelector('#btn-home')


//---------estados do jogo--------

let perguntas = [];

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
    const linhas = document.querySelectorAll("#carta li")
    linhas.forEach(function (linha) {
        const tema = linha.dataset.tema
        const pergunta = sortearPergunta("novato", tema)
        const texto = linha.querySelector(".texto")
        texto.textContent = pergunta.pergunta
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


carregarPerguntas();