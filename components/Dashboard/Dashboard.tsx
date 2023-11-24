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
import ChattingInterFace from '../Chatting/ChattingInterFace';
import UserInfoBox from '../common/UserInfoBox';
import { useMediaQuery } from 'react-responsive'
import { FaBeer, FaAlignLeft, FaPencilAlt, FaBars, FaVideo } from 'react-icons/fa';
import { CgMenu } from "react-icons/cg";
import { BsFillChatFill, BsFillCameraVideoFill, BsPeopleFill, BsFillGeoFill, BsPencilFill, BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import ActiveUser from '../ActiveUser';
import { Button, Modal, Nav, Offcanvas } from 'react-bootstrap';
import { BsArrowLeftShort, BsArrowLeft, BsFillXCircleFill } from "react-icons/bs";
import ChattingHistory from '../History/ChattingHistory';
import CallsHistory from '../History/CallsHistory';
import PeopleHistory from '../History/PeopleHistory';
import StoriesHistory from '../History/StoriesHistory';
import { useStateProvider } from '../../context/StateContext';

export default function Dashboard() {
    const [contactId, setContactId] = useState(null)
    const [showChat, setShowChat] = useState(false)
    const [active, setActive] = useState(true)
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const [fullscreen, setFullscreen] = useState(true);
    const [tab, setTab] = useState("chats")
    const [{ currentChatUser }] = useStateProvider()

    const handleBottomTab = (t) => {
        setTab(t)
    }
    useEffect(() => {

    }, [contactId])

    return (
        <div className='w-100 p-0 container-fluid' id='chat_bar' >
            <div className="d-flex">
                <div id='side-bar' style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: isMobileWidth ? "100%" : isMediumWidth ? "255px" : "320px", borderRight: "1px ridge",backgroundColor:"#f5f5f5" }}>
                    <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
                        {tab === "chats" && <ChattingHistory />}
                        {tab === "calls" && <CallsHistory />}
                        {tab === "people" && <PeopleHistory />}
                        {tab === "stories" && <StoriesHistory />}
                    </div>
                    <div style={{ height: "60px" }}>
                        <div className="d-flex justify-content-between align-items-center h-100 p-2">
                            <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "chats" && 'active'}`} onClick={() => handleBottomTab("chats")}>
                                <p className='m-0'>
                                    <BsFillChatFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className="m-0 text-sm fw-normal">
                                    Chats
                                </p>
                            </div>
                            <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "calls" && 'active'}`} onClick={() => handleBottomTab("calls")}>
                                <p className='m-0'>
                                    <FaVideo style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Calls
                                </p>
                            </div>
                            <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "people" && 'active'}`} onClick={() => handleBottomTab("people")}>
                                <p className='m-0'>
                                    <BsPeopleFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    People
                                </p>
                            </div>
                            <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "stories" && 'active'}`} onClick={() => handleBottomTab("stories")}>
                                <p className='m-0'>
                                    <BsFillGeoFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Stories
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    currentChatUser ? <ChattingInterFace /> : <HomeChat />
                }
            </div>
        </div >
    )
}