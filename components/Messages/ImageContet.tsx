import React, { useEffect, useState } from 'react'
import { Spinner, Modal } from 'react-bootstrap'
import { BsCheckAll, BsCheckLg } from 'react-icons/bs'
import CustomImageGallery from '../Modal/CustomImageGallery';

export default function ImageContet({ img }) {
    const [sent, setSent] = useState(false)
    const [gallery, setGallery] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setSent(true);
        }, 1000)
    }, [])

    return (
        <>
            <div>
                <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => setGallery(!gallery)}></div>
                    <img src={img} alt="img" style={{ maxWidth: "100%", maxHeight: "220px" }} />
                </div>
                <div>
                    <p className='p-0 text-end text-dark' style={{ fontSize: "15px" }}>
                        {sent ?
                            <BsCheckAll />
                            : <>
                                <Spinner animation="border" size="sm" />
                                <BsCheckLg />
                            </>
                        }</p>
                </div>
            </div>
            <Modal show={gallery} className='image-content'>
                <CustomImageGallery onClick={setGallery} image={img} />
            </Modal>
        </>
    )
}
