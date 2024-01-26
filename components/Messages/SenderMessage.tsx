import React, { useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
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
import { useQuery } from '@tanstack/react-query';
import Reactions from './Reactions';

function SenderMessages({ data, handleReactionSend, isReaction, isLastMessage, status }: any) {
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const isLargeWidth = useMediaQuery({ maxWidth: 992 })
    const [{ userInfo, socket, currentChatUser, messages }, dispatch]: any = useStateProvider()
    const [reactions, setReactions] = useState<any>([]);
    const [statusLastMessage, setStatusLastMessage] = useState<any>([]);
    // console.log("isLastMessage", isLastMessage)

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
    // useEffect(() => {
    //     divRef.current.scrollIntoView();
    // });



    const setAllReactions = async () => {

    }

    // const handleRefetch = () => {
    //     refetch()
    // }
    // console.log(reactionsAll)

    const { data: reactionsAll, isSuccess, refetch } = useQuery({
        queryKey: [`${data?._id}`],
        queryFn: () => getReactionsApi()
    });

    // console.log(data?._id)


    const getReactionsApi = async () => {
        const response = await fetch(`https://messaging-dev.kotha.im/mobile/api/messages/reactions/${data?._id}?skip=0&limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': userInfo?.messageToken
            }
        })
        const json = await response.json()
        // console.log({json})
        if (response) {
            return json
        }
        return []
    }

    useEffect(() => {
        // console.log("refetch")
        refetch()
    }, [isReaction])

    useEffect(() => {
        socket.current.on('updateSenderMessageStatusV2', (data: any) => {
            if (isLastMessage && data?.length) {
                // console.log(data)
                setStatusLastMessage(data)
            }
        });

        return () => {
            socket.current.off("updateSenderMessageStatusV2")
        }
    })

    const getMessageStatus = (status: any) => {
        // const find = statusLastMessage?.find((i: any) => i?._id === data?._id)
        // if (find && find?.currentStatus === 1 || data?.messageStatus === 1) {
        //     return <span className='text-dark fs-6 me-1'><BsCheckLg /></span>
        // }
        // else if (find && find?.currentStatus === 3 || data?.messageStatus === 3) {
        //     return <span className='text-dark fs-6 brand-color me-1'><BsCheckAll /></span>
        //     return (
        //         <div style={{ height: "14px", width: "14px", borderRadius: "50%", overflow: "hidden", }}>
        //             <img src={currentChatUser?.image} alt={currentChatUser?.name} className='w-100 h-100' style={{ height: "14px", width: "14px" }} />
        //         </div>
        //     )
        // }
        if (status === 1) {
            return <span className='text-dark fs-6 me-1'><BsCheckLg /></span>
        }
        else if (status === 2) {
            return <span className='text-dark fs-6 me-1'><BsCheckAll /></span>
        }
        else if (status === 3) {
            return <span className='text-dark fs-6 brand-color me-1'><BsCheckAll /></span>
        }

    }


    return (
        <div className="row my-3 w-100 message_content" ref={divRef} >
            <div className="d-flex align-items-center justify-content-end">
                <MessageSideAction message={data} handleReactionSend={handleReactionSend} />
                {
                    data?.cloudfrontUrl && !data?.message ?
                        <div>
                            <FileContent img={data?.cloudfrontUrl} />
                            <div className='reaction'>
                                {
                                    reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                        return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                    }) : ""
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <TextContent isSender={true} content={data?.message} message={data} />
                            <div className='reaction'>
                                {
                                    reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                        return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                    }) : ""
                                }
                            </div>
                        </div>
                }

            </div>
            <div className='d-flex justify-content-end'>
                {isLastMessage ? getMessageStatus(parseInt(status)) : ""}
            </div>
        </div>
    )
}



export default SenderMessages;