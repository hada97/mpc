// Adicionando o evento de clique para cada pad
for (let i = 1; i <= 16; i++) {
    document.getElementById(`pad${i}`).addEventListener('click', () => playSound(`sound${i}`));
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reseta o áudio para começar do início
    sound.play();
}
