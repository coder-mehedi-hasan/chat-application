import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import React, { useEffect, useState, useRef } from 'react'
import SideBarItemAfter from './SideBar/SideBarItemAfter';
import user from '../../fake_data/user.json';
import SideBarItemBefore from './SideBar/SideBarItemBefore';
import Image from 'react-bootstrap/Image';
import Image50X50 from '../common/Image50X50';
import UserHead from '../common/UserHead';
import SearchBox from './SearchBox';
import HomeChat from '../common/HomeChat';
import ChattingInterFace from '../common/ChattingInterFace';
import UserInfoBox from '../common/UserInfoBox';
import { useMediaQuery } from 'react-responsive'
import { FaBeer, FaAlignLeft, FaPencilAlt, FaBars, FaVideo } from 'react-icons/fa';
import { CgMenu } from "react-icons/cg";
import { BsFillChatFill, BsFillCameraVideoFill, BsPeopleFill, BsFillGeoFill, BsPencilFill, BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import ActiveUser from '../ActiveUser';
import { Button, Modal, Offcanvas } from 'react-bootstrap';
import { BsArrowLeftShort, BsArrowLeft, BsFillXCircleFill } from "react-icons/bs";




export default function Dashboard() {
    const [contactId, setContactId] = useState(null)
    const [status, setStatus] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [showChat, setShowChat] = useState(false)
    const [active, setActive] = useState(true)

    const [windowHeight, setWindowHeight] = useState(0)
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })

    // let windowHeight

    // if (window !== undefined) {
    //     windowHeight = window.innerHeight
    // }

    const handleChatInterface = (id) => {
        setContactId(id)
        setShowChat(true)
        if (isMobileWidth) {
            handleShow()
        }

    }
    const updateWindowHeight = () => {
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        // updateWindowHeight()
        // Initial window height
        setWindowHeight(window.innerHeight);
    }, []);
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(!show);
    }
    const [canvas, setCanvas] = useState(false);

    return (
        <div className='w-100 p-0 container-fluid' id='chat_bar' >
            <div className="d-flex">
                <div id='side-bar' style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: isMobileWidth ? "100%" : isMediumWidth ? "255px" : "320px" }}>
                    <div style={{ height: "50px" }}>
                        <div className="d-flex justify-content-between align-items-center h-100 p-2">
                            <div>
                                <Offcanvas className="bg-dark" show={canvas} onHide={() => setCanvas(!canvas)}>
                                    <div className='d-flex justify-content-end'>
                                        <div onClick={() => setCanvas(!canvas)} className='me-2 fs-4 rounded-circle text-white' style={{ cursor: 'pointer', }}><BsFillXCircleFill /></div>
                                    </div>
                                </Offcanvas>
                                <div className='m-0 d-flex align-items-center'>
                                    <div onClick={() => setCanvas(!canvas)} style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                        <FaBars style={{ color: "gray", fontSize: "14px" }} />
                                    </div>
                                    <span className='text-dark fs-5 fw-medium mx-1'>Chats</span>
                                </div>
                            </div>
                            <div>
                                <div style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                    <BsPencilFill style={{ color: "gray", fontSize: "14px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: `${isMobileWidth ? windowHeight - 110 + "px" : "100%"}`, overflow: "scroll" }}>
                        <div className='my-2'>
                            <SearchBox />
                        </div>
                        <div className='my-2'>
                            <div className='h-100 d-flex align-items-start' style={{ overflow: "scroll" }}>
                                {
                                    user?.slice(0, 10)?.map(item => {
                                        return (
                                            <ActiveUser click={() => handleChatInterface(item?.id)} user={item} key={item?.id} />
                                        )
                                    })
                                }
                                {
                                    user?.length > 10 ?
                                        <div style={{ paddingRight: "10px" }} className='d-flex justify-content-center'>
                                            <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }} className='flex-column text-white d-flex justify-content-center align-items-center bg-secondary rounded-circle'>
                                                {/* <img src={user.image} className='h-100 w-100' /> */}
                                                <BsArrowRight className="fs-4" />
                                                {/* <BsArrowRightShort/> */}
                                            </div>
                                        </div>
                                        : ""
                                }
                            </div>
                        </div>
                        <div>
                            {
                                user?.map(item => {
                                    return (
                                        <div style={{ padding: "0px 5px", height: "60px" }} onClick={() => handleChatInterface(item?.id)} className='text-white' key={item?.id}>
                                            <UserInfoBox user={item} size={45} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{ height: "60px" }}>
                        <div className="d-flex justify-content-between align-items-center h-100 p-2">
                            <div className='text-center text-white'>
                                <p className='m-0'>
                                    <BsFillChatFill style={{ color: active ? "#3cb29d" : "gray", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal' style={{ color: active ? "#3cb29d" : "gray" }}>
                                    Chats
                                </p>
                            </div>
                            <div className='text-center text-dark-emphasis'>
                                <p className='m-0'>
                                    <FaVideo style={{ color: "gray", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Calls
                                </p>
                            </div>
                            <div className='text-center text-dark-emphasis'>
                                <p className='m-0'>
                                    <BsPeopleFill style={{ color: "gray", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    People
                                </p>
                            </div>
                            <div className='text-center text-dark-emphasis'>
                                <p className='m-0'>
                                    <BsFillGeoFill style={{ color: "gray", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Stories
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    isMobileWidth ?
                        <Modal show={show} fullscreen={fullscreen}>
                            <div id='chat-app-layout'>
                                <ChattingInterFace modal={handleShow} contact_id={contactId} />
                            </div>
                        </Modal>
                        :
                        <div id='chat-app-layout'>
                            {
                                !showChat || contactId === null ? <HomeChat /> : <ChattingInterFace modal={handleShow} contact_id={contactId} />
                            }
                        </div>
                }
            </div>
        </div >
    )
}
