import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useStateProvider } from '../../context/StateContext'
import { MdOutlineDrafts } from "react-icons/md";
import { handleSortByDateTime } from '../../utils/functions/message';


export default function UserInfoBox({ user, size, lastMessage, lastMessageSeenStatus, ...props }: any) {
    const [{ currentChatUser, draftMessages, messages, socket }, dispatch]: any = useStateProvider()
    const [statusLastMessage, setStatusLastMessage] = useState<any[]>([]);
    const draftMessage = draftMessages?.find((_: any) => _?.messageToUserID === user?.id)
    // if (!lastMessage) {
    const sortMessages = handleSortByDateTime(messages)
    const singleLastMessage = sortMessages[sortMessages?.length - 1]
    // if (user?.id === singleLastMessage?.messageToUserID) {
    //     lastMessage = singleLastMessage
    // }
    // }

    useEffect(() => {
        socket?.current.on('updateSenderMessageStatusV2', (data: any) => {
            if (data) {
                handlStatusData(data)
            }
        });
    })


    useEffect(() => {
        socket?.current.on('updateReceiverMessageStatusV2', function (data: any) {
            if (data) {
                handlStatusData(data)
            }
        });
    })

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
                    draftMessage && currentChatUser?.id !== draftMessage?.messageToUserID ?
                        <p
                            style={{ fontSize: "12px", margin: "0" }}
                            className={`
                            m-0 text-danger

                            `}>
                            <MdOutlineDrafts />
                            {" " + draftMessage?.message}
                        </p>
                        :
                        <p
                            style={{ fontSize: "12px", margin: "0" }}
                            className={`m-0 ${lastMessage && getMessageStatus(lastMessage) !== 3 ? "unseen-last-message" : ""}`}

                        >{lastMessage?.message ?? user?.id === singleLastMessage?.messageToUserID && singleLastMessage?.message}
                        </p>
                }
            </div>
        </div>
    )
}
