import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const VoiceContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    return (
        <>
            <ReactAudioPlayer
                src={url}
                controls
            />
        </>
    );
};

export default VoiceContent;