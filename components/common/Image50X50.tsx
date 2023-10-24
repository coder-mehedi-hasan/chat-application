import React from 'react'
import { Image } from 'react-bootstrap'

export default function Image50X50({ src }) {
    return (
        <>
            <Image height="50px" width="50px" roundedCircle src={src}>
            </Image>
        </>
    )
}
