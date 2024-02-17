import { OverlayTrigger } from 'react-bootstrap';
import getContent from '../../utils/getContent';
import MessageSideAction from '../common/MessageSideAction';
import renderMessageTime from '../common/render-message-time';
import Reactions from './Reactions';

function SenderMessages({ data }: any) {
    const reactionsAll = data?.reactionCounts && Object.keys(data?.reactionCounts)

    return (
        <>
            <div className="d-flex align-items-center justify-content-end">
                {
                    data?.messageMeta?.contentType !== 14 &&
                    <MessageSideAction message={data} />
                }
                <OverlayTrigger
                    placement="left"
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
            </div>
        </>
    )
}

export default SenderMessages;