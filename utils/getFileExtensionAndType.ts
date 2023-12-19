export function getFileExtensionAndType(link:any) {
    const url = new URL(link);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();
    const filenameParts = filename.split('.');

    if (filenameParts.length > 1) {
        const extension = filenameParts.pop();
        const fileType = extension.split('?')[0]; // Remove query parameters if any

        return {
            extension: extension,
            fileType: fileType
        };
    } else {
        return {
            extension: null,
            fileType: null
        };
    }
}