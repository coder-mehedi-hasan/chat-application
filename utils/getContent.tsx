import React from 'react';
import TextContent from '../components/Messages/TextContent';
import ImageContent from '../components/Messages/ImageContent';
import VoiceContent from '../components/Messages/VoiceContent';
import StickerContent from '../components/Messages/StickerContent';
import VideoContent from '../components/Messages/VideoContent';
import FilesContent from '../components/Messages/FilesContent';
import LocationContent from '../components/Messages/LocationContent';

const getContent = (message: any) => {
    const contentType = message?.messageMeta?.contentType
    switch (contentType) {
        case 1:
            return <TextContent content={message?.message} message={message} />
        case 2:
            return <StickerContent message={message} />
        case 3:
            return <ImageContent message={message} />
        case 4:
            return <VoiceContent message={message} />
        case 5:
            return <VideoContent message={message} />
        case 6:
            return <LocationContent message={message} />
        // case 7:
        //     return <TextContent isSender={true} content={message?.message} message={message} />
        case 8:
            return <FilesContent message={message} />
        case 14:
            return <TextContent isSender={true} content={message?.message} message={message} isReplay={true} />
        default:
            break;
    }

};

export default getContent;