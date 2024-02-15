"use client"
import React, { memo, useEffect, useRef, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'
import { useQuery } from '@tanstack/react-query'
import { arrayIsEmpty, handleMessageStatus, handleSortByDateTime } from '../../utils/functions/message'
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckAll, BsCheckLg, BsUiChecksGrid } from 'react-icons/bs'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { updateMessage } from '../../utils/updateMessage';

export default memo(function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages, socketEvent, otherMessages, sendMessages }, dispatch]: any = useStateProvider()
    const [senderReaction, setSenderReaction]: any = useState()
    const [receiverReaction, setReceiverReaction]: any = useState()
    const [messageReaction, setMessageReaction] = useState<Boolean>(false)
    const messagesRef: any = useRef(null)
    const containerRef: any = useRef(null)
    const [skip, setSkip] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(50)
    const [scrollBarPositionUp, setScrollBarPositionUp] = useState<boolean>(false)
    const [statusLastMessage, setStatusLastMessage] = useState<any[]>([]);
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
                updateMessage(res?.meta, messages, dispatch)
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

    // console.log("all messages",messages)

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
        dispatch({ type: reducerCases.SET_CHAT_CONTAINER_REF, chatContainerRef: containerRef })
        setSkip(0)
        refetch()
        const timeoutId = setTimeout(() => {
            refetch()
        }, 30000);

        return () => clearTimeout(timeoutId);
    }, [currentChatUser?.id])

    useEffect(() => {
        if (isSuccess && allChattingMessages?.length) {
            const reversed = [...allChattingMessages]?.reverse();
            const unseenMessages = [...allChattingMessages]?.filter((item: any) => item?.messageStatus !== 3)
            const unseenIds = unseenMessages?.filter((item: any) => item?.messageFrom == currentChatUser?.id)?.map((item: any) => item?._id)
            if (unseenIds?.length) {
                handleMessageStatus(unseenIds, socket, 3)
            }
            let newMessages = reversed?.map(item => {
                return {
                    ...item,
                    message: item?.messageBody,
                    messageToUserID: item?.messageTo,
                    messageFromUserID: item?.messageFrom
                }
            })
            if (skip === 0) {
                const containerStoredMessage = otherMessages?.filter((item: any) => item?.messageFromUserID === currentChatUser?.id)
                let unTrackedMessage: any = []
                containerStoredMessage?.length && containerStoredMessage?.map((item: any) => {
                    const find = newMessages?.find(msg => msg?._id === item?._id)
                    if (!find) {
                        unTrackedMessage.push(item)
                    }
                })

                if (unTrackedMessage?.length) {
                    dispatch({ type: reducerCases.SET_MESSAGES, messages: [...newMessages, ...unTrackedMessage] })
                }
                else {
                    dispatch({ type: reducerCases.SET_MESSAGES, messages: newMessages })
                }
            }
            else {
                dispatch({ type: reducerCases.SET_MESSAGES, messages: [...newMessages, ...messages] })
            }
        }
    }, [isFetching, isLoading])

    useEffect(() => {
        refetch()
    }, [skip])

    // console.log("messages on parent container", messages)
    useEffect(() => {

        let unTrackedSendingMessages: any[] = []
        const sendingMessagesUnderCurrentUser = sendMessages?.filter((message: any) => message?.messageToUserID === currentChatUser?.id)
        if (!arrayIsEmpty(sendingMessagesUnderCurrentUser)) {
            sendingMessagesUnderCurrentUser?.map((message: any) => {
                const find = messages?.find((msg: any) => msg?._id === message?._id)
                if (!find) {
                    unTrackedSendingMessages.push(message)
                }
            })
        }
        if (!arrayIsEmpty(unTrackedSendingMessages)) {
            dispatch({ type: reducerCases.SET_MESSAGES, messages: [...messages, ...unTrackedSendingMessages] })
        }

        const unSeenCurrentUserMessages = messages?.filter((item: any) => item?.messageStatus !== 3 && currentChatUser?.id === item?.messageFromUserID)
        const unSeenIds = unSeenCurrentUserMessages?.map((item: any) => item?._id)
        if (!arrayIsEmpty(unSeenIds)) {
            handleMessageStatus(unSeenIds, socket, 3)
        }

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
                return find?.currentStatus
            }
            return find?.currentStatus
        }
        return message?.messageStatus
    }


    const handlStatusData = (data: any[]) => {
        data?.map((item: any) => {
            setStatusLastMessage(pre => {
                const find = pre?.find(f => f?._id === item?._id)
                if (find) {
                    const filter = pre?.filter(f => f?._id !== item?._id)
                    return [...filter, ...[item]]
                }
                return [...pre, ...[item]]
            })
        })

    }

    useEffect(() => {
        socket?.current?.on('updateSenderMessageStatusV2', (data: any) => {
            console.log("updateSenderMessageStatusV2 09090", data)
            if (data) {
                handlStatusData(data)
            }
        });

        socket?.current?.on('updateReceiverMessageStatusV2', function (data: any) {
            console.log("updateReceiverMessageStatusV2rece 09090", data)
            if (data) {
                // handlStatusData(data)
            }
        });

        return () => {
            if (socket.current) {
                socket?.current?.off('updateSenderMessageStatusV2')
                socket?.current?.off('updateReceiverMessageStatusV2')
            }
        };
    }, [socket.current, currentChatUser]);

    const handleDeleteMessage = (messageId, score) => {
        // return
        const params = {
            "_id": messageId,
            "score": score,
            "messageBody": "This message has been removed",
        }
        // console.log(message)
        socket.current.emit("editMessage", params
            , (err: any, res: any) => {
                if (!err) {
                    updateMessage({ _id: messageId, ...res, message: res?.messageBody }, messages, dispatch)
                }
            }
        );
    }

    const getMessageStatusRender = (status: any) => {
        switch (status) {
            case 1:
                return <BsCheckLg />
            case 2:
                return <BsCheckAll />
            case 3:
                return <BsCheckAll className="brand-color" />
            default:
                break;
        }
    }

    const renderSeenByTooltip = (props: any, message: any, status: any) => {
        if (status !== 3) {
            return <></>
        }
        else {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Seen by {
                        message?.messageFromUserID === currentChatUser?.id ? userInfo?.name : currentChatUser?.name
                    }
                </Tooltip>)
        }
    }
    const sortedMessages = handleSortByDateTime(messages)
    // console.log("sortedMessages", sortedMessages)

    return (
        <>
            <div style={{ height: "100%", padding: "", scrollBehavior: `${skip === 0 ? "auto" : "auto"}`, overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y message-container-bg' ref={containerRef}>
                {
                    userInfo && messages?.length ? sortedMessages?.map((item: any, index: any) => {
                        const isLastMessage = (sortedMessages?.length - 1) === index
                        const status = getMessageStatus(item)
                        const isSender = userInfo.id === item.messageFromUserID
                        return (
                            <div key={index} ref={messagesRef}>
                                {
                                    // item?.score !== 0 ?
                                    <div className="row my-3 w-100 message_content">
                                        {
                                            isSender
                                                ?
                                                <SenderMessages data={item} handleReactionSend={handleReactionSend} handleDeleteMessage={handleDeleteMessage} />
                                                :
                                                <ReceiverMessages data={item} handleReactionSend={handleReactionSend} handleDeleteMessage={handleDeleteMessage} />
                                        }
                                        <div className='d-flex justify-content-end'>
                                            {
                                                isLastMessage ?
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 150, hide: 400 }}
                                                        overlay={(props) => renderSeenByTooltip(props, item, parseInt(isSender ? status : 3))}
                                                    >
                                                        <span className='text-dark fs-6 me-1F'>
                                                            {getMessageStatusRender(parseInt(isSender ? status : 3))}
                                                        </span>
                                                    </OverlayTrigger>
                                                    :
                                                    ""}
                                        </div>
                                    </div>
                                    // :
                                    // <div className='my-3 d-flex justify-content-center'>
                                    //     <span className='py-2 px-5 m-0 bg_gray text-center fs-7 text-dark rounded-pill'>{item?.messageBody}</span>
                                    // </div>
                                }
                            </div>
                        )
                    }) : <div className='text-center'>
                        YOU HAVE NO MESSAGE
                    </div>
                }
            </div>
            {
                scrollBarPositionUp && isLoading || isRefetching || isFetching || !isSuccess ?
                    <>
                        {/* <div className='messages-overlay-loading' style={{ height: "100% !important" }}>
                            <div className="spinner-border loading" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div> */}
                    </>
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
