import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import MessageForm from './MessageForm';
import { useMediaQuery } from 'react-responsive'
import ChatHeader from './ChatHeader';
import ChattingContainer from './ChattingContainer';
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';

export default function ChattingInterFace() {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [show, setShow] = useState(false);
    const [{ currentChatUser }, dispatch] = useStateProvider()

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

    // console.log("current user from chat interface: ==>>", currentChatUser)

    return (
        <>
            {
                isMobileWidth ?
                    <Modal show={show} fullscreen={true}>
                        <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: "100%" }} className='chat-interface'>
                            <ChatHeader modal={handleShow} />
                            <ChattingContainer />
                            <MessageForm />
                        </div>
                    </Modal>
                    :
                    <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: "100%" }} className='chat-interface'>
                        <ChatHeader modal={handleShow} />
                        <ChattingContainer />
                        <MessageForm />
                    </div>
            }
        </>
    )
}