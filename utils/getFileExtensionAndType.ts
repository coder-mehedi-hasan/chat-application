import { getFileType } from "./getFileType";

export const getFileExtensionAndType = (link: any) => {
    const url = new URL(link);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();
    const filenameParts = filename.split('.');

    if (filenameParts.length > 1) {
        const extension = filenameParts.pop();
        const fileType = getFileType(extension)

        return {
            extension: extension,
            fileType: fileType,
            fileName: filenameParts,
        };
    } else {
        return {
            extension: null,
            fileType: null,
            fileName: null
        };
    }
}