import React, { useRef, useState } from 'react'
import SearchBox from '../Dashboard/SearchBox'
import user from '../../fake_data/user.json';
import ActiveUser from '../ActiveUser';
import { BsArrowRight, BsFillXCircleFill, BsPencilFill } from 'react-icons/bs';
import TopNavBar from '../common/TopNavBar';
import ChatListItem from './ChatListItem';
import { useStateProvider } from '../../context/StateContext';


export default function ChattingHistory() {

    const [{ userInfo, otherMessages }, dispatch] = useStateProvider()
    const activeUserRef = useRef(null)
    const [pageX, setPageX] = useState(0)
    const [mouseClick, setMouseClick] = useState(false)

    const handleGrabbing = (e) => {
        // console.log(activeUserRef)
        // console.log(e)
        // setPageX(e.pageX)
        // setMouseClick(true)

    }

    const handleOver = (e) => {
        // if (mouseClick) {
        //     if (e.pageX > pageX) {
        //         activeUserRef.current.scrollLeft += 50
        //     }
        //     else if (e.pageX < pageX) {
        //         activeUserRef.current.scrollLeft -= 50
        //     }
        //     // console.log(e)
        // }
    }
    console.log("otherMessages",otherMessages)

    return (
        <>
            <TopNavBar type={"chats"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
                <div className='my-2'>
                    <SearchBox />
                </div>
                <div className='my-2'>
                    <div className='h-100 d-flex align-items-start active-users' style={{ overflow: "scroll", scrollBehavior: "smooth", transition: ".4s" }} ref={activeUserRef} onMouseOver={handleOver} onMouseDown={handleGrabbing}>
                        {
                            user?.slice(0, 10)?.map((item, index) => {
                                return (
                                    <div key={index} className='active-users-wrapper'>
                                        {
                                            userInfo?.id !== item?.id ?
                                                <ActiveUser user={item} /> : ""
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            user?.length > 10 ?
                                <div style={{ paddingRight: "10px" }} className='d-flex justify-content-center'>
                                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }} className='flex-column text-white d-flex justify-content-center align-items-center bg-secondary rounded-circle'>
                                        <BsArrowRight className="fs-4" />
                                    </div>
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
                <div>
                    {
                        user?.map(item => {
                            return (
                                <>
                                    {
                                        userInfo?.id !== item?.id ?
                                            <ChatListItem user={item} key={item?.id} /> : ""

                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
