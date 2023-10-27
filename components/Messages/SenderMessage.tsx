import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { BsCheck2All, BsCheck2, BsCheckLg, BsCheckAll } from "react-icons/bs";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { MessageConsumer } from '../../context/messageContext';
import TextContent from './TextContent';
import MessageSideAction from '../common/MessageSideAction';
import ImageContet from './ImageContet';

export default function SenderMessages({ data }) {
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const isLargeWidth = useMediaQuery({ maxWidth: 992 })
    const messageContext = useContext(MessageConsumer)
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
    }, [messageContext.message]);


    return (
        <div className="row my-3 w-100 message_content" ref={divRef} >
            <div className="d-flex align-items-center justify-content-end">
                <MessageSideAction />
                <div>
                    {
                        data?.content !== null ?
                            <TextContent isSender={true} content={data?.content} />
                            : ""
                    }
                </div>
                <div>
                    {
                        data?.content_img !== null ?
                            <ImageContet img={data?.content_img} />
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}