import React, { useState, useEffect, useRef, useContext } from 'react'
import UserInfoBox from './UserInfoBox'
import user from '../../fake_data/user.json';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import MessageForm from '../MessageForm';
import { useMediaQuery } from 'react-responsive'
import { BsArrowLeft } from "react-icons/bs";
import { MessageConsumer } from '../../context/messageContext';
import SenderMessages from '../Messages/SenderMessage';

export default function ChattingInterFace({ contact_id, modal }) {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const userArr = user
    const elementWithId = findElementWithIdOne(userArr);
    const divRef = useRef();
    const [messages, setMessages] = useState([])
    const [eff, useEff] = useState(false)
    const messageContext = useContext(MessageConsumer)

    function findElementWithIdOne(data) {
        return data.find(item => item.id === contact_id);
    }

    useEffect(() => {
        setMessages(messageContext.message)
    }, [eff])

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px" }} className='chat-interface'>
            <div style={{ height: "80px", background: "white" }} className='text-white d-flex align-items-center justify-content-between px-3'>
                {
                    isMobileWidth ?
                        <div onClick={modal} className='me-2 p-1 rounded-circle text-dark' style={{ cursor: 'pointer', }}>
                            <BsArrowLeft />
                        </div>
                        :
                        ""
                }
                <UserInfoBox user={elementWithId} size={55} />
                <div>
                    <Button style={{ height: "45px", width: "45px", borderRadius: "50%", background: "none", border: "1px solid #3fb9a4ff" }}>
                        <Image src='https://i.ibb.co/v41GDy9/menu.png' className='img-fluid'></Image>
                    </Button>
                </div>
            </div>
            <div style={{ height: "100%", padding: "", scrollBehavior: "auto", overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y'>
                {
                    messages?.length ?

                        messages.map(item => {
                            return (
                                <SenderMessages data={item} />
                            )
                        })
                        : ""
                        
                }
            </div>
            <div style={{ height: "80px", background: "#fff" }} className='position-relative' >
                <MessageForm send={() => useEff(!eff)} />
            </div>
        </div>
    )
}