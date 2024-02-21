import { OverlayTrigger } from 'react-bootstrap';
import getContent from '../../utils/getContent';
import MessageSideAction from '../common/MessageSideAction';
import renderMessageTime from '../common/render-message-time';
import Reactions from './Reactions';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { BsCheckAll, BsCheckLg } from 'react-icons/bs';
import renderMessageStatus from './renderMessageStatus';
import AccordionCollapse from './AccordionCollapse';

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
                    delay={{ show: 100, hide: 100 }}
                    overlay={(props) => renderMessageTime(props, data)}
                >
                    <div 
                    // onMouseEnter={() => handleAccordionButtonClick(data?._id)} onMouseLeave={() => handleAccordionButtonClick(null)}
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