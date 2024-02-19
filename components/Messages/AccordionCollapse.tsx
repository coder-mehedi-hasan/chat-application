import React from 'react';
import { Accordion } from 'react-bootstrap';
import renderMessageStatus from './renderMessageStatus';
import { isDateToday } from '../../utils/functions/times';

const AccordionCollapse = (data: any) => {
    const checkDate: any = isDateToday(data?.messageSentTime)
    // console.log({ checkDate })
    return (
        <Accordion.Collapse eventKey={data?._id}>
            <div className='w-100 text-end brand-color my-1 p-1' style={{ fontSize: "10px" }}>
                <p className='m-0'>
                    {renderMessageStatus(data?.messageStatus)}
                </p>
                <p className='m-0'>
                    {checkDate?.time ?? ""}
                </p>
            </div>
        </Accordion.Collapse>
    );
};

export default AccordionCollapse;