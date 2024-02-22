import Picker from '@emoji-mart/react';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useRef, useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Button, Form, Image, Modal, Overlay, Tooltip } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { AiOutlineSend } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight, BsEmojiSmile, BsFillPlayFill, BsFillXCircleFill, BsImage, BsMicFill, BsPauseFill, BsX } from "react-icons/bs";
import { PiStickerFill } from "react-icons/pi";
import { useMediaQuery } from 'react-responsive';
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';
import { apiUrl } from '../../utils/constant';
import { getFileType } from '../../utils/fileType';
import { isFileIsImage } from '../../utils/getFileType';
import { updateMessage, updateTempMessage } from '../../utils/updateMessage';
import { v4 as uuidv4 } from 'uuid';


function MessageForm() {
    const [showVoiceToast, setShowVoiceToast] = useState(false);
    const [showVoiceForm, setShowVoiceForm] = useState(false);
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [showEmoji, setShowEmoji] = useState(false)
    const emoji = useRef(null);
    const stickers = useRef(null);
    const stickerCategoryRef: any = useRef(null);
    const gifs = useRef(null);
    const inputReference = useRef();
    const [message, setMessage] = useState<any>({ messageType: 1, messageFromUserID: "", messageToUserID: '', message: "" })
    const [{ currentChatUser, userInfo, socket, draftMessages, editMessage, messages, replayMessage }, dispatch]: any = useStateProvider()
    const recorderControls = useAudioRecorder()
    const [sendEvent, setSendEvent] = useState<any>(null)
    const [showStickers, setShowStickers] = useState(false);
    const [stickersCategories, setStickersCategory] = useState<any>([])
    const [selectCategory, setSelectCategory] = useState<any>(null);
    const [error, setError] = useState(null)

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }


    const [inputRef, setInputFocus] = useFocus()



    //preview files
    const [previewFiles, setPreviewFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    //
    const [uploadUrls, setUploadUrls] = useState<any>([]);

    //upload file in database
    const uploadFilesForMessaging = async (url: any, index: any) => {
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
            if (response) {
                const { message: msg, contentType } = getFileType(file)
                handleSentMessage(
                    {
                        ...message,
                        cloudfrontUrl: url?.cloudfrontUrl,
                        message: msg,
                        messageMeta: {
                            contentType: contentType,
                            privateSticker: false
                        },
                        messageFiles: [
                            {
                                filepath: url?.cloudfrontUrl,
                                filename: file?.name,
                                mimetype: fileType
                            }
                        ]
                    },
                    socket,
                    dispatch,
                    draftMessages, `temp-${Number(index) + 1}`, messages)
            }
        } catch (err) {
            console.log(err)
        }
    };

    //fetch file and sending
    const fetchSignedUrlsForMessaging = async () => {
        try {
            const filesData = selectedFiles.map((file: any) => ({
                "fileName": file.name,
                "fileType": file.type,
            }));

            const jsonFiles = filesData?.map((item: any) => JSON.stringify(item))
            const response = await fetch(`https://feed.kotha.im/app/feed/getS3FileUploadUrl?files=[${jsonFiles}]&folder=messaging&uploaderId=${userInfo?.id}`, { method: 'GET' });
            const data = await response.json();
            data?.map((url: any, index: any) => {
                uploadFilesForMessaging(url, index)
                setPreviewFiles([])
            })
        } catch (error) {
            console.error('Error fetching signed URLs for messaging:', error);
        }
    };

    //handle file change
    const handleFileChange = (event: any) => {
        event.preventDefault()
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
        setInputFocus()
    };

    //delete preview image  
    const deletePreviewImage = (index: any) => {
        const files = selectedFiles.splice(index, 1)
        const newFilesArr = selectedFiles.filter((element: any) => element !== files[0]);
        setSelectedFiles(newFilesArr)

        //delete preview files
        const img = previewFiles.splice(index, 1)
        const newArray = previewFiles.filter((element) => element !== img[0]);
        setPreviewFiles(newArray)
    }

    const handleError = () => {
        console.log("Something is Wrong Message send Failed")
    }

    //handle submit message
    const handleSubmitMessage = (e: any) => {
        e.preventDefault()
        if (showEmoji) {
            setShowEmoji(!showEmoji)
        }
        if (selectedFiles?.length && previewFiles?.length) {
            fetchSignedUrlsForMessaging()
            selectedFiles?.map((item, index) => {
                const { message: msg, contentType } = getFileType(item)
                dispatch({
                    type: reducerCases.ADD_MESSAGE,
                    newMessage: {
                        ...message,
                        _id: uuidv4(),
                        tempId: `temp-${index + 1}`,
                        isLoading: true,
                        message: msg,
                        messageMeta: {
                            contentType: contentType,
                            privateSticker: false
                        },
                        messageFiles: [
                            {
                                filepath: URL.createObjectURL(item),
                                filename: item?.name,
                                mimetype: item?.type
                            }
                        ]
                    }
                })
            })
        }

        if (message?.message !== "" && message?.message !== null) {
            if (editMessage && message?.isEditMessage) {
                const params = {
                    "_id": editMessage?._id,
                    "messageBody": message?.message,
                    "message": message?.message,
                }
                socket.current.emit("editMessage", params
                    , (err: any, res: any) => {
                        if (!err) {
                            updateMessage({ _id: editMessage?._id, ...res, message: res?.messageBody }, messages, dispatch)
                            dispatch({ type: reducerCases.ADD_EDIT_MESSAGE, editMessage: null })
                            setMessage({ ...message, message: "", isEditMessage: false })
                        }
                    }
                );
                setInputFocus()
            } else {
                let messageMeta: any = {
                    contentType: 1,
                    privateSticker: false
                }

                if (replayMessage) {
                    messageMeta.contentType = 14
                    const value = {
                        c: replayMessage?.messageMeta?.contentType === 3,
                        i: replayMessage?._id,
                        n: userInfo?.name,
                        o: replayMessage?.messageMeta?.contentType === 3 ? replayMessage?.messageFiles[0]?.filepath : replayMessage?.messageBody,
                        r: message?.message,
                        rc: false
                    }
                    messageMeta.contentInfo = JSON.stringify(value)
                }
                handleSentMessage({
                    ...message,
                    messageMeta
                }, socket, dispatch, draftMessages)
                setMessage({ ...message, message: "" })
                dispatch({ type: reducerCases.ADD_REPLAY_MESSAGE, replayMessage: null })
                setInputFocus()
            }
        }
    }




    //add emoji in message
    const addEmoji = (emoji: any) => {
        const msg = message?.message + emoji
        setMessage({ ...message, message: msg });
    }

    //handle key press send message and line break
    const handleKeyPress = (event: any) => {
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

    const handleVoiceMessage = () => {
        setSendEvent(null)
        setShowVoiceToast(!showVoiceToast)
        setShowVoiceForm(!showVoiceForm)
        recorderControls.startRecording()
    }

    const blobToFile = (blob: any, fileName: any) => {
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    };

    const handleSendVoiceMessage = (event: any) => {
        recorderControls.stopRecording()
        setSendEvent({ event, sending: true })
    }

    //send voice message
    const addAudioElement = async (blob: any) => {
        if (sendEvent) {
            const file = await blobToFile(blob, `${new Date().toString()}_voice.webm`)
            const filesData = [{
                "fileName": file.name,
                "fileType": file.type,
            }]

            const jsonFiles = filesData?.map(item => JSON.stringify(item))
            const response = await fetch(`https://feed.kotha.im/app/feed/getS3FileUploadUrl?files=[${jsonFiles}]
                &folder=messaging&uploaderId=${userInfo?.id}`, { method: 'GET' });
            const data = await response.json();
            if (response) {
                setShowVoiceForm(false)
                data?.map(async (url: any) => {
                    const myHeaders = new Headers({ 'Content-Type': file?.type });
                    const response = await fetch(url?.signed_request, {
                        method: 'PUT',
                        headers: myHeaders,
                        body: file,
                    });
                    if (response) {
                        // socket.current.emit('messageFromClient', { ...message, cloudfrontUrl: url?.cloudfrontUrl, message: "" }, (response: any) => {
                        //     dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                        //     dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })
                        //     setSendEvent(null)
                        //     handleMessageStatus([response?._id], socket, 1)
                        // })
                        handleSentMessage({
                            ...message,
                            cloudfrontUrl: url?.cloudfrontUrl,
                            message: "Audio",
                            messageMeta: {
                                contentType: 4,
                                privateSticker: false
                            },
                            messageFiles: [
                                {
                                    filepath: url?.cloudfrontUrl,
                                    filename: file?.name,
                                    mimetype: file?.type
                                }
                            ]
                        }, socket, dispatch, draftMessages)
                        setSendEvent(null)
                    }
                })
            }
        } else {
            console.log("audio missing")
        }

    };

    const getStickersCategory = async () => {
        const res = await fetch(apiUrl.stickerCategories, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userInfo?.userToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (Array.isArray(data) && data?.length) {
            setStickersCategory(data)
            setSelectCategory(data[0])

        }
    }

    useEffect(() => {
        dispatch({ type: reducerCases.ADD_EDIT_MESSAGE, editMessage: null })
        dispatch({ type: reducerCases.ADD_REPLAY_MESSAGE, replayMessage: null })
        const findDraft = draftMessages?.find((draft: any) => draft?.messageToUserID === currentChatUser.id && draft?.messageFromUserID === userInfo?.id)
        if (findDraft) {
            setMessage({ ...message, message: findDraft?.message, messageToUserID: currentChatUser.id, messageFromUserID: userInfo?.id })
        } else {
            setMessage({ ...message, message: "", messageToUserID: currentChatUser.id, messageFromUserID: userInfo?.id })
        }
        getStickersCategory()
        setInputFocus()
    }, [currentChatUser])

    console.log("Error", error)


    const RenderPreviewImage = (src: string, index: number) => {
        const isImage = isFileIsImage(selectedFiles[index])
        if (isImage) {
            return <Image src={src} className='img-fluid' />
        }
        return <div className='w-100 h-100'>
            <p className='p-0 m-o text-dark w-100' style={{ wordBreak: "break-word" }}>{selectedFiles[index]?.name}</p>
        </div>
    }

    const stickerCategoryScrolling = (offset: number) => {
        stickerCategoryRef.current.scrollLeft += offset
    }

    const handlStickerClick = (sticker: any) => {
        handleSentMessage({
            ...message,
            message: "Sticker",
            messageMeta: {
                contentType: 2,
                privateSticker: false
            },
            messageHyperlink: `data:sticker/${sticker?.Url}`
        }, socket, dispatch, draftMessages)
        setShowStickers(false)
    }

    const { data } = useQuery({
        queryKey: [],
        queryFn: () => setMessage({ ...message, message: editMessage?.messageBody, isEditMessage: true }),
        enabled: !!editMessage,
        staleTime: 0,
    })

    const getReplayContent = () => {
        switch (replayMessage?.messageMeta?.contentType) {
            case 1:
                return (
                    <div>
                        <p className='rounded-pill my-2 p-2 bg_gray'>{replayMessage?.messageBody?.substring(0, 110)}{replayMessage?.messageBody?.length > 110 ? ".........." : ""}</p>
                    </div>
                )
            case 3:
                return (
                    <div style={{ maxHeight: "50px", objectFit: 'contain', maxWidth: "70px" }} className='overflow-hidden my-1 rounded'>
                        <img src={replayMessage?.messageFiles[0]?.filepath} alt="IMG" className='img-fluid' />
                    </div>
                )
            default:
                break;
        }
    }

    const emojiContainerRef = useRef(null);
    const stickerContainerRef = useRef(null);
    const plusPopupContainerRef = useRef(null);

    useEffect(() => {
        let handler = (e) => {
            if (!emojiContainerRef?.current?.contains(e.target) && !emoji?.current?.contains(e.target)) {
                setShowEmoji(false);
            }
            if (!stickerContainerRef?.current?.contains(e.target) && !stickers?.current?.contains(e.target)) {
                setShowStickers(false);
            }
            if (!plusPopupContainerRef?.current?.contains(e.target)) {
                setShowVoiceToast(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    const handleSentMessage = (messageObj: any, socket: any, dispatch: any, drafts: [], tempId: any = null, messages: any = []) => {
        if (messageObj.messageFiles) {
            messageObj.messageFiles = { ...messageObj?.messageFiles[0] }
        }
        let isSuccess = false
        if (!messageObj.score) {
            messageObj.score = 1
        }
        socket.current.emit('messageFromClient', messageObj, (response: any) => {
            if (response?.status === "success") {
                const currentDate = new Date()?.toISOString()
                if (response.sMessageObj?.messageFiles && tempId) {
                    updateTempMessage(
                        {
                            ...response.sMessageObj,
                            messageSentTime: currentDate,
                            messageBody: response.sMessageObj?.message,
                            messageFiles: [response.sMessageObj?.messageFiles],
                            tempId: tempId
                        },
                        messages,
                        dispatch
                    )
                }
                else {
                    dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: { ...response.sMessageObj, messageSentTime: currentDate, messageBody: response.sMessageObj?.message, messageFiles: [response.sMessageObj?.messageFiles] } })
                }
                dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: true })

                dispatch({ type: reducerCases.ADD_SEND_MESSAGE, newMessage: { ...response.sMessageObj, messageSentTime: currentDate, messageBody: response.sMessageObj?.message, messageFiles: [response.sMessageObj?.messageFiles] } })
                // if (drafts?.length) {
                //     const filterDraftsWithoutThis = drafts?.filter((item: any) => item?.messageToUserID !== messageObj?.messageToUserID)
                //     dispatch({ type: reducerCases.SET_DRAFT_MESSAGE, draftMessages: filterDraftsWithoutThis })
                // }
            } else {
                setError("Message Sending Failed")
            }
        })
    }


    return (
        <div className={`position-relative border-top message-form ${isMobileWidth ? "fixed-bottom" : ""}`}>
            <div style={{ flex: 1, background: "#fff", height: "80px" }} className='position-relative w-100 h-100 text-white d-flex align-items-center justify-content-between px-lg-3 px-md-2 px-sm-1 px-xs-1'>
                {
                    editMessage &&
                    <div className='d-flex justify-content-between align-items-center position-absolute bg-danger w-100 p-2 bg_gray text-dark fw-bold' style={{ top: "-90%", left: 0 }}>
                        <p className='m-0'>Edit Message</p>
                        <div className='cross-button' onClick={() => {
                            dispatch({ type: reducerCases.ADD_EDIT_MESSAGE, editMessage: null })
                            setMessage({ ...message, message: '', isEditMessage: false })
                        }}><BsX /></div>
                    </div>
                }
                {
                    replayMessage &&
                    <div className='position-absolute  w-100 p-2 rounded-top text-dark bg-light border' style={{ top: "-100px", left: 0, height: "100px" }}>
                        <div className='d-flex justify-content-between'>
                            <p className='m-0 fs-7'>Replay to <span className='brand-color fw-medium'>{userInfo?.name}</span></p>
                            <p className='m-0 brand-color fw-medium fs-7 cursor-pointer' onClick={() => {
                                dispatch({ type: reducerCases.ADD_REPLAY_MESSAGE, replayMessage: null })
                            }}>CANCEL</p>
                        </div>
                        <div>
                            {getReplayContent()}
                        </div>
                    </div>
                }
                {
                    showVoiceForm ?
                        <>
                            <div size='sm' className="voice-form rounded d-flex w-100 position-relative" style={{ transition: ".4s", display: showVoiceForm ? 'block' : "none" }} >
                                <div>
                                    <Button variant='' className='p-1 text-dark'
                                        onClick={() => {
                                            setShowVoiceForm(false)
                                            recorderControls?.stopRecording()

                                        }}
                                    >
                                        <BsFillXCircleFill className="fs-5 brand-color" style={{ transform: showVoiceForm ? "rotate(90deg)" : "", transition: ".4s" }} />
                                    </Button>
                                </div>
                                <div style={{ width: "100%", transition: ".4s" }} className='position-relative rounded-pill brand-bg overflow-hidden' >
                                    <div className='w-100 h-100 px-1 d-flex justify-content-between align-items-center voice-recorder-content'>
                                        <div>
                                            <div className='cursor-pointer recorder-controller-pause-resume d-flex justify-content-center align-items-center' onClick={recorderControls.togglePauseResume}> {recorderControls?.isPaused ? <BsFillPlayFill /> : <BsPauseFill />}</div>
                                        </div>

                                        <div className='recorder-timer p-1 rounded-pill d-flex align-items-center'>
                                            <div>
                                                <AudioRecorder
                                                    onRecordingComplete={addAudioElement}
                                                    recorderControls={recorderControls}
                                                    audioTrackConstraints={{
                                                        noiseSuppression: true,
                                                        echoCancellation: true,
                                                    }}
                                                    downloadFileExtension="webm"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <span className='recorder-wave' style={{ width: `${Math.floor(recorderControls?.recordingTime * 4)}px`, transition: "width 1s ease-in-out" }}></span>
                                </div>
                            </div >
                            <Button variant='' onClick={handleSendVoiceMessage} >
                                <AiOutlineSend className="brand-color" style={{ height: "30px", width: "30px" }} />
                            </Button>
                        </>
                        :
                        <>
                            <div className='d-flex'
                                style={{ width: message?.message !== "" ? "0%" : "initial", transition: "all 2s" }}>
                                <div>
                                    <div className='text-dark side-action-form' onClick={() => setShowVoiceToast(!showVoiceToast)} ref={plusPopupContainerRef}>
                                        <BsFillXCircleFill className="inner-btn brand-color" style={{ transform: showVoiceToast ? "rotate(90deg)" : "rotate(45deg)", transition: ".4s" }} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="share_gallery" style={{ cursor: "pointer" }}>
                                        <div className='text-dark brand-color side-action-form'>
                                            <BsImage className="inner-btn brand-color" />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <div className='text-dark side-action-form' onClick={() => {
                                        setShowStickers(!showStickers)
                                    }} ref={stickers}>
                                        <PiStickerFill className="brand-color" />
                                    </div>
                                </div>
                                <div>
                                    <input multiple onChange={handleFileChange} type="file" className='d-none' id="share_gallery" onKeyDown={handleKeyPress} />
                                </div>
                            </div>
                            <div size='sm' className="rounded d-flex w-100 position-relative bg_gray" >
                                {
                                    previewFiles?.length ?
                                        <div className="w-100 d-flex rounded-top bg_gray scrollbar_visible_x" style={{ position: "absolute", top: isMobileWidth ? "-94px" : "-113px", left: "0", overflowX: "scroll", scrollBehavior: "smooth" }}>
                                            {
                                                previewFiles?.map((item, index) => {
                                                    return (
                                                        <div key={index} className='mx-2 my-3 position-relative'>
                                                            <div style={{ position: "absolute", top: "-5px", right: "-5px" }} className='text-dark cross-button' onClick={() => deletePreviewImage(index)}><BsX /></div>
                                                            <div style={{ height: isMobileWidth ? 65 : 80, width: isMobileWidth ? 65 : 80, overflow: "hidden" }} className='rounded'>
                                                                {RenderPreviewImage(item, index)}
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
                                    <BsEmojiSmile className="brand-color" />
                                </div>
                                <Form className='w-100'>
                                    <Form.Control
                                        ref={inputRef}
                                        autoFocus={true}
                                        style={{ paddingLeft: "2px", paddingRight: "2px", textAlign: "start", background: "none", border: "none", color: "#000", overflowY: "scroll", scrollBehavior: "smooth", resize: "none", height: "15px", fontSize: "15px" }}
                                        className='scrollbar_visible_x'
                                        as="textarea"
                                        value={message?.message}
                                        name="message"
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => {
                                            setMessage({ ...message, [e.target.name]: e.target.value })
                                        }}

                                    />
                                </Form>
                            </div >
                            <Button variant='' onClick={handleSubmitMessage} >
                                <AiOutlineSend className="brand-color" style={{ height: "30px", width: "30px" }} />
                            </Button>
                        </>
                }
            </div >
            <Toast show={showVoiceToast} animation={true} className='position-absolute rounded' style={{ top: "-46px", left: 0, border: 'none', width: "220px", height: "44px", padding: "4px", transition: ".2s", display: showVoiceToast ? 'block' : "none" }} ref={plusPopupContainerRef}>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center send-voice-clip-btn rounded" style={{ padding: "0 8px", }} onClick={handleVoiceMessage}>
                    <div style={{ paddingRight: "8px" }}>
                        <BsMicFill style={{ height: "20px", width: "20px" }} className="brand-color" />
                    </div>
                    <div style={{ width: "100%" }} className='cursor-pointer rounded fw-semibold'>
                        Send voice clip
                    </div>
                </div>
            </Toast>
            <Overlay target={emoji.current} show={showEmoji} placement="top" ref={emojiContainerRef} >
                {(props) => (
                    <Tooltip id="overlay-example" {...props} className='inner_action_tooltip_emoji_picker'  >
                        <Picker
                            data={data}
                            onEmojiSelect={(emoji: any) => addEmoji(emoji.native)}
                            navPosition="bottom"
                            previewPosition="none"
                            skinTonePosition="none"
                            theme="light"
                        />
                    </Tooltip>
                )}
            </Overlay>
            <Overlay target={stickers.current} show={showStickers} placement="top" ref={stickerContainerRef}>
                {(props) => (
                    <Tooltip {...props} className='inner_action_tooltip_sticker'>
                        <div className='inner_tooltip_sticker w-100' style={{ padding: "0" }}>
                            <div className='bg-white' style={{ position: "sticky", top: "0" }}>
                                {
                                    !isMobileWidth &&
                                    <div className='d-flex w-100 justify-content-between align-items-center'>
                                        <span className='sticker-scroll-btn-top cursor-pointer' onClick={() => stickerCategoryScrolling(-80)}>
                                            <BsChevronLeft />
                                        </span>
                                        <span className='sticker-scroll-btn-top cursor-pointer' onClick={() => stickerCategoryScrolling(80)}>
                                            <BsChevronRight />
                                        </span>
                                    </div>
                                }
                                <div className='d-flex px-1 w-100 justify-content-between align-items-center overflow-scroll' ref={stickerCategoryRef} style={{ scrollBehavior: "smooth", transition: ".4s" }}>
                                    {
                                        stickersCategories?.map((item: any) => {
                                            return (
                                                <div className={`m-1 cursor-pointer bg_gray px-2 py-1 rounded ${selectCategory === item ? "category-active" : ""}`} onClick={
                                                    (e) => {
                                                        setSelectCategory(item)
                                                    }
                                                } style={{ width: "50%", textTransform: "capitalize" }}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                selectCategory &&
                                <div className='w-100 my-2 overflow-scroll'>
                                    <StickerList category={selectCategory} handlStickerClick={handlStickerClick} />
                                </div>
                            }
                        </div>
                    </Tooltip>
                )}
            </Overlay>
            <Modal
                size="sm"
                show={!!error}
                onHide={() => setError(null)}
                aria-labelledby="example-modal-sizes-title-sm"

            >
                <Modal.Header className='bg-danger' closeButton></Modal.Header>
                <Modal.Body className='bg-danger'>
                    <h3 className='h5 text-light'>
                        {error}
                    </h3>
                </Modal.Body>
            </Modal>
        </div >
    )
}

const StickerList = ({ category, handlStickerClick, ...props }: any) => {
    const [{ userInfo, }, dispatch]: any = useStateProvider()
    const [stickers, setStickers] = useState<any>([])

    const getStickers = async () => {
        const response = await fetch(`${apiUrl?.stickers}?category=${category}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userInfo?.userToken}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response && Array.isArray(json)) {
            setStickers(json)
        }
    }

    useEffect(() => {
        getStickers()
        setStickers(stickers)
    }, [category])


    return (
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            {
                Array.isArray(stickers) && stickers?.length &&
                stickers?.map(img => {
                    console.log("sticker image", img)
                    return <>
                        <div className='cursor-pointer my-1' onClick={() => handlStickerClick(img)} style={{ width: "32%" }}>
                            <img src={img?.Url} alt="" className='img-fluid' />
                        </div>
                    </>
                })
            }
        </div>
    )

}


export default memo(MessageForm);