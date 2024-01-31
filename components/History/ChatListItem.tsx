import React, { useState } from 'react'
import UserInfoBox from '../common/UserInfoBox'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChatListItem({ user }: any) {
    const [lastMessageSeen, setLastMessageSeen] = useState(false)

    const [{ currentChatUser, otherMessages }, dispatch]: any = useStateProvider()

    const handleClickContact = () => {
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
        setLastMessageSeen(true)
    }
    const lastMessages = otherMessages?.filter((msg: any) => msg?.messageFromUserID === user?.id)
    const lastMessage = lastMessages[lastMessages?.length - 1]

    return (
        <div style={{ padding: "10px 5px", height: "60px", cursor: "pointer" }} className={`${(currentChatUser?.id === user?.id) && "current_user_active"}`} onClick={handleClickContact} >
            <UserInfoBox lastMessageSeenStatus={lastMessageSeen} lastMessage={lastMessage} user={user} size={45} />
        </div>
    )
}
