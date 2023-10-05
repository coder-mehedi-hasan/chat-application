import React from 'react'
import { Image } from 'react-bootstrap'

export default function SideBarItemBefore({ data }) {
    return (
        <>
            <Image src={data?.image} style={{ height: "100%", width: "100%" }} />
        </>
    )
}
