import React, { useEffect } from 'react'
import TextContent from './TextContent';
import MessageSideAction from '../common/MessageSideAction';
import FileContent from './FileContet';
import { useStateProvider } from '../../context/StateContext';
import { useQuery } from '@tanstack/react-query';
import Reactions from './Reactions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import renderMessageTime from '../common/render-message-time';

function SenderMessages({ data, handleReactionSend, isReaction, }: any) {
    const [{ userInfo, socket }, dispatch]: any = useStateProvider()

    const { data: reactionsAll, isSuccess, refetch } = useQuery({
        queryKey: [`${data?._id}`],
        queryFn: () => getReactionsApi()
    });


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

    useEffect(() => {
        refetch()
    }, [isReaction])

    // useEffect(() => {
    //     socket.current.on('updateSenderMessageStatusV2', (data: any) => {
    //     });
    //     return () => {
    //         socket.current.off("updateSenderMessageStatusV2")
    //     }
    // })

    // const renderMessageTime = (props: any, data: any) => {
    //     return (
    //         <Tooltip Tooltip id="button-tooltip" {...props}>
    //             {new Date(data?.messageSentTime)?.toDateString()}
    //         </Tooltip>)
    // }

    return (
        <>
            <div className="d-flex align-items-center justify-content-end">
                <MessageSideAction message={data} handleReactionSend={handleReactionSend} />
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 150, hide: 400 }}
                    overlay={(props) => renderMessageTime(props, data)}
                >
                    {
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
                                <TextContent isSender={true} content={data?.message} message={data} />
                                <div className='reaction'>
                                    {
                                        reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                            return <Reactions reaction={item} handleReactionSend={handleReactionSend} />
                                        }) : ""
                                    }
                                </div>
                            </div>
                    }
                </OverlayTrigger>
            </div>
        </>
    )
}



export default SenderMessages;