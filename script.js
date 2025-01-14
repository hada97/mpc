// Adicionando o evento de clique para cada pad
for (let i = 1; i <= 16; i++) {
    document.getElementById(`pad${i}`).addEventListener('click', () => playSound(`sound${i}`));
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reseta o áudio para começar do início
    sound.play();
}


// Captura o controle de cor
const corControl = document.getElementById("corbody");

// Função para alterar a cor do fundo com base no valor do range
corControl.addEventListener("input", function () {
    const corValue = corControl.value;
    const color = `rgb(${255 - (corValue * 2.55)}, ${255 - (corValue * 2.55)}, ${255 - (corValue * 2.55)})`;
    document.body.style.backgroundColor = color;
});



// Captura o controle de cor para a div.mpc-body
const corMpcControl = document.getElementById("cormpc");

corMpcControl.addEventListener("input", function () {
    const corValue = corMpcControl.value;
    const color = `rgb(${255 - (corValue * 2.55)}, ${255 - (corValue * 2.55)}, ${255 - (corValue * 2.55)})`;
    const mpcBody = document.querySelector('.mpc-body');
    mpcBody.style.backgroundColor = color;
});
