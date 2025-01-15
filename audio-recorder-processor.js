class AudioRecorderProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.recordedChunks = [];
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        // Armazenar o áudio capturado
        if (input.length > 0) {
            this.recordedChunks.push(input[0]);
        }

        // Passar o áudio para a saída
        output[0].set(input[0]);

        return true;
    }

    getRecordedChunks() {
        return this.recordedChunks;
    }
}

// Registrar o AudioWorkletProcessor
registerProcessor('audio-recorder-processor', AudioRecorderProcessor);
