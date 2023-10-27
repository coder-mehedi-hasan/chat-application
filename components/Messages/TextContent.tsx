import React from 'react'

export default function TextContent({ content, isSender }) {
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
            <div style={containerStyle}>
                <div style={{ boxSizing: "border-box" }}>
                    <div className='m-0 w-100' style={textStyle}>
                        {
                            content
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
