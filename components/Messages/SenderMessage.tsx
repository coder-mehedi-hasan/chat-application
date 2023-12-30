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
import FileContent from './FileContet';
import { useStateProvider } from '../../context/StateContext';
import { reactionEmojis } from '../../utils/constant';

export default function SenderMessages({ data }) {
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const isLargeWidth = useMediaQuery({ maxWidth: 992 })
    const [{ currentChatUser, userInfo, current_location, messages }, dispatch] = useStateProvider()
    const [reactions, setReactions] = useState([]);
    console.log(reactions)

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
        fetch(`https://messaging-dev.kotha.im/mobile/api/messages/reactions/${data?._id}?skip=0&limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': userInfo?.messageToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Authentication Failed'); // Customize the error message as needed
                }
                return response.json();
            })
            .then(data => {
                setReactions(data)
                console.log(data)
            }
            )
            .catch(error => console.error('Error fetching categories:', error));

    }, []);

    const getReactions = (reactionName:any) => {
        const reactionFind = reactionEmojis.find(item => item?.name === reactionName)
        return (
            <>
                <img src={reactionFind?.src} alt={reactionName?.name} height={10} />
            </>
        )

    }

    return (
        <div className="row my-3 w-100 message_content" ref={divRef} >
            <div className="d-flex align-items-center justify-content-end">
                <MessageSideAction message={data} />
                {
                    data?.cloudfrontUrl && !data?.message ?
                        <div>
                            <FileContent img={data?.cloudfrontUrl} />
                        </div>
                        :
                        <div>
                            <TextContent isSender={true} content={data?.message} message={data} />
                        </div>
                }
                {
                    reactions?.length && Array.isArray(reactions) && reactions?.map(item => {
                        return <div>
                            {
                                getReactions(item?.reaction)
                            }
                        </div>
                    })
                }
                {userInfo?.image &&
                    <div style={{ height: "30px", width: "30px", borderRadius: "50%", overflow: "hidden", marginRight: "5px" }}>
                        <img src={userInfo?.image} alt={userInfo?.name} className='w-100 h-100' />
                    </div>
                }
            </div>
        </div>
    )
}