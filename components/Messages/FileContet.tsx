import React, { useEffect, useState } from 'react'
import { Spinner, Modal } from 'react-bootstrap'
import { BsCheckAll, BsCheckLg, BsDownload } from 'react-icons/bs'
import CustomImageGallery from '../Modal/CustomImageGallery';
import { getFileExtensionAndType } from '../../utils/getFileExtensionAndType';
import { fileTypes } from '../../utils/constant';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player/youtube'
import DownloadLink from "react-download-link";
import Link from 'next/link';

export default function FileContent({ img }) {
    const [sent, setSent] = useState(false)
    const [gallery, setGallery] = useState(false)
    const [fileInfo, setFileInfo] = useState(getFileExtensionAndType(img))


    useEffect(() => {
        setTimeout(() => {
            setSent(true);
        }, 1000)
    }, [])

    return (
        <>
            <div>
                {
                    fileInfo?.fileType == fileTypes?.image ?
                        <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden", position: "relative" }}>
                            <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%", cursor: "pointer", zIndex: 1, background: "none" }} onClick={() => setGallery(!gallery)} ></div>
                            <img src={img} alt="img" style={{ maxWidth: "100%", maxHeight: "220px" }}  />
                        </div>
                        :
                        fileInfo?.fileType == fileTypes?.audio ?
                            <ReactAudioPlayer
                                src={img}
                                autoPlay
                                controls
                            />
                            :
                            fileInfo?.fileType == fileTypes?.video ?
                                <div style={{ maxWidth: "480px", borderRadius: "18px", height: "220px", overflow: "hidden", }}>
                                    <video style={{ maxHeight: "220px" }} controls>
                                        <source src={img} type={`video/${fileInfo?.extension}`} />
                                    </video>
                                </div> :
                                // <DownloadLink
                                //     label="download"
                                //     filename={img}
                                //     exportFile={() => "My cached data"}
                                // />
                                <a
                                    href={img}
                                    download={fileInfo?.fileName}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button style={{border:"none",padding:"20px 30px"}} className='rounded-pill text-dark'><BsDownload /> {fileInfo?.fileName}.{fileInfo?.extension}</button>
                                </a>
                    // <Link href={img} target="_blank">save {fileInfo?.fileName}</Link>


                }


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
