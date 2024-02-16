import React from 'react'
import { useEffect } from 'react';
import MessageSideAction from '../common/MessageSideAction';
import TextContent from './TextContent';
import FileContent from './FileContet';
import { useStateProvider } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query';
import Reactions from './Reactions';
import { OverlayTrigger } from 'react-bootstrap';
import renderMessageTime from '../common/render-message-time';
import getContent from '../../utils/getContent';

export default function ReceiverMessages({ data, handleReactionSend, handleDeleteMessage }: any) {
    const [{ currentChatUser, userInfo, socket }, dispatch]: any = useStateProvider()


    const getReactionsApi = async () => {
        const response = await fetch(`https://messaging-dev.kotha.im/mobile/api/messages/reactions/${data?._id}?skip=0&limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': userInfo?.messageToken
            }
        })
        const json = await response.json()
        if (response) {
            return json
        }
        return []
    }

    const reactionsAll = data?.reactionCounts && Object.keys(data?.reactionCounts)


    return (
        <>
            <div className="d-flex align-items-center justify-content-start">
                {currentChatUser?.image ?
                    <div style={{ height: "30px", width: "30px", borderRadius: "50%", overflow: "hidden", marginRight: "5px" }}>
                        <img src={currentChatUser?.image} alt={currentChatUser?.name} className='w-100 h-100' />
                    </div> : ""
                }
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 150, hide: 400 }}
                    overlay={(props) => renderMessageTime(props, data)}
                >
                    {/* {
                        data?.cloudfrontUrl && !data?.message ?
                            <div>
                                <FileContent img={data?.cloudfrontUrl} />
                                <div className='reaction'>
                                    {
                                        reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                            return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                        }) : ""
                                    }
                                </div>
                            </div>
                            :
                            <div>
                                <TextContent message={data} isSender={false} content={data?.message} />
                                <div className='reaction'>
                                    {
                                        reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                            return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                        }) : ""
                                    }
                                </div>
                            </div>
                    } */}
                    <div>
                        {getContent(data)}
                        <div className='reaction'>
                            {
                                reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                    return <Reactions reaction={item} handleReactionSend={handleReactionSend} messageId={data?._id}  />
                                }) : ""
                            }
                        </div>
                    </div>
                </OverlayTrigger>
                <MessageSideAction message={data} handleReactionSend={handleReactionSend} handleDeleteMessage={handleDeleteMessage} isSend={false} />
            </div>
        </>
    )
}
