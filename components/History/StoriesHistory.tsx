import React from 'react'
import TopNavBar from '../common/TopNavBar'
import SearchBox from '../Dashboard/SearchBox'
import ActiveUser from '../ActiveUser'
import user from '../../fake_data/user.json';
import { BsArrowRight } from 'react-icons/bs';
import UserInfoBox from '../common/UserInfoBox';

export default function StoriesHistory({ handleChatInterface }) {
    return (
        <>
            <TopNavBar type={"stories"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
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
            </div>
        </>
    )
}
