import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BsCheckAll, BsCheckLg } from 'react-icons/bs'

export default function ImageContet({ img }) {
    const [sent, setSent] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setSent(true);
        }, 1000)
    }, [])

    return (
        <div>
            <div style={{ maxWidth: "480px", borderRadius: "18px", height: "auto", overflow: "hidden" }}>
                <img src={img} alt="img" style={{ maxWidth: "100%", maxHeight:"220px"}} />
            </div>
            <div>
                <p className='p-0 text-end' style={{ fontSize: "15px" }}>
                    {sent ?
                        <BsCheckAll />
                        : <>
                            <Spinner animation="border" size="sm" />
                            <BsCheckLg />
                        </>
                    }</p>
            </div>
        </div>
    )
}
