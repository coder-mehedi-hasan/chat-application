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

export function mimeToExtension(mimeType) {
    const mimeMap = {
        'text/plain': '.txt',
        'text/html': '.html',
        'text/css': '.css',
        'application/javascript': '.js',
        'application/json': '.json',
        'application/xml': '.xml',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/svg+xml': '.svg',
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'video/mp4': '.mp4',
        'video/webm': '.webm',
        'application/pdf': '.pdf',
        'application/msword': '.doc',
        'application/vnd.ms-excel': '.xls',
        'application/vnd.ms-powerpoint': '.ppt'
        // Add more mappings as needed
    };

    // Convert to lowercase for case-insensitive comparison
    const lowercaseMimeType = mimeType.toLowerCase();

    // Check if the MIME type exists in the map
    if (mimeMap.hasOwnProperty(lowercaseMimeType)) {
        return mimeMap[lowercaseMimeType];
    } else {
        // Default to unknown extension if the MIME type is not found
        return '.unknown';
    }
}
