import React, { useEffect, useRef, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'
import { useQuery } from '@tanstack/react-query'

export default function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages }, dispatch]: any = useStateProvider()
    const [senderReaction, setSenderReaction]: any = useState()
    const [receiverReaction, setReceiverReaction]: any = useState()
    const [messageReaction, setMessageReaction] = useState<Boolean>(false)
    const messagesRef = useRef(null)
    const containerRef = useRef(null)
    console.log(containerRef)

    useEffect(() => {

        // const messages = getAllMessages(0, 50)
        dispatch({ type: reducerCases.SET_MESSAGES, messages: [] })
    }, [currentChatUser])

    const { isError, refetch, isSuccess, data: allChattingMessages } = useQuery({
        queryKey: [],
        queryFn: () => getAllMessages(0, 1000)
    })

    // console.log({ messages })
    // console.log({ allChattingMessages })
    const getAllMessages = async (skip: any, limit: any) => {
        const response = await fetch(`https://messaging.kotha.im/api/v1/web/private/messages?skip=${skip}&limit=${limit}&messageFrom=${userInfo?.id}`, {
            headers: {
                "Authorization": userInfo?.messageToken
            }
        })

        const data = await response?.json()
        if (data?.length) {
            return data
        }
    }

    useEffect(() => {
        socket.current.on("editMessage", (res: any) => {
            console.log(res)
            if (res) {
                setMessageReaction(!messageReaction)
            }
        })
    })
    const handleReactionSend = (messageId: string, reactionName: string, sendingType: boolean) => {
        // console.log({messageId,reactionName,sendingType})
        let params: any = {
            "_id": messageId,
            "react": true,
            "reactionParams": {
                "score": 1,
                "reaction": reactionName,
                "reactedBy": userInfo?.id,
                "cancel": false
            }
        }
        if (!sendingType) {
            params = {
                "_id": messageId,
                "react": true,
                "reactionParams": {
                    "reactedBy": userInfo?.id,
                    "cancel": true
                }
            }
        }

        //         console.log(params)
        // return
        socket.current.emit("editMessage", params
            , (err, res) => {
                if (!err) {
                    console.log(res)
                    setSenderReaction(res)
                    setMessageReaction(!messageReaction)
                }
            }
        );
    }

    useEffect(() => {
        socket.current.on('updateReceiverMessageStatusV2', function (data) {
            console.log('on, updateReceiverMessageStatusV2', data);
        });
    })
    useEffect(() => {
        messagesRef?.current?.scrollIntoView();
    });

    const handleScroll = (e) => {
        console.log(e)
    }

    return (
        <div  style={{ height: "100%", padding: "", scrollBehavior: "auto", overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y' ref={containerRef}>
            {
                userInfo && messages && messages?.map((item, index) => {
                    const isLastMessage = (messages?.length - 1) === index
                    return (
                        <div key={index} ref={messagesRef} onScroll={handleScroll}>
                            {
                                userInfo.id === item.messageFromUserID
                                    ?
                                    <SenderMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} isLastMessage={isLastMessage} />
                                    :
                                    <ReceiverMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
