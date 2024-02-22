import { useMediaQuery } from 'react-responsive'
const VideoContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const type = message?.messageFiles?.length && message?.messageFiles[0]?.type;
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })


    return (
        <div style={{ maxWidth: isMobileWidth ? "480px" : "400px", borderRadius: "18px", height: "220px", overflow: "hidden", }}>
            <video style={{ maxHeight: "220px" }} controls>
                <source src={url} {...type} />
            </video>
        </div>
    );
};

export default VideoContent;