const canvas = document.getElementById("plano");
const ctx = canvas.getContext("2d");

let fase = 1;

const origemX = 150;
const origemY = 800;

function desenharEixos(){

    ctx.strokeStyle = "#ff000070";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(origemX, 100);
    ctx.lineTo(origemX, origemY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(origemX, origemY);
    ctx.lineTo(1750, origemY);
    ctx.stroke();

}

const escala = 20;

const maxX = 80;
const maxY = 35;

function desenharMarcacoes(){

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    for(let x = 0; x <= maxX; x++){

        ctx.beginPath();

        ctx.moveTo(
            origemX + x * escala,
            origemY - 6
        );

        ctx.lineTo(
            origemX + x * escala,
            origemY + 6
        );

        ctx.stroke();
    }

    for(let y = 0; y <= maxY; y++){

        ctx.beginPath();

        ctx.moveTo(
            origemX - 6,
            origemY - y * escala
        );

        ctx.lineTo(
            origemX + 6,
            origemY - y * escala
        );

        ctx.stroke();
    }

}

function desenharNumeros(){

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";

    ctx.textAlign = "center";

    for(let x = 0; x <= maxX; x++){

        if(x % 5 === 0){

            ctx.fillText(
                x,
                origemX + x * escala,
                origemY + 20
            );

        }

    }

    ctx.textAlign = "right";

    for(let y = 0; y <= maxY; y++){

         if(y % 5 === 0){
         ctx.fillText(
             y,
             origemX - 10,
             origemY - y * escala + 4
         );
        }
    }

}

function paraTela(x,y){

    return {

        x: origemX + x*escala,

        y: origemY - y*escala

    };
};

const arqueiro = new Image();
arqueiro.src = "Arqueiro.png";

const player = {
    x: 0,
    y: 0
};

function desenharArqueiro(){

    const pos = paraTela(
        player.x,
        player.y
    );

    ctx.drawImage(
        arqueiro,
        pos.x - 60,
        pos.y - 110,
        150,
        130
    );

};

const inimigo = {
    x: 0,
    y: 0
};

const fundo = document.getElementById('plano');

function mudarCenario(){

    if(fase <= 4){
        fundo.style.backgroundImage = "url('fundo.png')";
    }
    else if(fase <= 7){
        fundo.style.backgroundImage = "url('fundo_noite.png')";
    }
    else if(fase <= 9){
        fundo.style.backgroundImage = "url('fundo_sobrio.png')";
    }
    else{
        fundo.style.backgroundImage = "url('fundo_final.png')";
    }
};

const dragao = new Image();
dragao.src = "dragao_esquerda.png";

const dragaoB = new Image();
dragaoB.src = "dragao_atingido.png";

const mago = new Image();
mago.src = "maguinho.png";

const magoB = new Image();
magoB.src = "mago_atingido.png";

const ciclope = new Image();
ciclope.src = "ciclope.png";

const ciclopeB = new Image();
ciclopeB.src = "ciclope_atingido.png";

const esqueleto = new Image();
esqueleto.src = "esqueleto_rei.png";

const esqueletoB = new Image();
esqueletoB.src = "esqueleto_atingido.png";

let monstroAtingido = false;

function desenharMonstro(){

    const pos = paraTela(
        inimigo.x,
        inimigo.y
    );
    if(monstroAtingido == false){
        if(fase <= 4){
            ctx.drawImage(
            mago,
            pos.x - 60,
            pos.y - 50,
            100,
            100
            );
        }
        else if(fase <= 7){
            ctx.drawImage(
            dragao,
            pos.x - 80,
            pos.y - 140,
            250,
            250
            );
        }
        else if (fase <= 9){
            ctx.drawImage(
            ciclope,
            pos.x - 300,
            pos.y - 150,
            800,
            850
            );
        }
        else {
            ctx.drawImage(
            esqueleto,
            pos.x - 270,
            pos.y - 150,
            600,
            700
            );
        }
    }
    else{
        if(fase <= 4){
           ctx.drawImage(
            magoB,
            pos.x - 60,
            pos.y - 60,
            100,
            100
            );
        }
        else if(fase <= 7){
            ctx.drawImage(
            dragaoB,
            pos.x - 80,
            pos.y - 140,
            250,
            250
            );
        }
        else if (fase <= 9){
            ctx.drawImage(
            ciclopeB,
            pos.x - 300,
            pos.y - 150,
            800,
            850
            );
        }
        else {
            ctx.drawImage(
            esqueletoB,
            pos.x - 270,
            pos.y - 150,
            600,
            700
            );
        }
    };
};

function randomizar_inimigo(){

    if(fase <= 4){
        inimigo.x =Math.floor(Math.random() * (30 - 5 + 1)) + 5;
        inimigo.y =Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    }

    else if(fase <= 7){
        inimigo.x =Math.floor(Math.random() * (60 - 30 + 1)) + 30;

        inimigo.y = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
    }
    else if(fase <= 9){
        inimigo.x = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
        inimigo.y = Math.floor(Math.random() * (35 - 30 + 1)) + 30;
    }
    else{
        inimigo.x = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
        inimigo.y = Math.floor(Math.random() * (25 - 20 + 1)) + 20;
    }
};

function mudar_tela(valor){
    const menu = document.getElementById("menu");
    const jogo = document.getElementById("jogo");
    const derrota = document.getElementById('tela_derrota');
    const proximaFase = document.getElementById('passar_fase');
    const vitoria = document.getElementById('tela_vitoria');

    if(valor === 'comecar'){
        monstroAtingido = false;
        erros = 0;
        pontuacao = 0;
        pontosFase = 0
        fase = 1;
        mensagem = `Fase ${fase}`;
        menu.style.display = "none";
        jogo.style.display = "flex";
        document.getElementById('a').value = "";
        document.getElementById('b').value = "";

        lancar_musica('batalha_normal');
        lancar_mensagem();
        mudarCenario();
        desenharArqueiro();
        randomizar_inimigo();
        desenharMonstro();
        desenharGuias();
        desenharNumeros();
        lancar_funcao();
        iniciar_conometro();
        loop();
    }
    else if(valor === 'tempoAcabou'){
        lancar_musica('passar_fase');
        calcularPontuacao();
        document.getElementById('scoreDerrota').innerText = `Total Score: ${pontuacao}`;
        jogo.style.display = "none";
        derrota.style.display = "flex";
    }
    else if(valor === 'passaFase'){
        lancar_musica('passar_fase');
        calcularPontuacao();
        document.getElementById('scoreFase').innerText = `Score: ${pontosFase}`;
        document.getElementById('scoreSomando').innerText = `Total Score: ${pontuacao}`;
        jogo.style.display = "none";
        proximaFase.style.display = "flex";
    }
    else if(valor === 'tela_inicio'){
        document.getElementById('maxScore').innerText =`Maior Score: ${maiorScore}`;
        fundo.style.backgroundImage = "url('fundo.jpeg')";
        vitoria.style.display = "none";
        derrota.style.display = "none";
        proximaFase.style.display = "none";
        menu.style.display = "flex";
        mudarCenario();
        lancar_musica('aria_math');
    }
    else if(valor === 'avancar'){ 
        monstroAtingido = false;
        pontosFase = 0;
        erros = 0;
        fase++;
        mensagem = `Fase ${fase}`;
        document.getElementById('a').value = "";
        document.getElementById('b').value = "";
        proximaFase.style.display = "none";
        jogo.style.display = "flex";

        if(fase == 10){lancar_musica('boss_final');}
        else{lancar_musica('batalha_normal');}
        lancar_mensagem();
        mudarCenario();
        desenharArqueiro();
        randomizar_inimigo();
        desenharMonstro();
        desenharGuias();
        desenharNumeros();
        lancar_funcao();
        iniciar_conometro();
        loop();
    }
    else if(valor === 'vencedor'){
        lancar_musica('aria_math');
        calcularPontuacao();
        document.getElementById('scoreFinal').innerText = `Total Score: ${pontuacao}`;
        jogo.style.display = "none";
        vitoria.style.display = "flex";

    }
    else if(valor === 'recomecar'){
        derrota.style.display = "none";
        jogo.style.display = "flex";
        erros = 0;
        pontosFase = 0;
        monstroAtingido = false;
        mensagem = `Fase ${fase}`;
        document.getElementById('a').value = "";
        document.getElementById('b').value = "";

        if(fase == 10){lancar_musica('boss_final');}
        else{lancar_musica('batalha_normal');}
        lancar_mensagem();
        mudarCenario();
        desenharArqueiro();
        randomizar_inimigo();
        desenharMonstro();
        desenharGuias();
        desenharNumeros();
        lancar_funcao();
        iniciar_conometro();
        loop();
    }
};

function desenharGuias(){

    const pos = paraTela(
        inimigo.x,
        inimigo.y
    );

    ctx.strokeStyle = "#ff000070";

    ctx.setLineDash([10,10]);

    ctx.beginPath();
    ctx.moveTo(origemX, pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x, origemY);
    ctx.stroke();

    ctx.setLineDash([]);
}

function lancar_funcao(){
    const conta = document.getElementById('funcao');
    conta.innerText = `${inimigo.y} = a . ${inimigo.x} + b`;
};

let mensagem = '';

function lancar_mensagem(){
    const lancar = document.getElementById('mensagem');
    lancar.innerText = mensagem;
    lancar.style.opacity = '1';

    setTimeout(() =>{lancar.style.opacity = '0'; mensagem = '';}, 2000);
};

let tempo;
let intervalo;
function iniciar_conometro(){

    if(fase <= 4){tempo = 90;}
    else if(fase <= 7){tempo = 60;}
    else if(fase <= 9){tempo = 45;}
    else{tempo = 30;};

    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    document.getElementById("cronometro").innerText = `${minutos}:${segundos.toString().padStart(2,"0")}`;

    intervalo = setInterval(() => {

        tempo--;
        minutos = Math.floor(tempo / 60);
        segundos = tempo % 60;

        document.getElementById("cronometro").innerText = `${minutos}:${segundos.toString().padStart(2,"0")}`;

        if(tempo <= 0){
            tempo = 0;
            clearInterval(intervalo);
            mudar_tela('tempoAcabou');
        }

    },1000);

};

const spriteFlecha = new Image();
spriteFlecha.src = "flecha.png";

const flecha = {
    ativa: false,
    acertou: false,
    progresso: 0
};

function Atirar(){
    verificar_funcao();
}

function verificar_funcao(){
    const a = Number(document.getElementById('a').value);
    const b = Number(document.getElementById('b').value);

    if(a === 0){
        mensagem = '"a" precisa ser maior que 0';
        lancar_mensagem();
    }
    if(inimigo.y == a * inimigo.x + b){

        animarFlecha(true);

    }
    else{
        animarFlecha(false);

    }

}

function animarFlecha(acertou){

    flecha.ativa = true;

    flecha.acertou = acertou;

    flecha.progresso = 0;

    if(!acertou){
        yErro = Math.floor(Math.random() * Math.max(1, inimigo.y));
    }

}

function atualizarFlecha(){

    if(!flecha.ativa)
        return;

    flecha.progresso += 0.01;

    if(flecha.progresso >= 1){

        flecha.ativa = false;

        if(flecha.acertou){

            clearInterval(intervalo);

            mensagem = "Victory";
            monstroAtingido = true;
            lancar_mensagem();

            setTimeout(() => {
                if(fase < 10){mudar_tela('passaFase');}
                else{mudar_tela('vencedor');};
            }, 2000)

        }
        else{

            erros++;

            mensagem = "Errou";

            lancar_mensagem();

        }

    }

}

function desenharFlecha(){

    if(!flecha.ativa)
        return;

    const inicio = paraTela(0,3);

    let alvo;

    if(flecha.acertou){

        alvo = paraTela(inimigo.x,inimigo.y);

    }
    else{

        alvo = paraTela(inimigo.x, yErro);

    }

    const x =
        inicio.x +
        (alvo.x - inicio.x) *
        flecha.progresso;

    const y =
        inicio.y +
        (alvo.y - inicio.y) *
        flecha.progresso;

    ctx.drawImage(
        spriteFlecha,
        x - 15,
        y - 15,
        30,
        30
    );

}

function loop(){
    atualizarFlecha();

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    desenharEixos();
    desenharMarcacoes();
    desenharNumeros();

    desenharArqueiro();
    desenharMonstro();
    if(fase <= 4){desenharTorre();};

    desenharGuias();

    desenharFlecha();

    requestAnimationFrame(loop);

}

const torreTopo = new Image();
torreTopo.src = "topo_torre.png";

const torreMeio = new Image();
torreMeio.src = "meio_torre.png";

const torreBase = new Image();
torreBase.src = "base_torre.png";

function desenharTorre(){

    const largura = 100;
    const alturaBloco = 50;

    const posX =
        paraTela(inimigo.x, 0).x -largura / 2;

    const alturaTorre = inimigo.y ;

    const topoTela =
        paraTela(inimigo.x,alturaTorre);

    ctx.drawImage(
        torreBase,
        posX,
        origemY - alturaBloco,
        largura,
        alturaBloco
    );

    for(let y = origemY - alturaBloco * 2; y > topoTela.y; y -= alturaBloco){
        ctx.drawImage(
            torreMeio,
            posX + 7,
            y,
            largura - 16,
            alturaBloco
        );
    }

    ctx.drawImage(
        torreTopo,
        posX - 5,
        topoTela.y,
        largura + 10,
        alturaBloco
    );
};
let maiorScore = Number(localStorage.getItem('maiorScore')) || 0;
document.getElementById('maxScore').innerText =`Maior Score: ${maiorScore}`;
let pontuacao = 0;
let erros = 0;
let pontosFase = 0;
function calcularPontuacao(){

    const tempoRestante = tempo;
    pontosFase =(100 * tempoRestante) - (50 * erros);

    pontuacao += pontosFase;

    if(pontuacao > maiorScore){
        maiorScore = pontuacao;
        localStorage.setItem('maiorScore',maiorScore);
    }
};



function lancar_musica(faseAudio){
    const aria_math = document.getElementById('aria_math');
    const batalha_normal = document.getElementById('batalha_normal');
    const audioPassarFase = document.getElementById("audio_passar_fase");
    const boss_final = document.getElementById('boss_final');


    if(faseAudio === 'batalha_normal'){
        batalha_normal.play();
        batalha_normal.volume = 0.8;
    }
    else{
        batalha_normal.pause();
        batalha_normal.currentTime = 1;
    }
    if(faseAudio === 'passar_fase'){
        audioPassarFase.play();
        audioPassarFase.volume = 0.8;
    }
    else{
        audioPassarFase.pause();
        audioPassarFase.currentTime = 1;
    }
    if(faseAudio === 'boss_final'){
        boss_final.play();
        boss_final.volume = 0.8;
    }
    else{
        boss_final.pause();
    }
    if(faseAudio === 'aria_math'){
        aria_math.play();
        aria_math.volume = 0.8;
    }
    else{
        aria_math.pause();
        aria_math.currentTime = 0;
    }

};
