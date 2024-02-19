import React from 'react';
import { Accordion } from 'react-bootstrap';
import renderMessageStatus from './renderMessageStatus';

const AccordionCollapse = (data) => {
    return (
        <Accordion.Collapse eventKey={data?._id}>
            <div className='w-100 py-1 d-flex justify-content-between brand-color px-2 flex-wrap'>
                <div className='w-50'>
                    {
                        new Date(data?.messageSentTime)?.toLocaleString()
                    }
                </div>
                <div className='w-50 text-end'>
                    <p className='m-0'>
                        {renderMessageStatus(data?.messageStatus)}
                    </p>
                </div>
            </div>
        </Accordion.Collapse>
    );
};

export default AccordionCollapse;