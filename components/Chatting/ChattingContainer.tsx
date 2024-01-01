import React, { useEffect, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChattingContainer() {
    const [{ currentChatUser, userInfo, socket, messages }, dispatch] = useStateProvider()
    const [senderReaction, setSenderReaction] = useState()
    const [receiverReaction, setReceiverReaction] = useState()

    useEffect(() => {
        dispatch({ type: reducerCases.SET_MESSAGES, messages: [] })
    }, [currentChatUser])

    useEffect(() => {
        socket.current.on("editMessage", (res: any) => {

        })
    })
    const handleReactionSend = (messageId: string, reactionName: string, sendingType: boolean) => {
        socket.current.emit("editMessage",
            {
                "_id": messageId,
                "react": true,
                "reactionParams": {
                    "score": 1,
                    "reaction": reactionName,
                    "reactedBy": userInfo?.id,
                }
            }
            , (err:any, res:any) => {
                if (res && !err) {

                }

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
                                    <SenderMessages data={item} />
                                    :
                                    <ReceiverMessages data={item} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
