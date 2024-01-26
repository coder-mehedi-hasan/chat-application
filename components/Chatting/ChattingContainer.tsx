"use client"
import React, { useEffect, useRef, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'
import { useQuery } from '@tanstack/react-query'
import { handleMessageStatus } from '../../utils/functions/message'

export default function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages, socketEvent }, dispatch]: any = useStateProvider()
    const [senderReaction, setSenderReaction]: any = useState()
    const [receiverReaction, setReceiverReaction]: any = useState()
    const [messageReaction, setMessageReaction] = useState<Boolean>(false)
    const messagesRef: any = useRef(null)
    const containerRef: any = useRef(null)
    const [skip, setSkip] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(50)
    const [scrollBarPos, setScrollBarPos] = useState<any>()
    const [statusLastMessage, setStatusLastMessage] = useState<any>([]);
    const [currentChatUserId, setCurrentChatUserId] = useState(null)
    // console.log("currentChatUser",{currentChatUserId})


    const { isError, refetch, isSuccess, data: allChattingMessages, isFetching, isLoading, isRefetching } = useQuery({
        queryKey: ["fetch latest messages"],
        queryFn: () => getAllMessages(Math.floor(skip * perPage), perPage)
    })

    const getAllMessages = async (skip: any, limit: any) => {
        const response = await fetch(`https://messaging-dev.kotha.im/api/v1/web/private/messages?skip=${skip}&limit=${limit}&messageFrom=${currentChatUser?.id}`, {
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
            // console.log(res)
            if (res) {
                setMessageReaction(!messageReaction)
            }
        })
    })
    const handleReactionSend = (messageId: string, reactionName: string, sendingType: boolean) => {
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
            , (err: any, res: any) => {
                if (!err) {
                    // console.log(res)
                    setSenderReaction(res)
                    setMessageReaction(!messageReaction)
                }
            }
        );
    }

    useEffect(() => {
        socket.current.on('updateReceiverMessageStatusV2', function (data: any) {
            // console.log('on, updateReceiverMessageStatusV2', data);
        });
    })
    // useEffect(() => {
    //     messagesRef?.current?.scrollIntoView();
    // });

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const container = containerRef.current;
    //         if (container) {
    //           const isAtBottom = container.scrollTop + container.clientHeight === container.scrollHeight;
    //           if (isAtBottom) {
    //             // When the container is scrolled to the bottom, load more data
    //             // setTest(pre=> pre + 1)
    //           }
    //         }
    //       };


    //     // Add event listener for scroll
    //     containerRef.current.addEventListener('scroll', handleScroll);

    //     // Remove event listener on component unmount
    //     return () => {
    //         containerRef.current.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


    const handleScroll = () => {
        const container: any = containerRef.current;
        if (container) {
            const isAtTop = container.scrollTop === 0;
            if (isAtTop && !isRefetching) {
                // if (socketEvent) {
                dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
                // }
                setSkip(pre => pre + 1);
            }
        }
    };

    useEffect(() => {
        const container: any = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        setSkip(0)
        refetch()
        setCurrentChatUserId(currentChatUser?.id)
    }, [currentChatUser?.id])

    useEffect(() => {
        // console.log("set event firing")
        if (isSuccess && allChattingMessages?.length) {
            const reversed = [...allChattingMessages]?.reverse();
            const unseenMessages = reversed?.filter((item: any) => item?.messageStatus !== 3)
            const unseenIds = unseenMessages?.filter((item: any) => item?.messageFrom == currentChatUser?.id)?.map((item: any) => item?._id)
            // console.log("unseenIds",unseenIds)
            handleMessageStatus(unseenIds, socket, 3)
            const newMessages = reversed?.map(item => {
                // console.log("message history", item)
                return {
                    ...item,
                    message: item?.messageBody,
                    messageToUserID: item?.messageTo,
                    messageFromUserID: item?.messageFrom
                }
            })
            if (skip === 0) {
                dispatch({ type: reducerCases.SET_MESSAGES, messages: newMessages })
            }
            else {
                dispatch({ type: reducerCases.SET_MESSAGES, messages: [...newMessages, ...messages] })
            }
        }
    }, [isFetching, isLoading])

    // if (isLoading) {
    //     messagesRef?.current?.scrollIntoView();
    // }

    useEffect(() => {
        refetch()
    }, [skip])
    
    useEffect(() => {
        if (socket.current && socketEvent) {
            socket.current.on('clientToClientMessage', (response: any) => {
                console.log("currentChatUserId",currentChatUserId)
                return
                // console.log("checking", response?.sMessageObj.messageFromUserID, currentChatUser.id)
                if (response.sMessageObj.messageFromUserID === currentChatUserId) {
                    dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                    // console.log("checking", "Own Message")
                    socket.current.emit('updateMessageStatusV2', {
                        _ids: [response?.sMessageObj?._id],
                        currentStatus: 3
                    })
                    // messagesRef?.current?.scrollIntoView();
                    containerRef?.current?.scrollIntoView();
                }
                else {
                    // console.log("checking", "Others Message")
                    dispatch({ type: reducerCases.ADD_OTHERS_MESSAGE, newMessage: response.sMessageObj })
                }
            })
            return () => {
                if (socket.current) {
                    socket.current.off('clientToClientMessage');
                    dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
                    currentChatUser
                }
            };
        }
    }, [socket.current, dispatch, socketEvent]);

    useEffect(() => {
        // console.log("socketEvent", socketEvent)
        if (socketEvent) {
            containerRef?.current?.scrollIntoView();
            messagesRef?.current?.scrollIntoView();
        }
        else if (skip !== 0) {
            if (containerRef) {
                const difference: any = containerRef.current.scrollHeight - containerRef.current.clientHeight;
                containerRef.current.scrollTop = Math.floor(difference / (messages?.length / perPage)) - (window.innerHeight - perPage);
            }
        }
        else {
            if (containerRef) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight
            }
        }
        return
    }, [messages]);

    const getMessageStatus = (message: any) => {
        const find = statusLastMessage?.find((i: any) => i?._id === message?._id)
        if (find) {
            if (find?.currentStatus <= message?.messageStatus) {
                return message?.messageStatus
            }
            return find?.currentStatus
        }
        return message?.messageStatus
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
    }


    useEffect(() => {
        socket.current.on('updateSenderMessageStatusV2', (data: any) => {
            setStatusLastMessage(data)
        });
    })
    // console.log(messages)

    return (
        <>
            <div style={{ height: "100%", padding: "", scrollBehavior: `${skip === 0 ? "auto" : "auto"}`, overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y message-container-bg' ref={containerRef}>
                {
                    userInfo && messages ? messages?.map((item: any, index: any) => {
                        const isLastMessage = (messages?.length - 1) === index
                        const status = getMessageStatus(item)
                        // if (isLastMessage) {
                        //     console.log("message chat status", status)
                        // }
                        return (
                            <div key={index} ref={messagesRef}>
                                {
                                    userInfo.id === item.messageFromUserID
                                        ?
                                        <SenderMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} isLastMessage={isLastMessage} status={status} />
                                        :
                                        <ReceiverMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} />
                                }
                                {/* <span className='text-danger'>{index + 1}</span> */}
                            </div>
                        )
                    }) : ""
                }
            </div>
            {
                isLoading || isRefetching || isFetching || !isSuccess ?
                    <div className='messages-overlay-loading' style={{ height: "100% !important" }}>
                        <div className="spinner-border loading" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    : ""
            }
        </>
    )
}
