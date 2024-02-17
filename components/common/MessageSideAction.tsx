import React, { useState, useRef, useEffect } from 'react'
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsEmojiSmile, BsFillReplyFill, BsPlus, BsThreeDotsVertical } from 'react-icons/bs'
import { reactionEmojis } from '../../utils/constant';
import { useStateProvider } from '../../context/StateContext';
import { reducerCases } from '../../context/constant';
import handleReactionSend from '../../utils/functions/handleReactionSend';
import handleDeleteMessage from '../../utils/functions/handleDeleteMessage';

export default function MessageSideAction({ message }: any) {
    const [showMore, setShowMore] = useState(false);
    const [showReaction, setShowReaction] = useState(false)
    const more = useRef(null);
    const emoji = useRef(null);
    const moreContainer = useRef(null);
    const emojiContainer = useRef(null);
    const [{ userInfo, messages, socket }, dispatch]: any = useStateProvider()
    const isSend = message?.messageFromUserID === userInfo?.id

    useEffect(() => {
        const handler = (e) => {
            if (!moreContainer?.current?.contains(e.target)) {
                setShowMore(false);
            }
            if (!emojiContainer?.current?.contains(e.target)) {
                setShowReaction(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.addEventListener("mousedown", handler);
        }
    })

    const innerActions = (ac) => {
        if (ac === "more") {
            setShowReaction(false)
            setShowMore(!showMore)
        } else {
            setShowMore(false)
            setShowReaction(!showReaction)
        }
    }


    const handleClick = (reaction: any) => {
        handleReactionSend(message?._id, reaction?.name, true, socket, userInfo, messages, dispatch)
    };

    const handleDelClick = () => {
        handleDeleteMessage(message?._id, 0, socket, messages, dispatch)
    };

    const handleEdit = () => {
        dispatch({ type: reducerCases.ADD_EDIT_MESSAGE, editMessage: message })
    }

    return (
        <>
            <div className='d-flex align=items-center mx-1 message_actions'>
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
                            <Tooltip id="tooltip-top" className='action_tooltip_top' >
                                Replay
                            </Tooltip>
                        }
                    >
                        <Button variant="" className="p-0 text-white" onClick={() => dispatch({ type: reducerCases.ADD_REPLAY_MESSAGE, replayMessage: message })}>
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
            <Overlay target={more.current} show={showMore} placement="top" ref={moreContainer}>
                {(props) => (
                    <Tooltip id="overlay-example" {...props} className='inner_action_tooltip inner_action_tooltip_more' >
                        {/* <div className=''>
                            <div className='button'>
                                <div>
                                    Forword
                                </div>
                            </div>
                        </div> */}
                        {
                            isSend && <>
                                <div>
                                    <div className='button' onClick={handleDelClick}>
                                        <div>
                                            Remove
                                        </div>
                                    </div>
                                </div>
                                {
                                    // message?.messageMeta?.contentType === 1 &&
                                    <div className='' onClick={handleEdit}>
                                        <div className='button'>
                                            <div>
                                                Edit
                                            </div>
                                        </div>
                                    </div>}
                            </>
                        }
                    </Tooltip>
                )}
            </Overlay>
            <Overlay target={emoji.current} show={showReaction} placement="top" ref={emojiContainer}>
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