import React from 'react'
import { Image } from 'react-bootstrap'

export default function ActiveUser({ user, click }) {
    return (
        <div onClick={click} style={{ padding: "0 10px" }} className='d-flex flex-column justify-content-center'>
            <div className='active-user'>
                <Image src={user.image} height={60} width={60} roundedCircle />
            </div>
            <p className='text-center text-black m-0 fw-medium' style={{ wordWrap: "break-word" }}>{user?.name}</p>
        </div>
    )
}
