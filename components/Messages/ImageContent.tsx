import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomImageGallery from '../Modal/CustomImageGallery';

const ImageContent = ({ message }) => {
    const [gallery, setGallery] = useState(false);
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    return (
        <>
            <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => setGallery(!gallery)} ></div>
                <img src={url} alt="img" style={{ maxWidth: "100%", maxHeight: "220px" }} />
            </div>
            <Modal show={gallery} className='image-content'>
                <CustomImageGallery onClick={setGallery} image={url} />
            </Modal>
        </>
    );
};

export default ImageContent;