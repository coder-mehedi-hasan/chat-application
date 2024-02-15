import React, { useState, useRef } from 'react'
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsEmojiSmile, BsFillReplyFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs'
import { reactionEmojis } from '../../utils/constant';

export default function MessageSideAction({ message, handleReactionSend, handleDeleteMessage, isSend, ...props }: any) {
    const [showMore, setShowMore] = useState(false);
    const [showReaction, setShowReaction] = useState(false)
    const more = useRef(null);
    const emoji = useRef(null);

    const innerActions = (ac) => {
        if (ac === "more") {
            setShowReaction(false)
            setShowMore(!showMore)
        } else {
            setShowMore(false)
            setShowReaction(!showReaction)
        }
    }

    const onMouse = () => {
        // setShowReaction(false)
        // setShowMore(false)
    }


    const handleClick = (reaction) => {
        handleReactionSend(message?._id, reaction?.name, true)
    };

    const handleDelClick = () => {
        // handleReactionSend(message?._id, reaction?.name, true)
        handleDeleteMessage(message?._id, 0)
    };

    return (
        <>
            <div className='d-flex align=items-center mx-1 message_actions' onMouseLeave={onMouse}>
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="tooltip-top" className='action_tooltip_top'>
                                More
                            </Tooltip>
                        }
                    >
                        <Button ref={more} onClick={() => innerActions("more")} variant="" className="p-0 text-white">
                            <span className='d-flex align-items-center justify-content-center hover_background action_tooltip_icon' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}>
                                <BsThreeDotsVertical />
                            </span >
                        </Button>
                    </OverlayTrigger>
                </div>
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="tooltip-top" className='action_tooltip_top'>
                                Replay
                            </Tooltip>
                        }
                    >
                        <Button variant="" className="p-0 text-white" >
                            <span className='d-flex align-items-center justify-content-center hover_background action_tooltip_icon' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}><BsFillReplyFill /></span >
                        </Button>

                    </OverlayTrigger>
                </div>
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="tooltip-top" className='action_tooltip_top'>
                                React
                            </Tooltip>
                        }
                    >
                        <Button ref={emoji} onClick={() => innerActions("emoji")} variant="" className="p-0 text-white" >
                            <span className='d-flex align-items-center justify-content-center hover_background action_tooltip_icon' style={{ fontSize: "15px", height: "24px", width: "24px", borderRadius: "50%", cursor: "pointer", margin: "auto" }}>
                                <BsEmojiSmile />
                            </span >
                        </Button>
                    </OverlayTrigger>
                </div>
            </div >
            <Overlay target={more.current} show={showMore} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props} className='inner_action_tooltip inner_action_tooltip_more' >
                        {
                            isSend && <div>
                                <div className='button' onClick={handleDelClick}>
                                    <div>
                                        Remove
                                    </div>
                                </div>
                            </div>
                        }
                        <div className=''>
                            <div className='button'>
                                <div>
                                    Forword
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='button'>
                                <div>
                                    Pin
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                )}
            </Overlay>
            <Overlay target={emoji.current} show={showReaction} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" className='inner_action_tooltip inner_action_tooltip_emoji' {...props}>
                        <div className='d-flex justify-content-center align-items-center' style={{ padding: "5px" }}>
                            {
                                reactionEmojis?.map((reaction, index) => {
                                    return (
                                        <div style={{ margin: "0 2px", cursor: "pointer" }} onClick={() => handleClick(reaction)} key={index} >
                                            <img src={reaction?.src} height={32} width={32} alt="" />
                                        </div>
                                    )
                                })
                            }
                            <div style={{ margin: "0 2px", cursor: "pointer", height: "32px", width: "32px", borderRadius: "50%", background: "#c4c4c7", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                <BsPlus style={{ fontSize: "15px" }} />
                            </div>
                        </div>
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}