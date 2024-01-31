import React from 'react'
import { Image } from 'react-bootstrap'
import { useStateProvider } from '../../context/StateContext'
import { MdOutlineDrafts } from "react-icons/md";


export default function UserInfoBox({ user, size, lastMessage, lastMessageSeenStatus, ...props }: any) {
    const [{ currentChatUser, draftMessages }, dispatch]: any = useStateProvider()
    const draftMessage = draftMessages?.find((_: any) => _?.messageToUserID === user?.id)
    return (
        <div className={`w-100 h-100 d-flex align-items-center text-body-emphasis ${lastMessage ? "unseen-last-message" : ""} `}>
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
                            className='m-0 text-danger'>
                            <MdOutlineDrafts />
                            {" " + draftMessage?.message}
                        </p>
                        :
                        <p
                            style={{ fontSize: "12px", margin: "0" }}
                            className='m-0'>{lastMessage?.message}
                        </p>
                }
            </div>
        </div>
    )
}
