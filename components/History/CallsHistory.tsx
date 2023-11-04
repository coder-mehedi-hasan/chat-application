import React from 'react'
import TopNavBar from '../common/TopNavBar'

export default function CallsHistory() {
    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>
                <TopNavBar type={"calls"} />
                <div className='my-2 w-100'>
                    <div className='h-100'>
                        CallsHistory
                    </div>
                </div>
            </div>
        </>
    )
}
