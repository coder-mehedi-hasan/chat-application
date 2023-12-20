export const identifyTextOrLink = (input) => {
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (linkRegex.test(input)) {
        return 'link';
    } else {
        return 'text';
    }
}