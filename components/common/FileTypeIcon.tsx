import React from 'react';
import { FaFile, FaFileImage, FaFilePdf, FaFileAudio, FaFileVideo, FaFileAlt, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';

const FileTypeIcon = ({ extension }) => {
    const lowercaseExtension = extension.toLowerCase();

    // Define mappings between file extensions and corresponding icons
    const iconMap = {
        'jpg': <FaFileImage />,
        'jpeg': <FaFileImage />,
        'png': <FaFileImage />,
        'gif': <FaFileImage />,
        'pdf': <FaFilePdf />,
        'mp3': <FaFileAudio />,
        'wav': <FaFileAudio />,
        'mp4': <FaFileVideo />,
        'webm': <FaFileVideo />,
        'doc': <FaFileWord />,
        'docx': <FaFileWord />,
        'xls': <FaFileExcel />,
        'xlsx': <FaFileExcel />,
        'ppt': <FaFilePowerpoint />,
        'pptx': <FaFilePowerpoint />,
        // Add more mappings as needed
        'default': <FaFileAlt />,
    };

    const fileIcon = iconMap[lowercaseExtension] || iconMap['default'];

    return <>{fileIcon}</>;
};

export default FileTypeIcon;
