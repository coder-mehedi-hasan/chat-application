import { useRef, useState } from 'react';
import { Accordion, OverlayTrigger } from 'react-bootstrap';
import getContent from '../../utils/getContent';
import MessageSideAction from '../common/MessageSideAction';
import renderMessageTime from '../common/render-message-time';
import AccordionCollapse from './AccordionCollapse';
import Reactions from './Reactions';

function SenderMessages({ data }: any) {
    const reactionsAll = data?.reactionCounts && Object.keys(data?.reactionCounts)
    const [activeKey, setActiveKey] = useState(null);
    const contentRef = useRef(null)

    const handleAccordionButtonClick = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };



    return (
        <Accordion activeKey={activeKey} >
            <div className="d-flex align-items-center justify-content-end">
                {
                    data?.messageMeta?.contentType !== 14 &&
                    <MessageSideAction message={data} />
                }
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 150, hide: 150 }}
                    overlay={(props) => renderMessageTime(props, data)}
                >
                    <div
                        // onMouseEnter={() => handleAccordionButtonClick(data?._id)} onMouseLeave={() => handleAccordionButtonClick(null)}
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
                        {AccordionCollapse(data)}
                    </div>
                </OverlayTrigger>

            </div>
        </Accordion>
    )
}

export default SenderMessages;