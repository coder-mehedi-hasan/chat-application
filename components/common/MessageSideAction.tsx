import React from 'react'
import { Badge, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import { BsEmojiSmile, BsFillReplyFill, BsThreeDotsVertical } from 'react-icons/bs'

export default function MessageSideAction() {
    return (
        <div className='d-flex align=items-center mx-1 message_actions'>
            <div>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            More
                        </Tooltip>
                    }
                >
                    <Button variant="" className="p-0 text-white">
                        <span className='d-flex align-items-center justify-content-center hover_background' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}>
                            <BsThreeDotsVertical />
                        </span >
                    </Button>
                </OverlayTrigger>
            </div>
            <div>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            Replay
                        </Tooltip>
                    }
                >
                    <Button variant="" className="p-0 text-white">
                        <span className='d-flex align-items-center justify-content-center hover_background' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}><BsFillReplyFill /></span >
                    </Button>
                </OverlayTrigger>
            </div>
            <div>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            React
                        </Tooltip>
                    }
                >
                    <Button variant="" className="p-0 text-white">
                        <span className='d-flex align-items-center justify-content-center hover_background' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}>
                            <BsEmojiSmile />
                        </span >
                    </Button>
                </OverlayTrigger>
            </div>
        </div >
    )
}
