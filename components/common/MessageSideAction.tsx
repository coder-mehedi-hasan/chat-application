import React, { useState, useRef, useEffect } from 'react'
import { Badge, Button, Image, Overlay, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import { BsEmojiSmile, BsFillReplyFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs'
import { useStateProvider } from '../../context/StateContext';
import { reactionEmojis } from '../../utils/constant';

export default function MessageSideAction({ message, handleReactionSend }: any) {
    const [showMore, setShowMore] = useState(false);
    const [showReaction, setShowReaction] = useState(false)
    const more = useRef(null);
    const emoji = useRef(null);
    const [{ currentChatUser, socket, userInfo }] = useStateProvider()

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
                        <div>
                            <div className='button'>
                                <div>
                                    Remove
                                </div>
                            </div>
                        </div>
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
                            {/* <div style={{ margin: "0 2px", cursor: "pointer" }}>
                                <img src="https://z-p3-static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/32/1f606.png" height={32} width={32} alt="" />
                            </div>
                            <div style={{ margin: "0 2px", cursor: "pointer" }}>
                                <img src="	https://z-p3-static.xx.fbcdn.net/images/emoji.php/v9/td4/1.5/32/1f62e.png" height={32} width={32} alt="" />
                            </div>
                            <div style={{ margin: "0 2px", cursor: "pointer" }}>
                                <img src="	https://z-p3-static.xx.fbcdn.net/images/emoji.php/v9/t21/1.5/32/1f622.png" height={32} width={32} alt="" />
                            </div>
                            <div style={{ margin: "0 2px", cursor: "pointer" }}>
                                <img src="	https://z-p3-static.xx.fbcdn.net/images/emoji.php/v9/t1f/1.5/32/1f620.png" height={32} width={32} alt="" />
                            </div>
                            <div style={{ margin: "0 2px", cursor: "pointer" }}>
                                <img src="https://z-p3-static.xx.fbcdn.net/images/emoji.php/v9/tf/1.5/32/1f44d.png" height={32} width={32} alt="" />
                            </div> */}
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