import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomImageGallery from '../Modal/CustomImageGallery';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMediaQuery } from 'react-responsive'


const ImageContent = ({ message }) => {
    const [gallery, setGallery] = useState(false);
    const [selectedImage, setSelectedImage] = useState("")
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })

    return (
        <>
            <div style={{ maxWidth: isMobileWidth ? "480px" : "400px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => {
                    setGallery(!gallery)
                    setSelectedImage(message?._id)
                }} ></div>
                <img src={url} alt="img" style={{ maxWidth: "100%", maxHeight: "220px" }} />
            </div>
            <Modal show={gallery} className='image-content'>
                <CustomImageGallery onClick={setGallery} imageId={selectedImage} />
            </Modal>
        </>
    );
};

export default ImageContent;