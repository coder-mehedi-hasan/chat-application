import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomImageGallery from '../Modal/CustomImageGallery';
import { useQuery } from '@tanstack/react-query';

const ImageContent = ({ message }) => {
    const [gallery, setGallery] = useState(false);
    const [loading, setLoading] = useState(message?.isLoading ?? false)

    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    // let loading = false
    const checkImage = (url) => {
        // var image = new Image().;
        // image.onload = function () {
        //     if (this.width > 0) {
        //         // console.log("image exists");
        //         loading = true
        //     }
        // }
        // image.onerror = function () {
        //     // console.log("image doesn't exist");
        //     loading = false
        // }
        // image.src = url;

        return url
    }
    // let loading = false

    // function checkImage(url) {
    //     // let loading = false
    //     let request = new XMLHttpRequest();
    //     request.open("GET", url, true);
    //     request.send();
    //     request.onload = function () {
    //         status = request.status;
    //         if (request.status == 200) //if(statusText == OK)
    //         {
    //             // imageExist = true
    //             loading = false
    //         } else {
    //             loading = true
    //         }
    //     }
    // }
    // url && checkImage(url)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // setLoading(false);
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [url]);

    const { data, isLoading } = useQuery({
        queryKey: ["test image loading",message?._id],
        // enabled: loading,
        queryFn: () => validateImageUrl(url)
    })

    function validateImageUrl(imageUrl: any) {
        fetch(imageUrl)
            .then(response => {
                if (response.ok) {
                    console.log('Image URL is valid');
                    setLoading(false)
                } else {
                    console.log('Image URL is invalid');
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log('Error validating image URL');
            });
    }

    return (
        <>
            <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => setGallery(!gallery)} ></div>
                {
                    // loading ?
                    //     "Loading ...." :
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