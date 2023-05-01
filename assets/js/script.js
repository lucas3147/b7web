let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';

    for (let i = 0; i < etapa.numeros; i++){
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }else {
            numeroHTML += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter(item => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidatoAtual = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidatoAtual.nome} <br/> Partido: ${candidatoAtual.partido}`
        
        let fotosHtml = '';
        for (let i in candidatoAtual.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="assets/images/${candidatoAtual.fotos[i].url}" alt="foto do candidato" />${candidatoAtual.fotos[i].legenda}</div>`
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    alert("Clicou em Branco");
}

function corrige() {
    alert("Clicou em Corrige");
}

function confirma() {
    alert("Clicou em Confirma");
}

comecarEtapa();