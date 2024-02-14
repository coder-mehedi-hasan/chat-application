const StickerContent = ({ message }) => {
    let messageHyperlink = message?.messageHyperlink;
    if (messageHyperlink.startsWith("data:sticker/")) {
        let urlStartIndex = "data:sticker/".length;
        let url = messageHyperlink.substring(urlStartIndex);
        messageHyperlink = url
    }

    return (
        <>
            const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
        </>
    );
};

export default StickerContent;