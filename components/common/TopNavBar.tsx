import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { BsFillXCircleFill, BsPencilFill } from 'react-icons/bs'
import { FaBars, FaHome } from 'react-icons/fa'

export default function TopNavBar({ type }: any) {
    const router = useRouter()
    const [canvas, setCanvas] = useState(false);
    return (
        <div style={{ height: "50px", width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center h-100 p-2">
                <div>
                    <Offcanvas className="bg-dark" show={canvas} onHide={() => setCanvas(!canvas)}>
                        <div className='d-flex justify-content-end'>
                            <div onClick={() => setCanvas(!canvas)} className='me-2 fs-4 rounded-circle text-white' style={{ cursor: 'pointer', }}>
                                <BsFillXCircleFill />
                            </div>
                        </div>
                    </Offcanvas>
                    <div className='m-0 d-flex align-items-center'>
                        <div onClick={() => setCanvas(!canvas)} style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                            <FaBars style={{ color: "gray", fontSize: "14px" }} />
                        </div>
                        <span className='text-dark fs-5 fw-medium mx-1'>
                            {type === "chats" && "Chats"}
                            {type === "calls" && "Calls"}
                            {type === "people" && "People"}
                            {type === "stories" && "Stories"}
                        </span>
                    </div>
                </div>
                <div>
                    <div onClick={() => router.push('/')} style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                        <FaHome style={{ color: "gray", fontSize: "14px" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
