import { fileTypes } from "./constant";

export const getFileType = (extension) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'wmv'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma', 'aiff', 'ape', 'alac', 'opus', 'webm'];

    if (imageExtensions.includes(extension.toLowerCase())) {
        return fileTypes?.image;
    } else if (videoExtensions.includes(extension.toLowerCase())) {
        return fileTypes?.video;
    } else if (audioExtensions.includes(extension.toLowerCase())) {
        return fileTypes?.audio;
    } else {
        return fileTypes?.other;
    }
}
