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

export const isFileIsImage = (file) => {
    const extesion = getFileExtension(file)
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    if (imageExtensions.includes(extesion.toLowerCase())) {
        return !!(fileTypes?.image);
    }
    return false
}

function getFileExtension(file: any) {

    const fileName = file?.name;
    const parts = fileName?.split('.');
    const extension = parts[parts?.length - 1];

    return extension;
}