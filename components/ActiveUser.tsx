import React from 'react'
import { Image } from 'react-bootstrap'
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/constant'

export default function ActiveUser({ user }) {
    const [{ currentChatUser, userInfo }, dispatch] = useStateProvider()

    const handleClickContact = () => {
        // if (currentChatUser?.id === data?.id) {
        dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: user })
        // }
    }
    return (
        <div style={{ padding: "0 10px" }} className='d-flex flex-column justify-content-center' onClick={handleClickContact}>
            <div className='active-user'>
                <div style={{ height: "60px", width: "60px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={user.image} className='img-fluid' />
                </div>
            </div>
            <p className='text-center text-black m-0 fw-medium' style={{ wordWrap: "break-word" }}>{user?.name}</p>
        </div>
    )
}
