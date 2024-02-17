import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
import { useStateProvider } from '../../context/StateContext'

export default function ChatHeader({ modal }: any) {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const [{ currentChatUser }]: any = useStateProvider()


    return (
        <div style={{ height: "80px", background: "white" }} className={`text-white d-flex align-items-center justify-content-between px-3 border-bottom ${isMobileWidth ? "fixed-top" : ""}`}>
            {
                isMobileWidth ?
                    <div onClick={modal} className='me-2 p-1 rounded-circle text-dark' style={{ cursor: 'pointer', }}>
                        <BsArrowLeft />
                    </div>
                    :
                    ""
            }
            <div className='w-100 h-100 d-flex align-items-center text-body-emphasis'>
                <div>
                    <div style={{ height: "55px", width: "55px", overflow: "hidden", borderRadius: "50%" }}>
                        <Image className='img-fluid' src={currentChatUser?.image} />
                    </div>
                </div>
                <div className='ms-3' >
                    <p style={{ fontSize: `15px` }} className='m-0'>{currentChatUser?.name}</p>
                    <p style={{ fontSize: "12px", margin: "0" }} className='m-o fw-light'>{currentChatUser?.id} minute ago</p>
                </div>
            </div>
            <div>
                <Button style={{ height: "45px", width: "45px", borderRadius: "50%", background: "none", border: "1px solid #3fb9a4ff" }}>
                    <Image src='https://i.ibb.co/v41GDy9/menu.png' className='img-fluid'></Image>
                </Button>
            </div>
        </div>
    )
}
