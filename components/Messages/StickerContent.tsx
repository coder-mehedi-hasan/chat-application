const StickerContent = ({ message }) => {
    // console.log("sticker message", message)
    let messageHyperlink = message?.messageHyperlink;
    if (messageHyperlink.startsWith("data:sticker/")) {
        let urlStartIndex = "data:sticker/".length;
        let url = messageHyperlink.substring(urlStartIndex);
        messageHyperlink = url
    }

    return (
        <div className="" style={{ maxWidth: "150px", }}>
            <img src={messageHyperlink} alt="sticker" className="img-fluid" />
        </div>
    );
};

export default StickerContent;