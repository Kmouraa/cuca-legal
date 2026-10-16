//---------elementos---------
const comoJogar = document.querySelector("#como-jogar")
const btnComoJogar = document.querySelector("#btn-como-jogar")
const btnFecharRegras = document.querySelector("#btn-fechar-regras")
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const botaoJogar = document.getElementById('btn-jogar');
const botaoHome = document.querySelector('#btn-home')
const niveis = document.querySelectorAll(".nivel")
const carta = document.querySelector('#carta')
const virar = document.querySelector('#btn-virar')
const novaCarta = document.querySelector('#btn-nova')


//---------estados do jogo--------

let perguntas = []
let nivelAtual = "novato"
let cartaAtual = []
let mostrandoRespostas = false
let usadas = []

async function carregarPerguntas() {
    const arquivo = await fetch('src/data/perguntas.json');
    const dados = await arquivo.json();
    perguntas = dados;
}

function sortearPergunta(nivel, tema) {
    const perguntasFiltradas = perguntas.filter(p => p.nivel === nivel && p.tema === tema && !usadas.includes(p.id));
    if (perguntasFiltradas.length === 0) {
    usadas = [];
    return sortearPergunta(nivel, tema);
}
    const perguntaSorteada = perguntasFiltradas[Math.floor(Math.random() * perguntasFiltradas.length)];
    usadas.push(perguntaSorteada.id)
    return perguntaSorteada;
    
}

function sortearCharada(numero) {
    const perguntasFiltradas = perguntas.filter(p => p.nivel === "racha-cuca" && p.numero === numero && !usadas.includes(p.id));
    if (perguntasFiltradas.length === 0) {
    usadas = [];
    return sortearCharada(numero);
}
    const perguntaSorteada = perguntasFiltradas[Math.floor(Math.random() * perguntasFiltradas.length)];
    usadas.push(perguntaSorteada.id)
    return perguntaSorteada;
    
}

function montarCarta() {
    cartaAtual = []
    const linhas = document.querySelectorAll("#carta li")
    linhas.forEach(function (linha, i) {
        const tema = linha.dataset.tema
        let sorteada
        if (nivelAtual === "racha-cuca") {
            sorteada = sortearCharada(i + 1)
        } else {
            sorteada = sortearPergunta(nivelAtual, tema)
        }
        const texto = linha.querySelector(".texto")
        texto.textContent = sorteada.pergunta
        cartaAtual.push(sorteada)
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

function abrirRegras() {
    comoJogar.hidden = false
    btnFecharRegras.focus()
}

function fecharRegras() {
    comoJogar.hidden = true
    btnComoJogar.focus()
}


//---------eventos----------

botaoJogar.addEventListener("click", jogar)
botaoHome.addEventListener("click", home)
btnComoJogar.addEventListener("click", abrirRegras)
btnFecharRegras.addEventListener("click", fecharRegras)

comoJogar.addEventListener("click", function (evento) {
    if (evento.target === comoJogar) {
        fecharRegras()
    }
})

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !comoJogar.hidden) {
        fecharRegras()
    }
})

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

novaCarta.addEventListener("click", montarCarta)


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