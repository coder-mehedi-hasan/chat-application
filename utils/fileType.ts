export function getFileType(file) {
    const fileType = file?.type;

    if (fileType.startsWith('image/')) {
        return { message: 'Image', contentType: 3 };
    } else if (fileType.startsWith('audio/')) {
        return { message: 'Audio', contentType: 4 };
    } else if (fileType.startsWith('video/')) {
        return { message: 'Video', contentType: 5 };
    } else {
        return { message: 'File', contentType: 8 };
    }
}
