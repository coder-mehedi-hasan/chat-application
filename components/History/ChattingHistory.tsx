import React from 'react'
import SearchBox from '../Dashboard/SearchBox'
import user from '../../fake_data/user.json';
import ActiveUser from '../ActiveUser';
import { BsArrowRight, BsFillXCircleFill, BsPencilFill } from 'react-icons/bs';
import TopNavBar from '../common/TopNavBar';
import ChatListItem from './ChatListItem';
import { useStateProvider } from '../../context/StateContext';


export default function ChattingHistory() {

    const [{ userInfo }, dispatch] = useStateProvider()


    return (
        <>
            <TopNavBar type={"chats"} />
            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} className='chat_history'>
                <div className='my-2'>
                    <SearchBox />
                </div>
                <div className='my-2'>
                    <div className='h-100 d-flex align-items-start' style={{ overflow: "scroll" }}>
                        {
                            user?.slice(0, 10)?.map(item => {
                                return (
                                    <>
                                        {
                                            userInfo?.id !== item?.id ?
                                                <ActiveUser user={item} key={item?.id} /> : ""
                                        }
                                    </>
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
                                            <ChatListItem data={item} key={item?.id} /> : ""

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
