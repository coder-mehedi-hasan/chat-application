import React, { useState } from 'react'
import SearchBox from '../Dashboard/SearchBox'
import user from '../../fake_data/user.json';
import ActiveUser from '../ActiveUser';
import { BsArrowRight, BsFillXCircleFill, BsPencilFill } from 'react-icons/bs';
import UserInfoBox from '../common/UserInfoBox';
import { Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import TopNavBar from '../common/TopNavBar';


export default function ChattingHistory({ handleChatInterface }) {


    return (
        <>
            <TopNavBar type={"chats"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
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
                                <div style={{ padding: "0px 5px", height: "60px" }} onClick={() => handleChatInterface(item?.id)} className='text-white' key={item?.id}>
                                    <UserInfoBox user={item} size={45} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
