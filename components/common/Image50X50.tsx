import React from 'react'
import { Image } from 'react-bootstrap'

export default function Image50X50({ src }) {
    return (
        <>
            <div style={{ height: "50px", width: "50px", borderRadius: "50%", overflow: "hidden" }}>
                <Image className='img-fluid' src={src}>
                </Image>
            </div>
        </>
    )
}
