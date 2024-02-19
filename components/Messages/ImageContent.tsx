import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomImageGallery from '../Modal/CustomImageGallery';
import { useQuery } from '@tanstack/react-query';
import { ShimmerThumbnail } from "react-shimmer-effects";

const ImageContent = ({ message }) => {
    const [gallery, setGallery] = useState(false);
    const [loading, setLoading] = useState(message?.isLoading ?? false)

    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    // console.log(message)

    const { data, isLoading, refetch } = useQuery({
        queryKey: [`image loading ${message?._id}`],
        queryFn: () => validateImageUrl(url),
        staleTime: 0
    })

    function validateImageUrl(imageUrl: any) {
        fetch(imageUrl)
            .then(response => {
                if (response.ok) {
                    setLoading(false)
                } else {
                    setLoading(true)
                }
            })
            .catch(error => {
                setLoading(true)
            });
        return loading
    }

    useEffect(() => {
        let intervalId;
        if (loading) {
            intervalId = setInterval(() => {
                refetch();
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [loading]);




    return (
        <>
            <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => setGallery(!gallery)} ></div>
                {
                    loading ?
                        <ShimmerThumbnail height={200} rounded width={200} />
                        :
                        <img src={url} alt="img" style={{ maxWidth: "100%", maxHeight: "220px" }} />
                }
            </div>
            <Modal show={gallery} className='image-content'>
                <CustomImageGallery onClick={setGallery} image={url} />
            </Modal>
        </>
    );
};

export default ImageContent;