import React from 'react'
import UserInfoBox from '../common/UserInfoBox'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChatListItem({ user }: any) {

    const [{ currentChatUser, userInfo, otherMessages }, dispatch]: any = useStateProvider()

    const handleClickContact = () => {
        const removeMessageFromOthers = otherMessages?.filter((item: any) => item?._id !== user?.lastMessage?._id)
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
        dispatch({ type: reducerCases.SET_OTHERS_MESSAGE, otherMessages: removeMessageFromOthers })

    }

    return (
        <div style={{ padding: "10px 5px", height: "60px", cursor: "pointer" }} className={`${(currentChatUser?.id === user?.id) && "current_user_active"}`} onClick={handleClickContact} >
            <UserInfoBox lastMessage={user?.lastMessage} user={user} size={45} />
        </div>
    )
}
