import React, { useState } from 'react'
import SenderMessages from '../Messages/SenderMessage'
import ReceiverMessages from '../Messages/ReceiverMessage'

export default function ChattingContainer() {
    const [inbox, setInbox] = useState([])
    return (
        <div style={{ height: "100%", padding: "", scrollBehavior: "auto", overflowY: "scroll" }} className='px-lg-4 px-md-2 px-sm-1 px-xs-1 text-white overflow-scroll scrollbar_visible_y'>
            {
                inbox && inbox?.map((item, index) => {
                    return (
                        <div key={index}>
                            {
                                // userId && userId === item?.messageFromUserID ?
                                inbox ?
                                    <SenderMessages data={item} />
                                    :
                                    <ReceiverMessages data={item} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
