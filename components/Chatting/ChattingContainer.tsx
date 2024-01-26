"use client"
import React, { memo, useEffect, useRef, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'
import { useQuery } from '@tanstack/react-query'
import { handleMessageStatus } from '../../utils/functions/message'
import { IoIosArrowDown } from "react-icons/io";

export default memo(function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages, socketEvent, otherMessages }, dispatch]: any = useStateProvider()
    const [senderReaction, setSenderReaction]: any = useState()
    const [receiverReaction, setReceiverReaction]: any = useState()
    const [messageReaction, setMessageReaction] = useState<Boolean>(false)
    const messagesRef: any = useRef(null)
    const containerRef: any = useRef(null)
    const [skip, setSkip] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(50)
    const [scrollBarPositionUp, setScrollBarPositionUp] = useState<boolean>(false)
    const [statusLastMessage, setStatusLastMessage] = useState<any>([]);
    const [currentChatUserId, setCurrentChatUserId] = useState(null)

    const { isError, refetch, isSuccess, data: allChattingMessages, isFetching, isLoading, isRefetching } = useQuery({
        queryKey: ["fetch latest messages"],
        queryFn: () => getAllMessages(Math.floor(skip * perPage), perPage),
        enabled: !!currentChatUser,
        staleTime: 1
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
            if (res) {
                setMessageReaction(!messageReaction)
            }
        })
        return () => {
            socket.current.off("editMessage")
        }
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
        socket.current.emit("editMessage", params
            , (err: any, res: any) => {
                if (!err) {
                    setSenderReaction(res)
                    setMessageReaction(!messageReaction)
                }
            }
        );
    }

    useEffect(() => {
        socket.current.on('updateReceiverMessageStatusV2', function (data: any) {
        });

        return () => {
            socket.current.off("updateReceiverMessageStatusV2")
        }
    })

    const handleScroll = () => {
        const container: any = containerRef.current;
        if (container) {
            const isAtTop = container.scrollTop === 0;
            if (isAtTop && !isRefetching) {
                dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
                setSkip(pre => pre + 1);
            }
            const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - window.innerHeight;
            if (isAtBottom) {
                setScrollBarPositionUp(false)
            } else {
                setScrollBarPositionUp(true)
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
        if (isSuccess && allChattingMessages?.length) {
            const reversed = [...allChattingMessages]?.reverse();
            const unseenMessages = reversed?.filter((item: any) => item?.messageStatus !== 3)
            const unseenIds = unseenMessages?.filter((item: any) => item?.messageFrom == currentChatUser?.id)?.map((item: any) => item?._id)
            handleMessageStatus(unseenIds, socket, 3)
            const newMessages = reversed?.map(item => {
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

    useEffect(() => {
        refetch()
    }, [skip])

    useEffect(() => {
        if (socket.current && socketEvent) {
            socket.current.on('clientToClientMessage', (response: any) => {

                if (response.sMessageObj.messageFromUserID == currentChatUserId) {
                    dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                    socket.current.emit('updateMessageStatusV2', {
                        _ids: [response?.sMessageObj?._id],
                        currentStatus: 3
                    })
                    containerRef?.current?.scrollIntoView();
                } else {
                    console.log(otherMessages)
                    const newOtherMessages = otherMessages?.filter((msg: any) => msg?._messageToUserID !== response.sMessageObj?.messageToUserID)
                    // dispatch({ type: reducerCases.ADD_OTHERS_MESSAGE, newMessage: response.sMessageObj })
                    dispatch({ type: reducerCases.SET_OTHERS_MESSAGE, otherMessages: [...[response.sMessageObj], ...newOtherMessages] })
                }
            })
            return () => {
                if (socket.current) {
                    socket.current.off('clientToClientMessage');
                    dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
                }
            };
        }
    }, [socket.current, dispatch, socketEvent, currentChatUserId]);



    useEffect(() => {
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
    }


    useEffect(() => {
        socket.current.on('updateSenderMessageStatusV2', (data: any) => {
            setStatusLastMessage(data)
        });

        return () => {
            socket.current.off("updateSenderMessageStatusV2")
        }
    })

    return (
        <>
            <div style={{ height: "100%", padding: "", scrollBehavior: `${skip === 0 ? "auto" : "auto"}`, overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y message-container-bg' ref={containerRef}>
                {
                    userInfo && messages?.length ? messages?.map((item: any, index: any) => {
                        const isLastMessage = (messages?.length - 1) === index
                        const status = getMessageStatus(item)
                        return (
                            <div key={index} ref={messagesRef}>
                                {
                                    userInfo.id === item.messageFromUserID
                                        ?
                                        <SenderMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} isLastMessage={isLastMessage} status={status} />
                                        :
                                        <ReceiverMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} />
                                }
                            </div>
                        )
                    }) : <div>
                        YOU HAVE NO MESSAGE
                    </div>
                }
            </div>
            {
                scrollBarPositionUp && isLoading || isRefetching || isFetching || !isSuccess ?
                    <div className='messages-overlay-loading' style={{ height: "100% !important" }}>
                        <div className="spinner-border loading" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    : ""
            }
            {
                <div
                    className={`
                        cursor-pointer position-absolute scrollbar-controller 
                        d-flex justify-content-center align-items-center
                        ${scrollBarPositionUp ? "d-block" : "d-none"}
                    `}
                    onClick={(e) => {
                        e.preventDefault()
                        containerRef?.current?.scrollIntoView();
                        messagesRef?.current?.scrollIntoView();
                    }}
                >
                    <IoIosArrowDown
                        style={{ fontSize: "25px" }}
                        className="brand-color"
                    />
                </div>
            }

        </>
    )
})
