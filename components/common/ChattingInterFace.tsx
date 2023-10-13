import React from 'react'
import UserInfoBox from './UserInfoBox'
import user from '../../fake_data/user.json';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import MessageForm from '../MessageForm';
import Messages from '../Messages/Messages';
import Toast from 'react-bootstrap/Toast';

export default function ChattingInterFace({ contact_id }) {

    const userArr = user

    const elementWithId = findElementWithIdOne(userArr);


    function findElementWithIdOne(data) {
        return data.find(item => item.id === contact_id);
    }
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px" }} className='chat-interface'>
            <div style={{ flex: 1, background: "rgb(33, 37, 41,0.95)" }} className='text-white d-flex align-items-center justify-content-between px-3'>
                <UserInfoBox user={elementWithId} size={55} />
                <div>
                    <Button style={{ height: "45px", width: "45px", borderRadius: "50%", background: "none", border: "1px solid #3fb9a4ff" }}><Image src='https://i.ibb.co/v41GDy9/menu.png'></Image></Button>
                </div>
            </div>
            <div style={{ flex: 8, padding: "" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll'>
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
                <Messages img={elementWithId.image} />
            </div>
            <div style={{ flex: 1, background: "rgb(33, 37, 41,0.95)" }} className='position-relative' >
                <MessageForm />
            </div>
        </div>
    )
}
