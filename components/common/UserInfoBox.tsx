import React from 'react'
import { Image } from 'react-bootstrap'

export default function UserInfoBox({ user, size }) {
    return (
        <div className='d-flex align-items-center'>
            <div>
                <Image height={size} width={size} src={user?.image} roundedCircle />
            </div>
            <div className='ms-3' >
                <p style={{ fontSize:  `${size/3}px` }} className='m-0 fw-medium'>{user?.name}</p>
                <p style={{ fontSize: "12px", margin: "0" }} className='m-o fw-light'>{user?.id} minute ago</p>
            </div>
        </div>
    )
}
