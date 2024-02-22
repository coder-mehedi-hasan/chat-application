import React from 'react';
import { Accordion } from 'react-bootstrap';
import { isDateToday } from '../../utils/functions/times';
import { BsCheckAll, BsCheckLg } from 'react-icons/bs';

const AccordionCollapse = (data: any) => {
    const checkDate: any = isDateToday(data?.messageSentTime) ?? isDateToday(new Date().toISOString())
    const renderMessageStatusTime = (status) => {
        switch (status) {
            case 1:
                return <span className='text-dark'>{checkDate?.time ?? ""} <BsCheckLg /></span>
            case 2:
                return <span className='text-dark'>{checkDate?.time ?? ""} <BsCheckAll /></span>
            case 3:
                return <span className='brand-color'>{checkDate?.time ?? ""} <BsCheckAll /></span>
            default:
                break;
        }
    }
    return (
        <Accordion.Collapse eventKey={data?._id}>
            <div className='w-100 text-end my-1 p-1' style={{ fontSize: "10px" }}>
                <p className='m-0'>
                    {renderMessageStatusTime(data?.messageStatus)}
                </p>
            </div>
        </Accordion.Collapse>
    );
};

export default AccordionCollapse;