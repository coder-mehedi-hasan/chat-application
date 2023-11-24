import React from 'react'
import UserInfoBox from '../common/UserInfoBox'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '../../context/constant'

export default function ChatListItem({ user }) {

    const [{ currentChatUser, userInfo }, dispatch] = useStateProvider()

    const handleClickContact = () => {
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
    }

    return (
        <div style={{ padding: "10px 5px", height: "60px", cursor: "pointer" }} className={`${(currentChatUser?.id === user?.id) && "current_user_active"}`} onClick={handleClickContact} >
            <UserInfoBox user={user} size={45}  />
        </div>
    )
}
