import React, { useState, useEffect, useRef, useContext } from 'react'
import UserInfoBox from '../common/UserInfoBox'
import user from '../../fake_data/user.json';
import { Button, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import MessageForm from './MessageForm';
import { useMediaQuery } from 'react-responsive'
import { BsArrowLeft } from "react-icons/bs";
// import { MessageConsumer } from '../../context/messageContext';
import SenderMessages from '../Messages/SenderMessage';
import ReceiverMessages from '../Messages/ReceiverMessage';
import ChatHeader from './ChatHeader';
import ChattingContainer from './ChattingContainer';

export default function ChattingInterFace() {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const userArr = user
    const divRef = useRef();
    const [messages, setMessages] = useState([])
    const [eff, useEff] = useState(false)
    const [inbox, setInbox] = useState<any>([])
    const [userId, setUserId] = useState<any>("")
    const [show, setShow] = useState(false);

    useEffect(() => {
        setUserId(window.localStorage.getItem("userId"))

    }, [userId])

    const handleShow = () => {
        setShow(!show);
    }

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