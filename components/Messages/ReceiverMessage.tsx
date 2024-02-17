import { OverlayTrigger } from 'react-bootstrap';
import { useStateProvider } from '../../context/StateContext';
import getContent from '../../utils/getContent';
import MessageSideAction from '../common/MessageSideAction';
import renderMessageTime from '../common/render-message-time';
import Reactions from './Reactions';

export default function ReceiverMessages({ data }: any) {
    const [{ currentChatUser, }, dispatch]: any = useStateProvider();
    const reactionsAll = data?.reactionCounts && Object.keys(data?.reactionCounts);

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
                    <div>
                        {getContent(data)}
                        <div className='reaction'>
                            {
                                reactionsAll?.length && Array.isArray(reactionsAll) ? reactionsAll?.map(item => {
                                    if (data?.reactionCounts[item] > 0)
                                        return <Reactions reaction={item} messageId={data?._id} message={data} />
                                }) : ""
                            }
                        </div>
                    </div>
                </OverlayTrigger>
                {
                    data?.messageMeta?.contentType !== 14 &&
                    <MessageSideAction message={data} />
                }
            </div>
        </>
    )
}
