# 🧠 Racha Cuca Digital

Versão digital do jogo de tabuleiro de perguntas e respostas **Cuca Legal**, feita para dar uma nova vida às cartas depois que todo mundo já decorou as 600 perguntas da caixa.

> 🚧 **Status:** em desenvolvimento. Este é um projeto de estudo, criado para praticar programação e Git/GitHub.

---

## 💡 Por que este projeto existe

O jogo físico vem com 600 perguntas. Depois de algumas partidas, os jogadores já sabem as respostas de cor e a graça diminui. A ideia aqui é criar uma "carta digital" que sempre traga perguntas novas, usando um banco de perguntas que pode ser ampliado a qualquer momento.

## 🎯 Como o jogo funciona

Assim como na carta física, cada **carta digital** traz uma pergunta de **cada tema**, e o jogador escolhe apenas o **nível**. O tema que vale na rodada é o da casa em que o peão parou no tabuleiro.

1. Escolha o nível.
2. Toque em **Nova carta**.
3. Leia a pergunta do tema que caiu no tabuleiro.
4. Toque em **Ver resposta** para conferir.

As perguntas são abertas, ou seja, **não têm alternativas**: o jogador responde em voz alta e depois confere.

### 🏆 Níveis

| Nível | Descrição |
|---|---|
| 🌱 **Novato** | Perguntas mais fáceis |
| 🧐 **Sabichão** | Perguntas de dificuldade média |
| 🔥 **Fera** | Perguntas mais difíceis |
| ⭐ **Racha Cuca** | Nível especial, só de **"o que é o que é?"** e charadas, numeradas de 1 a 6 (o dado escolhe) |

#### ⭐ Como funciona a carta Racha Cuca

A carta do nível especial também tem **6 perguntas**, mas em vez de serem separadas por tema, elas são **numeradas de 1 a 6**. O número que cair no **dado** define qual charada será lida.

No app, cada nova carta sorteia 6 charadas do banco e as numera de 1 a 6. Assim o mesmo "formato de carta" do jogo físico é mantido, e as charadas podem aparecer em ordens diferentes a cada partida.

**Modo extra (planejado):** escolher um único tema, para jogar sem o tabuleiro.

## 🛠️ Tecnologias

- **HTML5** para a estrutura
- **CSS3** com abordagem *mobile first*
- **JavaScript** puro para a lógica do jogo
- **JSON** como banco de perguntas (sem necessidade de servidor)
- **Git e GitHub** para versionamento

## 🗂️ Estrutura do banco de perguntas

As perguntas ficam em um arquivo `perguntas.json`, neste formato:

```json
{
  "id": 1,
  "tema": "geografia",
  "nivel": "novato",
  "pergunta": "Qual é a capital do Brasil?",
  "resposta": "Brasília"
}
```

Exemplo de uma charada do nível especial:

```json
{
  "id": 2,
  "tema": "charadas",
  "nivel": "racha-cuca",
  "pergunta": "O que é, o que é? Quanto mais se tira, maior fica.",
  "resposta": "O buraco"
}
```

| Campo | Descrição |
|---|---|
| `id` | Número único da pergunta |
| `tema` | Categoria da pergunta |
| `nivel` | `novato`, `sabichao`, `fera` ou `racha-cuca` |
| `pergunta` | Texto da pergunta ou charada |
| `resposta` | Texto da resposta correta |

## 🗺️ Roadmap

- [ ] Wireframe da tela principal
- [ ] Estrutura HTML
- [ ] Visual com CSS (mobile first)
- [ ] Banco de perguntas inicial (`perguntas.json`)
- [ ] Lógica da carta: filtrar por nível e agrupar por tema
- [ ] Botão "Ver resposta"
- [ ] Nível especial Racha Cuca (carta com 6 charadas numeradas pelo dado)
- [ ] Modo "escolher um tema"
- [ ] Ideia futura: gerar novas perguntas com IA, revisar e adicionar ao banco

## 🌿 Fluxo de trabalho no Git

O projeto segue um fluxo simples:

- A branch `main` sempre fica estável.
- Cada funcionalidade nova é desenvolvida em uma branch própria (`feature/nome-da-funcionalidade`).
- Quando está pronta e testada, entra na `main` por **Pull Request**.

## ▶️ Como rodar

Por enquanto, basta clonar o repositório e abrir o arquivo `index.html` no navegador.

```bash
git clone https://github.com/Kmouraa/cuca-legal.git
```

## ⚠️ Aviso

Este é um projeto de estudo, sem fins comerciais, inspirado no jogo de tabuleiro Cuca Legal. Não tem vínculo com os criadores ou fabricantes do jogo original.

## 👤 Autor

**Kauã Moura**
Estudante de programação, construindo este projeto passo a passo.

---

⭐ Se curtiu a ideia, deixe uma estrela no repositório!
