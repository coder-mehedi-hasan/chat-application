import React from 'react'
import UserInfoBox from '../common/UserInfoBox'
import { useStateProvider } from '../../context/StateContext'
import { reduceCases } from '../../context/constant'

export default function ChatListItem({ data }) {

    const [{ currentChatUser, userInfo }, dispatch] = useStateProvider()

    const handleClickContact = () => {
        // if (currentChatUser?.id === data?.id) {
            dispatch({ type: reduceCases.CHANGE_CURRENT_CHAT_USER, user: data })
        // }
    }

    return (
        <div style={{ padding: "0px 5px", height: "60px" }} className='text-white' onClick={handleClickContact} >
            <UserInfoBox user={data} size={45} />
        </div>
    )
}
