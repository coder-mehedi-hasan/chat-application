import React from 'react'
import { Tooltip } from 'react-bootstrap'
import { isDateToday } from '../../utils/functions/times'
import { BsCheckAll, BsCheckLg } from 'react-icons/bs'

export default function renderMessageTime(props: any, data: any) {
    const checkDate: any = isDateToday(data?.messageSentTime)

    const renderMessageStatusTime = (status) => {
        switch (status) {
            case 1:
                return <span className='text-light'><BsCheckLg /></span>
            case 2:
                return <span className='text-light'><BsCheckAll /></span>
            case 3:
                return <span className='brand-color'><BsCheckAll /></span>
            default:
                break;
        }
    }

    return (
        <Tooltip Tooltip id="button-tooltip" {...props}
            >
            <>{renderMessageStatusTime(data?.messageStatus)} </>
            {
                checkDate?.time ?? ""
            }
        </Tooltip>
    )

}
