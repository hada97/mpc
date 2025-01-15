
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
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
  // Adicione mais pastas aqui
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
  screen.textContent = `${currentFolder.name}`;
}

// Função para ir para a próxima pasta
nextButton.addEventListener("click", function () {
  currentFolderIndex = (currentFolderIndex + 1) % soundPacks.length; 
  updatePadSounds(currentFolderIndex);
});

// Função para ir para a pasta anterior
prevButton.addEventListener("click", function () {
  currentFolderIndex =
    (currentFolderIndex - 1 + soundPacks.length) % soundPacks.length; 
  updatePadSounds(currentFolderIndex);
});

// Inicializa com a primeira pasta
updatePadSounds(currentFolderIndex);

// Adicionando o evento de clique para cada pad
for (let i = 1; i <= 16; i++) {
  document
    .getElementById(`pad${i}`)
    .addEventListener("click", () => playSound(`sound${i}`));
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0;
  sound.play();
}

// Captura o controle de cor
const corControl = document.getElementById("corbody");
corControl.addEventListener("input", function () {
  const corValue = corControl.value;
  const color = `rgb(${255 - corValue * 2.55}, ${255 - corValue * 2.55}, ${
    255 - corValue * 2.55
  })`;
  document.body.style.backgroundColor = color;
});

// Captura o controle de cor para a div.mpc-body
const corMpcControl = document.getElementById("cormpc");
corMpcControl.addEventListener("input", function () {
  const corValue = corMpcControl.value;
  const color = `rgb(${255 - corValue * 2.55}, ${255 - corValue * 2.55}, ${
    255 - corValue * 2.55
  })`;
  const mpcBody = document.querySelector(".mpc-body");
  mpcBody.style.backgroundColor = color;
});

// Controle de volume
const volumeControl = document.getElementById("volume-control");

// Atualiza o volume de todos os sons ao mesmo tempo
volumeControl.addEventListener("input", function () {
  const volume = this.value;
  for (let i = 1; i <= 16; i++) {
    const sound = document.getElementById(`sound${i}`);
    sound.volume = volume; 
  }
});



// Variáveis de controle para gravação
let audioContext;
let recorderNode;
let isRecording = false;
let recordedChunks = [];
let mediaRecorder;
let recordedBlob;

// Referências dos botões de controle
const recordButton = document.getElementById("record-btn");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const clearButton = document.getElementById("clear-btn");
const statusDisplay = document.getElementById("status");
const recordedAudio = document.getElementById("recorded-audio");

// Função para iniciar o AudioContext
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Função para configurar o `MediaRecorder` com áudio do sistema
async function startRecording() {
  initAudioContext(); 
  
  if (isRecording) return;

  // Configura o status de gravação
  statusDisplay.textContent = "Gravando";


  // Vamos capturar o áudio dos sons dos pads
  const sources = [];
  for (let i = 1; i <= 16; i++) {
    const soundElement = document.getElementById(`sound${i}`);
    const source = audioContext.createMediaElementSource(soundElement);
    sources.push(source);
  }

  // Criar um `GainNode` para combinar os sons e enviar para o destino
  const gainNode = audioContext.createGain();
  sources.forEach(source => source.connect(gainNode));
  gainNode.connect(audioContext.destination);

  // Criar um MediaStreamAudioDestinationNode para capturar o áudio do sistema
  const destination = audioContext.createMediaStreamDestination();
  gainNode.connect(destination);

  // Criar o MediaRecorder com o destino de gravação
  mediaRecorder = new MediaRecorder(destination.stream);

  // Armazenar os dados gravados
  mediaRecorder.ondataavailable = function (event) {
    recordedChunks.push(event.data);
  };

  // Quando a gravação terminar, gerar um Blob e configurar o áudio para reprodução
  mediaRecorder.onstop = function () {
    recordedBlob = new Blob(recordedChunks, { type: "audio/wav" });
    recordedAudio.src = URL.createObjectURL(recordedBlob);
    recordedChunks = []; // Limpar os pedaços gravados
    statusDisplay.textContent = "Gravação concluída";
  };

  // Iniciar a gravação
  mediaRecorder.start();
  isRecording = true;
}

// Função para parar a gravação
function stopRecording() {
  if (!isRecording) return; // Se não estiver gravando, não faça nada

  // Parar o MediaRecorder
  mediaRecorder.stop();
  isRecording = false;
}

// Função para reproduzir a gravação
function playRecording() {
  if (!recordedBlob) {
    statusDisplay.textContent = "Nenhuma gravação encontrada";
    return;
  }

  // Reproduz o áudio gravado
  recordedAudio.play();
  statusDisplay.textContent = "Reproduzindo gravação";
}

// Função para limpar a gravação
function clearRecording() {
  recordedChunks = [];
  recordedAudio.src = "";
  statusDisplay.textContent = "Pronto para gravar";
}

// Adicionar event listeners aos botões
recordButton.addEventListener("click", function () {
  initAudioContext(); // Inicializa o AudioContext no cilck
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
});

playButton.addEventListener("click", playRecording);
pauseButton.addEventListener("click", function () {
  recordedAudio.pause();
  statusDisplay.textContent = "Status: Pausado";
});
clearButton.addEventListener("click", clearRecording);
