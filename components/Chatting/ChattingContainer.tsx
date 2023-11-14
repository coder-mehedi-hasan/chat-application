import React, { useEffect, useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChattingContainer() {
    const [{ currentChatUser, userInfo, current_location, messages }, dispatch] = useStateProvider()

    useEffect(() => {
        dispatch({ type: reducerCases.SET_MESSAGES, messages: [] })
    }, [currentChatUser])

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
