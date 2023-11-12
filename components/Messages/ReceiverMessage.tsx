import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { BsCheck2All, BsCheck2, BsCheckLg, BsCheckAll } from "react-icons/bs";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { MessageConsumer } from '../../context/messageContext';
import MessageSideAction from '../common/MessageSideAction';
import TextContent from './TextContent';

export default function ReceiverMessages({ data }) {
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const isLargeWidth = useMediaQuery({ maxWidth: 992 })
    // const messageContext = useContext(MessageConsumer)
    const [del, setDel] = useState(false)
    const divRef = useRef()

    const currentDate = new Date()
    const getTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amOrPm;
        return timeString
    }

    const currTime = getTime(currentDate)
    useEffect(() => {
        divRef.current.scrollIntoView();
        if (currTime + 2000) {
            setDel(true)
        } else {
            setDel(false)
        }
    }, []);


    useEffect(() => {
        const currTime = currentDate.getTime()
        if (currTime + 5000) {
            setDel(true)
        } else {
            setDel(false)
        }
    });



    return (
        <div className="row my-3 w-100 message_content" ref={divRef} >
            <div className="d-flex align-items-center justify-content-start">
                <div>
                    <TextContent isSender={false} content={data?.message} />
                </div>
                <MessageSideAction />
                {/* <div>
                    {
                        data?.content_img !== null ?
                            <ImageContet img={data?.content_img} />
                            : ""
                    }
                </div> */}
            </div>
        </div>
    )
}
