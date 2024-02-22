import React, { useState } from 'react'
import HomeChat from '../common/HomeChat';
import ChattingInterFace from '../Chatting/ChattingInterFace';
import { useMediaQuery } from 'react-responsive'
import { FaVideo } from 'react-icons/fa';
import { BsFillChatFill, BsPeopleFill, BsFillGeoFill } from "react-icons/bs";
import ChattingHistory from '../History/ChattingHistory';
import CallsHistory from '../History/CallsHistory';
import PeopleHistory from '../History/PeopleHistory';
import StoriesHistory from '../History/StoriesHistory';
import { useStateProvider } from '../../context/StateContext';

export default function Dashboard() {
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })
    const isMediumWidth = useMediaQuery({ maxWidth: 768 })
    const [tab, setTab] = useState("chats")
    const [{ currentChatUser, }]: any = useStateProvider()

    const handleBottomTab = (t: any) => {
        setTab(t)
    }

    return (
        <div className='w-100 p-0 container-fluid' id='chat_bar' >
            <div className="d-flex">
                <div id='side-bar' style={{ height: "100vh", display: "flex", flexDirection: "column", paddingLeft: "0.5px", width: isMobileWidth ? "100%" : isMediumWidth ? "255px" : "320px", borderRight: "1px ridge" }}>
                    <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
                        {tab === "chats" && <ChattingHistory />}
                        {tab === "calls" && <CallsHistory />}
                        {tab === "people" && <PeopleHistory />}
                        {tab === "stories" && <StoriesHistory />}
                    </div>
                    <div style={{ height: "60px" }}>
                        <div className="d-flex align-items-center h-100 p-2">
                            <div className={`text-center text-dark-emphasis cursor-pointer mx-2 ${tab === "chats" && 'active'}`} onClick={() => handleBottomTab("chats")}>
                                <p className='m-0'>
                                    <BsFillChatFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className="m-0 text-sm fw-normal">
                                    Chats
                                </p>
                            </div>
                            {/* <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "calls" && 'active'}`} onClick={() => handleBottomTab("calls")}>
                                <p className='m-0'>
                                    <FaVideo style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Calls
                                </p>
                            </div> */}
                            <div className={`text-center text-dark-emphasis mx-2 cursor-pointer ${tab === "people" && 'active'}`} onClick={() => handleBottomTab("people")}>
                                <p className='m-0'>
                                    <BsPeopleFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    People
                                </p>
                            </div>
                            {/* <div className={`text-center text-dark-emphasis cursor-pointer ${tab === "stories" && 'active'}`} onClick={() => handleBottomTab("stories")}>
                                <p className='m-0'>
                                    <BsFillGeoFill style={{ fontSize: "14px" }} />
                                </p>
                                <p className='m-0 text-sm fw-normal'>
                                    Stories
                                </p>
                            </div> */}
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