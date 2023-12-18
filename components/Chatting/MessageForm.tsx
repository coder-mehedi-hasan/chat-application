import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Image, InputGroup, Overlay, Tooltip } from 'react-bootstrap'
import { BsX, BsPlusLg, BsImage, BsEmojiSmile, BsMicFill } from "react-icons/bs";
import Toast from 'react-bootstrap/Toast';
import { useMediaQuery } from 'react-responsive';
// import { useContext } from 'react';
// import { MessageConsumer } from '../context/messageContext';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { io } from "socket.io-client"
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';


export default function MessageForm() {
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [showEmoji, setShowEmoji] = useState(false)
    const emoji = useRef(null);
    const inputReference = useRef();
    const [message, setMessage] = useState<any>({ messageType: 1, messageFromUserID: "", messageToUserID: '', message: "" })
    const [{ currentChatUser, userInfo, socket }, dispatch] = useStateProvider()

    //preview files
    const [previewFiles, setPreviewFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    //
    const [uploadUrls, setUploadUrls] = useState<any>([]);

    //upload file in database
    const uploadFilesForMessaging = async (url, index) => {
        if (!selectedFiles?.length && url && length) {
            console.error('No files selected or no upload URLs available', uploadUrls);
            return;
        }

        const file = selectedFiles[index]
        const fileType = file?.type
        const myHeaders = new Headers({ 'Content-Type': fileType });


        try {
            const response = await fetch(url?.signed_request, {
                method: 'PUT',
                headers: myHeaders,
                body: file,
            });
            // const upload = await response.json()
            // console.log({ response })
            // Handle the upload response for each file as needed
            // Check response status, etc.
            if (response) {
                socket.current.emit('messageFromClient', { ...message, cloudfrontUrl: url?.cloudfrontUrl, message: "" }, (response) => {
                    // console.log("response from share file :", response)
                    dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                    dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
                })
            }

        } catch (err) {

        }

        // console.log("upload urls from after submit file", uploadUrls)
        // console.log("selected from after submit file", selectedFiles)
        // return
        // selectedFiles.map(async (file, index) => {
        //     const uploadUrl = uploadUrls[index];
        //     const url = uploadUrl.signed_request
        //     // console.log(uploadUrl)
        //     console.log("upload url : =>>", url)
        //     // return
        //     const fileType = file.type;
        //     const myHeaders = new Headers({ 'Content-Type': fileType });
        //     try {
        //         const response = await fetch(url, {
        //             method: 'PUT',
        //             headers: myHeaders,
        //             body: file,
        //         });
        //         // const upload = await response.json()
        //         console.log({ response })
        //         // Handle the upload response for each file as needed
        //         // Check response status, etc.

        //         socket.current.emit('messageFromClient', { ...message, cloudfrontUrl: uploadUrl?.cloudfrontUrl, message: "" }, (response) => {
        //             console.log("response from share file :", response)
        //             dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
        //             dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
        //         })

        //     } catch (error) {
        //         console.error(`Error uploading file ${file.name} for messaging:`, error);
        //         // Handle errors appropriately
        //     }
        // });
    };

    //fetch file and sending
    const fetchSignedUrlsForMessaging = async () => {
        try {
            const filesData = selectedFiles.map((file) => ({
                "fileName": file.name,
                "fileType": file.type,
            }));

            const jsonFiles = filesData?.map(item => JSON.stringify(item))
            const response = await fetch(`https://feed.kotha.im/app/feed/getS3FileUploadUrl?files=[${jsonFiles}]&folder=messaging&uploaderId=${userInfo?.id}`, { method: 'GET' });
            const data = await response.json();
            // setUploadUrls(data)
            // return data
            // uploadFilesForMessaging()
            // 
            // 
            // setPreviewFiles([])
            data?.map((url, index) => {
                // handleSendFileMessage(url, index)
                uploadFilesForMessaging(url, index)
                setPreviewFiles([])
            })
        } catch (error) {
            console.error('Error fetching signed URLs for messaging:', error);
        }
    };

    const handleFileChange = (event) => {

        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        /******** show preview image **********/
        const showSelectedFiles: any = [];
        const targetFiles = event.target.files;
        const targetFilesObject = [...targetFiles]

        targetFilesObject.map((file) => {
            return showSelectedFiles.push(URL.createObjectURL(file))
        })
        //set preview images base64 url only for preview 
        setPreviewFiles(showSelectedFiles);
        /******** show preview image **********/
        // inputReference.current.value="sdkfjs"
        // console.log(inputReference)
    };

    //delete preview image  
    const deletePreviewImage = (index) => {
        const files = selectedFiles.splice(index, 1)
        const newFilesArr = selectedFiles.filter((element) => element !== files[0]);
        setSelectedFiles(newFilesArr)

        //delete preview files
        const img = previewFiles.splice(index, 1)
        const newArray = previewFiles.filter((element) => element !== img[0]);
        setPreviewFiles(newArray)
    }

    //handle submit message
    const handleSubmitMessage = async (e) => {
        e.preventDefault()
        if(showEmoji){
            setShowEmoji(!showEmoji)
        }
        if (selectedFiles?.length && previewFiles?.length) {
            fetchSignedUrlsForMessaging()

        }

        if (message?.message !== "" && message?.message !== null) {
            socket.current.emit('messageFromClient', message, (response) => {
                // console.log("response from client :", response)
                dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
                setMessage({ ...message, message: "" })
            })
        }
        // if (selectedFiles?.length) {
        //     uploadFilesForMessaging()
        // }
    }

    //handle send file message
    const handleSendFileMessage = (url, index) => {
        // console.log("url from submit file mesage ==>>", url)
        // socket.current.emit('messageFromClient', { ...message, cloudfrontUrl: url?.cloudfrontUrl, message: "" }, (response) => {
        //     console.log("response from client :", response)
        //     dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
        //     dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
        //     const uploadUrl = uploadUrls
        //     uploadUrl.push({ ...url, messageId: response?.sMessageObj?._id })
        //     setUploadUrls(uploadUrl)
        // })
        const tempUrl = previewFiles[index]
        socket.current.emit('messageFromClient', { ...message, cloudfrontUrl: url?.cloudfrontUrl, message: "" }, (response) => {
            console.log("response from share file :", response)
            dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...response.sMessageObj, cloudfrontUrl: tempUrl } })
            dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
        })
    }

    //add emoji in message
    const addEmoji = (emoji) => {
        const msg = message?.message + emoji
        setMessage({ ...message, message: msg });
    }

    //handle key press send message and line break
    const handleKeyPress = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            const msg = message?.message + '\n'
            setMessage({ ...message, message: msg });
            event.preventDefault();

        }
        else if (event.key === 'Enter') {
            handleSubmitMessage(event)
        }
        if (showEmoji) {
            setShowEmoji(false)
        }
    };

    //take current user than update message list
    useEffect(() => {
        setMessage({ ...message, message: "", messageToUserID: currentChatUser.id, messageFromUserID: userInfo?.id })
    }, [currentChatUser])


    return (
        <div className='position-relative'>
            <div style={{ flex: 1, background: "#fff", height: "80px" }} className='position-relative w-100 h-100 text-white d-flex align-items-center justify-content-between px-lg-3 px-md-2 px-sm-1 px-xs-1'>
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
                    <input multiple onChange={handleFileChange} type="file" className='d-none' id="share_gallery" onKeyDown={handleKeyPress} />
                </div>
                <div size='sm' className="rounded d-flex w-100 position-relative bg_gray" >
                    {
                        previewFiles?.length ?

                            <div className="w-100 d-flex rounded-top bg_gray scrollbar_visible_x" style={{ position: "absolute", top: isMobileWidth ? "-94px" : "-113px", left: "0", overflowX: "scroll", scrollBehavior: "smooth" }}>
                                {
                                    previewFiles?.map((item, index) => {
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
                            : 
                            ""
                    }
                    <div className='cursor-pointer p-1 text-dark' style={{ fontSize: "16px" }} ref={emoji} onClick={() => setShowEmoji(!showEmoji)}>
                        <BsEmojiSmile />
                    </div>
                    <Form className='w-100'>
                        <Form.Control
                            ref={inputReference}
                            autoFocus={true}
                            style={{paddingLeft:"2px",paddingRight:"2px",textAlign: "start", background: "none", border: "none", color: "#000", overflowY: "scroll", scrollBehavior: "smooth", resize: "none", height: "15px", fontSize: "15px" }}
                            className='scrollbar_visible_x'
                            as="textarea"
                            value={message?.message}
                            name="message"
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setMessage({ ...message, [e.target.name]: e.target.value })}
                        />
                    </Form>
                    
                </div >
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
                            skinTonePosition="none"
                        />
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )
}

