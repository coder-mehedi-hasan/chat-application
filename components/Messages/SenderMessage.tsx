import { useRef, useState } from 'react';
import { Accordion, OverlayTrigger } from 'react-bootstrap';
import getContent from '../../utils/getContent';
import MessageSideAction from '../common/MessageSideAction';
import renderMessageTime from '../common/render-message-time';
import AccordionCollapse from './AccordionCollapse';
import Reactions from './Reactions';
import { useMediaQuery } from 'react-responsive'


function SenderMessages({ data }: any) {
    const reactionsAll = data?.reactionCounts && Object.keys(data?.reactionCounts)
    const [activeKey, setActiveKey] = useState(null);
    const contentRef = useRef(null)
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })

    const handleAccordionButtonClick = (eventKey) => {
        if (isMobileWidth) {
            setActiveKey(activeKey === eventKey ? null : eventKey);
        }
    };



    return (
        <div className="d-flex align-items-center justify-content-end">
            {
                data?.messageMeta?.contentType !== 14 ?
                    <MessageSideAction message={data} /> : ""
            }
            <OverlayTrigger
                placement="left"
                delay={{ show: 150, hide: 150 }}
                overlay={(props) => renderMessageTime(props, data)}
            >
                <div
                    ref={contentRef}
                >
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
    )
}

export default SenderMessages;