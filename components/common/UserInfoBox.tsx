import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useStateProvider } from '../../context/StateContext'
import { MdOutlineDrafts } from "react-icons/md";
import { handleSortByDateTime } from '../../utils/functions/message';


export default function UserInfoBox({ user, size, ...props }: any) {
    const [{ currentChatUser, messages, socket, otherMessages }, dispatch]: any = useStateProvider()
    const [statusLastMessage, setStatusLastMessage] = useState<any[]>([]);
    const sortMessages = handleSortByDateTime(messages)
    const singleLastMessage = sortMessages[sortMessages?.length - 1]


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

    let renderLastMessage = null
    if (currentChatUser?.id === user?.id) {
        renderLastMessage = messages[messages?.length - 1]
    } else {
        const lastMessageFromOthers = otherMessages?.filter(msg => msg?.messageFromUserID == user?.id || msg?.messageToUserID == user?.id)
        renderLastMessage = lastMessageFromOthers?.length && lastMessageFromOthers[lastMessageFromOthers?.length - 1]
    }

    return (
        <div className={`w-100 h-100 d-flex align-items-center text-body-emphasis `}>
            <div>
                <div style={{ height: size, width: size, overflow: "hidden", borderRadius: "50%" }}>
                    <Image className='img-fluid' src={user?.image} />
                </div>
            </div>
            <div className='ms-3' >
                <p style={{ fontSize: `14px` }} className='m-0'>{user?.name}</p>
                {
                    <p
                        style={{ fontSize: "12px", margin: "0" }}
                    // className={`m-0 ${lastMessage && getMessageStatus(lastMessage) !== 3 ? "unseen-last-message" : ""}`}

                    >
                        {renderLastMessage?.messageBody?.substring(0, 40) ?? ""}
                    </p>
                }
            </div>
        </div>
    )
}
