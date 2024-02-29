import React, { useRef, useState, useEffect, forwardRef } from 'react';

const ParentComponent = () => {

    const audioRef = useRef(null);
    const [duration, setDuration] = useState('Loading...');

    useEffect(() => {
        const audioPlayer = audioRef.current;

        const handleMetadataLoaded = () => {
            const audioDuration = audioPlayer.duration;
            setDuration(formatDuration(audioDuration));
        };

        if (audioPlayer) {
            audioPlayer.addEventListener('loadedmetadata', handleMetadataLoaded);

            // Clean up event listener on component unmount
            return () => {
                audioPlayer.removeEventListener('loadedmetadata', handleMetadataLoaded);
            };
        }
    }, [audioRef]);

    console.log(audioRef)

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes} minutes and ${remainingSeconds} seconds`;
    };

    useEffect(() => {
        if (audioRef && !audioRef.current.currentTime) {
            // audioRef?.current?.
            audioRef.current.currentTime = 8
        }
    }, [audioRef])

    return (
        <div>
            {/* <input type="file" name="" id="" onChange={(e) => console.log(e.target.files)} />
            <button onClick={handleStartRecording}>Start Recording from Parent</button>
            <button onClick={handleStopRecording}>Stop Recording from Parent</button> */}
            {/* <AudioRecorder ref={audioRecorderRef} /> */}
            <audio controls ref={audioRef}>
                <source src="https://cdn.kotha.app/messaging/1709052363690_Recorder_11b22e07_e0ec_4fca_9d38_bccf2ae4dd29.m4a" />
                Your browser does not support the audio element.
            </audio>
            <p>Duration: {duration}</p>
        </div>
    );
};

const AudioRecorder = forwardRef((props, ref) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/wav' });
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
        console.log(recordedBlob)
        // You can now do something with the recorded audio Blob, e.g., save it or play it.
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}:${minutes}:${remainingSeconds}`;
    };

    useEffect(() => {
        if (ref) {
            ref.current = {
                startRecording,
                stopRecording,
                formatTime,
                // Add other methods or properties if needed
            };
        }

        return () => {
            // Cleanup: stop recording and clear the interval when the component unmounts
            stopRecording();
        };
    }, [ref, startRecording, stopRecording]);

    return (
        <div>
            <div>Recording Time: {formatTime(recordingTime)}</div>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
});

export default ParentComponent;
