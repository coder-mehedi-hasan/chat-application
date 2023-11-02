import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup, Overlay, Tooltip } from 'react-bootstrap'
import { BsX, BsPlusLg, BsImage } from "react-icons/bs";
import Toast from 'react-bootstrap/Toast';
import { useMediaQuery } from 'react-responsive';
import { useContext } from 'react';
import { MessageConsumer } from '../context/messageContext';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function MessageForm(props) {
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);
    const [image, setImage] = useState([])
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [message, setMessage] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const messageContext = useContext(MessageConsumer)
    const emoji = useRef(null);

    const handleImage = (e) => {
        const selectedFIles = [];
        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles]
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file))
        })
        setImage(selectedFIles);
    }

    const deletePreviewImage = (index) => {
        const img = image.splice(index, 1)
        const newArray = image.filter((element) => element !== img[0]);
        setImage(newArray)
    }

    const handleSubmitMessage = () => {
        const msg_arr = messageContext.message || []
        if (image?.length) {
            image.map(item => {
                msg_arr.push({ content: null, content_img: item })
            })
            setImage([])
        }
        if (message !== "") {
            msg_arr.push({ content: message, content_img: null })
            setMessage("")
        }
        messageContext.addMessage(msg_arr)
        props.send()
    }

    const addEmoji = (emoji) => {
        const mess = message + emoji
        setMessage(mess)
    }

    return (
        <>
            <div style={{ flex: 1, background: "#fff" }} className='position-relative w-100 h-100 text-white d-flex align-items-center justify-content-between px-lg-3 px-md-2 px-sm-1 px-xs-1'>
                <div>
                    <Button variant='' className='p-1 text-dark'>
                        <BsPlusLg className="fs-5" onClick={toggleShowB} style={{ transform: showB ? "rotate(45deg)" : "", transition: ".4s" }} />
                    </Button>
                </div>
                <div>
                    <Button variant='' className='p-1 text-dark' >
                        <label htmlFor="share_gallery">
                            <BsImage />
                        </label>
                    </Button>
                </div>
                <div>
                    <input multiple onChange={handleImage} type="file" className='d-none' id="share_gallery" />
                </div>
                <InputGroup size='sm' className="px-1 py-1 rounded position-relative bg_gray" onSubmit={handleSubmitMessage}>
                    {
                        image.length ?

                            <div className="w-100 d-flex rounded-top bg_gray scrollbar_visible_x" style={{ position: "absolute", top: isMobileWidth ? "-94px" : "-116px", left: "0", overflowX: "scroll", scrollBehavior: "smooth" }}>
                                {
                                    image?.map((item, index) => {
                                        return (
                                            <div key={index} className='mx-2 my-3 position-relative'>
                                                <div style={{ height: isMobileWidth ? "16px" : "20px", width: isMobileWidth ? "16px" : "20px", borderRadius: "50%", position: "absolute", top: "-5px", right: "-5px", cursor: "pointer", fontSize: isMobileWidth ? "14px" : "18px" }} className='text-dark bg-white d-flex justify-content-center align-items-center' onClick={() => deletePreviewImage(index)}><BsX /></div>
                                                <div style={{ height: isMobileWidth ? 65 : 80, width: isMobileWidth ? 65 : 80, overflow: "hidden" }} className='rounded'>
                                                    <Image src={item} className='img-fluid' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : ""

                    }
                    <Button variant='' className='p-1' ref={emoji} onClick={() => setShowEmoji(!showEmoji)}>
                        <Image className='img-fluid' src="https://i.ibb.co/sWJ1ktH/emojipng-com-14031904.png" alt="" height={20} width={20} />
                    </Button>
                    <Form.Control autoFocus
                        aria-describedby="basic-addon2"
                        style={{ background: "none", border: "none", color: "#000", overflowY: "scroll", scrollBehavior: "smooth", resize: "none" }}
                        className='py-1 scrollbar_visible_x'
                        as="textarea"
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}

                    />
                    <Button variant='' >
                        <Image className='img-fluid' src="https://i.postimg.cc/0N4P1xJr/microphone-8369015.png" alt="" height={20} width={20} />
                    </Button>
                </InputGroup >
                <Button variant='' onClick={handleSubmitMessage} >
                    <Image className='img-fluid' src="https://i.ibb.co/QdZ8jVf/send-10109845.png" alt="" height={25} width={25} />
                </Button>
            </div >
            <div className='position-absolute py-2' style={{ top: "-35px", left: 0, width: "100%", }}>
                <Toast show={showB} animation={false} className='w-100 rounded-0' style={{ background: "rgba(33, 37, 41, 0.95)" }}>
                    <div className="d-flex align-items-center justify-content-center">
                        <div>
                            <label htmlFor="share_gallery"><Image className='cursor-pointer' width={22} src="https://i.ibb.co/YXhV2hc/gallery.png" alt="gallery" /></label>
                            <input type="file" className='d-none' id="share_gallery" />
                        </div>
                    </div>
                </Toast>
            </div>
            <Overlay target={emoji.current} show={showEmoji} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props} className='inner_action_tooltip_emoji_picker' >
                        <Picker
                            data={data}
                            onEmojiSelect={(emoji) => addEmoji(emoji.native)}
                            navPosition="bottom"
                            previewPosition="none"
                        />
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}