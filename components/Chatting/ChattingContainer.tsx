import React, { useEffect, useRef, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'
import { useQuery } from '@tanstack/react-query'

export default function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages, socketEvent }, dispatch]: any = useStateProvider()
    const [senderReaction, setSenderReaction]: any = useState()
    const [receiverReaction, setReceiverReaction]: any = useState()
    const [messageReaction, setMessageReaction] = useState<Boolean>(false)
    const messagesRef = useRef(null)
    const containerRef = useRef(null)
    const [skip, setSkip] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(50)



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
    // console.log("isFetching", isFetching)
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
        const container = containerRef.current;
        if (container) {
            const isAtTop = container.scrollTop === 0;
            // const isAtBottom = container.scrollTop + container.clientHeight === container.scrollHeight;
            if (isAtTop) {
                setSkip(pre => pre + 1);
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
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

    }, [currentChatUser])

    useEffect(() => {
        // console.log("set event firing")
        if (isSuccess && allChattingMessages?.length) {
            const reversed = [...allChattingMessages]?.reverse();
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

    // if (isLoading) {
    //     messagesRef?.current?.scrollIntoView();
    // }

    useEffect(() => {
        refetch()
        // messagesRef?.current?.scrollIntoView();
    }, [skip])

    useEffect(() => {
        if (socket.current && socketEvent) {
            socket.current.on('clientToClientMessage', (response: any) => {
                console.log("responsefromreciver", response)
                if (response.sMessageObj?.messageFromUserID !== currentChatUser?.id) {
                    dispatch({ type: reducerCases.SET_OTHERS_MESSAGE, newMessage: response.sMessageObj })
                }
                else {
                    dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: response.sMessageObj })
                    socket.current.emit('updateMessageStatusV2', {
                        _ids: [response?.sMessageObj?._id],
                        currentStatus: 3
                    })
                    messagesRef?.current?.scrollIntoView();
                }
            })
            return () => {
                if (socket.current) {
                    socket.current.off('clientToClientMessage');
                    dispatch({ type: reducerCases.SOCKET_EVENT, socketEvent: false })
                }
            };
        }
    }, [socket.current, dispatch, socketEvent]);

    useEffect(() => {
        if (skip === 0) {
            messagesRef?.current?.scrollIntoView();
        } else {
            // console.log("current_position", Math.floor((containerRef?.current?.scrollHeight) / skip))
            containerRef.current.scrollTop = Math.floor((containerRef?.current?.scrollHeight) / skip)
        }
    })

    return (
        <div style={{ height: "100%", padding: "", scrollBehavior: "auto", overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y message-container-bg' ref={containerRef}>
            {
                // isLoading || isRefetching ?
                // "Loading...":
                userInfo && messages && messages?.map((item, index) => {
                    const isLastMessage = (messages?.length - 1) === index
                    return (
                        <div key={index} ref={messagesRef}>
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
            {
                isLoading || isRefetching || isFetching ?
                    <div className='messages-overlay-loading'>
                        <div className="spinner-border loading" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}
