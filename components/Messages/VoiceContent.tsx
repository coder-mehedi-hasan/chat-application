import React, { useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useStateProvider } from '../../context/StateContext';

const VoiceContent = ({ message }) => {
    const audioRef = useRef();
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const mimeType = message?.messageFiles?.length && message?.messageFiles[0]?.mimetype;
    const [{ userInfo }, dispatch]: any = useStateProvider();
    const isSender = message?.messageFromUserID === userInfo?.id;

    useEffect(() => {
        if (audioRef && message?.messageMeta?.recordingDuration && mimeType === "audio/webm;codecs=opus") {
            audioRef.current.audioEl.current.currentTime = message?.messageMeta?.recordingDuration;
        }
    }, [audioRef])

    return (
        <>
            <ReactAudioPlayer
                src={url}
                controls
                className={isSender ? "sender-voice-content" : ""}
                ref={audioRef}
            />
        </>
    );
};

export default VoiceContent;