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
const avisoErro = document.querySelector("#aviso-erro")


//---------estados do jogo--------

let perguntas = []
let nivelAtual = "novato"
let cartaAtual = []
let mostrandoRespostas = false
let usadas = []

async function carregarPerguntas() {
    try {
        const arquivo = await fetch("src/data/perguntas.json")
        if (!arquivo.ok) {
            throw new Error("Não foi possível ler o arquivo (código " + arquivo.status + ")")
        }
        perguntas = await arquivo.json()
        botaoJogar.disabled = false
    } catch (erro) {
        console.error(erro)
        avisoErro.hidden = false
    }
}

function sortearPergunta(nivel, tema) {
    const perguntasFiltradas = perguntas.filter(p => p.nivel === nivel && p.tema === tema && !usadas.includes(p.id));
    const existentes = perguntas.filter(p => p.nivel === nivel && p.tema === tema)
if (existentes.length === 0) {
    console.error("Não existem perguntas para", nivel, tema)
    return undefined
}
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
    const existentes = perguntas.filter(p => p.nivel === "racha-cuca" && p.numero === numero)
if (existentes.length === 0) {
    console.error("Não existe charada de número", numero)
    return undefined
}
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
        if (!sorteada) {
    sorteada = { pergunta: "Pergunta indisponível", resposta: "-" }
}
        const texto = linha.querySelector(".texto")
        texto.textContent = sorteada.pergunta
        cartaAtual.push(sorteada)
    });
    ajustarCarta()
}

function ajustarTexto(linha) {
    const texto = linha.querySelector(".texto")
    let tamanho = 16
    texto.style.fontSize = tamanho + "px"

    while (linha.scrollHeight > linha.clientHeight && tamanho > 10) {
        tamanho = tamanho - 0.5
        texto.style.fontSize = tamanho + "px"
    }
}

function ajustarCarta() {
    document.querySelectorAll("#carta li").forEach(ajustarTexto)
}


function mostrarVerso() {
    const linhas = document.querySelectorAll("#carta li");
    mostrandoRespostas = true;

    linhas.forEach(function (resposta, i) {
        const texto = resposta.querySelector(".texto");
        texto.textContent = cartaAtual[i].resposta;
    });
    ajustarCarta()
}

function mostrarFrente() {
    const linhas = document.querySelectorAll("#carta li");
    mostrandoRespostas = false;

    linhas.forEach(function (resposta, i) {
        const texto = resposta.querySelector(".texto");
        texto.textContent = cartaAtual[i].pergunta;
    });
    ajustarCarta()
}



function jogar() {
    if (perguntas.length === 0) return
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
window.addEventListener("resize", ajustarCarta)

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