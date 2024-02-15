import React, { useEffect, useState } from 'react'
import { identifyTextOrLink } from '../../utils/identifyTextOrLink';
import Link from 'next/link';
import { useStateProvider } from '../../context/StateContext';

export default function TextContent({ content, message }: any) {
    const [{ userInfo }, dispatch]: any = useStateProvider()
    const isSender = message?.messageFromUserID === userInfo?.id
    const containerStyle = {
        maxWidth: "564px",
        padding: "8px 12px",
        wordWrap: "break-word",
        background: isSender ? "#0A7CFF" : "#f0f0f0",
        borderRadius: "18px",
    }
    const textStyle = {
        color: isSender ? "#fff" : "#000",
        whiteSpace: "pre-wrap",
        lineHeight: "20px",
        textAlign: "left",
        fontSize: "15px",
        fontWeight: 400
    }

    return (
        <>
            <div style={containerStyle} className={isSender ? "brand-bg" : ""}>
                <div style={{ boxSizing: "border-box" }}>
                    <div className='m-0 w-100' style={textStyle}>
                        {
                            identifyTextOrLink(content) === 'link' ? <Link target='_blank' href={content} style={{ color: isSender ? "#fff" : "#000" }}>{message?.messageBody}</Link> : message?.messageBody
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
