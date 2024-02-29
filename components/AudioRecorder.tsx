import React, { useState, useRef, useEffect } from 'react';
import { handleSentMessage } from '../utils/functions/message';
import { useStateProvider } from '../context/StateContext';
import { Button } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';

const AudioRecorder = ({ message }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const [{ userInfo, socket, draftMessages, }, dispatch]: any = useStateProvider()


    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = handleDataAvailable;
                mediaRecorderRef.current.onstop = handleStop;

                setIsRecording(true);
                setRecordingTime(0);
                timerRef.current = setInterval(() => {
                    setRecordingTime((prevTime) => prevTime + 1);
                }, 1000);

                mediaRecorderRef.current.start();
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            chunksRef.current.push(event.data);
        }
    };

    const handleStop = () => {
        const recordedBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const file = new File([recordedBlob], `${new Date().toString()}_voice.wav`, { type: recordedBlob.type });
        addAudioElement(file)
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        if (hours === 0) {
            return `${minutes}:${remainingSeconds}`;
        }
        return `${hours}:${minutes}:${remainingSeconds}`;
    };

    useEffect(() => {
        return () => {
            stopRecording();
        };
    }, []);

    //send voice message
    const addAudioElement = async (file: any) => {
        const filesData = [{
            "fileName": file.name,
            "fileType": file.type,
        }]

        const jsonFiles = filesData?.map(item => JSON.stringify(item))
        const response = await fetch(`https://feed.kotha.im/app/feed/getS3FileUploadUrl?files=[${jsonFiles}]
                    &folder=messaging&uploaderId=${userInfo?.id}`, { method: 'GET' });
        const data = await response.json();
        if (response) {
            // setShowVoiceForm(false)
            data?.map(async (url: any) => {
                const myHeaders = new Headers({ 'Content-Type': file?.type });
                const response = await fetch(url?.signed_request, {
                    method: 'PUT',
                    headers: myHeaders,
                    body: file,
                });
                if (response) {
                    handleSentMessage({
                        ...message,
                        cloudfrontUrl: url?.cloudfrontUrl,
                        message: "Audio",
                        messageMeta: {
                            contentType: 4,
                            privateSticker: false
                        },
                        messageFiles: [
                            {
                                filepath: url?.cloudfrontUrl,
                                filename: file?.name,
                                mimetype: file?.type
                            }
                        ]
                    }, socket, dispatch, draftMessages)
                }
            })
        }
    };

    return (
        <div>
            <div>Recording Time: {formatTime(recordingTime)} seconds</div>
            {/* <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button> */}
            <Button variant='' onClick={stopRecording} >
                <AiOutlineSend className="brand-color text-light" style={{ height: "30px", width: "30px" }} />
            </Button>
        </div>
    );
};

export default AudioRecorder;
