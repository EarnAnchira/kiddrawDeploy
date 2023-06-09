import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

let word="hello"
const SpeakingGame = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p style={{ color: 'white' }}>Microphone: {listening ? 'on' : 'off'}</p>
            <h1 style={{ color: 'white' }} >{word}</h1>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p style={{ color: 'white' }} >{transcript}</p>
            
        </div>
    );
};
export default SpeakingGame;