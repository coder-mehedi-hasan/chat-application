import React, { useState } from 'react'
import TestChilderm from '../components/Test'
import { Modal, Button } from 'react-bootstrap';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

export default function Test() {
    const [modal, setModal] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
        }
    })

    const addAudioElement = (blob) => {
        console.log(blob)
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

    const handleFileChange = (files) => {
        console.log(files)
    };

    const handleAudioStop = (data) => {
        console.log(data)
        // setModal(data);
    }

    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const handleCountDown = (data) => {
        console.log(data);
    }

    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        setModal(reset)
    }

    return (
        <>
            <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="webm"
            />
            {/* <input type="file" onChange={(e) => handleFileChange(e.target.files)} /> */}
            {/* <Recorder
                record={true}
                title={"New recording"}
                audioURL={modal.url}
                showUIAudio
                handleAudioStop={data => handleAudioStop(data)}
                handleAudioUpload={data => handleAudioUpload(data)}
                handleCountDown={data => handleCountDown(data)}
                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            /> */}
        </>
    )
}