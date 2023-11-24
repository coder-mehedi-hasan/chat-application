import React from 'react'
import { Image } from 'react-bootstrap'

export default function UserInfoBox({ user, size }) {
    return (
        <div className={`w-100 h-100 d-flex align-items-center text-body-emphasis`}>
            <div>
                <div style={{ height: size, width: size, overflow: "hidden", borderRadius: "50%" }}>
                    <Image className='img-fluid' src={user?.image} />
                </div>
            </div>
            <div className='ms-3' >
                <p style={{ fontSize: `${size / 3}px` }} className='m-0'>{user?.name}</p>
                <p style={{ fontSize: "12px", margin: "0" }} className='m-o fw-light'>{user?.id} minute ago</p>
            </div>
        </div>
    )
}
