import React, { useState, useEffect } from 'react'
import UserInfoBox from './UserInfoBox'
import user from '../../fake_data/user.json';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import MessageForm from '../MessageForm';
import Messages from '../Messages/Messages';
import Toast from 'react-bootstrap/Toast';
import { useMediaQuery } from 'react-responsive'
import { BsArrowLeftShort, BsArrowLeft } from "react-icons/bs";


export default function ChattingInterFace({ contact_id, modal }) {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const userArr = user
    const [windowHeight, setWindowHeight] = useState(0)


    const elementWithId = findElementWithIdOne(userArr);


    function findElementWithIdOne(data) {
        return data.find(item => item.id === contact_id);
    }

    useEffect(() => {
        // updateWindowHeight()
        // Initial window height
        setWindowHeight(window.innerHeight);
    }, []);
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px" }} className='chat-interface'>
            {/* <div style={{ height: "80px", background: "rgb(33, 37, 41,0.95)" }} className='text-white d-flex align-items-center justify-content-between px-3'> */}
            <div style={{ height: "80px", background: "white" }} className='text-white d-flex align-items-center justify-content-between px-3'>
                {
                    isMobileWidth ?
                        <div onClick={modal} className='me-2 p-1 rounded-circle text-dark' style={{ cursor: 'pointer', }}><BsArrowLeft /></div>
                        : ""
                }
                <UserInfoBox user={elementWithId} size={55} />
                <div>
                    <Button style={{ height: "45px", width: "45px", borderRadius: "50%", background: "none", border: "1px solid #3fb9a4ff" }}><Image src='https://i.ibb.co/v41GDy9/menu.png'></Image></Button>
                </div>
            </div>
            {/* <div style={{ height: `${isMobileWidth ? windowHeight - 160 + "px" : "100%"}`, padding: "", scrollBehavior: "smooth" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll'> */}
            <div style={{ height: "100%", padding: "", scrollBehavior: "smooth" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll'>
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
                <Messages img={elementWithId?.image} />
            </div>
            <div style={{ height: "80px", background: "#fff" }} className='position-relative' >
                <MessageForm />
            </div>
        </div>
    )
}
