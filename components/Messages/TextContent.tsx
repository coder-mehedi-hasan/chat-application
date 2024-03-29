import React from 'react'
import { identifyTextOrLink } from '../../utils/identifyTextOrLink';
import Link from 'next/link';
import { useStateProvider } from '../../context/StateContext';
import MessageSideAction from '../common/MessageSideAction';
import { useMediaQuery } from 'react-responsive'

export default function TextContent({ content, message, ...props }: any) {
    const [{ userInfo }, dispatch]: any = useStateProvider()
    const isSender = message?.messageFromUserID === userInfo?.id
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })

    let containerStyle: any = {
        padding: "8px 12px",
        wordWrap: "break-word",
        borderRadius: "18px",
        color: isSender ? "#fff" : "#000",
        whiteSpace: "pre-wrap",
        lineHeight: "20px",
        textAlign: "left",
        fontSize: "15px",
        fontWeight: 400,
    }


    let repliedMessageContent = null
    if (props?.isReplay && message?.messageMeta?.contentInfo !== "") {
        const content = JSON.parse(message?.messageMeta?.contentInfo)
        repliedMessageContent = content
        containerStyle.borderTopRightRadius = isSender ? 0 : "18px"
        containerStyle.borderTopLeftRadius = !isSender ? 0 : "18px"
    }
    containerStyle.borderRadius = "18px";
    const getRepliedContent = (content: any) => {
        if (content?.c) {
            return <div style={{ maxWidth: "140px", objectFit: "cover", overflow: "hidden", borderRadius: "12px", borderBottomRightRadius: isSender ? "0" : "12px", borderBottomLeftRadius: !isSender ? "0" : "12px", opacity: 0.6 }}>
                <img src={content?.o} alt="" className='img-fluid' />
            </div>
        } else {
            return <>
                <div className='bg-replay p-3 border' style={{ borderRadius: "12px", borderBottomRightRadius: isSender ? "0" : "12px", borderBottomLeftRadius: !isSender ? "0" : "12px", opacity: 0.7 }}>
                    <div className='text-dark fs-8'>
                        <span> {content?.n}: {content?.o?.substring(0, 150)}</span>
                    </div>
                </div>
            </>
        }
    }

    return (
        <div style={{ maxWidth: isMobileWidth ? "400px" : "564px" }}>
            {
                props?.isReplay &&
                <div className='cursor-pointer'>
                    {getRepliedContent(repliedMessageContent)}
                </div>
            }
            <div>
                <div style={{ boxSizing: "border-box" }} >
                    <div className={`m-0 w-100 d-flex align-items-center ${isSender ? "justify-content-end" : "justify-content-start"} text-dark`}>
                        {
                            message?.messageMeta?.contentType === 14 && isSender &&
                            <MessageSideAction message={message} />
                        }
                        <div style={containerStyle} className={isSender ? "brand-bg" : "bg-receiver"} >
                            {
                                identifyTextOrLink(content) === 'link' ? <Link target='_blank' href={content} style={{ color: isSender ? "#fff" : "#000" }}>{message?.messageBody}</Link> : message?.messageBody
                            }
                        </div>
                        {
                            message?.messageMeta?.contentType === 14 && !isSender &&
                            <MessageSideAction message={message} />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
