import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useStateProvider } from '../../context/StateContext';

const VoiceContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const [{ userInfo }, dispatch]: any = useStateProvider()
    const isSender = message?.messageFromUserID === userInfo?.id
    return (
        <>
            <ReactAudioPlayer
                src={url}
                controls
                className={isSender ? "sender-voice-content" : ""}
            />
        </>
    );
};

export default VoiceContent;