import React from 'react'

export default function ActiveUser({ user, click }) {
    return (
        <div onClick={click} style={{ padding: "0 10px" }} className='d-flex flex-column justify-content-center'>
            <div className='active-user'>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }} className='rounded-circle'>
                    <img src={user.image} className='h-100 w-100' />
                </div>
            </div>
            <p className='text-center text-white m-0' style={{ wordWrap: "break-word" }}>{user?.name}</p>
        </div>
    )
}
