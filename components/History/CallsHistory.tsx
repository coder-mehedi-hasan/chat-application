import React from 'react'
import TopNavBar from '../common/TopNavBar'
import SearchBox from '../Dashboard/SearchBox'
import ActiveUser from '../ActiveUser'
import user from '../../fake_data/user.json';
import { BsArrowRight } from 'react-icons/bs';
import UserInfoBox from '../common/UserInfoBox';

export default function CallsHistory() {
    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>
                <TopNavBar type={"calls"} />
                <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
                    <div className='my-2'>
                        <div className='h-100 d-flex align-items-start' style={{ overflow: "scroll" }}>
                            {
                                user?.slice(0, 10)?.map(item => {
                                    return (
                                        // <ActiveUser click={() => handleChatInterface(item?.id)} user={item} key={item?.id} />
                                        <></>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
