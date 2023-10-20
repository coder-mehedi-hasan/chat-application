import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import React, { useEffect, useState } from 'react'
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




export default function Dashboard() {
    const [check, setCheck] = useState(false)
    const [contactId, setContactId] = useState(null)
    const [status, setStatus] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    const [windowWidth, setWindowWidth] = useState()
    const isMobileWidth = useMediaQuery({ maxWidth: 768 })

    useEffect(() => {
        setCheck(isMobileWidth)
    }, [isMobileWidth]
    )

    return (
        <div className='w-100 p-0 container-fluid bg-dark' id='chat_bar' >
            <div className="d-flex">
                <div id='side-bar' style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: "320px" }}>
                    {/* <Sidebar
                        collapsed={check}
                        backgroundColor='#212529'
                        width={isMobileWidth ? "200px" : "280px"}
                        collapsedWidth='65px'
                        style={{ height: "100vh" }}
                    >
                        <div className='py-3'>
                            <UserHead sideBarHandler={() => check ? setCheck(false) : setCheck(true)} />
                            <SearchBox />
                        </div>
                        <Menu style={{ height: "75%", overflowY: "scroll" }}
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    if (level === 0)
                                        return {
                                            color: disabled ? '#A7A9B7' : '#fff',
                                            backgroundColor: active ? '#22E19E' : undefined,
                                            "&:hover": {
                                                backgroundColor: "#024439b5 !important",
                                                color: "#f5f5f5 !important",
                                                fontWeight: "bold !important"
                                            },
                                        };

                                },
                            }}
                        >
                            {
                                user.map(item => {
                                    return (
                                        <MenuItem onClick={() => setContactId(item?.id)} key={item?.id} style={{ padding: "0px 5px", height: "65px" }} >
                                            <UserInfoBox user={item} size={45} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Sidebar> */}
                    {/* 
                    <div id='side-bar' style={{ width: "300px", height: "100vh" }}>

                    </div> */}
                    <div style={{ height: "50px" }}>
                        <div className="d-flex justify-content-between align-items-center h-100 p-2">
                            <div>
                                <div className='m-0 d-flex align-items-center'>
                                    <div style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                        <FaBars style={{ color: "white", fontSize: "14px" }} />
                                    </div>
                                    <span className='text-white fs-5 fw-medium mx-1'>Chats</span>
                                </div>
                            </div>
                            <div>
                                <div style={{ height: "30px", width: "30px", cursor: "pointer" }} className='bg-secondary rounded-circle d-flex justify-content-center align-items-center'>
                                    <BsPencilFill style={{ color: "white", fontSize: "14px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100%", background: "", overflow: "scroll" }}>
                        <div className='my-2'>
                            <SearchBox />
                        </div>
                        <div className='my-2'>
                            <div className='h-100 d-flex align-items-start' style={{ overflow: "scroll" }}>
                                {
                                    user?.slice(0, 10)?.map(item => {
                                        return (
                                            <ActiveUser click={()=>setContactId(item?.id)} user={item} key={item?.id} />
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
                                        <div style={{ padding: "0px 5px", height: "60px" }} onClick={() => setContactId(item?.id)} className='text-white' key={item?.id}>
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
                                    <BsFillChatFill style={{ color: "white", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Chats
                                </p>
                            </div>
                            <div className='text-center text-white'>
                                <p className='m-0'>
                                    <FaVideo style={{ color: "white", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Calls
                                </p>
                            </div>
                            <div className='text-center text-white'>
                                <p className='m-0'>
                                    <BsPeopleFill style={{ color: "white", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    People
                                </p>
                            </div>
                            <div className='text-center text-white'>
                                <p className='m-0'>
                                    <BsFillGeoFill style={{ color: "white", fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Stories
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <div id='chat-app-layout'>
                    {
                        contactId === null ? <HomeChat /> : ""
                    }
                    {
                        contactId !== null ? <ChattingInterFace contact_id={contactId} /> : ""
                    }
                </div>
            </div>
        </div>
    )
}
