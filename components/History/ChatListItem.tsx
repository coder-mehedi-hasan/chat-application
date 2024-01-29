import React, { useState } from 'react'
import UserInfoBox from '../common/UserInfoBox'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChatListItem({ user }: any) {
    const [lastMessageSeen, setLastMessageSeen] = useState(false)

    const [{ currentChatUser, userInfo, otherMessages }, dispatch]: any = useStateProvider()

    const handleClickContact = () => {
        // const removeMessageFromOthers = otherMessages?.filter((item: any) => item?.messageFromUserID !== user?.id)
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
        // dispatch({ type: reducerCases.SET_OTHERS_MESSAGE, otherMessages: removeMessageFromOthers })
        setLastMessageSeen(true)
    }
    const lastMessage = otherMessages?.find((msg: any) => msg?.messageFromUserID === user?.id)
    return (
        <div style={{ padding: "10px 5px", height: "60px", cursor: "pointer" }} className={`${(currentChatUser?.id === user?.id) && "current_user_active"}`} onClick={handleClickContact} >
            <UserInfoBox lastMessageSeenStatus={lastMessageSeen} lastMessage={lastMessage} user={user} size={45} />
        </div>
    )
}
