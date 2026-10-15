async function carregarPerguntas() {
    const arquivo = await fetch('src/data/perguntas.json');
    const dados = await arquivo.json();
    console.log(dados);
}

carregarPerguntas();