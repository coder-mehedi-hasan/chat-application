import React from 'react'
import TopNavBar from '../common/TopNavBar'
import user from '../../fake_data/user.json';

export default function PeopleHistory() {
    return (
        <>
            <TopNavBar type={"people"} />
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
        </>
    )
}
