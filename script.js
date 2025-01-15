// Referências dos botões
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Referência para exibir o nome da pasta
const screen = document.getElementById("screen-text");

// Controle da pasta atual
let currentFolderIndex = 0;

// Estrutura de pastas de sons
const soundPacks = [
    {
        name: "Hip Hop",
        folder: "hip-hop", // nome da pasta no servidor
    },
    {
        name: "Funk",
        folder: "funk", // nome da pasta no servidor
    },
    // Adicione mais pastas conforme necessário
];

// Função para atualizar os sons nos pads
function updatePadSounds(folderIndex) {
    const currentFolder = soundPacks[folderIndex];
    
    // Atualiza os sons dos pads
    for (let i = 1; i <= 16; i++) {
        const pad = document.getElementById(`pad${i}`);
        const sound = document.getElementById(`sound${i}`);

        // Atualiza o caminho do som, assumindo que os arquivos estão na pasta correta
        sound.src = `sounds/${currentFolder.folder}/som${i}.mp3`;
    }

    // Limpa o conteúdo anterior
    screen.textContent = "";
    
    // Exibe o nome da pasta na tela
    screen.textContent = `Ritmo: ${currentFolder.name}`;
}

// Função para ir para a próxima pasta
nextButton.addEventListener("click", function() {
    currentFolderIndex = (currentFolderIndex + 1) % soundPacks.length; // Loop entre as pastas
    updatePadSounds(currentFolderIndex);
});

// Função para ir para a pasta anterior
prevButton.addEventListener("click", function() {
    currentFolderIndex = (currentFolderIndex - 1 + soundPacks.length) % soundPacks.length; // Loop entre as pastas
    updatePadSounds(currentFolderIndex);
});

// Inicializa com a primeira pasta
updatePadSounds(currentFolderIndex);

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


// Controle de volume
const volumeControl = document.getElementById("volume-control");

// Atualiza o volume de todos os sons ao mesmo tempo
volumeControl.addEventListener("input", function() {
    const volume = this.value;  // Valor do controle de volume
    for (let i = 1; i <= 16; i++) {
        const sound = document.getElementById(`sound${i}`);
        sound.volume = volume;  // Ajusta o volume de cada som
    }
});