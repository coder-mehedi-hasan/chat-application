import React from 'react'
import { Tooltip } from 'react-bootstrap'

export default function renderMessageTime(props: any, data: any) {
    return (
        <Tooltip Tooltip id="button-tooltip" {...props}>
            {new Date(data?.messageSentTime)?.toDateString()}
        </Tooltip>
    )

}
