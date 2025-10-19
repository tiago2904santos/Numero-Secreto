let listaDeNumerosSorteados = [];
let numeroLimite = 5000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function mostrarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", 
    {rate:1.2});
    
}

function ExibirMensagemInicial() {
    mostrarTextoNaTela("h1", "Jogo do Número Secreto");
    mostrarTextoNaTela("p", "Escolha um número entre 1 e 5000");
}

ExibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        mostrarTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        mostrarTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            mostrarTextoNaTela("p", `O número secreto é menor que ${chute}`);
        } else {
            mostrarTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // Mover aqui
        return numeroEscolhido; // Corrigido
    }
}

function limparCampo() {
    let chute = document.querySelector("input"); // Corrigido com let
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    ExibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
