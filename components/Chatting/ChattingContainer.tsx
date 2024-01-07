import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        dispatch({ type: reducerCases.SET_MESSAGES, messages: [] })
    }, [currentChatUser])

    useEffect(() => {
        socket.current.on("editMessage", (res: any) => {
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
                "cancel": sendingType
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
            , (err, res) => {
                setSenderReaction(res)
                setMessageReaction(!messageReaction)
            }
        );
    }

    return (
        <div style={{ height: "100%", padding: "", scrollBehavior: "auto", overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y'>
            {
                userInfo && messages && messages?.map((item, index) => {
                    return (
                        <div key={index}>
                            {
                                userInfo.id === item.messageFromUserID
                                    ?
                                    <SenderMessages data={item} handleReactionSend={handleReactionSend} isReaction={messageReaction} />
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
