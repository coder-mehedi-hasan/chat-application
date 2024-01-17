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
import FileContent from './FileContet';
import { useStateProvider } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query';
import Reactions from './Reactions';

export default function ReceiverMessages({ data, handleReactionSend, isReaction }) {
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const isLargeWidth = useMediaQuery({ maxWidth: 992 })
    const [del, setDel] = useState(false)
    const divRef = useRef()
    const [{ currentChatUser, userInfo, socket }, dispatch]: any = useStateProvider()


    const currentDate = new Date()
    const getTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amOrPm;
        return timeString
    }

    const { data: reactionsAll, isSuccess, refetch } = useQuery({
        queryKey: [`${data?._id}`],
        queryFn: () => getReactionsApi()
    });


    const getReactionsApi = async () => {
        const response = await fetch(`https://messaging-dev.kotha.im/mobile/api/messages/reactions/${data?._id}?skip=0&limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': userInfo?.messageToken
            }
        })
        const json = await response.json()
        if (response) {
            return json
        }
        return []
    }



    useEffect(() => {
        refetch()
    }, [isReaction])

    useEffect(() => {
        socket.current.on('updateReceiverMessageStatusV2', function (data: any) {
            console.log('on, updateReceiverMessageStatusV2', data);
        });
    })

    return (
        <div className="row my-3 w-100 message_content" ref={divRef} >
            <div className="d-flex align-items-center justify-content-start">
                {currentChatUser?.image &&
                    <div style={{ height: "30px", width: "30px", borderRadius: "50%", overflow: "hidden", marginRight: "5px" }}>
                        <img src={currentChatUser?.image} alt={currentChatUser?.name} className='w-100 h-100' />
                    </div>
                }
                {
                    data?.cloudfrontUrl && !data?.message ?
                        <div>
                            <FileContent img={data?.cloudfrontUrl} />
                            <div className='reaction'>
                                {
                                    reactionsAll?.length && Array.isArray(reactionsAll) && reactionsAll?.map(item => {
                                        return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <TextContent message={data} isSender={false} content={data?.message} />
                            <div className='reaction'>
                                {
                                    reactionsAll?.length && Array.isArray(reactionsAll) && reactionsAll?.map(item => {
                                        return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                    })
                                }
                            </div>
                        </div>
                }
                <MessageSideAction message={data} handleReactionSend={handleReactionSend} />
            </div>
        </div>
    )
}
