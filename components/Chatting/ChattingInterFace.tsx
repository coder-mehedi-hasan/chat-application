import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import MessageForm from './MessageForm';
import { useMediaQuery } from 'react-responsive'
import ChatHeader from './ChatHeader';
import ChattingContainer from './ChattingContainer';
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';

export default function ChattingInterFace() {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [show, setShow] = useState(false);
    const [{ currentChatUser }, dispatch]: any = useStateProvider()

    const handleShow = () => {
        setShow(!show);
        if (show) {
            dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, currentChatUser: undefined })
        }
    }
    useEffect(() => {
        if (isMobileWidth) {
            handleShow()
        }
    }, [currentChatUser, isMobileWidth])

    return (
        <>
            {
                isMobileWidth ?
                    <Modal show={show} fullscreen={true}>
                        <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: "100%" }} className='chat-interface'>
                            <ChatHeader modal={handleShow} />
                            <div style={{ height: "100%", paddingTop: "80px" }} className='position-relative overflow-hidden'>
                                <ChattingContainer />
                            </div>
                            <MessageForm />
                        </div>
                    </Modal>
                    :
                    <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: "100%" }} className='chat-interface'>
                        <ChatHeader modal={handleShow} />
                        <div className='position-relative overflow-hidden' style={{ height: "100%" }}>
                            <ChattingContainer />
                        </div>
                        <MessageForm />
                    </div>
            }
        </>
    )
}