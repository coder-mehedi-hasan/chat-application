import React, { useEffect } from 'react'
import TextContent from './TextContent';
import MessageSideAction from '../common/MessageSideAction';
import FileContent from './FileContet';
import { useStateProvider } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query';
import Reactions from './Reactions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import renderMessageTime from '../common/render-message-time';
import getContent from '../../utils/getContent';

function SenderMessages({ data, handleReactionSend,  handleDeleteMessage }: any) {
    const [{ userInfo, socket }, dispatch]: any = useStateProvider()

    // const { data: reactionsAll, isSuccess, refetch } = useQuery({
    //     queryKey: [`${data?._id}`],
    //     queryFn: () => getReactionsApi()
    // });


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


    return (
        <>
            <div className="d-flex align-items-center justify-content-end">
                <MessageSideAction message={data} handleReactionSend={handleReactionSend} handleDeleteMessage={handleDeleteMessage} isSend={true} />
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 150, hide: 400 }}
                    overlay={(props) => renderMessageTime(props, data)}
                >
                    <div>
                        {getContent(data)}
                        {/* <div className='reaction'>
                            {
                                reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                    return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                }) : ""
                            }
                        </div> */}
                    </div>
                </OverlayTrigger>
            </div>
        </>
    )
}



export default SenderMessages;