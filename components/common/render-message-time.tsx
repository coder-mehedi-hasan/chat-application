import React from 'react'
import { Tooltip } from 'react-bootstrap'
import { isDateToday } from '../../utils/functions/times'

export default function renderMessageTime(props: any, data: any) {
    const checkDate: any = isDateToday(data?.messageSentTime)
    return (
        <Tooltip Tooltip id="button-tooltip" {...props}>
            {
                checkDate?.time ?? ""
            }
        </Tooltip>
    )

}
