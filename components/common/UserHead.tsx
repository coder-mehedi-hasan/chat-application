import React, { useState, useEffect } from 'react'
import Image50X50 from './Image50X50';
import { Form, Image, InputGroup } from 'react-bootstrap';

export default function UserHead({ sideBarHandler }) {

    return (
        <div className='my-2'>
            <div className="d-flex align-items-center">
                <div style={{ paddingLeft: "2px" }}>
                    <div style={{ height: "60px", width: "60px", borderRadius: "50%", overflow: "hidden" }}>
                        <Image style={{ border: "3px solid #3fb9a4ff" }} className='img-fluid' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" onClick={sideBarHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}
